import {useGetBets, usePlaceBet} from "@/hooks/bet";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {BetType} from "@/interfaces/bet";
import {Button} from "@/components/ui/button";
import React from "react";
import {useLogin} from "@/hooks/auth";
import {LoginSchemaType} from "@/interfaces/auth";
import {router} from "next/client";
import {toast} from "@/components/ui/use-toast";
export type GuessGameProps = {};

export const Bets = () => {
    // Le jeu consiste en une image fortement zoomée, qui va progressivement dézoomer. Il peut s'agit d'une affiche de film ou du portrait d'un acteur ou actrice.
    // Les joueurs doivent être les premiers à deviner à quel film ou acteur correspond l'image.

    const [goal, setGoal] = React.useState(350)

    const { data, isError, isPending } = useGetBets();

    if (isPending) {
        return <span>Conseil de gagnant : Ne pariez que ce que vous êtes prêt à perde !</span>;
    }

    if (isError) {
        return <span>Oups ...</span>;
    }

    const { mutate } = usePlaceBet();
    // const onSubmit = async (data: LoginSchemaType) => {
    //     await mutate(data, {
    //         onSuccess: () => {
    //             toast({ description: 'Que la chance soit avec toi' });
    //             router.push('/bet');
    //         },
    //         onError: (error) => {
    //             toast({ description: error.message });
    //         }
    //     });
    // };
    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }


    console.log(data);

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {data.map((bet: BetType) => (
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <Card key={bet.id} className="w-full max-w-md">
                                <CardHeader>
                                    <CardTitle>{bet.title}</CardTitle>
                                    <CardDescription>Créé le: {new Date(bet.createdAt).toLocaleString()}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {bet.betOptions.map((option) => (
                                        <div key={option.id} className="flex flex-col items-center justify-center w-64 h-32 border p-4">
                                            <p>{option.description}</p>
                                            <p><b>{option.ods}</b></p>
                                            {/*<p>Gagnant: {option.isWin ? "Oui" : "Non"}</p>*/}
                                            {/*<p>Nombre de paris: {option.gamblerBets.length}</p>*/}
                                            <div>
                                            <Drawer>
                                                <DrawerTrigger>Open</DrawerTrigger>
                                                <DrawerContent className={'flex items-center justify-center'}>
                                                    <DrawerHeader>
                                                        <DrawerTitle>Tu penses que c'est {option.description} qui va te rendre riche ? </DrawerTitle>
                                                        <DrawerDescription>On verra ca le {new Date(bet.endTime).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</DrawerDescription>
                                                    </DrawerHeader>
                                                        <div className="flex items-center justify-center">
                                                            <Button
                                                                variant="neutral"
                                                                size="icon"
                                                                className="h-8 w-8 shrink-0 rounded-full"
                                                                onClick={() => onClick(-10)}
                                                                disabled={goal <= 10}
                                                            >
                                                                <p className="text-7xl">-</p>
                                                                <span className="sr-only">Decrease</span>
                                                            </Button>
                                                            <div className="flex-1 text-center">
                                                                <p>T'es prêt à mettre combien ?</p>
                                                                <div className="text-5xl font-bold tracking-tighter">
                                                                    {goal}
                                                                </div>
                                                                <div>
                                                                    <p className={"p-2"}>Gain potentiel : <b className="text-3xl font-bold tracking-tighter">{Number((goal*option.ods).toFixed(2))}</b></p>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="neutral"
                                                                size="icon"
                                                                className="h-8 w-8 shrink-0 rounded-full"
                                                                onClick={() => onClick(10)}
                                                                disabled={goal >= 1000}
                                                            >
                                                                <p className="text-7xl">+</p>
                                                                <span className="sr-only">Increase</span>
                                                            </Button>
                                                    </div>
                                                    <DrawerFooter>
                                                        <Button>Feu !</Button>
                                                        <DrawerClose>
                                                            <Button variant="neutral">J'ai peur</Button>
                                                        </DrawerClose>
                                                    </DrawerFooter>
                                                </DrawerContent>
                                            </Drawer>


                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter>
                                    <p>Fin du pari: {new Date(bet.endTime).toLocaleString()}</p>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ))}
        </div>
    );
};
