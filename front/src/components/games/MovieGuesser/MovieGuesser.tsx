import { Button } from '@/components/ui/button';
import { useGetPopularMovies } from '@/hooks/tmdbAPI';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import { GameData } from '@/interfaces/gameWebSockets';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState, useRef } from 'react';

export const MovieGuesser = () => {
    const { isGameOver, isRoundOver, sendToHost } = useGameWebSockets();
    console.log('isGameOver', isGameOver);
    console.log('isRoundOver', isRoundOver);

    // TMDB API
    const { data, isError, isPending, refetch } = useGetPopularMovies();
    console.log('data', data);

    // GAME STATE
    const [countdown, setCountdown] = useState(3);
    const [gameActive, setGameActive] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    // ROUND STATE
    const maxRounds = 5;
    const roundDuration = 12;
    const [currentRound, setCurrentRound] = useState(1);
    const [posterIndexToDisplay, setPosterIndexToDisplay] = useState<number>(1);
    const [initialX, setInitialX] = useState<number>(Math.floor(Math.random() * 500));
    const [initialY, setInitialY] = useState<number>(Math.floor(Math.random() * 750));
    const [key, setKey] = useState(0);
    const [roundTimer, setRoundTimer] = useState<number>(0);

    // PLAYER STATE
    const [playerScore, setPlayerScore] = useState(0);
    const [hasPlayerGuessed, setHasPlayerGuessed] = useState(false);
    const [playerGuess, setPlayerGuess] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    let userLogin = 'anonymous';
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        userLogin = jwtDecoded.sub || 'anonymous';
    }

    let gameData: GameData = {
        from: userLogin,
        date: Date.now(), //TODO: Mettre à jour la date avant l'envoi de gameData
        nbPoints: playerScore,
        gameName: 'MOVIE_GUESSER',
        roundNumber: currentRound,
        partyCode: '124',
        playerInfo: { login: userLogin, timestamp: Date.now() } //TODO: Mettre à jour le timestamp avant l'envoi de gameData
    };

    // Game starter
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setPosterIndexToDisplay(Math.floor(Math.random() * 20));
            setGameActive(true);
            setRoundTimer(Date.now());
            return;
        }
    }, [countdown]);

    //Reset initial position of the image when round changes
    useEffect(() => {
        if (gameActive && currentRound > 1) {
            setInitialX(Math.floor(Math.random() * 500));
            setInitialY(Math.floor(Math.random() * 750));
            setKey((prevKey) => prevKey + 1);
            setRoundTimer(Date.now());
            if (inputRef.current) {
                inputRef.current.value = '';
                setPlayerGuess('');
            }
        }
    }, [gameActive, currentRound]);

    if (isPending) {
        return <span>Chargement</span>;
    }

    if (isError) {
        return <span>Erreur</span>;
    }

    const handleRoundEnd = async () => {
        console.log('Round ended');
        sendToHost({ actionType: 'ADD_POINTS_BY_DATE', gameData });
        if (currentRound < maxRounds) {
            await refetch();
            setCurrentRound(currentRound + 1);
            setPosterIndexToDisplay(Math.floor(Math.random() * 20));
            setHasPlayerGuessed(false);
            setRoundTimer(Date.now());
            sendToHost({ actionType: 'END_ROUND', gameData });
        } else {
            setGameActive(false);
            setGameEnded(true);
            sendToHost({ actionType: 'END_GAME', gameData });
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (hasPlayerGuessed) return;

        const guessTime = (Date.now() - roundTimer) / 1000;
        const correctTitle = data[posterIndexToDisplay].title;

        // Removing special characters
        const cleanTitle = correctTitle.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
        const cleanGuess = playerGuess.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');

        // Keeping only words longer than 3 characters
        const titleWords = cleanTitle.split(' ').filter((word) => word.length >= 4);
        const guessWords = cleanGuess.split(' ').filter((word) => word.length >= 4);

        // Checking if the answer contains at least one of the mains words from the title
        const isCorrect = titleWords.some((word) => guessWords.includes(word));

        if (isCorrect) {
            let points = 0;
            if (guessTime <= roundDuration / 3) {
                points = 50;
            } else if (guessTime <= roundDuration / 2) {
                points = 35;
            } else if (guessTime <= roundDuration / 1.5) {
                points = 25;
            } else if (guessTime <= roundDuration) {
                points = 10;
            }
            setPlayerScore(playerScore + points);
            setHasPlayerGuessed(true);
        }
    };

    return (
        <div className="relative w-full h-full rounded-xl bg-black">
            {countdown > 0 && (
                <div>
                    <div className="flex items-center justify-center w-full h-full text-white text-4xl">{countdown}</div>
                    {/* sièges only */}
                    <motion.div
                        key={`seats-${key}`}
                        className="absolute bottom-0 w-full h-full rounded-xl bg-cover bg-center z-10"
                        style={{
                            backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721660379/guess_sieges_dod0vy.png')"
                        }}
                        initial={{ y: '-100vh' }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    />
                    {/* rideaux only */}
                    <motion.div
                        key={`curtains-${key}`}
                        className="absolute top-0 w-full rounded-xl h-full bg-cover bg-center z-10"
                        style={{
                            backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721660378/guess_rideaux_agmxvc.png')"
                        }}
                        initial={{ y: '100vh' }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    />
                </div>
            )}

            {countdown === 0 && gameActive && (
                <div>
                    {/* scène complète */}
                    <div
                        className="absolute bottom-0 w-full h-full rounded-xl bg-cover bg-center z-10"
                        style={{
                            backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721661360/cine_scene_saease.png')"
                        }}
                    />

                    <div className="absolute left-[48.7%] xl:left-[50%] -mt-[1px] -translate-x-[49%] rounded-xl text-white border-2 w-full xl:w-[70%] 3xl:w-[65.3%] h-[68%] flex justify-center items-center overflow-hidden">
                        <motion.img
                            key={`poster-${key}`}
                            className="pt-6"
                            src={`https://image.tmdb.org/t/p/w500/${data[posterIndexToDisplay].poster_path}`}
                            alt="guess game image"
                            // initial={{ scale: 15, x: initialX, y: initialY }}
                            // animate={{ scale: 0 }}
                            initial={{ scale: 15 }}
                            animate={{ scale: 2 }}
                            transition={{ duration: roundDuration, ease: 'easeOut' }}
                            onAnimationComplete={handleRoundEnd}
                        />
                    </div>

                    <div className="absolute left-[48.7%] xl:left-[50%] top-4 -mt-[1px] -translate-x-[49%] rounded-xl text-white w-full xl:w-[70%] 3xl:w-[65.3%] flex justify-center overflow-hidden">
                        <p>
                            Round {currentRound}/{maxRounds} | Score : {playerScore} | Nom du film : {data[posterIndexToDisplay].title}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="absolute left-[15%] -translate-x-[15%] lg:left-[50%] lg:-translate-x-[50%] w-[20%] h-[61%] z-20">
                        <div className="absolute bottom-0 -left-4 flex justify-center w-[30%] mx-auto rounded-lg mt-4 p-4 z-[-1]">
                            <form className="flex w-1/2" onSubmit={handleSubmit}>
                                <input
                                    placeholder="Nom du film"
                                    type="text"
                                    className="p-2 border rounded-md z-30"
                                    ref={inputRef}
                                    onChange={(e) => setPlayerGuess(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant={'noShadow'}
                                    className="p-2 ml-4 h-[45px] w-[140px] rounded-lg  font-bold bg-gradient-to-b from-amber-300 to-yellow-600 hover:to-yellow-500 transition-colors"
                                >
                                    Confirmer
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {!gameActive && gameEnded && (
                <div className="relative w-full h-full rounded-xl bg-black">
                    <div
                        className="absolute bottom-0 w-full h-full rounded-xl bg-cover bg-center z-10"
                        style={{
                            backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721661360/cine_scene_saease.png')"
                        }}
                    />
                    <h2 className="flex justify-center text-white pt-6">Jeu terminé !</h2>
                    <p className="flex justify-center text-white pt-6">Score final : {playerScore}</p>
                </div>
            )}
        </div>
    );
};
