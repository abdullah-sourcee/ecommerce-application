'use client';

import { updateProduct } from '@/lib/mutations';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { getProductsRequestId } from '@/lib/queries';
import { useEffect } from 'react';
import { Trash } from 'lucide-react';
import AdminPageClient from '@/components/AdminPageClient';

export default function UpdateProduct() {
  const params = useParams();
  const productId = params.id;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductsRequestId(productId),
  });

  const {
    register,
    watch,
    handleSubmit,
    reset, // Add reset method
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: '',
      name: '',
      description: '',
      brand: '',
      price: '',
      stock: '',
      productImages: undefined,
    },
  });

  // Reset form when data loads
  useEffect(() => {
    if (data) {
      reset({
        category: data.category || '',
        name: data.name || '',
        description: data.description || '',
        brand: data.brand || '',
        price: data.price?.toString() || '',
        stock: data.stock?.toString() || '',
        productImages: undefined,
      });
    }
  }, [data, reset]);

  const updateProductMutation = useMutation({
    mutationFn: (userData) =>
      updateProduct({ formData: userData, productId: productId }),
    onSuccess: () => {
      alert('Product updated');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  // Handle loading/error states AFTER all hooks
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error:{error.message}</div>;
  }

  // console.log('Data is:', data);

  const handleUpdateProduct = async (e) => {
    try {
      e.preventDefault();
      const productImageFile = watch().productImages?.[0];
      const formData = new FormData();

      formData.append('category', watch().category || '');
      formData.append('name', watch().name || '');
      formData.append('description', watch().description || '');
      formData.append('brand', watch().brand || '');
      formData.append('price', watch().price || '');
      formData.append('stock', watch().stock || '');

      if (productImageFile) {
        formData.append('productImages', productImageFile);
      }
      console.log('Data', watch());
      updateProductMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminPageClient>
      <div className='flex items-center justify-center content-center flex-col'>
        <h1>Update Product</h1>
        <form method='post'>
          {/* Category */}
          <div className='mt-3 flex gap-4 items-center'>
            <label className='w-32 text-left'>Category:</label>
            <input
              {...register('category', { required: 'Category is required' })}
              type='text'
              placeholder='Category'
              className='input'
            />
          </div>

          {/* name */}
          <div className='mt-3 flex gap-4 items-center'>
            {' '}
            <label className='w-32 text-left'>Product Name:</label>
            <input
              {...register('name', { required: 'Product Name is required' })}
              type='text'
              placeholder='Product Name'
              className='input'
            />
          </div>

          {/* Description */}
          <div className='mt-3 flex gap-4 items-center'>
            {' '}
            <label className='w-32 text-left'>Product Desc.:</label>{' '}
            <input
              {...register('description', {
                required: 'Product Description is required',
              })}
              type='text'
              placeholder='Product Description'
              className='input'
            />
          </div>

          {/* brand */}

          <div className='mt-3 flex gap-4 items-center'>
            {' '}
            <label className='w-32 text-left'>Product Brand:</label>{' '}
            <input
              {...register('brand', { required: 'Product Brand is required' })}
              type='text'
              placeholder='Product Brand'
              className='input'
            />
          </div>

          {/* price */}
          <div className='mt-3 flex gap-4 items-center'>
            {' '}
            <label className='w-32 text-left'>Product Price:</label>{' '}
            <input
              {...register('price', { required: 'Product Price is required' })}
              type='number'
              placeholder='Product Price'
              className='input'
            />
          </div>

          {/* stock */}
          <div className='mt-3 flex gap-4 items-center'>
            {' '}
            <label className='w-32 text-left'>Product Stock:</label>{' '}
            <input
              {...register('stock', { required: 'Product Stock is required' })}
              type='text'
              placeholder='Product Stock'
              className='input'
            />
          </div>

          {/*Product Image */}
          <div className='mt-3 flex gap-4 items-center'>
            <label className='w-32 text-left'>Product Image:</label>{' '}
            <input
              {...register('productImages')}
              type='file'
              className='file-input'
            />
          </div>
          <div className='mt-3 flex items-center justify-center'>
            <button
              onClick={handleUpdateProduct}
              disabled={isSubmitting}
              type='submit'
              className='btn btn-wide mt-3 bg-blue-400'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </AdminPageClient>
  );
}
