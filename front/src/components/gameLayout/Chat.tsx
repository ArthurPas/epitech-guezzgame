import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { cn } from '@/lib/utils';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

export type ChatProps = {
    className?: string;
};

export const Chat = (className: ChatProps) => {
    let currentPlayerUsername = '';
    if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        currentPlayerUsername = jwtDecoded.sub || 'anonymous';
    }

    const { chatMessages, sendChatMessage } = useChatWebSocket();
    const { register, handleSubmit, reset } = useForm<{ message: string }>();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const onSubmit = (data: { message: string }) => {
        if (data.message.trim()) {
            sendChatMessage(data.message);
            reset();
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    let previousUsername = '';

    return (
        <Card
            className={cn(
                'hidden md:flex flex-col h-full lg:h-[58vh] xl:h-[58vh] 3xl:h-[60vh] bg-purple-300 rounded-[0.9rem] w-[70%] lg:w-auto priority-rounded relative lg:max-w-[16vw]',
                className
            )}
        >
            <CardTitle className="px-3 py-3 font-medium">Chat</CardTitle>
            <ScrollArea className="flex-1 px-3 w-full rounded-lg overflow-y-auto max-h-[calc(100vh-150px)]">
                {chatMessages.map((messageData, index) => {
                    const shouldShowUsername = previousUsername !== messageData.username;
                    previousUsername = messageData.username;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col mb-1 ${currentPlayerUsername === messageData.username ? 'items-end' : 'items-start'}`}
                        >
                            {shouldShowUsername && (
                                <span
                                    className={`text-[12px] font-semibold text-purple-950 mx-[3px] leading-5 mb-[2px] ${
                                        currentPlayerUsername === messageData.username ? 'self-end' : 'self-start'
                                    }`}
                                >
                                    {messageData.username}
                                </span>
                            )}
                            <div
                                className={`inline-block p-1 ${
                                    currentPlayerUsername === messageData.username
                                        ? 'bg-purple-100/100 text-end'
                                        : 'bg-purple-100/100 text-start'
                                } px-2 rounded-lg text-[14px] break-words font-normal max-w-full 2xl:max-w-[80%]`}
                                style={{ wordBreak: 'break-word' }}
                            >
                                <span>{messageData.message}</span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef}></div>
            </ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full px-1 py-2">
                <Input
                    className="flex-1 ml-1 mr-[0.125rem] rounded-xl text-start"
                    placeholder="Ecrivez votre message"
                    {...register('message', { required: true })}
                />
                <Button type="submit" className="rounded-xl text-black font-bold mr-1 w-[1rem]" variant={'noShadow'}>
                    ✓
                </Button>
            </form>
        </Card>
    );
};
