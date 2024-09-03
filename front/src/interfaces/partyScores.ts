import { z } from 'zod';

const scoresSchema = z.object({
    userId: z.number(),
    login: z.string(),
    nbPoints: z.number(),
    profilePicture: z.string()
});

const partyScoresSchema = z.array(scoresSchema);

export type PartyScoresType = z.infer<typeof partyScoresSchema>;

const apiResponse = z.object({
    scores: partyScoresSchema,
    partyCode: z.number()
});

export type PartyScoresAPIType = z.infer<typeof apiResponse>;
