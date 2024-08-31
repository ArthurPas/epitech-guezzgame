import * as React from 'react';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Button } from '@/components/ui/button';
import { useFetchItems, useBuyItem, useFetchInventory } from '@/hooks/market';
import { jwtDecode } from 'jwt-decode';
import { ItemType } from '@/interfaces/item';
import { useToast } from '@/components/ui/use-toast';
import Autoplay from 'embla-carousel-autoplay';
const Index = () => {
    const { data: items, isError, isPending } = useFetchItems();
    const { data: inventory, isError: errorInv, isPending: pendingInv, refetch: refetchInventory } = useFetchInventory();
    const { mutate } = useBuyItem();
    const { toast } = useToast();

    let userLogin = 'anonymous';
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        userLogin = jwtDecoded.sub || 'anonymous';
    }
    const onBuyPress = async (item: ItemType) => {
        const itemBuy = {
            id: item.id,
            login: userLogin
        };
        console.log(item);
        await mutate(itemBuy, {
            onSuccess: (response) => {
                toast({ description: 'Au plaisir de faire affaire' });
                refetchInventory();
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };
    if (isPending || pendingInv) {
        return <div>Loading...</div>;
    }
    if (isError || errorInv) {
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
            name: 'Merguez comment ca pas mal les ...',
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
                                                <Button
                                                    disabled={item.id === -1}
                                                    onClick={() => onBuyPress(item)}
                                                    className="bg-amber-300 mt-3 bg-gradient-to-b from-amber-300 to-yellow-600 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none w-72  justify-center"
                                                >
                                                    {item.id === -1 ? (
                                                        <span className="font-Bangers">Merguezzed</span>
                                                    ) : (
                                                        <span className="font-Bangers">Acheter pour {item.price}</span>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col items-center">
                <div className="p-2">
                    <h2>Ma collec'</h2>
                </div>
                <Carousel
                    className="w-full max-w-xs"
                    plugins={[
                        Autoplay({
                            delay: 5000
                        })
                    ]}
                >
                    <CarouselContent>
                        {inventory.length > 0 &&
                            inventory.map((item, index) => (
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
                                                    <Button className="bg-amber-300 mt-3 bg-gradient-to-b from-amber-300 to-yellow-600 flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none w-72  justify-center">
                                                        <span className="font-Bangers">{item.rarity} </span>
                                                        {/* Ajouter effet de rareté */}
                                                    </Button>
                                                </div>
                                            </CardContent>
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
