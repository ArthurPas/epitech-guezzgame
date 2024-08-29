import { ItemType,BuyItemPayload } from '@/interfaces/item';
import { useQuery } from '@tanstack/react-query';

export const fetchItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/list`);
    const data = await response.json();
    return data;
};
export const useFetchItems = () => {
    return useQuery<ItemType[]>({
        queryKey: [`/buy`],
        queryFn: () => fetchItems(),
    });
};

export const buyItem = async (item:BuyItemPayload) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/buy`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    
    const data = await response.json();
    return data;
};

export const useGetFriends = (item: BuyItemPayload) => {
    return useQuery<void>({
        queryKey: [`/buy`],
        queryFn: () => buyItem(item),
    });
};