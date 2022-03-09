// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Artwork } from '../../data/datatypes';
import artworks from '../../data/static-data/art.json';

type Data = {
  artworks: Artwork[]
};

export async function getData() {
  return artworks;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const artworksData = await getData();
  res.status(200).json(artworksData);
}
