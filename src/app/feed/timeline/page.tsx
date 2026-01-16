import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { timeline } from '@/lib/queries';

import TimelinePage from '@/components/screens/Timeline';

export default async function Page() {
  const cookieStore = await cookies();
  // const token = cookieStore.get('token');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value,
    staleTime: 3600000,
  });

  const token = queryClient.getQueryData<string | undefined>(['token']);

  await queryClient.prefetchQuery({
    queryKey: ['timeline'],
    queryFn: () => timeline(token),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TimelinePage />;
    </HydrationBoundary>
  );
}
