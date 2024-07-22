import { useQuery } from '@tanstack/react-query';
import { TrackType } from '@/interfaces/spotifyApi';

export const fetchTracks = async (): Promise<TrackType> => {
    const response = await fetch(`/api/test`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export const useGetTracks = () => {
    return useQuery<TrackType>({
        queryKey: ['tracks'],
        queryFn: fetchTracks
    });
};
