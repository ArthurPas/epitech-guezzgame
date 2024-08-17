
import { useMutation, useQuery } from '@tanstack/react-query';
import { Game, PlaylistToSend } from '@/interfaces/room';

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

export const useParty = () => {
  return useMutation({
      mutationKey: ['party'],
      mutationFn: (party: PlaylistToSend) => Party(party)
  });
};

export const fetchRandomCode= async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/generateRandomCode`);
  const data = await response.json();
  console.log(data.code);
  return data.code;
};

export const useRandomCode = () => {
  return useQuery<number>({
    queryKey: [`/randomCode`],
    queryFn: () => fetchRandomCode(),
})};


export const joinParty= async (partyCode:number, userLogin:string) => {
  const token = localStorage.getItem('authToken')
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/join/${partyCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({login: userLogin})
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
} catch (error) {
    console.error("Failed to join party", error);
    throw error;
}
};

export const useJoinParty = (userLogin:string) => {
  return useMutation({
    mutationKey: ['party'],
    mutationFn: (partyCode: number) => joinParty(partyCode,userLogin)
})};