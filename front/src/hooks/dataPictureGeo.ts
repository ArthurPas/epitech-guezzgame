import { useQuery } from '@tanstack/react-query';
import { DataPictureGeoType, dataPictureSchema } from '../interfaces/dataPictureGeo';

// API
const keys = ['318917914362557','1024216015288875','243516072185225','1170774080028241','322915470823412', '390843967093692','1418475011837439','1395451477753103','873613204663752','926837688198923', '550092599700936', '304829904534967'];
const token = 'MLY|7972898332774780|a736b008c14ff5587858c9e0cfc23f05';

const fetchDataPictureGeo = async (nbImage: number): Promise<DataPictureGeoType> => {
    const response = await fetch(`https://graph.mapillary.com/${keys[nbImage]}?access_token=${token}`);
    const data = await response.json();
    console.log("Données brutes de l'API pour l'image", nbImage, ": ", data); 
    return dataPictureSchema.parse(data);
};

// Génération des indexs uniques
const getRandomIndices = (num: number, max: number): number[] => {
    const indices: number[] = [];
    while (indices.length < num) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
};

// Récupérer et traiter les images
const fetchAndHandleImages = async (nbTours: number): Promise<DataPictureGeoType[]> => {
    try {

        const randomIndices = getRandomIndices(nbTours, keys.length);
        console.log("Indices aléatoires uniques générés : ", randomIndices);

        const fetchImagePromises = randomIndices.map(nbImage => 
            fetchDataPictureGeo(nbImage)
        );

        const images = await Promise.all(fetchImagePromises);
        console.log("Les images renvoyées du hook : ", images);

        console.log("Les images envoyées : ", images);
        return images;

    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

export const useGetDataPictureGeo = (nbTours: number) => {
    return useQuery<DataPictureGeoType[], Error>({
        queryKey: [`dataPictureGeo/${nbTours}`], 
        queryFn: () => fetchAndHandleImages(nbTours), 
    });
};
