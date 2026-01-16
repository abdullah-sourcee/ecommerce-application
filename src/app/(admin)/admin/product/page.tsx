import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { fetchProducts } from '@/lib/queries';

import EditProductScreen from '@/components/screens/EditProduct';

export default async function EditProductPage() {
  const cookieStore = await cookies();
  // const token = cookieStore.get('token');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value ?? null,
    staleTime: 3600000,
  });

  const token = queryClient.getQueryData<string | undefined>(['token']);

  await queryClient.prefetchQuery({
    queryKey: ['products', token],
    queryFn: () => fetchProducts(token),
    staleTime: 3600000,
  });

  const products = queryClient.getQueryData<[]>(['products', token]);

  if (!products || products.length === 0) {
    return (
      <div className='px-16 text-center'>
        <h1>No products found</h1>
      </div>
    );
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <EditProductScreen />
    </HydrationBoundary>
  );
}
