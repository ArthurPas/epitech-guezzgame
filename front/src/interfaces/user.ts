import { z } from "zod";

const userSchema = z.object({
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

export type UserType = z.infer<typeof userSchema>;
