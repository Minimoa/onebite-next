// CSS Module
import { ReactNode, useEffect } from 'react'
import style from "./index.module.css"
import SearchableLayout from '@/components/searchable-layout'
import books from '@/mock/books.json'
import BookItem from '@/components/book-item'
import { InferGetServerSidePropsType } from 'next'

// SSR로 페이지를 동작하게 하기 위한 컨벤션 함수
export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  const data = "hello"
  console.log('서버사이드프롭스예요')
  return {
    props: {
      data,
    }
  }
}

// InferGetServerSidePropsType는 getServerSideProps의 타입을 추론하는 넥스트 내장 타입
export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data)
  useEffect(() => {
    console.log(window)
  }, [])
  return <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서</h3>
      {books.map((book) => (
      <BookItem key={book.id} {...book}/>
      ))}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {books.map((book) => (
      <BookItem key={book.id} {...book}/>
      ))}
    </section>
  </div>
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}