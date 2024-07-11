import { useQuery } from '@tanstack/react-query';
import { DataEndGameType } from '../interfaces/dataEndGame';

export const fetchDataEndGame = async () => {
    const response = await fetch(`http://localhost:8080/party/result/123`);
    const data = await response.json();

    return data;
};

export const useGetDataEndGame = () => {
    return useQuery<DataEndGameType>({
        queryKey: ['dataEndGame'],
        queryFn: fetchDataEndGame
    });
};
