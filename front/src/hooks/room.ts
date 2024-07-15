
import { useMutation, useQuery } from '@tanstack/react-query';
import { gameSchema, playerSchema, partySchema, Game, Player, Playlist, PlaylistToSend } from '@/interfaces/room';

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


export const Party = async (party: PlaylistToSend): Promise<any> => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(party)
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Failed to create party", error);
      throw error;
  }
};

// Define the custom hook using useMutation from react-query
export const useParty = () => {
  return useMutation({
      mutationKey: ['party'],
      mutationFn: (party: PlaylistToSend) => Party(party)
  });
};