import EndGameScore from '@/components/endGameScore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import { GameData } from '@/interfaces/gameWebSockets';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

const questionsData = [
    {
        id: 1,
        type: 'Guezz',
        question: 'Donne un des deux types de viandes utilisés dans la préparation des merguez',
        reponse: ['boeuf', 'agneau']
    },
    {
        id: 2,
        type: 'Guezz',
        question: "Quelle est l'épice essentielle pour donner la merguez sa belle couleur rouge",
        reponse: ['paprika']
    },
    { id: 3, type: 'Guezz', question: 'Quelle est cette sauce cuisinée avec de la mayonnaise et de la Harissa', reponse: ['samourai'] },
    { id: 4, type: 'General', question: "Quel est le seul fruit qui porte ses graines à l'extérieur", reponse: ['fraise'] },
    {
        id: 5,
        type: 'General',
        question: "Quel pays est connu pour avoir plus de moutons que d'habitants, avec environ 6 moutons par personne",
        reponse: ['Nouvelle-Zélande']
    },
    { id: 6, type: 'General', question: 'Quel est le plus petit os du corps humain', reponse: ['étrier'] },
    { id: 7, type: 'General', question: "Quelle est la capitale de l'Australie", reponse: ['Canberra'] },
    { id: 8, type: 'General', question: 'Quel est le plus grand océan du monde ', reponse: ['Pacifique'] },
    { id: 9, type: 'General', question: 'Quel est le plus petit pays du monde en superficie', reponse: ['Vatican'] },
    { id: 10, type: 'General', question: "Quel est l'élément chimique représenté par le symbole « O » ", reponse: ['oxygène'] },
    { id: 11, type: 'General', question: 'Quel oiseau ne peut pas voler mais est le plus rapide sur terre', reponse: ['autruche'] },
    { id: 12, type: 'General', question: 'Quelle est la planète la plus proche du Soleil', reponse: ['Mercure'] }
];

const CultureGuezz = () => {
    const { isGameOver, isRoundOver, sendToHost, scoreResult, allPlayersReady } = useGameWebSockets();

    const nbTotalTours = 2;
    const [tourEnCours, setTourEnCours] = useState(0);
    const [score, setScore] = useState(0);
    const [indiceQuestion, setIndiceQuestion] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [showModalRules, setShowModalRules] = useState(true);
    const [showEndGame, setShowEndGame] = useState(false);
    const [availableIndices, setAvailableIndices] = useState<number[]>([]);

    const [waitingForOther, setWaitingForOther] = useState<boolean>(false);

    let userLogin = 'anonymous';
    let partyCode = '';
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        partyCode = localStorage.getItem('partyCode') || '';
        userLogin = jwtDecoded.sub || 'anonymous';
    }

    let gameData: GameData = {
        from: userLogin,
        date: Date.now(), //TODO: Mettre à jour la date avant l'envoi de gameData
        nbPoints: 0,
        gameName: 'CULTURE_GUEZZ',
        roundNumber: 0,
        partyCode: partyCode,
        playerInfo: { login: userLogin, timestamp: Date.now() } //TODO: Mettre à jour le timestamp avant l'envoi de gameData
    };

    //Gestion du jeu
    useEffect(() => {
        setAvailableIndices(Array.from(Array(questionsData.length).keys()));
    }, []);

    const handleNewQuestion = () => {
        const { reponse, type } = questionsData[indiceQuestion];
        if (!inputValue) {
            alert('Le champ de réponse est vide !');
            return;
        }

        //Evaluation de la réponse du joueur
        if (reponse.some((r) => r.toLowerCase() === inputValue.toLowerCase())) {
            gameData.date = Date.now();
            gameData.nbPoints = type === 'Guezz' ? 2 : 1;
            gameData.roundNumber = tourEnCours;

            sendToHost({ actionType: 'FASTER_WIN_BY_ROUND', gameData: gameData });
            sendToHost({ actionType: 'ADD_POINTS', gameData: gameData });
            // const points = type === 'Guezz' ? 2 : 1;
            // setScore(prevScore => prevScore + points + 1); // le +1 n'est que pour le premier qui a répondu
        } else {
        }

        // Sélection nouvelle question aléatoire parmi les indices restants
        const newAvailableIndices = [...availableIndices];
        const randomIndex = Math.floor(Math.random() * newAvailableIndices.length);
        const nextQuestionIndex = newAvailableIndices[randomIndex];

        // Mettre à jour les indices restants
        newAvailableIndices.splice(randomIndex, 1);
        setAvailableIndices(newAvailableIndices);

        //Mise à jour indice de la question sélectionnée et du tour en cours
        setIndiceQuestion(nextQuestionIndex);
        setTourEnCours((prev) => prev + 1);

        setInputValue('');

        if (tourEnCours + 1 > nbTotalTours) {
            //C'est la fin du jeu ;)
            sendToHost({ actionType: 'END_GAME', gameData: gameData });

            setShowEndGame(true);
            //return;
        }
    };

    if (isGameOver) {
        return <EndGameScore login={gameData.playerInfo.login} gameName={gameData.gameName} partyCode={gameData.partyCode} />;
    }
    return (
        <div>
            {showModalRules && (
                <Dialog open={showModalRules} onOpenChange={() => {}}>
                    <DialogContent>
                        <DialogTitle className="text-center">Règles du CultureGuezz</DialogTitle>
                        <DialogDescription className="text-center text-[16px] leading-[1.5rem]">
                            Répondez correctement aux questions le plus vite possible. Les questions générales rapportent 1 point, les
                            questions Guezz rapportent 2 points.
                        </DialogDescription>
                        <div className="flex justify-center w-full">
                            <DialogClose asChild>
                                <Button onClick={() => setShowModalRules(false)}>Jouer</Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            <div className="flex flex-col items-center space-y-4">
                <h1 className="m-10 mt-32 mb-10 text-amber-300">CultureGuezz</h1>

                <h3 className="mt-7 mb-0 text-xl">Question {questionsData[indiceQuestion]?.type}</h3>
                <Card className={`rounded-full w-[80%] ${questionsData[indiceQuestion].type === 'Guezz' ? 'bg-amber-500' : 'bg-white'}`}>
                    <CardContent className="flex flex-col justify-center items-center h-45 space-y-4 mx-20">
                        <h2 className="text-3xl text-center m-8">{questionsData[indiceQuestion].question} ?</h2>
                    </CardContent>
                </Card>

                <Card className="rounded-full w-[30%]">
                    <CardContent className="flex flex-col justify-center items-center h-45 space-y-4 mx-20">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="p-2 border rounded-full text-center mt-5"
                        />
                        <Button className="bg-amber-300 w-32" onClick={handleNewQuestion}>
                            Valider
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CultureGuezz;
