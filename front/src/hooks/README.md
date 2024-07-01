All the hooks relative to data fetching. **EVERY** call to useQuery, useMutation, etc. should have its own hook

Examples:

```tsx
// src/hooks/footer.ts
import { useQuery } from '@tanstack/react-query';
import { FooterType } from '~/interfaces/footer';

export const fetchFooter = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edito/footer`);
    const data = await response.json();

    return data;
};

export const useGetFooterLinks = () => {
    return useQuery<FooterType>({
        queryKey: ['footer'],
        queryFn: fetchFooter
    });
};

```

```tsx
// src/hooks/auth.ts
export const useGetLogged = () => {
    return useQuery<boolean>({
        queryKey: ['checkLogged'],
        queryFn: async () => {
            const res = await fetch('/checkLogged');
            return res.json();
        }
    });
};
```
