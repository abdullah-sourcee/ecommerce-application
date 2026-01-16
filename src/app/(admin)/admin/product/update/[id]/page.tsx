import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { getProductsRequestId } from '@/lib/queries';

import UpdateProductScreen from '@/components/screens/UpdateProduct';

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  // const token = cookieStore.get('token');
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value ?? null,
    staleTime: 3600000,
  });
  const token = queryClient.getQueryData<string | undefined>(['token']);

  await queryClient.fetchQuery({
    queryKey: ['products', id, token],
    queryFn: () => getProductsRequestId(id, token),
    staleTime: 3600000,
  });
  const products = queryClient.getQueryData<[]>(['products', id, token]);
  // console.log('products are::', products);

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <UpdateProductScreen />;
    </HydrationBoundary>
  );
}
