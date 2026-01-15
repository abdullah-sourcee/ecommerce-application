import ProductsPage from '@/components/screens/ProductsPage';
import { publicProducts } from '@/lib/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function ProductsScreen() {
  const cookieStore = await cookies();
  // const token = cookieStore.get('token');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['token'],
    queryFn: () => cookieStore.get('token')?.value,
    staleTime: 3600000,
  });

  const token = queryClient.getQueryData<string | undefined>(['token']);

  if (!token) {
    return (
      <div className='px-16 text-center'>
        <h1>Please log in to view your cart</h1>
      </div>
    );
  }
  await queryClient.prefetchQuery({
    queryKey: ['products', '', token],
    queryFn: () => publicProducts('', token),
  });

  const products = queryClient.getQueryData<[]>(['products', '', token]);

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
      <div className='px-16'>
        <div className='flex justify-center'>
          <h1>All Products Page</h1>
        </div>
        <ProductsPage />
      </div>
    </HydrationBoundary>
  );
}
