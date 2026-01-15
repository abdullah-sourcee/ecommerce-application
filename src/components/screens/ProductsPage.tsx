'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { addProductToCart } from '@/lib/mutations';
import { publicProducts } from '@/lib/queries';

export default function ProductsPage() {
  // const data = props.product;
  // const token = props.token;

  const [sort, setSort] = useState('');

  const { data: token } = useQuery<string | null | undefined>({
    queryKey: ['token'],
    queryFn: () => null,
  });

  const { data } = useQuery({
    queryKey: ['products', '', token],
    queryFn: () => publicProducts('', token ?? undefined),
  });

  const addToCartProductMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!token) {
        throw new Error('Token is required');
      }
      return addProductToCart(productId, token);
    },
    onSuccess: () => {
      alert('Product added to cart');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  async function handleAddToCartProduct(productId: any) {
    addToCartProductMutation.mutate(productId);
  }

  const sortedData = useMemo(() => {
    if (!sort || !data) return data;

    const sorted = [...data];

    if (sort === 'price') {
      sorted.sort((a, b) => a.price - b.price); // Price sorted from Low to high
    } else if (sort === 'rating') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Rating sorted from high to low
    }
    return sorted;
  }, [sort, data]);

  return (
    <>
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
        {sortedData?.map((product: any) => (
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
    </>
  );
}
