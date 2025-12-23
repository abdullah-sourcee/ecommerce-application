'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { publicProducts } from '@/lib/queries';
import { useState } from 'react';
import { addProductToCart } from '@/lib/mutations';

export default function Products() {
  const [sort, setSort] = useState('');

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['products', sort],
    queryFn: () => publicProducts(sort),
  });

  const addToCartProductMutation = useMutation({
    mutationFn: (productId) => addProductToCart(productId),
    onSuccess: () => {
      alert('Product added to cart');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  async function handleAddToCartProduct(productId) {
    addToCartProductMutation.mutate(productId);
  }

  if (isLoading) {
    return <div>Loading Products...</div>;
  }

  if (isError) {
    return <div>Something went wrong: {error.message}</div>;
  }
  // console.log('asdfgh', sort);

  return (
    <div className='px-16'>
      <div className='flex justify-center'>
        <h1>All Products Page</h1>
      </div>

      {/* Sorting Drop Down */}
      <div className='flex justify-end'>
        <details className='dropdown dropdown-end'>
          <summary className='btn m-1 w-52'>Sort</summary>
          <ul className='menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
            <li>
              <a onClick={() => setSort('price')}>Price</a>
            </li>
            <li>
              <a onClick={() => setSort('rating')}>Rating</a>
            </li>
          </ul>
        </details>
      </div>

      {/* All Products */}
      <div className='flex gap-10'>
        {data.map((product) => (
          <div
            className='mt-6 card w-96 bg-base-100 card-lg shadow-sm'
            key={product._id}
          >
            <div className='card-body'>
              <h2 className='card-title'>{product.name}</h2>
              <p>{product.description}</p>
              <p className='font-bold'>PKR {product.price}</p>
              <div className='justify-end card-actions'>
                <button
                  onClick={() => handleAddToCartProduct(product._id)}
                  className='btn btn-primary'
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
