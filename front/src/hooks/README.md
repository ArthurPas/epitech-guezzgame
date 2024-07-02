# Hooks

All the hooks relative to data fetching. **EVERY** call to useQuery, useMutation, etc. should have its own hook

Examples:

```tsx
// src/hooks/user.ts
import { useQuery } from '@tanstack/react-query';
import { UserType } from '~/interfaces/User';

export const fetchUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    const data = await response.json();

    return data;
};

export const useGetUser = () => {
    return useQuery<UserType>({
        queryKey: ['user'],
        queryFn: fetchUser
    });
};

//src/components/Footer.tsx
const { data, isError, isPending } = useGetFooterLinks(); 

    if (isPending) {
        return <span>Chargement</span>;
    }

    if (isError) {
        return <span>Erreur</span>;
    }

    console.log(data);

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
