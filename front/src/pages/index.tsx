import { Inter } from 'next/font/google';
import LoginPage from '@/pages/login';
import { useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { PublishToAllUsersComponent, PublishToMeComponent } from '@/components/PublishComponent';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const [message, setMessage] = useState('');
    // useSubscription('/topic/reply', (message) => {
    //     setMessage(message.body);
    // });
    useSubscription('/user/queue/reply', (message) => {
        setMessage(message.body);
    });

    return (
        <main className={`${inter.className}`}>
            <LoginPage />
            {/* <div>The broadcast message from websocket broker is {message}</div> */}
            <div> The message from websocket broker for myself is {message}</div>
            {/* <PublishToAllUsersComponent /> */}
            <PublishToMeComponent />
        </main>
    );
}