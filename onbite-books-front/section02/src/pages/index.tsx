// CSS Module
import { ReactNode } from 'react'
import style from "./index.module.css"
import SearchableLayout from '@/components/searchable-layout'
import BookItem from '@/components/book-item'
import { InferGetStaticPropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-randowm-books'

// SSR로 페이지를 동작하게 하기 위한 컨벤션 함수
// export const getServerSideProps = async () => {

// SSG로 페이지를 동작하게 하기 위한 컨벤션 함수
export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  console.log('인덱스 페이지')
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])
  return {
    props: { 
      allBooks,
      recoBooks
    },
    revalidate: 3,
  }
}


// InferGetServerSidePropsType는 getServerSideProps의 타입을 추론하는 넥스트 내장 타입
export default function Home({allBooks, recoBooks}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서</h3>
      {recoBooks.map((book) => (
      <BookItem key={book.id} {...book}/>
      ))}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {allBooks.map((book) => (
      <BookItem key={book.id} {...book}/>
      ))}
    </section>
  </div>
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}