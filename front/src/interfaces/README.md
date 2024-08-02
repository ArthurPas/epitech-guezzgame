# Interfaces

All zod types. It's not required to copy the DTO from the backend entirely. Instead, define only the attributes that are necessary to the code.

Example :

```ts
// src/interfaces/user.ts
import { z } from 'zod';

export const roleTypes = ['admin', 'moderator', 'user'] as const;

export type ItemType = (typeof roleTypes)[number];

const userSchema = z.object({
    uuid: z.string().uuid(),
    mail: z.string().email(),
    pseudo: z.string().min(2).max(30),
    role: z.enum(roleTypes)
});

export type UserType = z.infer<typeof userSchema>;
```
