import '../app/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '@/components/header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  const isReload = navEntry?.type === 'reload';

  if (isReload && router.pathname !== '/') {
    router.replace('/');
  }
}, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;