import AddProductScreen from '@/components/screens/AddProduct';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function AddProductPage() {
  const cookieStore = await cookies();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value,
    staleTime: 3600000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AddProductScreen />;
    </HydrationBoundary>
  );
}
