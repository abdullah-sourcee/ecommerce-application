import type { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import QueryProvider from '@/components/QueryProvider';

import Navbar from '@/components/Navbar';
import { siteConfig } from '@/constant/config';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const queryClient = new QueryClient();
  // const cookieStore = await cookies();

  // await queryClient.prefetchQuery({
  //   queryKey: ['Rtoken'],
  //   queryFn: () => cookieStore.get('token')?.value,
  // });

  // const token = queryClient.getQueryData(['token']);

  // const dehydratedState = dehydrate(queryClient);

  return (
    <html data-theme='light'>
      <body>
        <QueryProvider>
          {/* <HydrationBoundary state={dehydratedState}> */}
          <Navbar />
          {children}
          {/* </HydrationBoundary> */}
        </QueryProvider>
      </body>
    </html>
  );
}
