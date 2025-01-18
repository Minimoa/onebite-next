// clinet component 로 사용하기 위한 디렉티브
// "use client"

import ClientComponent from '@/components/client-component';
import ServerComponnet from '@/components/server-component';

export default function Home() {
  console.log('HomeCaomponent 실행')
  return (
    <div><ClientComponent><ServerComponnet/></ClientComponent></div>
  );
}
