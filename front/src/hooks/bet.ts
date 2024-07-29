import {useMutation, useQuery} from '@tanstack/react-query';
import {BetRequestType, BetType} from "@/interfaces/bet";
import {login} from "@/hooks/auth";

export const fetchBets = async () => {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gambling/bets`,
        {
            method: 'GET',
        }
    );
    const data = await response.json();
    console.log('data', data);
    return data;
};

export const useGetBets = () => {
    return useQuery<BetType[]>({
        queryKey: [`/bets`],
        queryFn: () => fetchBets()
    });
};

export const placeBet = async (betInfo: BetRequestType) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/placeBet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(betInfo)
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

        return response.ok;

        // const data = await response.json(); //For now the back-end responds with a string, not with a token, so we don't need to do a response.json()
        // return data;
    } catch (error) {
        if (error instanceof Error && error.message.length < 100) {
            throw new Error(error.message);
        } else {
            throw new Error('Une erreur est survenue');
        }
    }
};

export const usePlaceBet = () => {
    return useMutation({
        mutationKey: ['placeBet'],
        mutationFn: placeBet
    });
};
