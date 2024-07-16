import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type ChatProps = {
    className?: string;
};

export const Chat = (className: ChatProps) => {
    return (
        <Card
            className={cn(className, 'hidden md:block h-[100%] bg-purple-300 rounded-[0.9rem] w-[70%] lg:w-auto priority-rounded relative')}
        >
            <CardTitle className="px-3 py-3 font-medium">Chat</CardTitle>
            <div className="absolute bottom-1 flex">
                <Input className="w-[90%] ml-1 mr-[0.125rem] rounded-[5rem]" placeholder="Ecrivez votre message" />
                <Button className="rounded-[1.1rem] mr-1 w-[1rem]" variant={'noShadow'}>
                    ✓
                </Button>
            </div>
        </Card>
    );
};
