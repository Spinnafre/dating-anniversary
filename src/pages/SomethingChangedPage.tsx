import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { RadialGradient, Defs, Rect, Svg, Stop } from 'react-native-svg';

import { useBook } from '../book/BookContext';
import { TornPaper } from '../components/TornPaper';
import { ListItemCard } from '../components/ListItemCard';
import { somethingChanged } from '../content/story';
import { colors, fonts } from '../theme/tokens';

export function SomethingChangedPage() {
  const { hasVisitedPage } = useBook();
  const hasVisited = hasVisitedPage(2);

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient
              id="bg"
              cx="50%"
              cy="0%"
              rx="100%"
              ry="100%"
              fx="50%"
              fy="0%"
            >
              <Stop offset="0%" stopColor={colors.pinkBgFrom} />
              <Stop offset="100%" stopColor={colors.pinkBgTo} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#bg)" />
        </Svg>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TornPaper rotation={-0.5} ruled>
          <View style={styles.header}>
            <Text style={styles.badge}>{somethingChanged.badge}</Text>
            <Text style={styles.title}>{somethingChanged.title}</Text>
            <Text style={styles.subtitle}>{somethingChanged.subtitle}</Text>
          </View>

          <Text style={styles.listHeader}>{somethingChanged.listHeader}</Text>

          <View style={styles.list}>
            {somethingChanged.items.map((item, index) => (
              <ListItemCard key={index} item={item} index={index} hasVisited={hasVisited} />
            ))}
          </View>

          <Text style={styles.footer}>{somethingChanged.footer}</Text>
        </TornPaper>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.cormorant,
    fontSize: 16,
    color: '#7c5348',
    textAlign: 'center',
    marginTop: 4,
  },
  listHeader: {
    fontFamily: fonts.nunitoBold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#9c4d5d',
    marginBottom: 12,
    paddingLeft: 6,
  },
  list: {
    flexDirection: 'column',
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: fonts.caveat,
    fontSize: 20,
    color: '#7c5348',
  },
});
