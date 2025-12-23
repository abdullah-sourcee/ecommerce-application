'use client';
import AdminPageClient from '@/components/AdminPageClient';
import { deleteProduct } from '@/lib/mutations';
import { fetchProducts } from '@/lib/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      refetch();
      alert('Product deleted');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  async function handleDeleteProduct(productId) {
    deleteProductMutation.mutate(productId);
  }

  if (isLoading) {
    return <div>Loading Products...</div>;
  }

  if (isError) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <AdminPageClient>
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
              {data.map((product, index) => (
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
                    <Link href={`/product/update/${product._id}`}>
                      <Pencil className='cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageClient>
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
