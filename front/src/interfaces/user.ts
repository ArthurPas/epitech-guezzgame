import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    mail: z.string(),
    login: z.string(),
    picture: z.string(),
    nbCoin: z.number(),
    isVip: z.boolean(),
    xpPoint: z.number(),
});

export type UserType = z.infer<typeof userSchema>;