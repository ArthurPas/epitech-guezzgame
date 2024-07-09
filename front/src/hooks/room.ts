
import { useQuery, useMutation } from '@tanstack/react-query';
import { Game, gameSchema } from '@/interfaces/room';

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


const submitPlaylist = async (playlist: { games: { name: string; }[] }): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  });

  if (!response.ok) {
    throw new Error('Failed to submit playlist');
  }

  return response.json();
};



export const useSubmitPlaylist = () => {
  return useMutation<any, Error, { games: { name: string; picture?: string }[] }, unknown>({
    mutationFn: submitPlaylist,
  });
};
