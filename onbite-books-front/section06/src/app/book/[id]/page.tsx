import { BookData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from '@/components/review-item';
import { ReviewEditor } from '@/components/review-editor';
import Image from 'next/Image'
// StaticParams에서 제공된 params 외에는 생성하지 않도록 하려면 false
// export const dynamicParams = false

// export const dynamic = ''
// 특정 페이지의 유형을 강제로 Static, Dynamic  페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 dynamic 페이지로 설정 
// 3. force-static: 페이지를 강제로 static으로 설정
// 4. error: 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유가 있으면 -> 빌드 오류)

// 빌드 타임에 미리 생성할 페이지 정보를 넘길 수 있음
export function generateStaticParams () {
  return [{id: '1'}, {id: '2'}, {id: '3'}] // 문자열 데이터로만 명시해야함
}

async function BookDetail({bookId}:{bookId: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`)
  if (!response.ok) {
    if (response.status === 404) {
      notFound() 
    }
    return <div>오류가 발생했습니다...</div>
  }
  const book:BookData = await response.json()
  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`}/>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  )
}


async function ReviewList({bookId}: {bookId: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {next: {tags: [`review-${bookId}`]}}
  )
  if (!response.ok) {
    new Error(`Review fetch failed:${response.statusText}`)
  }
  const reviews:ReviewData[] = await response.json()
  return (<section>{reviews.map((review) => <ReviewItem key={`review-item-${review.id}`}  {...review}/>)}</section>)
}


export async function generateMetadata({
  params
}: {
  params: Promise<{id: string}>
}) {
  const {id} = await params
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`)

  if (!response.ok) {
    throw new Error
  }

  const book: BookData = await response.json()
  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl]
    }
  }
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const paramsId = (await params).id
  return (
    <div className={style.container}>
      <BookDetail bookId={paramsId}/>
      <ReviewEditor bookId={paramsId}/>
      <ReviewList bookId={paramsId}/>
    </div>
  )
}
