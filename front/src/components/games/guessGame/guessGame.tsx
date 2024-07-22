import { useGetPopularMovies } from "@/hooks/tmdbAPI";

export type GuessGameProps = {};

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
  
    return <div>guessGame</div>;
};
