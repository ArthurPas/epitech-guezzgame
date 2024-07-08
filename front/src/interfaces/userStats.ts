import { z } from "zod";

const userStatSchema = z.object({
    user: z.object({
        id: z.number(),
        login: z.string(),
    }),
    nbWin: z.number(),
    nbParties: z.number(),
    nbPoints: z.number(),
    nbDayStreak: z.number(),
    nbBestDayStreak: z.number(),
});

export type UserStatType = z.infer<typeof userStatSchema>;