
import { useMutation, useQuery } from '@tanstack/react-query';
import { Game, NewParty, PlaylistToSend } from '@/interfaces/room';

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


export const Party = async (party: NewParty): Promise<any> => {
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
export const addGame = async (party: NewParty): Promise<any> => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/addGame`, {
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
      console.error("Failed to add game to party", error);
      throw error;
  }
};

export const removeGame = async (party: NewParty): Promise<any> => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/removeGame`, {
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
      console.error("Failed to remove game to party", error);
      throw error;
  }
};

export const useNewParty = () => {
  return useMutation({
      mutationKey: ['party'],
      mutationFn: (party: PlaylistToSend) => Party(party)
  });
};
export const useAddGame = () => {
  return useMutation({
      mutationKey: ['party'],
      mutationFn: (party: PlaylistToSend) => addGame(party)
  });
};
export const useRemoveGame = () => {
  return useMutation({
      mutationKey: ['party'],
      mutationFn: (party: PlaylistToSend) => removeGame(party)
  });
};

export const fetchRandomCode= async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/generateRandomCode`);
  const data = await response.json();
  
  const partyCode:number = data.code;
  return partyCode;
};

export const useRandomCode = () => {
  return useQuery<number>({
    queryKey: [`/randomCode`],
    queryFn: () => fetchRandomCode(),
})};


export const joinParty= async (partyCode:number, userLogin:string) => {
  const token = localStorage.getItem('authToken')
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/party/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({partyCode: partyCode, userLogin: userLogin})
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