import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export function PageWrapper({
  idx,
  currentIndex,
  sharedCurrentIndex,
  isFlipping,
  PageComponent,
  flipFrom,
  flipTo,
  flipAngle,
}: any) {
  const containerStyle = useAnimatedStyle(() => {
    const isFlippingActive = flipFrom.value !== -1;
    const movingPage = flipFrom.value < flipTo.value ? flipFrom.value : flipTo.value;
    const isMoving = isFlippingActive && idx === movingPage;
    const isStationary = isFlippingActive && (idx === flipFrom.value || idx === flipTo.value) && !isMoving;
    const isActive = !isFlippingActive && idx === sharedCurrentIndex.value;
    const isVisible = isMoving || isStationary || isActive;

    let angle = 0;
    if (isMoving) {
      angle = flipAngle.value;
    } else if (idx < sharedCurrentIndex.value) {
      // páginas já lidas ficam viradas para a esquerda (-180)
      angle = -180;
    } else {
      // página ativa ou páginas futuras ficam na direita (0)
      angle = 0;
    }

    return {
      opacity: isVisible ? 1 : 0,
      zIndex: isMoving ? 10 : isVisible ? 1 : 0,
      transformOrigin: 'left',
      transform: [
        { perspective: 1200 },
        { rotateY: `${angle}deg` },
      ],
    };
  });

  const isPageActive = !isFlipping && idx === currentIndex;

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, containerStyle]}
      pointerEvents={idx === currentIndex ? 'auto' : 'none'}
    >
      <PageComponent isPageActive={isPageActive} />
    </Animated.View>
  );
}
