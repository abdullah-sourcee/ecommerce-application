/*

import axios from 'axios';

// Backend API instance
const backendApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

// External API instance (for third-party services)
const externalApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export { backendApi, externalApi };
*/
/**/

import axios from 'axios';

// Backend API instance
const backendApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true, // NEW: This tells axios to send cookies with every request
});

// External API instance (for third-party services)
const externalApi = axios.create({
  baseURL: 'http://localhost:3000',
});

// ============================================
// STEP 1: Create flags to control refresh flow
// ============================================

// This flag prevents multiple refresh attempts happening at the same time
let isRefreshing = false;

// This array stores requests that failed while we're refreshing the token
// Think of it as a "waiting room" for failed requests
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

// ============================================
// STEP 2: Helper function to process waiting requests
// ============================================

const processQueue = (error: Error | null, token: string | null = null) => {
  // This function runs after token refresh completes (success or failure)
  // It tells all waiting requests what to do next

  failedQueue.forEach((prom) => {
    if (error) {
      // If refresh failed, reject all waiting requests
      prom.reject(error);
    } else {
      // If refresh succeeded, resolve all waiting requests
      // They will retry their original API calls
      prom.resolve(token);
    }
  });

  // Clear the queue
  failedQueue = [];
};

// ============================================
// STEP 3: Add the Response Interceptor
// ============================================

backendApi.interceptors.response.use(
  // First function: handles SUCCESSFUL responses (status 200-299)
  (response) => {
    // Everything is fine, just return the response as-is
    return response;
  },

  // Second function: handles ERROR responses (status 400+)
  async (error) => {
    console.log(
      '🔴 INTERCEPTOR TRIGGERED - Error caught:',
      error.response?.status
    );

    // Get the original request configuration
    // This contains all info about the request that failed
    const originalRequest = error.config;

    // ============================================
    // CHECK: Is this a 401 error AND first retry?
    // ============================================

    // error.response?.status === 401 → Token expired
    // !originalRequest._retry → Haven't tried to refresh yet
    console.log(
      '🔴 INTERCEPTOR TRIGGERED - Error caught:',
      error.response?.status
    );
    console.log('🔴 Error status:', error.response?.status);
    console.log('🔴 Has _retry flag:', originalRequest._retry);

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/login') && // Don't refresh token for login endpoint
      !originalRequest.url?.includes('auth/signup') // Don't refresh token for signup endpoint
    ) {
      // ============================================
      // SCENARIO A: Token refresh already in progress
      // ============================================

      console.log('--- INTERCEPTOR CAUGHT 401 ---');
      console.log('Original URL:', originalRequest.url);

      /*
    
    if (isRefreshing) {
      // Someone else is already refreshing the token
      // Put this request in the queue and wait

      return new Promise((resolve, reject) => {
        // Add this request to the waiting queue
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          // When token refresh completes, retry the original request
          return backendApi(originalRequest);
        })
        .catch((err) => {
          // If refresh failed, reject this request
          return Promise.reject(err);
        });
    }
    */
      if (isRefreshing) {
        // Someone else is already refreshing the token
        // Put this request in the queue and wait

        return new Promise((resolve, reject) => {
          // Add this request to the waiting queue
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            // When token refresh completes, update the request with new token and retry
            if (newToken && typeof newToken === 'string') {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return backendApi(originalRequest);
          })
          .catch((err) => {
            // If refresh failed, reject this request
            return Promise.reject(err);
          });
      }

      // ============================================
      // SCENARIO B: First 401 error - start refresh
      // ============================================

      // Mark this request as "already retried" to prevent infinite loops
      originalRequest._retry = true;

      // Set flag: we're now refreshing the token
      isRefreshing = true;

      try {
        // ============================================
        // CALL YOUR REFRESH TOKEN API
        // ============================================

        const response = await fetch('/api/refresh-token', {
          method: 'POST',
          credentials: 'include', // Send cookies (refreshToken cookie)
        });

        // Check if refresh was successful
        if (!response.ok) {
          throw new Error('Token refresh failed');
        }
        /*

        */
        const data = await response.json();
        console.log('data from axios file is::', data);

        // ============================================
        // SUCCESS: Token refreshed!
        // ============================================

        // Extract the new access token from the response
        const newAccessToken =
          data.data?.user?.accessToken ||
          data.data?.accessToken ||
          data.accessToken;
        console.log(
          '🔵 Extracted token:',
          newAccessToken
            ? `${newAccessToken.substring(0, 20)}...`
            : 'NO TOKEN FOUND'
        );
        console.log('🔵 Full data structure:', JSON.stringify(data, null, 2));

        if (!newAccessToken) {
          throw new Error('No access token in refresh response');
        }

        // Update the original request's Authorization header with the new token
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log(
          '🔵 Updated Authorization header:',
          originalRequest.headers.Authorization?.substring(0, 30) + '...'
        );
        console.log('🔵 Original request config:', {
          url: originalRequest.url,
          method: originalRequest.method,
          headers: originalRequest.headers,
        });

        // Tell all waiting requests: "Token is ready, retry now!"
        processQueue(null, newAccessToken);
        console.log('--- REFRESH SUCCESSFUL, RETRYING ---');
        console.log('🔵 About to retry with URL:', originalRequest.url);

        // Retry the ORIGINAL request that triggered this whole process
        return backendApi(originalRequest);
      } catch (refreshError) {
        // ============================================
        // FAILURE: Token refresh failed
        // ============================================

        // Tell all waiting requests: "Refresh failed, give up"
        processQueue(refreshError as Error, null);

        // Redirect user to login page
        // (only in browser, not in server-side code)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        // Reject this request
        return Promise.reject(refreshError);
      } finally {
        // ============================================
        // CLEANUP: Reset the refresh flag
        // ============================================

        // Whether success or failure, we're done refreshing
        isRefreshing = false;
      }
    }

    // ============================================
    // OTHER ERRORS: Not a, just reject normally
    // ============================================

    // For errors like 404, 500, etc., just pass them through
    return Promise.reject(error);
  }
);
export { backendApi, externalApi };

/*
```

## Visual Flow Diagram
```
Component makes API call
↓
backendApi.get('/user')
↓
┌─────────┐
│ Success?│
└─────────┘
↙     ↘
YES      NO (401 Error)
↓           ↓
Return    Is someone already
data     refreshing token?
↙        ↘
YES         NO
↓           ↓
Add to      Start refresh
queue       (isRefreshing = true)
↓           ↓
Wait...    Call /api/auth/refresh-token
↓           ↓
└─────┬─────┘
↓
Refresh complete
↓
processQueue()
↓
Retry all queued requests
↓
Return data
*/
