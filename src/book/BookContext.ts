import { createContext, useContext } from 'react';

export const BookContext = createContext({
  currentIndex: 0,
  pageCount: 8,
  goNext: () => {},
  goPrev: () => {},
  goTo: (index: number) => {},
});

export const useBook = () => useContext(BookContext);
