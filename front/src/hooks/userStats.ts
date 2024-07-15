import { UserStatType } from "@/interfaces/userStats";
import { useQuery } from "@tanstack/react-query";

export const fetchUser = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stat/userStat/${id}`);
    const data = await response.json();

    return data;
};

export const useGetUserStat = (id: number) => {
    return useQuery<UserStatType>({
        queryKey: [`/stat/userStat/${id}`],
        queryFn: () => fetchUser(id),
    });
};