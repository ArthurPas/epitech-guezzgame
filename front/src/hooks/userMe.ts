
import { UserType } from "@/interfaces/user";
import { UserMeType } from "@/interfaces/userMe";
import { useQuery } from "@tanstack/react-query";

export const fetchUserMe = async (token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getMe`, {
        method: 'GET', 
        headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json', 
        }
    });

    const data = await response.json();

    return data;
};


export const useGetMeUser = (token:string) => {
    return useQuery <UserMeType> ({
        queryKey: [`/user/getMe`],
        queryFn: () => fetchUserMe(token),
    });
};

////////////////////////////////////////////////////////////////////////////

export const fetchUser = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
    const data = await response.json();

    return data;
};

export const useGetUser = (id: number) => {
    return useQuery<UserMeType>({
        queryKey: [`/user/${id}`],
        queryFn: () => fetchUser(id),
    });
};

//////////////////////////////////////////////////////////////////////////////////////
