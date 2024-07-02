import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string().min(2, { message: 'Votre pseudo doit contenir au moins 2 caractères' }),
    password: z.string().min(2, { message: 'Votre mot de passe doit contenir au moins 2 caractères' })
});

export const registerSchema = z.object({
    mail: z.string().email({ message: 'Votre email doit être valide' }),
    login: z.string().min(2, { message: 'Votre pseudo doit contenir au moins 2 caractères' }),
    password: z.string().min(2, { message: 'Votre mot de passe doit contenir au moins 2 caractères' })
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type RegisterSchemaType = z.infer<typeof registerSchema>;
