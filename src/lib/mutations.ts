import { headers } from 'next/headers';
import api from './axios';

export async function createUser(userData: FormData) {
  const res = await api.post('/auth/signup', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

export async function loginUser(userData: { email: string; password: string }) {
  try {
    const res = await api.post('/auth/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(res);
    localStorage.setItem('accessToken', res.data.data.accessToken);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(res.data.data.user));

    return res.data;
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}

export async function addProduct(userData: FormData) {
  const res = await api.post('/admin/products/add', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  // console.log("Product data:", res.data)
  return res.data;
}

export async function updateProduct({
  formData,
  productId,
}: {
  formData: FormData;
  productId: string;
}) {
  // console.log("ABC",productId)
  const res = await api.put(`/admin/products/update/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  // console.log("Product data:", res.data)
  return res.data;
}

// Delete Product based on Product ID

export async function deleteProduct(productId: string) {
  const res = await api.delete(`/admin/products/delete/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data;
}

export async function addProductToCart(productId: string, decrease: boolean) {
  let baseURL = '/cart';
  // /cart
  if(decrease){
    baseURL += `?decrease=${decrease}`
  }
  // /cartbaseURL? decrease=true

  // /cart?decrease=true
  // /cart?decrease=undefined
  // /cart


  // /cart?decrease=false

  const res = await api.post(
    baseURL,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return res.data;
}

export async function deleteProductFromCart(productId: string) {
  const res = await api.post(
    '/cart/delete-item',
    { productId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
  return res.data;
}
