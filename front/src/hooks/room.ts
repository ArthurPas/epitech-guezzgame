
import { useMutation, useQuery } from '@tanstack/react-query';
import { Game,  partySchema } from '@/interfaces/room';

export const fetchGame = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/list`);
  const data = await response.json();

  return data;
};

export const useGetGames = () => {
  return useQuery<Game[]>({
      queryKey: [`/game/list`],
      queryFn: () => fetchGame(),
  });
};


export const Party = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(partySchema)
      });};

export const useParty = () => {
  return useMutation({
      mutationKey: ['party'],
      mutationFn: Party
  });
};

