import { cookies } from 'next/headers';

import { backendApi } from '@/lib/axios';

/* 
export async function POST(request: Request) {
  try {
    // console.log(request);
    const body = await request.json();
    const { email, password } = body;

    // Call backend API
    const backendResponse = await fetch(
      'http://localhost:8000/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!backendResponse.ok) {
      throw new Error(`Backend API returned ${backendResponse.status}`);
    }

    const data = await backendResponse.json();
    // console.log('refresh data is::', data.data.refreshToken);

    const cookieStore = await cookies();
    cookieStore.set('token', data.data.accessToken, { secure: true });
    cookieStore.set('refreshToken', data.data.refreshToken, { secure: true });
    cookieStore.set('role', data.data.user.role, { secure: true });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Login API error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
*/
export async function POST(request: Request) {
  let backendResponse = null;
  try {
    const body = await request.json();
    const { email, password } = body;

    backendResponse = await backendApi.post(
      '/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await backendResponse.data;
    const cookieStore = await cookies();
    cookieStore.set('token', data.data.accessToken, { secure: true });
    cookieStore.set('refreshToken', data.data.refreshToken, { secure: true });
    cookieStore.set('role', data.data.user.role, { secure: true });
    return new Response(
      JSON.stringify(backendResponse?.data || { message: 'Success' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // console.log("error from login route api:",JSON.stringify(error));
    // console.error('Login API error:', error?.response?.data?.message);
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
