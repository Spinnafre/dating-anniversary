import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBook } from './BookContext';
import { colors, fonts } from '../theme/tokens';

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
          <Pressable onPress={goPrev} style={styles.circleButton}>
            <Text style={styles.arrow}>‹</Text>
          </Pressable>
        )}
      </View>

      {/* Indicador de página (só aparece dentro do livro) */}
      {!isCover && !isBackCover && (
        <Text style={styles.indicator}>
          {currentIndex} / {pageCount - 2}
        </Text>
      )}

      {/* Botão Avançar (›) */}
      <View style={styles.buttonContainer}>
        {!isBackCover && (
          <Pressable 
            onPress={goNext} 
            style={isCover ? styles.openButton : styles.circleButton}
          >
            {isCover ? (
              <Text style={styles.openText}>Abrir ›</Text>
            ) : (
              <Text style={styles.arrow}>›</Text>
            )}
          </Pressable>
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
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  arrow: {
    fontSize: 24,
    lineHeight: 28,
    color: '#fff',
    fontFamily: fonts.nunitoBold,
  },
  openText: {
    fontFamily: fonts.cinzel,
    fontSize: 14,
    color: colors.gold,
  },
  indicator: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
  },
});
