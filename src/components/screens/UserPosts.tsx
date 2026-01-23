'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { userPosts } from '@/lib/queries';

import PostCard from '@/components/PostCard';
import ShowLoader from '@/components/ShowLoader';

export default function UserPostsScreen() {
  const { data: token } = useQuery<string | null | undefined>({
    queryKey: ['token'],
    queryFn: () => null,
    staleTime: Infinity,
  });
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['timeline', token],
    queryFn: () => userPosts(token ?? undefined),
  });

  if (isLoading) {
    return <ShowLoader title='timeline' />;
  }

  return (
    <div className='flex flex-col gap-6 items-center mt-8'>
      {data.map((timelineItem: any) => (
        <div key={timelineItem._id} className='flex flex-col gap-2'>
          <Link href={`/feed/timeline/post/${timelineItem._id}`}>
            <PostCard
              title={timelineItem.title}
              content={timelineItem.content}
            />
          </Link>
          <Link href={`/feed/timeline/post/edit/${timelineItem._id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}
