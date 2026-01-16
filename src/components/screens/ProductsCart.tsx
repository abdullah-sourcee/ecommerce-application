'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { addProductToCart, deleteProductFromCart } from '@/lib/mutations';
import { userCart } from '@/lib/queries';

export default function CartPage() {
  const { data: token } = useQuery<string | null | undefined>({
    queryKey: ['token'],
    queryFn: () => null,
    staleTime: Infinity,
    enabled: false,
  });

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['cart', token],
    queryFn: () => userCart(token ?? undefined),
    /*Explanation: token ?? undefined converts null to undefined, 
    matching userCart's parameter type. The ?? operator only converts 
    null/undefined, so string values pass through unchanged. */
  });

  const deleteFromCartProductMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!token) {
        throw new Error('Token is required');
      }
      return deleteProductFromCart(productId, token);
    },

    onSuccess: () => {
      refetch();
      alert('Product deleted');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({
      productId,
      decrease,
    }: {
      productId: string;
      decrease: boolean;
    }) => {
      if (!token) {
        throw new Error('Token is required');
      }
      return addProductToCart(productId, token, decrease);
    },

    // addProductToCart(productId, token, decrease),

    onSuccess: () => {
      refetch();
      // alert('Product Updated');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  function handleDeleteProduct(productId: string) {
    deleteFromCartProductMutation.mutate(productId);
  }

  function handleIncreaseQuantity(productId: string) {
    updateCartMutation.mutate({ productId, decrease: false });
  }

  function handleDecreaseQuantity(productId: string) {
    updateCartMutation.mutate({ productId, decrease: true });
  }
  /*

if (isLoading) {
  return <ShowLoader title='products' />;
}

if (isError) {
  return (
    <div className='flex justify-center items-center min-h-screen text-error'>
      Error: {error?.message || 'Something went wrong'}
    </div>
  );
}
if (!data || data.length === 0) {
  return <EmptyPage message='items' />;
}
*/

  return (
    <div>
      {data?.map((cartItem: any) => (
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
      <h2>
        Total: PKR{' '}
        {data?.reduce(
          (total: number, cartItem: any) =>
            total + cartItem.product.price * cartItem.quantity,
          0
        )}
      </h2>
      {/* .reduce() method:
        => it runs on every element of an array ressulting in a single output value. 
         => It takes 2 main arguments:
           1. A Callback function 2. An initial value: 0
        */}
    </div>
  );
}
