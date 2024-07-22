import { z } from 'zod';

const tmdbMovie = z.object({
});

const tmdbMovies = z.array(tmdbMovie);

export type TMDBMoviesType = z.infer<typeof tmdbMovies>;
