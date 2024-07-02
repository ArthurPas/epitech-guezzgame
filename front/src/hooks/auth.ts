import { LoginType } from '@/interfaces/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

export const login = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`);
    const data = await response.json();

    return data;
};

export const useLogin = () => {
    // return useMutation<LoginType>({
    //     queryKey: ['login'],
    //     queryFn: login
    // });
};
