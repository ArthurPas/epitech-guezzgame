import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AppProps } from 'next/app';
import '../styles/globals.css';

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
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
