import { TMDBMoviesType } from '@/interfaces/tmdbAPI';
import { useQuery } from '@tanstack/react-query';

export const fetchPopularMovies = async (page = 1) => {
    const response = await fetch(
        `https://api.themoviedb.org/4/list/8307732-guessgame?language=fr-FR&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        }
    );
    const data = await response.json();
    return data?.results;
};

export const useGetPopularMovies = () => {
    const page = Math.floor(Math.random() * 5) + 1;
    return useQuery<TMDBMoviesType>({
        queryKey: [`/popularMovies`],
        queryFn: () => fetchPopularMovies(page)
    });
};
// https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg.jpg
