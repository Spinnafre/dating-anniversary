import { createContext, useContext } from 'react';

export const BookContext = createContext({
  currentIndex: 0,
  isFlipping: false,
  pageCount: 8,
  goNext: () => {},
  goPrev: () => {},
  goTo: (_index: number) => {},
  hasVisitedPage: (_index: number): boolean => false,
});

export const useBook = () => useContext(BookContext);
