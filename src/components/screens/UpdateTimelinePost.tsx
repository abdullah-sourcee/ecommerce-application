'use client';
import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { updatePost } from '@/lib/mutations';
import { getPost } from '@/lib/queries';

export default function UpdatePost() {
  const params = useParams();
  const postId = params.id as string;

  const { data: token } = useQuery({
    queryKey: ['token'],
    queryFn: () => null,
  });

  const { data: posts } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: posts?.data?.post?.category || '',
      title: posts?.data?.post?.title || '',
      content: posts?.data?.post?.content || '',
      postImage: undefined,
    },
  });

  useEffect(() => {
    if (posts?.data?.post) {
      reset({
        category: posts.data.post.category || '',
        title: posts.data.post.title || '',
        content: posts.data.post.content || '',
        postImage: undefined,
      });
    }
  }, [posts, reset]);

  const updatePostMutation = useMutation({
    mutationFn: (userData: FormData) => {
      if (!token) throw new Error('Authentication token not found');
      return updatePost({
        formData: userData,
        postId: String(postId),
        token: token,
      });
    },
    onSuccess: () => {
      alert('Post updated');
      reset();
    },
    onError: (error: any) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  // if (isLoading) {
  //   return <ShowLoader title='post' />;
  // }
  // if (isError) {
  //   return <ShowError message={error?.message} />;
  // }
  // if (!data || data.length === 0) {
  //   return <EmptyPage message='items' />;
  // }

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

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('category', data.category || '');
    formData.append('title', data.title || '');
    formData.append('content', data.content || '');
    updatePostMutation.mutate(formData);
  };

  return (
    <div className='flex items-center justify-center content-center flex-col'>
      <div>
        <h1>Update Post Page</h1>
      </div>
      <form
        className='flex justify-center items-center flex-col'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* category */}
        <div className='flex flex-col items-center'>
          <label htmlFor='category' className='mb-2 font-medium'>
            Category:
          </label>
          <select
            id='category'
            {...register('category')}
            className='w-full max-w-xs select select-bordered'
          >
            {categoryOptions.map((categoryOption, index) => (
              <option key={index}>{categoryOption}</option>
            ))}
          </select>
        </div>

        {/* title */}
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

        <div>
          <button
            disabled={isSubmitting}
            type='submit'
            className='btn btn-wide mt-3 bg-blue-400'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
