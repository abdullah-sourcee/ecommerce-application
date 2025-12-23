'use client';

import { addProductToCart, deleteProductFromCart } from '@/lib/mutations';
import { userCart } from '@/lib/queries';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function CartPage() {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: userCart,
  });

  const deleteFromCartProductMutation = useMutation({
    mutationFn: (productId) => deleteProductFromCart(productId),
    onSuccess: () => {
      refetch();
      alert('Product deleted');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ productId, decrease }) =>
      addProductToCart(productId, decrease),
    onSuccess: () => {
      refetch();
      // alert('Product Updated');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  async function handleDeleteProduct(productId) {
    deleteFromCartProductMutation.mutate(productId);
  }

  async function handleIncreaseQuantity(productId) {
    updateCartMutation.mutate({ productId, decrease: false });
  }

  async function handleDecreaseQuantity(productId) {
    updateCartMutation.mutate({ productId, decrease: true });
  }

  if (isLoading) {
    return <div>Loading Products...</div>;
  }

  if (isError) {
    return <div>Something went wrong: {error.message}</div>;
  }
  return (
    <div>
      {data.map((cartItem) => (
        <div
          className='mt-6 card w-96 bg-base-100 card-lg shadow-sm'
          key={cartItem.product._id}
        >
          <div className='card-body'>
            <h2 className='card-title'>{cartItem.product.name}</h2>
            <p className='font-bold'>PKR {cartItem.product.price}</p>
            <p className='font-bold'>Quantity: {cartItem.quantity}</p>
            <button
              onClick={() => handleDeleteProduct(cartItem.product._id)}
              className='btn btn-primary'
            >
              Delete
            </button>
            <button
              onClick={() => handleIncreaseQuantity(cartItem.product._id)}
              className='btn btn-primary'
            >
              +
            </button>
            <button
              onClick={() => handleDecreaseQuantity(cartItem.product._id)}
              className='btn btn-primary'
            >
              -
            </button>
            <div className='justify-end card-actions'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
