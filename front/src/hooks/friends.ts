import { FriendType } from "@/interfaces/friends";
import { useQuery } from "@tanstack/react-query";

export const fetchFriends = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friendship/${id}`);
    const data = await response.json();

    return data;
};

export const useGetFriends = (id: number) => {
    return useQuery<FriendType>({
        queryKey: [`/friendship/${id}`],
        queryFn: () => fetchFriends(id),
    });
};