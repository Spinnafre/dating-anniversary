import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions, BackHandler } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { BookContext } from './BookContext';
import { BookNav } from './BookNav';
import { pages } from './pages';
import { useEffect } from 'react';

const DURATION = 700;

export function BookFlipper() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState<{ from: number; to: number; direction: 'next' | 'prev' } | null>(null);

  const flipAngle = useSharedValue(0);

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
  }, [currentIndex]);

  const goNext = () => {
    if (flip || currentIndex >= pages.length - 1) return;
    setFlip({ from: currentIndex, to: currentIndex + 1, direction: 'next' });
    flipAngle.value = 0;
    flipAngle.value = withTiming(-90, { duration: DURATION, easing: Easing.inOut(Easing.cubic) }, () => {
      runOnJS(finishFlip)(currentIndex + 1);
    });
  };

  const goPrev = () => {
    if (flip || currentIndex <= 0) return;
    setFlip({ from: currentIndex, to: currentIndex - 1, direction: 'prev' });
    flipAngle.value = -90;
    flipAngle.value = withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.cubic) }, () => {
      runOnJS(finishFlip)(currentIndex - 1);
    });
  };

  const goTo = (index: number) => {
    if (flip || index === currentIndex) return;
    const direction = index > currentIndex ? 'next' : 'prev';
    setFlip({ from: currentIndex, to: index, direction });
    flipAngle.value = direction === 'next' ? 0 : -90;
    flipAngle.value = withTiming(direction === 'next' ? -90 : 0, { duration: DURATION, easing: Easing.inOut(Easing.cubic) }, () => {
      runOnJS(finishFlip)(index);
    });
  };

  const finishFlip = (newIndex: number) => {
    setCurrentIndex(newIndex);
    setFlip(null);
    flipAngle.value = 0;
  };

  const contextValue = {
    currentIndex,
    pageCount: pages.length,
    goNext,
    goPrev,
    goTo,
  };

  const turningStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1200 },
        { translateX: -width / 2 },
        { rotateY: `${flipAngle.value}deg` },
        { translateX: width / 2 },
      ],
      zIndex: 10,
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    // Escurece a página que vira, simulando a luz
    const opacity = interpolate(flipAngle.value, [0, -90], [0, 0.4]);
    return { opacity, backgroundColor: '#000' };
  });

  const dropShadowStyle = useAnimatedStyle(() => {
    // Sombra projetada na página de baixo
    const opacity = interpolate(flipAngle.value, [0, -90], [0.35, 0]);
    return { opacity, backgroundColor: '#000' };
  });

  const activeIndex = flip ? flip.from : currentIndex;
  const targetIndex = flip ? flip.to : currentIndex;

  const ActivePage = pages[activeIndex];
  const TargetPage = pages[targetIndex];

  return (
    <BookContext.Provider value={contextValue}>
      <View style={styles.container}>
        
        {/* Página de baixo (parada) */}
        {flip && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {flip.direction === 'next' ? <TargetPage /> : <ActivePage />}
            <Animated.View style={[StyleSheet.absoluteFill, dropShadowStyle]} />
          </View>
        )}

        {/* Página de cima (virando) */}
        <Animated.View 
          style={[StyleSheet.absoluteFill, turningStyle]}
          pointerEvents={flip ? 'none' : 'auto'}
        >
          {flip ? (flip.direction === 'next' ? <ActivePage /> : <TargetPage />) : <ActivePage />}
          
          {/* Sombra de curvatura */}
          {flip && <Animated.View style={[StyleSheet.absoluteFill, shadowStyle]} />}
        </Animated.View>

        {/* Navegação por setas (por cima de tudo) */}
        <BookNav />
      </View>
    </BookContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
