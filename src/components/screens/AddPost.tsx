'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { addPost } from '@/lib/mutations';

import CustomDropdown from '@/components/CustomDropdown';
// import { cookies } from 'next/headers';

export default function AddPostScreen() {
  // const cookieStore = await cookies();
  // const token = cookieStore.get('token')?.value;
  const { data: token } = useQuery<string | null>({
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
      title: '',
      content: '',
      postImage: undefined,
    },
  });

  const addPostMutation = useMutation({
    mutationFn: (userData: FormData) => {
      if (!token) {
        throw new Error('No token found');
      }
      return addPost(userData, token);
    },
    onSuccess: (data) => {
      console.log(data);
      alert(data.message);
    },
    // onError: (error) => alert(`Error: ${error.response?.data.message}`),
  });

  const onSubmit = (data: any) => {
    const productImageFile = data.postImage?.[0];

    const formData = new FormData();
    formData.append('category', data.category || '');
    formData.append('title', data.title || '');
    formData.append('content', data.content || '');
    if (productImageFile) {
      formData.append('postImage', productImageFile);
    }
    addPostMutation.mutate(formData);
    reset();
  };

  const categoryOptions = [
    'coding',
    'sports',
    'reactjs',
    'nextjs',
    'nodejs',
    'typescript',
    'devapp',
    'blockchain',
    'social',
  ];

  return (
    <form
      className='flex justify-center items-center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='w-full max-w-md space-y-4'>
        {/* Category */}
        <CustomDropdown
          label='Category'
          id='category'
          options={categoryOptions}
          register={register('category')}
        />

        {/* Title */}
        <div className='flex flex-col items-center'>
          <label htmlFor='title' className='mb-2 font-medium'>
            Title:
          </label>
          <input
            id='title'
            {...register('title')}
            type='text'
            className='w-full max-w-xs input input-bordered'
          />
        </div>

        {/* Content */}
        <div className='flex flex-col items-center'>
          <label htmlFor='content' className='mb-2 font-medium'>
            Content:
          </label>
          <textarea
            id='content'
            {...register('content')}
            className='w-full max-w-xs textarea textarea-bordered'
            rows={4}
          />
        </div>

        {/* Image */}
        <div className='flex flex-col items-center'>
          <label htmlFor='postImage' className='mb-2 font-medium'>
            Post Image:
          </label>
          <input
            id='postImage'
            type='file'
            className='w-full max-w-xs file-input file-input-bordered'
            {...register('postImage')}
          />
        </div>

        {/* Button */}
        <div className='flex justify-center mt-6'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='btn btn-primary w-full max-w-xs'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
