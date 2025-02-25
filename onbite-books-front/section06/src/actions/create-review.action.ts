"use server"

import { revalidateTag } from 'next/cache'

export async function createReviewAction(_: any, formData: FormData) {
  const content = formData.get('content')?.toString()
  const author = formData.get('author')?.toString()
  const bookId = formData.get('bookId')?.toString()

  if (!(content && author && bookId)) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요'
    }
  }

  try {
    const reponse = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`, 
      {
        method: 'POST',
        body: JSON.stringify({bookId, content, author})
      }
    )
    if (!reponse.ok) {
      throw new Error(reponse.statusText)
    }

    // // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`)

    // // 2. 특정 경로의 모든 동적 페이지를 재검증 (파일 경로, "page")
    // revalidatePath(`/book/[id]`, "page")

    // // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증 (layout 파일 경로, "layout")
    // revalidatePath(`/(with-serachbar)`, "layout")

    // // // 4. 모든 데이터 재검증
    // revalidatePath(`/`, "layout")

    // 5. 태그 기준, 데이터 캐시 재검증 (데이터 fetch 시에 tag 설정 할 수 있음)
    revalidateTag(`review-${bookId}`)
    return {
      status: true,
      error: ''
    }

  }catch(err) {
    console.error(err)
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다. ${err}`
    }
  }
}