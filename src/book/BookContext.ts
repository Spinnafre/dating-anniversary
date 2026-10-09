import { createContext, useContext } from 'react';

export const BookContext = createContext({
  currentIndex: 0,
  isFlipping: false,
  pageCount: 8,
  isNavHidden: false,
  setNavHidden: (_hidden: boolean) => {},
  goNext: () => {},
  goPrev: () => {},
  goTo: (_index: number) => {},
  hasVisitedPage: (_index: number): boolean => false,
});

export const useBook = () => useContext(BookContext);
