import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

export type ChatProps = {
    className?: string;
};

export const Chat = (className: ChatProps) => {
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

    return (
        <Card
            className={cn(className, 'hidden md:block h-[100%] bg-purple-300 rounded-[0.9rem] w-[70%] lg:w-auto priority-rounded relative')}
        >
            <CardTitle className="px-3 py-3 font-medium">Chat</CardTitle>
            <ScrollArea className="h-[15rem] 3xl:h-[15rem] px-3 w-full rounded-lg">
                {chatMessages.map((message, index) => (
                    <div className="-mt-[2px]">
                        <span className="text-[12px] font-bold ml-[3px]">Arthur</span>
                        <div
                            key={index}
                            className="p-1 bg-purple-100 mb-1 px-2 rounded-lg text-[14px] max-w-[206px] break-words font-normal"
                        >
                            <span>{message}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-1 flex w-full px-1">
                <Input
                    className="w-[90%] ml-1 mr-[0.125rem] rounded-xl text-start"
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
