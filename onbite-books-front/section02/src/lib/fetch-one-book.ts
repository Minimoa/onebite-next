import { BookData } from '@/types'

export default async function fetchOneBook(
  id: number
): Promise<BookData| null> {
  const url = `https://onebite-books-server-theta-bice.vercel.app//book/${id}`

  try {
    const reponse = await fetch(url)
    if (!reponse.ok) {
      throw new Error
    }
    return await reponse.json()
  } catch (err) { 
    console.log(err)
    return null
  }
}