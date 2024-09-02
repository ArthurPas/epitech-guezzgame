import { useQuery } from "@tanstack/react-query";
import { getMeSchema } from "@/interfaces/getMe";

export const fetchGetMe = async (token: string | null): Promise<getMeSchema> => {
  if (!token) {
    throw new Error("Token not found");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getMe`, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': token // Assurez-vous que c'est ici que le JWT est attendu par votre API
    }
  });

  if (!response.ok) {
    const errorText = await response.text(); // Récupérer le texte de la réponse pour le débogage
    throw new Error(`Failed to fetch user data: ${response.status} - ${errorText}`);
  }

  // Lire le texte de la réponse avant de l'analyser
  const responseText = await response.text();

  if (responseText.length === 0) {
    console.warn("Received empty response body");
    return {} as getMeSchema; // Gérer le cas de réponse vide
  }

  try {
    // Analyser le JSON
    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    throw new Error("Failed to parse JSON response: " + error.message);
  }
};

  

export const useGetMe = (token: string | null) => {
  return useQuery<getMeSchema, Error>({
    queryKey: ['getMe'],
    queryFn: () => fetchGetMe(token),
    enabled: !!token, // Only run if token is available
  });
};
