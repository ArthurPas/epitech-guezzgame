import { UserType } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";

export const fetchUserList = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/list`);
    const data = await response.json();

    return data;
};

export const useGetUserList = (id: number) => {
    return useQuery<UserType>({
        queryKey: [`/user/${id}`],
        queryFn: () => fetchUserList(id),
    });
};