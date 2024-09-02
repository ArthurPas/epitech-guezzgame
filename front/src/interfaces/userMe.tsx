import { z } from "zod";

const userSchema = z.object({
    daySteak: z.number(),
    id: z.number(),
    mail: z.string().email(),
    login: z.string(),
    picture: z.string().url(),
    nbCoin: z.number(),
    isVip: z.boolean(),
    xpPoint: z.number(),  
    level: z.object({
        level: z.number(),
        badgePictureUrl: z.array(z.string().url()),
    }),
});

export type UserMeType = z.infer<typeof userSchema>;
