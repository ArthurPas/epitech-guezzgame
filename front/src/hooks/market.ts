import { ItemType,BuyItemPayload } from '@/interfaces/item';
import { useMutation, useQuery } from '@tanstack/react-query';

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
    console.log(item+"fetch");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/buy/${item.id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    
    const data = await response.json();
    return data;
};

export const useBuyItem = () => {
    return useMutation({
        mutationKey: ['buy'],
        mutationFn: buyItem
    });
};

export const getInventory= async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/mine`,{
        method: 'GET',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authToken')}`
        }
    });
    
    const data = await response.json();
    return data;
};

export const useFetchInventory = () => {
    return useQuery<[ItemType]>({
        queryKey: [`inventory`],
        queryFn: () => getInventory(),
    });
};