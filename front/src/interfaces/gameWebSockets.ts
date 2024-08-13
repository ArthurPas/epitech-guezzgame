import { z } from 'zod';

const playerInfoSchema = z.object({
    login: z.string(),
    timestamp: z.number()
});

const actionTypeSchema = z.enum([
    'ADD_POINTS',
    'LOOSE_POINTS',
    'ADD_POINTS_BY_DATE',
    'END_GAME',
    'START_GAME',
    'USER_READY',
    'USER_NOT_READY',
    'USER_JOIN',
    'USER_LEAVE',
    'END_PARTY',
    'START_PARTY',
    'USER_WIN',
    'USER_LOOSE',
    'END_ROUND',
    'START_ROUND',
    'FASTER_WIN',
    'FASTER_WIN_BY_ROUND'
]);

const gameDataSchema = z.object({
    from: z.string(), // login
    date: z.date(), // timestamp
    nbPoints: z.number(),
    gameName: z.enum(['blindTest', 'movieGuesser', 'clickGame', 'titre', 'geoGuesser', 'jungleSpeed']),
    roundNumber: z.number(),
    partyId: z.string(),
    playerInfo: playerInfoSchema
});

const sendToHostSchema = z.object({
    actionType: actionTypeSchema,
    gameData: gameDataSchema
});

export type PlayerInfo = z.infer<typeof playerInfoSchema>;
export type ActionType = z.infer<typeof actionTypeSchema>;
export type SendToHostType = z.infer<typeof sendToHostSchema>;
