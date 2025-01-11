import SearchableLayout from '@/components/searchable-layout'
import { ReactNode, useEffect, useState } from 'react'
import BookItem from '@/components/book-item'
import fetchBooks from '@/lib/fetch-books'
import { BookData } from '@/types'
import { useRouter } from 'next/router'
import Head from 'next/head'

// GetServerSidePropsContext: 현재 브라우저로부터 받은 모든 객체들이 들어 있는 내장 객체
// export const getServerSideProps = async(context: GetServerSidePropsContext) => {
// export const getStaticProps = async(context: GetStaticPropsContext) => {
//   //query string은 꺼내올 수 없음 (빌드 타임에 알 수 없으니까)
//   // const q = context.query.q
//   // const books = await fetchBooks(q as string)
//   return {
//     props: {
//       books,
//     }
//   }
// }
export default function Page () {
  const [books, setBooks] = useState<BookData[]>([])
  const router = useRouter()
  const q = router.query.q

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string)
    setBooks(data)
  }
  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult()
    }
  },[q])
  
  return (
  <>
  <Head>
    <title>한입북스 - 검색결과</title>
    {/* 메타 태그에서 /는 public 디렉토리를 참조함 */}
    <meta property='og:image' content='/thumnail.png'/>
    <meta 
      property='og:description'
      content='한입 북스에 등록된 도서들을 만나보세요'
      />
  </Head>
    <div>
      {books.map((book) =>
        <BookItem key={book.id} {...book} />
      )}
    </div>
  </>)
}


Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}