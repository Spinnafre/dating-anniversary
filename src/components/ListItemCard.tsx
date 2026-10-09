import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors, fonts } from '../theme/tokens';
import { ListItem } from '../content/story';

interface ListItemCardProps {
  item: ListItem;
  index: number;
  hasVisited?: boolean;
}

export function ListItemCard({ item, index, hasVisited }: ListItemCardProps) {
  return (
    <Animated.View entering={hasVisited ? undefined : FadeInDown.delay(index * 100).duration(600)}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
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
    borderColor: 'rgba(225,185,185,0.5)',
    backgroundColor: 'rgba(255,255,255,0.72)',
    marginBottom: 10,
    shadowColor: '#783c46',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
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
