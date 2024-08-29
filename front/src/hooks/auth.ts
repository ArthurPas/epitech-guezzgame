import { LoginSchemaType, RegisterSchemaType } from '@/interfaces/auth';
import { useMutation } from '@tanstack/react-query';

export const useIsLoggedIn = () => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('authToken');
    }
    return false;
};

export const login = async (registrationData: LoginSchemaType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch (error) {
                throw new Error(`Erreur ${response.status}: ${errorText}`);
            }
            throw new Error(`Erreur ${response.status}: ${errorData.error || response.statusText}`);
        }

        const data = await response.json(); //For now the back-end responds with a string, not with a token, so we don't need to do a response.json()
        // et bah maintenant si {"token": "ey.......", "expireIn": 36000}
        // ;)
        return data;
    } catch (error) {
        if (error instanceof Error && error.message.length < 100) {
            throw new Error(error.message);
        } else {
            throw new Error('Une erreur est survenue');
        }
    }
};

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: login
    });
};

export const register = async (registrationData: RegisterSchemaType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText || response.statusText}`);
        }

        const data = await response.json(); //For now the back-end responds with a string, not with a token, so we don't need to do a response.json()

        return data;
    } catch (error) {
        if (error instanceof Error && error.message.length < 100) {
            throw new Error(error.message);
        } else {
            throw new Error('Une erreur est survenue');
        }
    }
};

export const useRegister = () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: register
    });
};
