import UserPostsScreen from '@/components/screens/UserPosts';
import { userPosts } from '@/lib/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function UserPostsPage() {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  // cookieStore.get('token');

  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value,
  });

  const token = queryClient.getQueryData<string | undefined>(['token']);

  await queryClient.prefetchQuery({
    queryKey: ['timeline', token],
    queryFn: () => userPosts(token),
  });

  const posts = queryClient.getQueryData<[]>(['timeline', token]);

  if (!posts || posts.length === 0) {
    return (
      <div className='px-16 text-center'>
        <h1>No posts found</h1>
      </div>
    );
  }
  const hydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={hydratedState}>
      <UserPostsScreen />
    </HydrationBoundary>
  );
}
