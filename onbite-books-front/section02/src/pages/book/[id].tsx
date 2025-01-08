/* eslint-disable @next/next/no-img-element */
import fetchOneBook from '@/lib/fetch-one-book'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import style from './[id].module.css'
import { useRouter } from 'next/router'


export const getStaticPaths = () => {
  return {
    paths: [
      { params: {id: "1"}, }, // 반드시 string이어야 함
      { params: {id: "2"}, },
      { params: {id: "3"}, },
    ],
    /**
     * fallbackOption
     * false: path에 명시하지 않은 페이지에 들어오면 not found 취급한다
     * blocking: 즉시 생성 (Like SSR)
     * true: 즉시 생성 + 페이지만 미리 반환
     */
    fallback: true,
  }
}
// export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  export const getStaticProps = async(context: GetStaticPropsContext) => {
  const id = context.params!.id
  const book = await fetchOneBook(Number(id))
  return {
    props: {
      book,
    }
  }
}
export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) return '로딩 중입니다'
  if (!book) {
    return {
      notFound: true, //404 페이지로 리다이렉트
    }
  }
  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book
  return <div className={style.container}>
    <div className={style.cover_img_container} style={{backgroundImage: `url('${coverImgUrl}')`}}>
      <img src={coverImgUrl} alt="" />
    </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author }>{author} | {publisher}</div>
      <div className={style.description}>{description}</div>
  </div>
} 