import { z } from "zod";

const userListSchema = z.object({
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

export type UserListType = z.infer<typeof userListSchema>;
