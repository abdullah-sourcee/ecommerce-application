'use client';

import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo/Home Link */}
          <div className='flex items-center'>
            <ButtonLink href='/' variant='ghost' className='text-xl font-bold'>
              Home
            </ButtonLink>
          </div>

          {/* Navigation Links */}
          <div className='flex items-center gap-2'>
            <ButtonLink
              href='/login'
              variant={pathname === '/login' ? 'primary' : 'outline'}
              size='sm'
            >
              Login
            </ButtonLink>
            <ButtonLink
              href='/signup'
              variant={pathname === '/signup' ? 'primary' : 'outline'}
              size='sm'
            >
              Sign Up
            </ButtonLink>
            <ButtonLink
              href='/admin/product/add'
              variant={
                pathname === '/admin/product/add' ? 'primary' : 'outline'
              }
              size='sm'
            >
              Add Products
            </ButtonLink>
            <ButtonLink
              href='/products'
              variant={pathname === '/products' ? 'primary' : 'outline'}
              size='sm'
            >
              Show Products
            </ButtonLink>
            <ButtonLink
              href='/admin/product'
              variant={pathname === '/admin/product' ? 'primary' : 'outline'}
              size='sm'
            >
              Edit Products
            </ButtonLink>

            <ButtonLink href='/user/cart'>
              <div className='flex gap-2'>
                <ShoppingCart />
                Cart
              </div>
            </ButtonLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
