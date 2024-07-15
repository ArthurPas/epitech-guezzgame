import { z } from "zod";

const spotifyApi = z.object({
  id: z.string(),
  name: z.string(),
  artist: z.string(),
  preview_url: z.string().url(),
});

const tracksArray = z.array(spotifyApi);

export type TrackType = z.infer<typeof tracksArray>;
