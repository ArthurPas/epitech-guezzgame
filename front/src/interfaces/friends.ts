import { z } from "zod";

const friendSchema = z.object({
    id: z.number(),
    login: z.string(),
    picture: z.string(),
});

//fix: z.object to z.array
const friendsArray = z.array(friendSchema);

export type FriendType = z.infer<typeof friendsArray>;