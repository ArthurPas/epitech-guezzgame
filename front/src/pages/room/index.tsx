import { useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/RoomTab';
import { useNewParty, useAddGame, useRemoveGame, useGetGames, useRandomCode, useJoinParty } from '@/hooks/room';
import { Game, NewParty } from '@/interfaces/room';
import { useToast } from '@/components/ui/use-toast';
import useGameWebSockets from '@/hooks/useGameWebSockets';
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
    const { mutate: createParty } = useNewParty();
    const { mutate: addGameQuery } = useAddGame();
    const { mutate: removeGameQuery } = useRemoveGame();
    const [partyCreated, setPartyCreated] = useState<boolean>(false);
    const { data: games, isError, isLoading } = useGetGames();
    const { usersJoinedParty, sendToHost } = useGameWebSockets();
    const [displayPartyCode, setDisplayPartyCode] = useState<string>('####');
    const [isRoomGenerated, setIsRoomGenerated] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('join');

    const router = useRouter();

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
                toast({ description: 'Room générée ! Tu peux partager le code à tes amis et choisir tes jeux 🌭' });
                setPartyCreated(true);
                localStorage.setItem('partyCode', randomCode.toString());
                setIsRoomGenerated(true);
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };

    const handlePlayClick = async () => {
        toast({ description: "C'est parti !" });
        router.push('/gameplay');
    };

    const handleJoinClick = async () => {
        await joinGame(parseInt(displayPartyCode, 10), {
            onSuccess: () => {
                toast({ description: 'Partie trouvée ! Elle commencera quand le créateur de la room cliquera sur "Lancer la partie"' });
                // setPartyCreated(true);
                localStorage.setItem('partyCode', displayPartyCode);
                // setIsRoomGenerated(true);
                // setActiveTab('create');
                router.push('/gameplay');
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
        <div className="flex justify-around gap-4 py-5vh mt-[8rem] w-[100%] lg:px-[10rem]">
            <div className="w-[100%] px-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[100%]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="join" className="rounded-xl">
                            Rejoindre une room
                        </TabsTrigger>
                        <TabsTrigger value="create" className="rounded-xl">
                            Créer une room
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="join">
                        <Card className="p-5 px-[25%] min-h-[35vh] py-[5%] rounded-[0.9rem] w-[100%]">
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Room ID</Label>
                                    <Input
                                        id="current"
                                        type="join"
                                        onChange={(e) => {
                                            setDisplayPartyCode(e.target.value);
                                        }}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="default"
                                    className="w-full bg-gradient-to-b from-amber-300 to-amber-500 text-text dark:bg-darkBg dark:text-darkText"
                                    onClick={handleJoinClick}
                                >
                                    Rejoindre
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="create">
                        <Card className="p-5 px-[15%] min-h-[35vh] rounded-[0.9rem] w-[100%] flex flex-col justify-between ">
                            <CardContent className="grid grid-cols-2">
                                <div className="grid-cols-1 m-2">
                                    <Button
                                        variant="default"
                                        className="w-full bg-gradient-to-b from-amber-300 to-amber-500 mb-2 text-text dark:bg-darkBg dark:text-darkText"
                                        onClick={handleCreateClick}
                                        disabled={partyCreated}
                                    >
                                        Générer une room
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
                                    className="w-full m-2 bg-gradient-to-b from-amber-300 to-amber-500 text-text dark:bg-darkBg dark:text-darkText"
                                    onClick={handlePlayClick}
                                    disabled={!isRoomGenerated}
                                >
                                    Lancer la partie
                                </Button>
                            </CardFooter>
                        </Card>
                        {isError && <div>Erreur lors de l'envoi de la playlist.</div>}
                    </TabsContent>
                </Tabs>
            </div>

            <Chat className="h-full lg:h-full xl:h-full 3xl:h-full" />
        </div>
    );
};

export default Index;
// function createParty(newParty: PlaylistToSend) {
//     throw new Error('Function not implemented.');
// }
