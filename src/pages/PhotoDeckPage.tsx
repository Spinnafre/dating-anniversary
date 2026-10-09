import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';

import { Polaroid } from '../components/Polaroid';
import { photoDeck } from '../content/story';
import { colors, fonts } from '../theme/tokens';

const ROTATIONS = [-2.5, 3.5, -4, 2, -3];

export function PhotoDeckPage() {
  const { width } = useWindowDimensions();
  const [deck, setDeck] = useState(photoDeck.photos);
  const polaroidWidth = width * 0.72;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const moveTopToBack = () => {
    setDeck((prev) => {
      const [top, ...rest] = prev;
      return [...rest, top];
    });
    translateX.value = 0;
    translateY.value = 0;
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      const SWIPE_THRESHOLD = 110;
      const VELOCITY_THRESHOLD = 400;

      if (
        Math.abs(e.translationX) > SWIPE_THRESHOLD ||
        Math.abs(e.velocityX) > VELOCITY_THRESHOLD
      ) {
        const direction = e.translationX > 0 ? 1 : -1;
        translateX.value = withTiming(
          direction * (width + 100),
          { duration: 250 },
          () => {
            runOnJS(moveTopToBack)();
          }
        );
      } else {
        translateX.value = withSpring(0, { mass: 0.5, damping: 12 });
        translateY.value = withSpring(0, { mass: 0.5, damping: 12 });
      }
    });

  const topCardAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width / 2, width / 2],
      [-15, 15]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate + ROTATIONS[0]}deg` },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>{photoDeck.badge}</Text>
        <Text style={styles.title}>{photoDeck.title}</Text>
      </View>

      <View style={styles.deckContainer}>
        {deck
          .slice(0, 4)
          .reverse()
          .map((item, index) => {
            // Como revertemos a ordem do slice para renderizar de trás para frente no Z-index:
            // O item do topo é o último no array invertido.
            const totalVisible = Math.min(deck.length, 4);
            const originalIndex = totalVisible - 1 - index;
            const isTop = originalIndex === 0;

            const baseRotation = ROTATIONS[originalIndex % ROTATIONS.length];
            const scale = 1 - originalIndex * 0.04;
            const offsetY = originalIndex * 4;

            if (isTop) {
              return (
                <GestureDetector key={`${item.caption}-${originalIndex}`} gesture={gesture}>
                  <Animated.View
                    style={[
                      styles.cardPositioner,
                      topCardAnimatedStyle,
                    ]}
                  >
                    <Polaroid
                      source={item.source}
                      caption={item.caption}
                      width={polaroidWidth}
                      rotation={0}
                    />
                  </Animated.View>
                </GestureDetector>
              );
            }

            return (
              <View
                key={`${item.caption}-${originalIndex}`}
                style={[
                  styles.cardPositioner,
                  {
                    transform: [
                      { rotate: `${baseRotation}deg` },
                      { scale },
                      { translateY: offsetY },
                    ],
                  },
                ]}
              >
                <Polaroid
                  source={item.source}
                  caption={item.caption}
                  width={polaroidWidth}
                  rotation={0}
                />
              </View>
            );
          })}
      </View>

      <Text style={styles.hint}>{photoDeck.hint} ↔</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  badge: {
    fontFamily: fonts.nunitoBold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#9c4d5d',
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.caveatBold,
    fontSize: 32,
    color: colors.ink,
    textAlign: 'center',
  },
  deckContainer: {
    width: '100%',
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPositioner: {
    position: 'absolute',
  },
  hint: {
    fontFamily: fonts.caveat,
    fontSize: 22,
    color: 'rgba(59,34,25,0.6)',
  },
});
