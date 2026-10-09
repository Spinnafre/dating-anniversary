import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors, fonts } from '../theme/tokens';

export function Polaroid({ source, caption, note, date, rotation = 0, width = 280 }: any) {
  const paddingH = width * 0.07;
  const paddingT = paddingH;
  const paddingB = note || date ? paddingH * 2.5 : paddingH * 3.5;

  return (
    <View 
      style={[
        styles.container, 
        { 
          width,
          paddingHorizontal: paddingH,
          paddingTop: paddingT,
          paddingBottom: paddingB,
          transform: [{ rotate: `${rotation}deg` }]
        }
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image source={source} style={styles.image} contentFit="cover" />
      </View>
      
      {caption && <Text style={styles.caption}>{caption}</Text>}
      
      {(note || date) && (
        <View style={styles.footer}>
          {note && <Text style={styles.note}>{note}</Text>}
          {date && <Text style={styles.date}>{date}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.polaroid,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    alignSelf: 'center',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    fontFamily: fonts.caveat,
    fontSize: 22,
    color: colors.caption,
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  note: {
    fontFamily: fonts.caveat,
    fontSize: 18,
    color: 'rgba(43,43,43,0.7)',
  },
  date: {
    fontFamily: fonts.nunito,
    fontSize: 12,
    color: 'rgba(43,43,43,0.5)',
  }
});
