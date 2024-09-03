import { PartyScoresAPIType } from '@/interfaces/partyScores';
import { useQuery } from '@tanstack/react-query';

export const fetchPartyScores = async (partyCode: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/result/${partyCode}`);
    const data = await response.json();

    return data;
};

export const useGetPartyScores = (partyCode: string) => {
    return useQuery<PartyScoresAPIType>({
        queryKey: ['partyScores', partyCode],
        queryFn: () => fetchPartyScores(partyCode),
        refetchInterval: 10000 // 10s
    });
};
