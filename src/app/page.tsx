'use client';

import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';

export default function HomePage() {
  return (
    <main className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold mb-8'>Welcome</h1>
        <div className='flex gap-4'>
          <ButtonLink href='/login'>Login</ButtonLink>
          <ButtonLink href='/signup'>Sign Up</ButtonLink>
          <ButtonLink href='/admin/product/add'>Add Products</ButtonLink>
          <ButtonLink href='/products'>Show Products</ButtonLink>
        </div>
      </div>
    </main>
  );
}
