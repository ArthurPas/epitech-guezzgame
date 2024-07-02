import { UserType } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";

export const fetchUser = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
    const data = await response.json();

    return data;
};

export const useGetUser = (id: number) => {
    return useQuery<UserType>({
        queryKey: [`/user/${id}`],
        queryFn: () => fetchUser(id),
    });
};