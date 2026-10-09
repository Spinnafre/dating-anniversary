import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { colors, fonts } from '../theme/tokens';
import { ListItem } from '../content/story';

interface ListItemCardProps {
  item: ListItem;
  index: number;
  hasVisited?: boolean;
}

export function ListItemCard({ item, index, hasVisited }: ListItemCardProps) {
  const isPressed = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(isPressed.value ? 1.015 : 1, { mass: 0.5 }) },
        { translateY: withSpring(isPressed.value ? -2.5 : 0, { mass: 0.5 }) },
      ],
      borderColor: isPressed.value ? '#f2a2b1' : 'rgba(225,185,185,0.5)',
      backgroundColor: isPressed.value ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.72)',
      shadowOpacity: withSpring(isPressed.value ? 0.15 : 0.06),
      shadowOffset: { width: 0, height: withSpring(isPressed.value ? 8 : 4) },
      shadowRadius: withSpring(isPressed.value ? 18 : 10),
    };
  });

  const emojiStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(isPressed.value ? 1.22 : 1, { mass: 0.5 }) },
        { rotate: withSpring(isPressed.value ? '6deg' : '0deg', { mass: 0.5 }) },
      ],
    };
  });

  return (
    <Animated.View entering={hasVisited ? undefined : FadeInDown.delay(index * 100).duration(600)}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.card, animatedStyle]}
        >
          <Animated.Text style={[styles.emoji, emojiStyle]}>{item.emoji}</Animated.Text>
          <Text style={styles.text}>{item.text}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#783c46',
  },
  emoji: {
    fontSize: 20,
    lineHeight: 24,
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontFamily: fonts.nunitoBold,
    fontSize: 15,
    color: colors.textMain,
    lineHeight: 20,
  },
});
