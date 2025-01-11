import { ReactNode } from 'react';
import SearchBar from './search/searchBar';

export default function Layout ({
  children
}: { children: ReactNode }) {
  return (
    <div>
      <SearchBar/>
      {children}
    </div>

  )
}