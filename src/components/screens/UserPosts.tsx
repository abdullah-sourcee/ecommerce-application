'use client';
import PostCard from '@/components/PostCard';
import ShowLoader from '@/components/ShowLoader';
import { userPosts } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function UserPostsScreen() {
  // const data = props.post;

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

  // if (isError) {
  //   return <ShowError message={error?.message} />;
  // }
  // if (!data || data.length === 0) {
  //   return <EmptyPage message='posts' />;
  // }

  return (
    <div className='flex flex-col gap-6 items-center mt-8'>
      {data.map((timelineItem: any) => (
        <div key={timelineItem._id} className='flex flex-col gap-2'>
          <PostCard title={timelineItem.title} content={timelineItem.content} />
          <Link href={`/feed/timeline/post/edit/${timelineItem._id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}
