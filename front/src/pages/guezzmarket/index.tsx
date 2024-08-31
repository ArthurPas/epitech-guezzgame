import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Button } from '@/components/ui/button';
import { useFetchItems, useBuyItem, useFetchInventory } from '@/hooks/market';
import { jwtDecode } from 'jwt-decode';
import { ItemType } from '@/interfaces/item';
import { useToast } from '@/components/ui/use-toast';
import { useGetMe } from '@/hooks/getMe';
import React, { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Index = () => {
    let userLogin = 'anonymous';
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [itemBought, setItemBought] = useState<ItemType | null>(null);
    if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(authToken);
        userLogin = jwtDecoded.sub || 'anonymous';
    }
    useEffect(() => {
        let token = undefined;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('authToken');
        }
        if (token) {
            setAuthToken(token);
        } else {
            console.error('No token found in localStorage');
        }
    }, []);

    const { data: items, isError, isPending } = useFetchItems();
    const { data: inventory, isError: errorInv, isPending: pendingInv, refetch: refetchInventory } = useFetchInventory();
    const { mutate } = useBuyItem();
    const { toast } = useToast();
    const { data: user, isLoading: userLoading, isError: userError, refetch: refetchUser } = useGetMe(authToken);

    const onBuyPress = async (item: ItemType) => {
        const itemBuy = {
            id: item.id,
            login: userLogin
        };
        console.log(itemBuy);
        await mutate(itemBuy, {
            onSuccess: () => {
                refetchInventory();
                refetchUser();
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };
    if (isPending || pendingInv || userLoading) {
        return <div>Loading...</div>;
    }
    if (isError || errorInv || userError) {
        return <div>Error</div>;
    }

    const guezzItems: ItemType[] = [
        {
            id: -1,
            name: 'Merguez blez',
            description: '',
            picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-dqs0wSDGv0beRARC8aPGtise7KwxCHIxg&s',
            price: 1,
            rarity: 1
        },
        {
            id: -1,
            name: 'Merguez à lez',
            description: '',
            picture: 'https://www.madrange.fr/wp-content/uploads/2019/04/veritables-merguez-2022.png',
            price: 1,
            rarity: 1
        },
        {
            id: -1,
            name: 'Comment ca pas mal les ...',
            description: '',
            picture: 'https://cache.marieclaire.fr/data/photo/w1200_h630_c17/69/conserver-des-merguez.jpg',
            price: 1,
            rarity: 1
        },
        {
            id: -1,
            name: 'Merguez reunionez',
            description: '',
            picture:
                'https://www.thespruceeats.com/thmb/qf8U_5wP5jYf4GZEVOgBBYmQhIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-merguez-sausage-recipe-2394324-e7ec95b177e14480b52d27f7994dfec2.jpg',
            price: 1,
            rarity: 1
        },
        {
            id: -1,
            name: 'Merguez fournez',
            description: '',
            picture: 'https://img.cuisineaz.com/1200x675/2021/07/19/i179710-shutterstock-1761477731.jpeg',
            price: 1,
            rarity: 1
        },
        {
            id: -1,
            name: 'Merguez à la bonne francez',
            description: '',
            picture: 'https://www.socopa.fr/wp-content/uploads/2021/08/2023-11-20-SOC230230-JO-CAP-SAVEUR-MERGUEZ-X6.jpg',
            price: 1,
            rarity: 1
        }
    ];

    const shoppingItems: ItemType[] = [];
    items.forEach((item) => {
        const count = Math.floor((item.rarity / 100) * 10000);
        for (let i = 0; i < count; i++) {
            shoppingItems.push(item);
        }
    });

    guezzItems.forEach((item) => {
        for (let i = 0; i < 100; i++) {
            shoppingItems.push(item);
        }
    });
    const randomShoppingItems = shoppingItems.sort(() => Math.random() - 0.5);

    // console.log(randomShoppingItems.forEach((item) => console.log(item.name)));
    return (
        <div className="grid justify-center">
            <div className="flex flex-col items-center">
                <div>
                    <h1>GuezzMarket</h1>
                </div>

                <Carousel
                    className="w-full max-w-xs"
                    opts={{
                        loop: true,
                        watchDrag: false
                    }}
                    plugins={[AutoScroll({})]}
                >
                    <CarouselContent>
                        {randomShoppingItems.map((item, index) => (
                            <CarouselItem key={index} className="flex items-stretch">
                                <div className="p-2 flex-grow">
                                    <Card className="h-full">
                                        <CardHeader>
                                            <CardTitle className="h-10 text-center">{item.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center gap-4 p-4">
                                            <div className="">
                                                <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                            </div>
                                            <div className="flex-row items-center gap-2">
                                                <Drawer>
                                                    <DrawerTrigger asChild>
                                                        <Button
                                                            disabled={item.id === -1}
                                                            onClick={() => {
                                                                setItemBought(item);
                                                                onBuyPress(item);
                                                            }}
                                                            className="bg-amber-300 mt-3 bg-gradient-to-b from-amber-300 to-yellow-600 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none w-72  justify-center"
                                                        >
                                                            {item.id === -1 ? (
                                                                <span className="">Merguezzed</span>
                                                            ) : (
                                                                <p>
                                                                    <span className="text-3xl">{item.price}</span>
                                                                    <span className=""> GuezCoins</span>
                                                                </p>
                                                            )}
                                                        </Button>
                                                    </DrawerTrigger>
                                                    <DrawerContent className=' mx-auto w-full max-w-sm bg-mt-3 bg-gradient-to-b from-violet-500 to-purple-900 flex items-baseline gap-1 text-xl font-bold justify-center"'>
                                                        <DrawerHeader>
                                                            <DrawerTitle className="flex text-3xl justify-center text-amber-300 pt-6">
                                                                Belle affaire
                                                            </DrawerTitle>
                                                            <DrawerDescription>
                                                                <img className="object-fill" src={itemBought?.picture}></img>
                                                            </DrawerDescription>
                                                        </DrawerHeader>
                                                    </DrawerContent>
                                                </Drawer>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="p-2">
                    <h2 className="text-[64px] font-Bangers text-amber-300 text-cent">
                        <b>{user?.nbCoin}</b> $
                    </h2>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="p-2">
                    <h2>Ma collec'</h2>
                </div>
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                        dragFree: true
                    }}
                    className="w-full max-w-xs"
                    plugins={[
                        Autoplay({
                            delay: 3000
                        })
                    ]}
                >
                    <CarouselContent className="-ml-4">
                        {inventory.length > 0 &&
                            inventory.map((item, index) => (
                                <CarouselItem key={index} className="pl-4 flex items-stretch">
                                    <div className="p-2 flex-grow">
                                        <Card className="h-full">
                                            <CardHeader>
                                                <CardTitle className="h-10 text-center">{item.name}</CardTitle>
                                            </CardHeader>
                                            {item.rarity == 1 ? (
                                                <span className="bg-orange-200">
                                                    <CardContent className="bg-gradient-to-b from-purple-400 bg-yellow-100 flex flex-col items-center gap-4 p-4">
                                                        <div className="">
                                                            <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                                        </div>
                                                        <div className="bg-orange-200 flex-row items-center gap-2"></div>
                                                    </CardContent>
                                                </span>
                                            ) : item.rarity > 0.4 ? (
                                                <span className="bg-red-500">
                                                    <CardContent className="bg-gradient-to-b from-purple-400 bg-yellow-200 flex flex-col items-center gap-4 p-4">
                                                        <div className="">
                                                            <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                                        </div>
                                                        <div className="bg-orange-200 flex-row items-center gap-2"></div>
                                                    </CardContent>
                                                </span>
                                            ) : item.rarity > 0.2 ? (
                                                <span className="bg-fuchsia-500">
                                                    {' '}
                                                    <CardContent className="bg-gradient-to-b from-purple-400 bg-orange-300 flex flex-col items-center gap-4 p-4">
                                                        <div className="">
                                                            <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                                        </div>
                                                        <div className="bg-orange-200 flex-row items-center gap-2"></div>
                                                    </CardContent>
                                                </span>
                                            ) : item.rarity > 0.01 ? (
                                                <span className="bg-zinc-950">
                                                    {' '}
                                                    <CardContent className="bg-gradient-to-b from-purple-400 bg-red-400 flex flex-col items-center gap-4 p-4">
                                                        <div className="">
                                                            <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                                        </div>
                                                        <div className="bg-orange-200 flex-row items-center gap-2"></div>
                                                    </CardContent>
                                                </span>
                                            ) : (
                                                <span className="bg-amber-300">
                                                    {' '}
                                                    <CardContent className="bg-gradient-to-b from-purple-400 bg-red-800 flex flex-col items-center gap-4 p-4">
                                                        <div className="">
                                                            <img src={item.picture} className="h-72 w-72 rounded-lg" />
                                                        </div>
                                                        <div className="bg-orange-200 flex-row items-center gap-2"></div>
                                                    </CardContent>
                                                </span>
                                            )}
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default Index;
