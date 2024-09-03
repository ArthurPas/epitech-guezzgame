import { useGetBets, usePlaceBet } from '@/hooks/bet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import { BetRequestType, BetType } from '@/interfaces/bet';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useGetMe } from '@/hooks/getMe';
export type GuessGameProps = {};

export const Bets = () => {
    const [betAmount, setbetAmount] = React.useState(10);
    const [authToken, setAuthToken] = useState<string | null>(null);
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
    const { data: user, isLoading: userLoading, isError: userError, error: userErrorDetails, refetch } = useGetMe(authToken);
    const { data, isError, isPending } = useGetBets();

    const { mutate } = usePlaceBet();
    const onPlaceBet = async (betData: BetRequestType) => {
        await mutate(betData, {
            onSuccess: () => {
                toast({ description: 'Que la chance soit avec toi' });
                setbetAmount(0);
                refetch();
            },
            onError: (error: Error) => {
                toast({ description: error.message });
            }
        });
    };
    function onClick(adjustment: number) {
        setbetAmount(Math.max(0, Math.min(user?.nbCoin ?? 0, betAmount + adjustment)));
    }

    if (isPending) {
        return <span>Conseil de gagnant : Ne pariez que ce que vous êtes prêt à perdre !</span>;
    }

    if (isError) {
        return <span>Oups ...</span>;
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-amber-400 text-[64px] font-Bangers mb-[3rem]">Guezz GAMBLE</h1>
            <div className="flex justify-center flex-col">
                <Carousel>
                    <CarouselContent>
                        {data.map((bet: BetType) => (
                            <CarouselItem className="basis-1/2">
                                <Card key={bet.id} className="rounded-xl">
                                    <CardHeader>
                                        <CardTitle>{bet.title}</CardTitle>
                                        <CardDescription>
                                            Créé le:{' '}
                                            {new Date(bet.createdAt).toLocaleString(undefined, {
                                                day: 'numeric',
                                                month: 'long',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-row items-center justify-center">
                                            {bet.betOptions.map((option) => (
                                                <div key={option.id} className="flex flex-col items-center justify-center">
                                                    <p className={'text-[32px] font-Bangers p-3'}>{option.description}</p>

                                                    {/*<p>Gagnant: {option.isWin ? "Oui" : "Non"}</p>*/}
                                                    {/*<p>Nombre de paris: {option.gamblerBets.length}</p>*/}
                                                    <Drawer>
                                                        <DrawerTrigger>
                                                            <Button variant={'default'} color={'green'}>
                                                                <p className={'text-[20px] font-Bangers'}>
                                                                    <b>{option.ods}</b>
                                                                </p>
                                                            </Button>
                                                        </DrawerTrigger>
                                                        <DrawerContent className={'flex items-center justify-center'}>
                                                            <DrawerHeader>
                                                                <DrawerTitle>
                                                                    Tu penses que c'est {option.description} qui va te rendre riche ?{' '}
                                                                </DrawerTitle>
                                                                <DrawerDescription>
                                                                    On verra ca le{' '}
                                                                    {new Date(bet.endTime).toLocaleDateString(undefined, {
                                                                        day: 'numeric',
                                                                        month: 'long'
                                                                    })}
                                                                </DrawerDescription>
                                                            </DrawerHeader>
                                                            <div className="flex items-center justify-center">
                                                                <Button
                                                                    variant="reverse"
                                                                    size="icon"
                                                                    className="h-8 w-8 shrink-0 rounded-full"
                                                                    onClick={() => onClick(-10)}
                                                                    disabled={betAmount <= 10}
                                                                >
                                                                    <p className="text-3xl">-</p>
                                                                    <span className="sr-only">Decrease</span>
                                                                </Button>
                                                                <div className="flex-1 text-center">
                                                                    <p>T'es prêt à mettre combien ?</p>
                                                                    <div className="text-5xl font-bold tracking-tighter">{betAmount}</div>
                                                                    <div>
                                                                        <p className={'p-2'}>
                                                                            Gain potentiel :{' '}
                                                                            <b className="text-3xl font-bold tracking-tighter">
                                                                                {Number((betAmount * option.ods).toFixed(2))}
                                                                            </b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="default"
                                                                    size="icon"
                                                                    className="h-8 w-8 shrink-0 rounded-full"
                                                                    onClick={() => onClick(10)}
                                                                    disabled={betAmount >= user?.nbCoin ?? 0}
                                                                >
                                                                    <p className="text-3xl">+</p>
                                                                    <span className="sr-only">Increase</span>
                                                                </Button>
                                                            </div>
                                                            <DrawerFooter>
                                                                <DrawerClose>
                                                                    <div className="flex justify-center space-x-4">
                                                                        <Button
                                                                            className="w-32"
                                                                            onClick={() =>
                                                                                onPlaceBet({
                                                                                    userId: 1,
                                                                                    betId: bet.id,
                                                                                    betOptionId: option.id,
                                                                                    betAmount: betAmount
                                                                                })
                                                                            }
                                                                        >
                                                                            Feu !
                                                                        </Button>
                                                                        <Button className="w-32" variant="neutral">
                                                                            Annuler
                                                                        </Button>
                                                                    </div>
                                                                </DrawerClose>
                                                            </DrawerFooter>
                                                        </DrawerContent>
                                                    </Drawer>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <p>
                                            Fin du pari le{' '}
                                            {new Date(bet.endTime).toLocaleString(undefined, {
                                                day: 'numeric',
                                                month: 'long',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </p>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-amber-400 text-[16px] font-Bangers">Ton solde</h1>
                    <p className="text-amber-400 text-[32px] font-Bangers">
                        <b>{user?.nbCoin}</b> coins
                    </p>
                    <p className="p-10">Jouer avec excès comporte des risques pour la santé.</p>
                    <p>Pour toute information n'hesitez pas à prendre contact avec un profesionel de santé</p>
                    <p>ou appeler la radio de bassem (appel non surtaxé)</p>
                </div>
            </div>
        </div>
    );
};
