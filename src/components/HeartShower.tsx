import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const EMOJIS = ['❤️', '💖', '💕', '❦', '🌸', '✨'];

interface HeartData {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export function HeartShower({ trigger, count = 45 }: { trigger: number; count?: number }) {
  const { width, height } = useWindowDimensions();
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    if (trigger <= 0) return;

    const newHearts: HeartData[] = [];
    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + i + Math.random(),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.random() * (width - 40) + 10,
        size: Math.floor(Math.random() * 18) + 16, // 16 - 34
        duration: Math.floor(Math.random() * 2000) + 2500, // 2.5s - 4.5s
        delay: i * 65,
      });
    }

    setHearts(newHearts);
  }, [trigger, count, width]);

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {hearts.map((heart) => (
        <FallingHeart
          key={heart.id}
          heart={heart}
          screenHeight={height}
          onComplete={() => removeHeart(heart.id)}
        />
      ))}
    </View>
  );
}

function FallingHeart({
  heart,
  screenHeight,
  onComplete,
}: {
  heart: HeartData;
  screenHeight: number;
  onComplete: () => void;
}) {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      heart.delay,
      withTiming(
        screenHeight + 50,
        { duration: heart.duration, easing: Easing.linear },
        (finished) => {
          if (finished) runOnJS(onComplete)();
        }
      )
    );

    opacity.value = withDelay(
      heart.delay + heart.duration * 0.7,
      withTiming(0, { duration: heart.duration * 0.3 })
    );

    rotate.value = withDelay(
      heart.delay,
      withTiming(360, { duration: heart.duration })
    );
  }, [heart, screenHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.Text
      style={[
        styles.heart,
        {
          left: heart.x,
          fontSize: heart.size,
        },
        animatedStyle,
      ]}
    >
      {heart.emoji}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
});
