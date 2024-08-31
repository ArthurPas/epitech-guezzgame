import { z } from "zod";

const itemSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    picture: z.string().url(),
    price: z.number(),
    rarity: z.number()
});

export type ItemType = z.infer<typeof itemSchema>;

const buyItem = z.object({
    id: z.number(),
    login: z.string(),
});

export type BuyItemPayload = z.infer<typeof buyItem>;