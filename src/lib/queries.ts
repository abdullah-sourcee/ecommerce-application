// import api from '@/lib/axios';
import { backendApi } from './axios';

export async function fetchProducts(token?: string) {
  const response = await backendApi.get('/admin/products', {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  // console.log(response.data.data.products)
  return response.data.data.products;
}

export async function getProductsRequestId(productId: string, token?: string) {
  const response = await backendApi.get(`/admin/products/${productId}`, {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.product;
}

//New logic with cookies
export async function userCart(token?: string) {
  const response = await backendApi.get('/cart', {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('response', response)
  return response.data.data.products;
}

export async function timeline(token?: string) {
  const response = await backendApi.get('/feed/posts/timeline', {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('response', response.data.data.posts);
  return response.data.data.posts;
}

export async function getPost(postId: string, token?: string) {
  const response = await backendApi.get(`/feed/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
}

/*
GET
/feed/posts/comment/{postId}
Get all comments in the given post
*/
export async function getComment(postId: string, token?: string) {
  const response = await backendApi.get(`/feed/posts/comment/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data?.data?.comments;
}

/*GET
/feed/posts/user-posts */

export async function userPosts(token?: string) {
  const response = await backendApi.get('/feed/posts/user-posts', {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.posts;
}

// const response = await api.get(`/products?sort=${sort}`);
export async function publicProducts(sort: string, token?: string) {
  let baseURL = '/products';
  if (sort) baseURL += `?sort=${sort}`;
  const response = await backendApi.get(baseURL);
  return response.data.data.products;
}

/*
Returns a list of posts 
(can search, sort by each filed, filter by each filed)
*/
export async function listOfPosts(search: string, token?: string) {
  let baseURL = '/feed/posts';
  if (search) baseURL += `?search=${search}`;
  const response = await backendApi.get(baseURL);
  return response.data.data.posts || [];
}
