# Interfaces

All zod types. **DO NOT copy the DTO from the backend entirely. Instead, define only the attributes that are necessary to the code**

Examples :

```ts
// src/interfaces/footer.ts
import { z } from 'zod';

export const roleTypes = ['admin', 'moderator', 'user'] as const;

export type ItemType = (typeof itemTypes)[number];

const userSchema = z.object({
    uuid: z.string().uuid(),
    mail: z.string().email(),
    pseudo: z.string().min(2).max(30),
    role: z.enum(itemTypes),
});

export type UserType = z.infer<typeof userSchema>;
```
