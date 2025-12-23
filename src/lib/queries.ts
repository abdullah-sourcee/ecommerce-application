import api from '@/lib/axios';

export async function fetchProducts() {
  const response = await api.get('/admin/products', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  // console.log(response.data.data.products)
  return response.data.data.products;
}

export async function getProductsRequestId(productId: string) {
  const response = await api.get(`/admin/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data.data.product;
}

// const response = await api.get(`/products?sort=${sort}`);
export async function publicProducts(sort: string) {
  let baseURL = '/products';
  if (sort) baseURL += `?sort=${sort}`;
  const response = await api.get(baseURL);
  return response.data.data.products;
}

export async function userCart() {
  const response = await api.get('/cart', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  // console.log('response', response)
  return response.data.data.products;
}
