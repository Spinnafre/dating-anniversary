import { Pressable, StyleSheet, Text, ViewStyle, TextStyle, PressableProps } from 'react-native';
import { colors, fonts } from '../theme/tokens';

export interface NavButtonProps extends PressableProps {
  label: string;
  variant?: 'circle' | 'pill' | 'text';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function NavButton({ label, variant = 'circle', style, textStyle, ...props }: NavButtonProps) {
  return (
    <Pressable 
      {...props} 
      style={({ pressed }) => [
        variant === 'circle' && styles.circleButton,
        variant === 'pill' && styles.pillButton,
        variant === 'text' && styles.textButton,
        style,
        pressed && { opacity: 0.6, transform: [{ scale: 0.95 }] },
      ]}
    >
      <Text style={[
        variant === 'circle' && styles.circleText,
        variant === 'pill' && styles.pillText,
        variant === 'text' && styles.textOnly,
        textStyle
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  textButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 24,
    lineHeight: 28,
    color: '#fff',
    fontFamily: fonts.nunitoBold,
  },
  pillText: {
    fontFamily: fonts.cinzel,
    fontSize: 14,
    color: colors.gold,
  },
  textOnly: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: 'rgba(59,34,25,0.6)',
  }
});
