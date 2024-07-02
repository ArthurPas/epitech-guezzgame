import { z } from "zod";

const friendSchema = z.object({
    id: z.number(),
    login: z.string(),
});

const friendsArray = z.object({
    friendData: z.array(friendSchema),
});

export type FriendType = z.infer<typeof friendsArray>;