import { useMutation } from '@tanstack/react-query';

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

export const register = async (registrationData: { mail: string; login: string; password: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    });

    if (!response.ok) {
        throw new Error('Failed to register');
    }

    const data = await response.json();
    return data;
};

export const useRegister = () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: register
    });
};
