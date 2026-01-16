'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

import { deleteProduct } from '@/lib/mutations';
import AdminPageClient from '@/components/AdminPageClient';
import { fetchProducts } from '@/lib/queries';

export default function EditProductScreen() {
  const { data: token } = useQuery({
    queryKey: ['token'],
    queryFn: () => null,
  });

  const { data, refetch } = useQuery({
    queryKey: ['products', token],
    queryFn: () => fetchProducts(token ?? undefined),
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!token) {
        throw new Error('Token is required');
      }
      return deleteProduct(productId, token);
    },
    onSuccess: () => {
      refetch();
      alert('Product deleted');
    },
    onError: (error: any) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  async function handleDeleteProduct(productId: string) {
    deleteProductMutation.mutate(productId);
  }

  // if (isLoading) {
  //   return <ShowLoader title='Products' />;
  // }

  // if (isError) {
  //   return <ShowError message={error?.message} />;
  // }

  // if (!data || data.length === 0) {
  //   return <EmptyPage message='items' />;
  // }

  return (
    <div>
      <div className='flex justify-center mb-3'>
        <h1>Product Page</h1>
      </div>
      <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
        <table className='table'>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: any, index: any) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td className='flex gap-1.5'>
                  <Trash
                    className='cursor-pointer'
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                  <Link href={`/admin/product/update/${product._id}`}>
                    <Pencil className='cursor-pointer' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
 
    <div>
      <div className='flex justify-center'>Home Page</div>
      {data.map((product) => (
        <div
          className='mt-6 card w-96 bg-base-100 card-lg shadow-sm'
          key={product._id}
        >
          <div className='card-body'>
            <h2 className='card-title'>{product.name}</h2>
            <p>{product.description}</p>
            <div className='justify-end card-actions'>
              <button className='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
 */
