import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface FriendData {
    id: number;
    login: string;
    picture: string;
}

const useAddFriend = (userId: number | null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const addFriend = async (friendData: FriendData) => {
        if (!userId) {
            throw new Error("L'ID de l'utilisateur est manquant.");
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friendship/new/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(friendData),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Une erreur est survenue');
                } else {
                    const errorText = await response.text();
                    throw new Error(`Erreur du serveur : ${errorText}`);
                }
            }

            const responseData = await response.json();
            toast({ description: 'Ami ajouté avec succès' });
        } catch (error: any) {
            setError(error.message || 'Une erreur inattendue est survenue');
            toast({ description: error.message || 'Une erreur inattendue est survenue' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        addFriend,
        isLoading,
        error,
    };
};

export default useAddFriend;