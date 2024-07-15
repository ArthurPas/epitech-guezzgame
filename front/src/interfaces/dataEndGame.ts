import { z } from 'zod';

const scoreSchema = z.object({
    userId: z.number(),
    login: z.string(),
    nbPoints: z.number(),
    profilePicture: z.string(),
});

export const dataEndGameSchema = z.object({
    partyCode: z.number(),
    scores: z.array(scoreSchema),
});

export type DataEndGameType = z.infer<typeof dataEndGameSchema>;
