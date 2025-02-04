import Searchbar from "@/components/searchBar";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 사전 렌더링 과정에서 배제 하기 위해서 suspense로 감쌈 */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
