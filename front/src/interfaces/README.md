All zod types. **DO NOT copy the DTO from the backend entirely. Instead, define only the attributes that are necessary to the code**

Examples : 

```ts
// src/interfaces/footer.ts
import { z } from 'zod';

export const itemTypes = ['TYPE_NAME_1', 'TYPE_NAME_2', 'TYPE_NAME_3'] as const;

export type ItemType = (typeof itemTypes)[number];

const itemSchema = z.object({
    uuid: z.string().uuid(),
    title: z.string(),
    url: z.string(),
    type: z.enum(itemTypes),
});

const footerSchema = z.object({
    uuid: z.string().uuid(),
    title: z.string().nullable(),
    items: z.array(itemSchema).nullable(),
});

export type FooterType = z.infer<typeof footerSchema>;

export type FooterItemSchema = z.infer<typeof itemSchema>;

```
