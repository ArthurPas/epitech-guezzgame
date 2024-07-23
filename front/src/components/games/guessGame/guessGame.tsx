import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetPopularMovies } from '@/hooks/tmdbAPI';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type GuessGameProps = {};

//TODO: SSR for network call (this way it's safer AND users can't check the answers, for now I keep it like this as I it's practical for dev)
export const GuessGame = (props: GuessGameProps) => {
    // Le jeu consiste en une image fortement zoomée, qui va progressivement dézoomer. Il peut s'agit d'une affiche de film ou du portrait d'un acteur ou actrice.
    // Les joueurs doivent être les premiers à deviner à quel film ou acteur correspond l'image.

    const { data, isError, isPending } = useGetPopularMovies();

    if (isPending) {
        return <span>Chargement</span>;
    }

    if (isError) {
        return <span>Erreur</span>;
    }

    console.log(data);

    const posterIndexToDisplay = Math.floor(Math.random() * 20);
    console.log('posterIndexToDisplay', posterIndexToDisplay);
    console.log('answer', data[posterIndexToDisplay]?.title);

    const initialX = Math.floor(Math.random() * 500);
    const initialY = Math.floor(Math.random() * 750);

    return (
        <div className="relative w-full h-full rounded-xl bg-black">
            {/* scène complète */}
            <div
                className="absolute bottom-0 w-full h-full rounded-xl bg-cover bg-center z-10"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721661360/cine_scene_saease.png')" }}
            />
            {/* sièges only (pour futures animations) */}
            {/* <div
                className="absolute bottom-0 w-full h-full rounded-xl bg-cover bg-center z-10"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721660379/guess_sieges_dod0vy.png')" }}
            /> */}
            {/* rideaux only (pour futures animations) */}
            {/* <div
                className="absolute top-0 w-full rounded-xl h-full bg-cover bg-center z-10"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dxaqv2hww/image/upload/v1721660378/guess_rideaux_agmxvc.png')" }}
            /> */}

            {/* Zone pour les images */}
            <div className="absolute left-[48.7%] xl:left-[50%] -mt-[1px] -translate-x-[49%] rounded-xl text-white border-2 w-full xl:w-[70%] 3xl:w-[65.3%] h-[68%] flex justify-center items-center overflow-hidden">
                <motion.img
                    className="pt-6"
                    src={`https://image.tmdb.org/t/p/w500/${data[posterIndexToDisplay].poster_path}`}
                    alt="guess game image"
                    initial={{ scale: 15, x: initialX, y: initialY }}
                    animate={{ scale: 0 }}
                    transition={{ duration: 12, ease: 'easeOut' }}
                    // animate={{ scale: 2 }}
                />
                {/* <Card className="absolute bottom-0 -left-4 flex justify-center w-[30%] mx-auto rounded-lg mt-4 p-4">
                    <form className="flex flex-col space-y-4 w-1/2">
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold">Nom du film:</label>
                            <input placeholder="Nom du film" type="text" className="p-2 border rounded-md z-50" />
                        </div>
                        <Button variant={'noShadow'} className="w-[60%] rounded-lg bg-purple-400 font-bold">
                            Confirmer
                        </Button>
                    </form>
                </Card> */}
            </div>

            {/* Form */}
            <div className="absolute left-[15%] lg:left-[50%] -translate-x-[50%] w-[20%] h-[61%] z-20">
                <div className="absolute bottom-0 -left-4 flex justify-center w-[30%] mx-auto rounded-lg mt-4 p-4 z-[-1]">
                    <form className="flex w-1/2">
                        <input placeholder="Nom du film" type="text" className="p-2 border rounded-md z-30" />
                        <Button
                            variant={'noShadow'}
                            className="p-2 ml-4 h-[45px] w-[140px] rounded-lg  font-bold bg-gradient-to-b from-amber-300 to-yellow-600 hover:to-yellow-500 transition-colors"
                        >
                            Confirmer
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
