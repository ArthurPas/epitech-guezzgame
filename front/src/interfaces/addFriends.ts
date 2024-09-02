import { z } from "zod";

const addFriendsSchema = z.object({
    id: z.number(),
    login: z.string(),
    picture: z.string().url(),
});

export type AddFriendsType = z.infer<typeof addFriendsSchema>;