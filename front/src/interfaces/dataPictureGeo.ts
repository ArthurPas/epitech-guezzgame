import { z } from 'zod';

export const dataCoordinatesSchema = z.tuple([z.number(), z.number()]);

export const dataGeometrySchema = z.object({
    type: z.string(),  // 'type' est une chaîne de caractères
    coordinates: dataCoordinatesSchema,  // 'coordinates' est un tuple de deux nombres
});

export const dataPictureSchema = z.object({
    geometry: dataGeometrySchema,  // 'geometry' est un objet contenant 'type' et 'coordinates'
    id: z.string(),  // 'id' est une chaîne de caractères
});

export type DataPictureGeoType = z.infer<typeof dataPictureSchema>;
