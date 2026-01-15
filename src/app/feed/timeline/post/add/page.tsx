import AddPostScreen from '@/components/screens/AddPost';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function AddPostPage() {
  const cookieStore = await cookies();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value,
    staleTime: 3600000, // 1 hour in miliseconds=> 1*60*60*1000
  });
  const token = queryClient.getQueryData<string | undefined>(['token']);

  if (!token) {
    return (
      <div className='px-16 text-center'>
        <h1>Please log in to view your cart</h1>
      </div>
    );
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <AddPostScreen />
    </HydrationBoundary>
  );
}
