import { Inter } from 'next/font/google';
import LoginPage from '@/pages/login';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className={`${inter.className}`}>
            <LoginPage />
        </main>
    );
}
