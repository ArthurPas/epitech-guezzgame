import { TMDBMoviesType } from '@/interfaces/tmdbAPI';
import { useQuery } from '@tanstack/react-query';

export const fetchPopularMovies = async () => {
    const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGFjN2Q2YThkYzdkZDY3YTcxOGQ5ZmM4MzkxMjBjZCIsIm5iZiI6MTcyMTE2NjY4OS4yMzUwNzMsInN1YiI6IjY2OTZlODc2NTNhYjMyMDQ0MmMwZmRjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cEKnFvvUylQFlCjnPZkpK6nyOnhvFRrA6LRQPAUnnmE'
            }
        }
    );
    const data = await response.json();
    console.log('data', data);

    return data;
};

export const useGetPopularMovies = () => {
    return useQuery<TMDBMoviesType>({
        queryKey: [`/popularMovies`],
        queryFn: () => fetchPopularMovies()
    });
};

// https://image.tmdb.org/t/p/w500/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg.jpg
