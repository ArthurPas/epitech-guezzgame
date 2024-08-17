import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
const player = [
    {
        id: 1,
        player: 'player 1',
        host: 'host'
    }
];
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/RoomTab';
import React from 'react';

import { useParty, useGetGames, useRandomCode, useJoinParty } from '@/hooks/room';
import { Game, PlaylistToSend } from '@/interfaces/room';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '@/components/ui/use-toast';
const Index: React.FC = () => {
    const { data: randomCode } = useRandomCode();
    const { toast } = useToast();
    let userLogin: string = 'anonymous';
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        userLogin = jwtDecoded.sub || 'anonymous';
    }

    const { mutate: joinGame } = useJoinParty(userLogin);
    console.log(randomCode);
    const [partyCode, setPartyCode] = useState<number>(randomCode || 0);
    const [playlistGames, setPlaylistGames] = useState<Game[]>([]);
    const { mutate: createParty, isLoading: isCreatingParty, error: createPartyError, data: createPartyData } = useParty();
    const { data, isError, isLoading } = useGetGames();
    const addGame = (Game: Game) => {
        if (!playlistGames.some((g) => g.name === Game.name)) {
            setPlaylistGames([...playlistGames, Game]);
        }
    };

    const handlePlayClick = () => {
        const newParty: PlaylistToSend = {
            partyCode: Number(partyCode),
            gamesId: playlistGames.map((game) => game.id),
            usersId: player.map((player) => player.id)
        };
        createParty(newParty);
        console.log(newParty);
    };

    const handleJoinClick = async () => {
        await joinGame(partyCode, {
            onSuccess: () => {
                toast({ description: 'Partie trouvée' });
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error loading game list.</div>;
    }

    return (
        <div>
            <div className="flex justify-around py-10">
                <div>
                    <Button className="bg-amber-500">retour</Button>
                </div>
                <div className="flex flex-col">
                    <div className="text-center ">
                        <h1>GuezGame</h1>
                    </div>

                    <div className="flex flex-row">
                        <ScrollArea className="h-[80px] w-[520px]">
                            <div className="flex space-x-4">
                                {Array(14)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div
                                            key={index}
                                            className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-1 font-mono text-sm"
                                        >
                                            <p>day{index + 1}</p>
                                            <h3>+100</h3>
                                        </div>
                                    ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>

                <div>
                    <Button className="bg-amber-500">Profils</Button>
                </div>
            </div>

            <div className="flex justify-around py-10">
                <div>
                    <Tabs defaultValue="create" className="w-[800px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="create">Crée une room</TabsTrigger>
                            <TabsTrigger value="join">rejoindre une room</TabsTrigger>
                        </TabsList>
                        <TabsContent value="create">
                            <Card className="p-5">
                                <CardContent className="flex space-y-5 space-x-10">
                                    <div className="flex-auto">
                                        <div className="space-y-1">
                                            <Label htmlFor="roomname">Nom de la room:</Label>
                                            <Input id="roomname" defaultValue="Party-1" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="idroom">ID de la room:</Label>
                                            <Input id="idParty" value={randomCode} onChange={(e) => setPartyCode(inte.target.value)} />
                                        </div>
                                        <Label htmlFor="player">Player:</Label>
                                        <ScrollArea className=" h-[100px] w-[350px]">
                                            <div className="space-y-1">
                                                {player.map((player) => (
                                                    <div className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-1 font-mono text-sm">
                                                        {player.player} | {player.host}
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </div>

                                    <div className="flex space-x-5">
                                        <div className="flex flex-col">
                                            <Label htmlFor="Game">Game:</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {data.map((game: Game) => (
                                                    <Button key={game.id} className="default" onClick={() => addGame(game)}>
                                                        {game.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Label htmlFor="playlistGame">Playlist Game:</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {playlistGames.map((game, index) => (
                                                    <Button key={index} className="default">
                                                        {game.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="default"
                                        className="w-full bg-amber-500 text-text dark:bg-darkBg dark:text-darkText"
                                        onClick={handlePlayClick}
                                        disabled={isCreatingParty}
                                    >
                                        {createPartyError && <p>Error: {createPartyError.message}</p>}
                                        {createPartyData && <p>Party created successfully!</p>}
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="w-full bg-amber-500 text-text dark:bg-darkBg dark:text-darkText"
                                        onClick={handlePlayClick}
                                        disabled={isCreatingParty}
                                    >
                                        play !{createPartyError && <p>Error: {createPartyError.message}</p>}
                                        {createPartyData && <p>Party created successfully!</p>}
                                    </Button>
                                </CardFooter>
                            </Card>
                            {isError && <div>Erreur lors de l'envoi de la playlist.</div>}
                        </TabsContent>
                        <TabsContent value="join">
                            <Card className="p-5">
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Room ID</Label>
                                        <Input
                                            id="current"
                                            type="join"
                                            value={partyCode}
                                            onChange={(e) => setPartyCode(Number(e.target.value))}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="default"
                                        className="w-full bg-amber-500 text-text dark:bg-darkBg dark:text-darkText"
                                        onClick={handleJoinClick}
                                    >
                                        join
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div>
                    <Card className="w-[350px] p-5">
                        <CardHeader>
                            <CardTitle>Chat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input className="w-[200px]" type="message" placeholder=".  .  ." />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button className="bg-amber-500" variant="default">
                                send
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Index;
function createParty(newParty: PlaylistToSend) {
    throw new Error('Function not implemented.');
}
