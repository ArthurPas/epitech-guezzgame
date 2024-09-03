import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    login: z.string(),
    picture: z.string().nullable(),
});
const gamblerBetSchema = z.object({
    id: z.number(),
    user: userSchema,
    betAmount: z.number(),
});
const betOptionSchema = z.object({
    id: z.number(),
    description: z.string(),
    ods: z.number(),
    gamblerBets: z.array(gamblerBetSchema),
    isWin: z.boolean(),
});
const betSchema = z.object({
    id: z.number(),
    title: z.string(),
    betOptions: z.array(betOptionSchema),
    createdAt: z.string().datetime(),
    endTime: z.string().datetime(),
});
const betRequestSchema = z.object({
    userId: z.number(),
    betId: z.number(),
    betOptionId: z.number(),
    betAmount: z.number(),
});

export type BetRequestType = z.infer<typeof betRequestSchema>;
export type BetType = z.infer<typeof betSchema>;
