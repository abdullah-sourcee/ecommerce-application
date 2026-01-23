import { backendApi, externalApi } from './axios';

export async function loginUser(userData: { email: string; password: string }) {
  const res = await externalApi.post('/api/login', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // localStorage.setItem('accessToken', res.data.data.accessToken);
  // localStorage.setItem('refreshToken', res.data.data.refreshToken);
  // localStorage.setItem('user', JSON.stringify(res.data.data.user));

  return res.data;
}

export async function createUser(userData: FormData) {
  const res = await externalApi.post('/api/signup', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

export async function addProduct(userData: FormData, token: string) {
  // console.log('token is:', token);
  const res = await backendApi.post('/admin/products/add', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
}

/*new functionality implemented using cookies and passing token as props */
export async function updateProduct({
  formData,
  productId,
  token,
}: {
  formData: FormData;
  productId: string;
  token: string;
}) {
  // console.log("ABC",productId)
  const res = await backendApi.put(
    `/admin/products/update/${productId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  return res.data;
}

export async function addProductToCart(
  productId: string,
  token: string,
  decrease?: boolean
) {
  let baseURL = '/cart';
  if (decrease) {
    baseURL += `?decrease=${decrease}`;
  }

  const res = await backendApi.post(
    baseURL,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return res.data;
}

export async function deleteProduct(productId: string, token: string) {
  const res = await backendApi.delete(`/admin/products/delete/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
}

export async function deleteProductFromCart(productId: string, token: string) {
  const res = await backendApi.post(
    '/cart/delete-item',
    { productId },
    {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function addPost(userData: FormData, token: string) {
  const res = await backendApi.post('feed/posts', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updatePost({
  formData,
  postId,
  token,
}: {
  formData: FormData;
  postId: string;
  token: string;
}) {
  const res = await backendApi.patch(`/feed/posts/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('asdfghjgfdfgh',res.data.data.post)
  return res.data.data.post;
}

// Logout
export async function logout() {
  const res = await externalApi.post(
    '/api/logout',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
}

/*POST
/auth/refresh-token
Get new access and refresh token */
export async function refreshAccessToken() {
  const res = await backendApi.post(
    '/api/refreshToken',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
}

/*
PUT
/feed/posts/comment
Add comment to post
*/
export async function addComment({
  postId,
  comment,
  token,
}: {
  postId: string;
  comment: string;
  token: string;
}) {
  const res = await backendApi.put(
    '/feed/posts/comment',
    {
      postId,
      comment,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
