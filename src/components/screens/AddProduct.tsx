'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { addProduct } from '@/lib/mutations';

import AdminPageClient from '@/components/AdminPageClient';
import CustomDropdown from '@/components/CustomDropdown';

export default function AddProductScreen() {
  // const token = props.token;

  const { data: token } = useQuery({
    queryKey: ['token'],
    queryFn: () => null,
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
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

  const createProductMutation = useMutation({
    mutationFn: (userData: FormData) => {
      if (!token) {
        throw new Error('Token is required');
      }
      return addProduct(userData, token);
    },
    onSuccess: () => {
      alert('Product added');
      reset();
    },
    onError: (error: any) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  const handleAddProduct = (data: any) => {
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
    createProductMutation.mutate(formData);
  };

  const categoryOptions = [
    'men clothing',
    'women clothing',
    'women shoes',
    'men shoes',
    'toys',
    'football',
    'books',
    'personal computers',
    'jewelery',
    'electronics',
    'sports',
    'all products',
  ];

  return (
      <div className='flex items-center justify-center content-center flex-col'>
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          {/* Category */}
          {/* <div className='mt-3 flex gap-4 items-center'>
            <label className='w-32 text-left'>Category:</label>
            <input
              {...register('category', { required: 'Category is required' })}
              type='text'
              placeholder='Category'
              className='input'
            />
          </div> */}

          <CustomDropdown
            label='Category'
            id='category'
            options={categoryOptions}
            register={register('category')}
          />

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
              disabled={isSubmitting}
              type='submit'
              className='btn btn-wide mt-3 bg-blue-400'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
  );
}
