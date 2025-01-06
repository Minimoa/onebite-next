import SearchableLayout from '@/components/searchable-layout'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import BookItem from '@/components/book-item'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'

// GetServerSidePropsContext: 현재 브라우저로부터 받은 모든 객체들이 들어 있는 내장 객체
export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  const q = context.query.q
  const books = await fetchBooks(q as string)
  return {
    props: {
      books,
    }
  }
}
export default function Page ({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>
    {books.map((book) =>
      <BookItem key={book.id} {...book} />
    )}
  </div>
}


Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}