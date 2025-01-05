import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const onClickButton = () => {
    router.push("/test")
  }
  return (
    <>
      {/* Link 컴포넌트를 이용한 이동 */}
      <Link href={"/"}>index</Link> /
      <Link href={"/search"}>serach</Link> /
      <Link href={"/book "}>book</Link> /
      {/* programmatic 하게 이동 */}
      <div><button onClick={onClickButton}>/test 페이지로 이동</button></div>
      <Component {...pageProps} />
    </>
  )
}
