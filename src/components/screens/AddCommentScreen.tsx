'use client';

import PostCard from '@/components/PostCard';
import { addComment } from '@/lib/mutations';
import { getComment, getPost } from '@/lib/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function AddCommentScreen() {
  const params = useParams();
  const postId = params.id as string;

  const [comment, setComment] = useState('');

  const { data: token } = useQuery({
    queryKey: ['token'],
    queryFn: () => null,
  });

  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  });

  const { data: commentData, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComment(postId, token ?? undefined),
  });
  // console.log('comment data from comment screnn is:', commentData);

  // console.log('post from comment page are:', post);
  const addCommentMutation = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error('Token is required');
      }
      return addComment({
        postId,
        comment,
        token,
      });
    },
    onSuccess: (data) => {
      alert(data.message);
      setComment('');
      refetch();
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleSubmit = () => {
    addCommentMutation.mutate();
  };

  return (
    <div className='flex flex-col gap-6 items-center mt-8'>
      {post && (
        <>
          {/* Section # 1 - Post Display */}
          <section>
            <div className='flex flex-col gap-2'>
              <PostCard
                title={post.data.post.title}
                content={post.data.post.content}
              />
            </div>
          </section>

          {/* Section # 2 - Add Comment */}
          <section>
            <label htmlFor='comment-input'>
              
              <input
                id='comment-input'
                placeholder='Enter your comment'
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                className='input input-bordered ml-2'
              />
            </label>
            {/* <button
              className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl'
              onClick={handleSubmit}
            >
              Add Comment
            </button> */}
          </section>

          {/* Section # 3 - Comments List */}
          <section>
            <ul className='bg-base-100 flex flex-col p-4 w-[550px] rounded-md border border-neutral-300 '>
              {commentData?.map((item: any) => (
                <li className='border' key={item._id}>{item.comment}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
