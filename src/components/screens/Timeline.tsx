'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { listOfPosts, timeline } from '@/lib/queries';

import PostCard from '@/components/PostCard';
import ShowLoader from '@/components/ShowLoader';

export default function TimelinePage() {
  // const data = props.timelinePost;

  const [search, setSearch] = useState('');
  const { data: searchedData, refetch } = useQuery({
    queryKey: ['searched', search],
    queryFn: () => listOfPosts(search),
  });
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

  function onSearch() {
    refetch();
  }
  const displayData =
    searchedData && searchedData.length > 0 ? searchedData : data;
  return (
    <div className='flex flex-col gap-6 items-center mt-8'>
      <label>
        Search:
        <input
          type='text'
          placeholder='e.g. food'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={onSearch} className='btn'>
          Search
        </button>
      </label>

      {displayData.map((item: any) => (
        <PostCard title={item.title} content={item.content} key={item._id} />
      ))}
    </div>
  );
}
