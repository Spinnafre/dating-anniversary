import { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { BookContext } from './BookContext';
import { BookNav } from './BookNav';
import { pages } from './pages';
import { PageWrapper } from './PageWrapper';

const DURATION = 950;
const EASING_CURVE = Easing.bezier(0.25, 0.1, 0.25, 1);

export function BookFlipper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState<{ from: number; to: number; direction: 'next' | 'prev' } | null>(null);
  const [visitedIndexes, setVisitedIndexes] = useState<Set<number>>(new Set([0]));

  const flipAngle = useSharedValue(0);
  const flipFrom = useSharedValue(-1);
  const flipTo = useSharedValue(-1);
  const sharedCurrentIndex = useSharedValue(0);

  useEffect(() => {
    const backAction = () => {
      if (currentIndex > 0) {
        goPrev();
        return true; // Prevents default back (app exit)
      }
      return false; // Exits app if on cover
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentIndex, flip]);

  const finishFlip = (newIndex: number) => {
    sharedCurrentIndex.value = newIndex;
    flipFrom.value = -1;
    flipTo.value = -1;
    setCurrentIndex(newIndex);
    setFlip(null);
    // Ao voltar para a capa (reiniciar o livro), reseta as páginas visitadas para recarregar tudo limpo
    if (newIndex === 0) {
      setVisitedIndexes(new Set([0]));
    }
  };

  const goNext = () => {
    if (flip || currentIndex >= pages.length - 1) return;
    const nextIndex = currentIndex + 1;
    setVisitedIndexes((prev) => new Set(prev).add(nextIndex));

    sharedCurrentIndex.value = currentIndex;
    flipFrom.value = currentIndex;
    flipTo.value = nextIndex;
    flipAngle.value = 0;
    setFlip({ from: currentIndex, to: nextIndex, direction: 'next' });

    flipAngle.value = withTiming(
      -180,
      { duration: DURATION, easing: EASING_CURVE },
      (finished) => {
        if (finished) {
          runOnJS(finishFlip)(nextIndex);
        }
      }
    );
  };

  const goPrev = () => {
    if (flip || currentIndex <= 0) return;
    const prevIndex = currentIndex - 1;
    setVisitedIndexes((prev) => new Set(prev).add(prevIndex));

    sharedCurrentIndex.value = currentIndex;
    flipFrom.value = currentIndex;
    flipTo.value = prevIndex;
    flipAngle.value = -180;
    setFlip({ from: currentIndex, to: prevIndex, direction: 'prev' });

    flipAngle.value = withTiming(
      0,
      { duration: DURATION, easing: EASING_CURVE },
      (finished) => {
        if (finished) {
          runOnJS(finishFlip)(prevIndex);
        }
      }
    );
  };

  const goTo = (index: number) => {
    if (flip || index === currentIndex) return;
    const direction = index > currentIndex ? 'next' : 'prev';
    if (index === 0) {
      setVisitedIndexes(new Set([0, currentIndex]));
    } else {
      setVisitedIndexes((prev) => new Set(prev).add(index));
    }

    const startAngle = direction === 'next' ? 0 : -180;
    const targetAngle = direction === 'next' ? -180 : 0;

    sharedCurrentIndex.value = currentIndex;
    flipFrom.value = currentIndex;
    flipTo.value = index;
    flipAngle.value = startAngle;
    setFlip({ from: currentIndex, to: index, direction });

    flipAngle.value = withTiming(
      targetAngle,
      { duration: DURATION, easing: EASING_CURVE },
      (finished) => {
        if (finished) {
          runOnJS(finishFlip)(index);
        }
      }
    );
  };

  const hasVisitedPage = (index: number) => visitedIndexes.has(index);

  const contextValue = {
    currentIndex,
    isFlipping: flip !== null,
    pageCount: pages.length,
    goNext,
    goPrev,
    goTo,
    hasVisitedPage,
  };

  return (
    <BookContext.Provider value={contextValue}>
      <View style={styles.container}>
        {pages.map((PageComponent, idx) => {
          const isVisited = visitedIndexes.has(idx);
          if (!isVisited) return null;

          return (
            <PageWrapper
              key={idx}
              idx={idx}
              currentIndex={currentIndex}
              sharedCurrentIndex={sharedCurrentIndex}
              isFlipping={flip !== null}
              PageComponent={PageComponent}
              flipFrom={flipFrom}
              flipTo={flipTo}
              flipAngle={flipAngle}
            />
          );
        })}

        {/* Navegação por setas (por cima de tudo) */}
        <BookNav />
      </View>
    </BookContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
});
