import { z } from 'zod';

const tmdbMovieResults = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
});

const tmdbMovies = z.array(tmdbMovieResults);

export type TMDBMoviesType = z.infer<typeof tmdbMovies>;
