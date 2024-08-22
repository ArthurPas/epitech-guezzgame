import { useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StompSessionProvider } from 'react-stomp-hooks';

import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/router';
import { DiamondWall } from '@/components/layout/diamond';
import { Header } from '@/components/Header/Header';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isGameplayRoute = router.pathname === '/gameplay';
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30 * 1000,
                        retry: false
                    }
                }
            })
    );

    return (
        <StompSessionProvider url="http://localhost:8080/ws-endpoint">
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    {!isGameplayRoute && <Header />}
                    <Component {...pageProps} />
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                    {!isGameplayRoute && <DiamondWall />}

                    <Toaster />
                </HydrationBoundary>
            </QueryClientProvider>
        </StompSessionProvider>
    );
}
