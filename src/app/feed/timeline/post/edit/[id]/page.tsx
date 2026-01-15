import UpdatePost from '@/components/screens/UpdateTimelinePost';
import { getPost } from '@/lib/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function UpdateTimelinePostById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => token,
  });
  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  });

  const hydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={hydratedState}>
      <UpdatePost />
    </HydrationBoundary>
  );
}
