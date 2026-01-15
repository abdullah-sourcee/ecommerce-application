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
  // const role = JSON.parse(localStorage.getItem('user') || '{}')?.role;

  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setRole(user?.role);
  }, []);

  useEffect(() => {
    // console.log('role', role)
    if ( role && role !== 'admin') {
      router.push('/unauthorized');
    }
    setIsLoading(false);
  }, [role, router]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
