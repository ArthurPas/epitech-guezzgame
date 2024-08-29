import * as React from 'react';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import AutoHeight from 'embla-carousel-auto-height';
import { useFetchItems } from '@/hooks/market';
const Index = () => {
    const { data: items, isError, isPending } = useFetchItems();
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Carousel
            className="w-full max-w-xs"
            opts={{
                loop: true
            }}
            plugins={[AutoScroll({})]}
        >
            <CarouselContent>
                {items.map((item, index) => (
                    <CarouselItem key={index} className="flex items-stretch">
                        <div className="p-2 flex-grow">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="h-10">{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4 p-4">
                                    <div className="">
                                        <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                    </div>
                                    <div className="flex-row items-center gap-2">
                                        <div className="">
                                            <div className="bg-amber-300 mt-3 bg-gradient-to-b from-amber-300 to-yellow-600 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none w-72  justify-center">
                                                <span className="font-Bangers">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default Index;
