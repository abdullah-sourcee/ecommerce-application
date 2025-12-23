'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const role = JSON.parse(localStorage.getItem('user') || '{}')?.role;

  useEffect(() => {
    setIsLoading(false);
    if (role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [role, router]);

  if (!isLoading) {
    return null;
  }

  return <>{children}</>;
}
