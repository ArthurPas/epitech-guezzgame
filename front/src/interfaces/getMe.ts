import { Days_One } from "next/font/google";
import { z } from "zod";

const getMeSchema = z.object({
    id: z.number(),
    mail: z.string().email(),
    login: z.string(),
    picture: z.string().url(),
    nbCoin: z.number(),
    dayStreak: z.number(),
    isVip: z.boolean(),
    xpPoint: z.number(),
    level: z.object({
        level: z.number(),
        badgePictureUrl: z.array(z.string().url()),
    }),
});

export type getMeSchema = z.infer<typeof getMeSchema>;
