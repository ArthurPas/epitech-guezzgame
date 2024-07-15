import { useQuery } from '@tanstack/react-query';
import { DataEndGameType } from '../interfaces/dataEndGame';

export const fetchDataEndGame = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/result/123`);
    const data = await response.json();

    return data;
};

export const useGetDataEndGame = () => {
    return useQuery<DataEndGameType>({
        queryKey: ['dataEndGame'],
        queryFn: fetchDataEndGame
    });
};
