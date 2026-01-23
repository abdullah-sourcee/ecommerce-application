import AddCommentScreen from '@/components/screens/AddCommentScreen';
import { addComment } from '@/lib/mutations';
import { getComment, getPost } from '@/lib/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { data } from 'react-router-dom';

export default async function AddCommentPage({
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

  await queryClient.prefetchQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComment(postId, token),
  });

  const data = queryClient.getQueryData<string | undefined>([
    'comments',
    postId,
  ]);
  console.log('data is from server', data);

  const hydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={hydratedState}>
      <AddCommentScreen />
    </HydrationBoundary>
  );
}
