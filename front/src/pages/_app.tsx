import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StompSessionProvider } from 'react-stomp-hooks';

import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

export default function App({ Component, pageProps }: AppProps) {
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
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Toaster />
                </HydrationBoundary>
            </QueryClientProvider>
        </StompSessionProvider>
    );
}
