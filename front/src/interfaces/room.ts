// src/interfaces/index.ts
import {  z } from 'zod';

export const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Game = z.infer<typeof gameSchema>;

const playerSchema = z.object({
  player: z.string(),
  host: z.string().optional(),
});

export type Player = z.infer<typeof playerSchema>;

const playlistSchema = z.object({
  games: z.array(gameSchema),
});

export type Playlist = z.infer<typeof playlistSchema>;