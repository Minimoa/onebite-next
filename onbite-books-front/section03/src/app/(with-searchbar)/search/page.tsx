import ClientComponent from '@/components/client-component'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{q: string}>
}) {
  const {q} = await searchParams
  return (
    <div>
      <ClientComponent>
        <></>
      </ClientComponent>
      서치 페이지 : {q} </div>
  )
}
