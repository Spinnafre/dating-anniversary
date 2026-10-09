import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBook } from './BookContext';
import { NavButton } from '../components/NavButton';

export function BookNav() {
  const { currentIndex, pageCount, goNext, goPrev } = useBook();
  const insets = useSafeAreaInsets();

  const isCover = currentIndex === 0;
  const isBackCover = currentIndex === pageCount - 1;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      {/* Botão Voltar (‹) */}
      <View style={styles.buttonContainer}>
        {!isCover && (
          <NavButton label="‹" variant="circle" onPress={goPrev} />
        )}
      </View>

      {/* Botão Avançar (›) */}
      <View style={styles.buttonContainer}>
        {!isBackCover && !isCover && (
          <NavButton label="›" variant="circle" onPress={goNext} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    pointerEvents: 'box-none',
    zIndex: 20,
    elevation: 20,
  },
  buttonContainer: {
    minWidth: 60,
    alignItems: 'center',
  },
});
