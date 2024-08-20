import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/RoomTab';
import React from 'react';
import { GameData } from '@/interfaces/gameWebSockets';
import { useNewParty, useAddGame, useRemoveGame, useGetGames, useRandomCode, useJoinParty } from '@/hooks/room';
import { Game, NewParty } from '@/interfaces/room';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '@/components/ui/use-toast';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import { useRouter } from 'next/router';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Chat } from '@/components/gameLayout/Chat';
const Index = () => {
    const { toast } = useToast();
    let userLogin: string = 'anonymous';
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('authToken') !== null && localStorage.getItem('authToken') !== undefined) {
            const token = localStorage.getItem('authToken') || '';
            const jwtDecoded = jwtDecode(token);
            userLogin = jwtDecoded.sub || 'anonymous';
        }
    }
    const { mutate: joinGame } = useJoinParty(userLogin);
    const { data: fetchRandomCode } = useRandomCode() as { data: number };
    const randomCode = fetchRandomCode;
    const [playlistGames, setPlaylistGames] = useState<Game[]>([]);
    const { mutate: createParty, isLoading: isCreatingParty, error: createPartyError, data: createPartyData } = useNewParty();
    const { mutate: addGameQuery } = useAddGame();
    const { mutate: removeGameQuery } = useRemoveGame();
    const [partyCreated, setPartyCreated] = useState<boolean>(false);
    const { data: games, isError, isLoading } = useGetGames();
    const { usersJoinedParty, sendToHost } = useGameWebSockets();
    const [displayPartyCode, setDisplayPartyCode] = useState<string>('####');
    const router = useRouter();
    console.log(randomCode);
    const addGame = (Game: Game) => {
        addGameQuery({ partyCode: randomCode, gameName: Game.name, userLogin: '' });
        if (!playlistGames.some((g) => g.name === Game.name)) {
            setPlaylistGames([...playlistGames, Game]);
        }
    };
    const removeGame = (Game: Game) => {
        removeGameQuery({ partyCode: randomCode, gameName: Game.name, userLogin: '' });
        setPlaylistGames(playlistGames.filter((g) => g.name !== Game.name));
    };
    const handleCreateClick = async () => {
        const newParty: NewParty = {
            partyCode: randomCode,
            userLogin: userLogin,
            gameName: ''
        };
        await createParty(newParty, {
            onSuccess: () => {
                setDisplayPartyCode(randomCode.toString());
                toast({ description: 'Lets go, choisis tes guezzgames et attend tes amis' });
                setPartyCreated(true);
                localStorage.setItem('partyCode', randomCode.toString());
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };

    const handlePlayClick = async () => {
        toast({ description: 'Letzz ggo ...' });
        router.push('/gameplay');
    };

    const handleJoinClick = async () => {
        await joinGame(randomCode, {
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

    if (isError || !games) {
        return <div>Error loading game list.</div>;
    }

    return (
        <div>
            <div className="flex justify-around py-5vh h-[60vh] mt-[9rem]">
                <div>
                    <Tabs defaultValue="create" className="w-[800px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="create">Créer une room</TabsTrigger>
                            <TabsTrigger value="join">Rejoindre une room</TabsTrigger>
                        </TabsList>
                        <TabsContent value="create">
                            <Card className="p-5 rounded-[0.9rem]">
                                <CardContent className="grid grid-cols-2">
                                    <div className="grid-cols-1 m-2">
                                        <Button
                                            variant="default"
                                            className="w-full bg-amber-400 text-text dark:bg-darkBg dark:text-darkText"
                                            onClick={handleCreateClick}
                                            disabled={partyCreated}
                                        >
                                            Nouveau guezzgame !
                                        </Button>
                                        <div>
                                            <Label htmlFor="idroom">ID de la room:</Label>
                                            <Input disabled id="idParty" value={displayPartyCode} />
                                        </div>
                                        <div>
                                            <Label htmlFor="player">Player:</Label>
                                            <ScrollArea className="">
                                                <div className="">
                                                    {usersJoinedParty.length > 0 &&
                                                        usersJoinedParty.map((player) => (
                                                            <div className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-1 font-mono text-sm">
                                                                {player.userLogin}
                                                            </div>
                                                        ))}
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </div>

                                    <div className="flex m-2">
                                        <div className="flex flex-col m-2">
                                            <Label htmlFor="Game">Game:</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {games.slice(1).map((game: Game) => (
                                                    <Button
                                                        key={game.id}
                                                        className="default"
                                                        onClick={() => addGame(game)}
                                                        style={{
                                                            backgroundImage: `url(${game.urlPicture})`,
                                                            backgroundSize: 'cover',
                                                            color: 'white'
                                                        }}
                                                    >
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                {/* Tout va bien pas de panique tout est sous controle c'est seulement pour faire un charactére invisible : https://www.editpad.org/tool/invisible-character
                                                                sinon c'est moche */}
                                                                <TooltipTrigger>‎ ‎ ‎ ‎ ‎ ‎ ‎ </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>{game.name}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col m-2">
                                            <Label htmlFor="playlistGame">Playlist Game:</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {playlistGames.map((game, index) => (
                                                    <Button
                                                        key={game.id}
                                                        className="default"
                                                        onClick={() => removeGame(game)}
                                                        style={{
                                                            backgroundImage: `url(${game.urlPicture})`,
                                                            backgroundSize: 'cover',
                                                            color: 'white'
                                                        }}
                                                    >
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>‎ ‎ ‎ ‎ ‎ ‎ ‎</TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>{game.name}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="default"
                                        className="w-full m-2 bg-amber-400 text-text dark:bg-darkBg dark:text-darkText"
                                        onClick={handlePlayClick}
                                        disabled={isCreatingParty}
                                    >
                                        On y va
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
                                        <Input id="current" type="join" onChange={(e) => setDisplayPartyCode(e.target.value)} />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="default"
                                        className="w-full bg-amber-400 text-text dark:bg-darkBg dark:text-darkText"
                                        onClick={handleJoinClick}
                                    >
                                        Rejoindre
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <Chat />
            </div>
        </div>
    );
};

export default Index;
// function createParty(newParty: PlaylistToSend) {
//     throw new Error('Function not implemented.');
// }
