'use client';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { updateProduct } from '@/lib/mutations';
import AdminPageClient from '@/components/AdminPageClient';
import { getProductsRequestId } from '@/lib/queries';

export default function UpdateProductScreen() {
  const params = useParams();
  const productId = params.id;

  const { data: token } = useQuery<string | null | undefined>({
    queryKey: ['token'],
    queryFn: () => null,
    staleTime: Infinity,
  });

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['products', productId, token],
    queryFn: () =>
      getProductsRequestId(productId as string, token ?? undefined),
    enabled: !!token,
  });

  // const data = props.product;
  // const token = props.token;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: data?.category || '',
      name: data?.name || '',
      description: data?.description || '',
      brand: data?.brand || '',
      price: data?.price?.toString() || '',
      stock: data?.stock?.toString() || '',
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
    mutationFn: (userData: FormData) => {
      if (!token) {
        throw new Error('Token is required');
      }
      return updateProduct({
        formData: userData,
        productId: String(productId),
        token,
      });
    },
    onSuccess: () => {
      alert('Product updated');
      reset();
      refetch();
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  // Handle loading/error states AFTER all hooks
  // if (isLoading) {
  //   return <ShowLoader title='Products' />;
  // }
  // if (isError) {
  //   return <ShowError message={error?.message} />;
  // }
  // if (!data || data.length === 0) {
  //   return <EmptyPage message='items' />;
  // }

  const handleUpdateProduct = (data: any) => {
    const productImageFile = data.productImages?.[0];

    const formData = new FormData();
    formData.append('category', data.category || '');
    formData.append('name', data.name || '');
    formData.append('description', data.description || '');
    formData.append('brand', data.brand || '');
    formData.append('price', data.price || '');
    formData.append('stock', data.stock || '');

    if (productImageFile) {
      formData.append('productImages', productImageFile);
    }

    updateProductMutation.mutate(formData);
  };

  return (
    <div className='flex items-center justify-center content-center flex-col'>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
            // onClick={handleUpdateProduct}
            disabled={isSubmitting}
            type='submit'
            className='btn btn-wide mt-3 bg-blue-400'
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
