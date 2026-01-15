'use client';
// import { useQuery } from '@tanstack/react-query';

// import { timeline } from '@/lib/queries';

// import EmptyPage from '@/components/EmptyPage';
import PostCard from '@/components/PostCard';
import ShowLoader from '@/components/ShowLoader';
import { timeline } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';
// import ShowError from '@/components/ShowError';
// import ShowLoader from '@/components/ShowLoader';

export default function TimelinePage() {
  // const data = props.timelinePost;

  const { data: token } = useQuery<string | null | undefined>({
    queryKey: ['token'],
    queryFn: () => null,
    staleTime: Infinity,
  });

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['timeline'],
    queryFn: () => timeline(token ?? undefined),
  });

  if (isLoading) {
    return <ShowLoader title='timeline' />;
  }

  // if (isError) {
  //   return <ShowError message={error?.message} />;
  // }
  // if (!data || data.length === 0) {
  //   return <EmptyPage message='items' />;
  // }

  // console.log('data', data);
  //   console.log(typeof data);
  // console.log(data);

  return (
    <div className='flex flex-col gap-6 items-center mt-8'>
      {data.map((item: any) => (
        <PostCard title={item.title} content={item.content} key={item._id} />
      ))}
    </div>
  );
}
