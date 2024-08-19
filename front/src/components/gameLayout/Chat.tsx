import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';

export type ChatProps = {
    className?: string;
};

export const Chat = (className: ChatProps) => {
    const { chatMessages, sendChatMessage } = useChatWebSocket();
    const { register, handleSubmit, reset } = useForm<{ message: string }>();

    const onSubmit = (data: { message: string }) => {
        if (data.message.trim()) {
            sendChatMessage(data.message);
            reset();
        }
    };

    return (
        <Card
            className={cn(className, 'hidden md:block h-[100%] bg-purple-300 rounded-[0.9rem] w-[70%] lg:w-auto priority-rounded relative')}
        >
            <CardTitle className="px-3 py-3 font-medium">Chat</CardTitle>
            <div className="absolute top-10 bottom-16 overflow-auto p-3">
                {chatMessages.map((msg, index) => (
                    <div key={index} className="p-1 bg-gray-200 my-1 rounded-md">
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="absolute bottom-1 flex w-full">
                <Input
                    className="w-[90%] ml-1 mr-[0.125rem] rounded-[5rem]"
                    placeholder="Ecrivez votre message"
                    {...register('message', { required: true })}
                />
                <Button type="submit" className="rounded-[1.1rem] text-black font-bold mr-1 w-[1rem]" variant={'noShadow'}>
                    ✓
                </Button>
            </form>
        </Card>
    );
};
