import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

// StaticParams에서 제공된 params 외에는 생성하지 않도록 하려면 false
// export const dynamicParams = false

export const dynamic = ''
// 특정 페이지의 유형을 강제로 Static, Dynamic  페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 dynamic 페이지로 설정 
// 3. force-static: 페이지를 강제로 static으로 설정
// 4. error: 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유가 있으면 -> 빌드 오류)

// 빌드 타임에 미리 생성할 페이지 정보를 넘길 수 있음
export function generateStaticParams () {
  return [{id: '1'}, {id: '2'}, {id: '3'}] // 문자열 데이터로만 명시해야함
}
export default async function Page({ params }: { params: Promise<{ id: string | string[] }> }) {
  const paramsId = (await params).id
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${paramsId}`)
  if (!response.ok) {
    if (response.status === 404) {
      notFound() 
    }
    return <div>오류가 발생했습니다...</div>
  }
  const book:BookData = await response.json()
  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
