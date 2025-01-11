import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // revalidate 시킬 path
  try {
    await res.revalidate('/')
    return res.json({ revalidate: true })
  } catch(e) {
    res.status(500).send('Revalidation Failed')
    console.log(e)
  }
}