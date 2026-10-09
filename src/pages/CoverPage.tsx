import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useBook } from "../book/BookContext";
import { NavButton } from "../components/NavButton";
import { cover } from "../content/story";
import { colors, fonts } from "../theme/tokens";

const GOLD_LIGHT = "#f3e5ab";
const GOLD_DARK = "#997825";

/** Capa do livro: couro, lombada, moldura dourada dupla e título gravado. */
export function CoverPage() {
  const insets = useSafeAreaInsets();
  const { hasVisitedPage, goNext } = useBook();
  const hasVisited = hasVisitedPage(0);

  return (
    <LinearGradient
      colors={[...colors.leather]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.leather}
    >
      {/* Lombada / vinco lateral esquerdo */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.45)",
          "rgba(255,255,255,0.04)",
          "rgba(0,0,0,0.3)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.spine}
        pointerEvents="none"
      />

      <View
        style={[
          styles.frameArea,
          { paddingTop: insets.top + 22, paddingBottom: insets.bottom + 22 },
        ]}
      >
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            <Text style={[styles.ornament, styles.goldShadow]}>
              {cover.ornament}
            </Text>

            <Animated.View
              entering={
                hasVisited ? undefined : FadeIn.duration(900).delay(150)
              }
              style={styles.content}
            >
              <Animated.Text
                entering={hasVisited ? undefined : ZoomIn.duration(700)}
                style={[styles.fleur, styles.goldShadow]}
              >
                ⚜
              </Animated.Text>

              <Text style={[styles.pretitle, styles.goldShadow]}>
                {cover.pretitle}
              </Text>
              <Text style={styles.title}>{cover.title.join("\n")}</Text>

              <View style={styles.divider} />

              <Text style={[styles.subtitle, styles.goldShadow]}>
                {cover.subtitle}
              </Text>

              <Text style={[styles.fleur, styles.goldShadow]}>⚜</Text>
            </Animated.View>

            <Animated.View
              entering={hasVisited ? undefined : FadeIn.duration(900).delay(300)}
            >
              <NavButton 
                label="Abrir ›" 
                variant="pill" 
                onPress={goNext} 
                style={{ marginTop: 24 }}
              />
            </Animated.View>

            {/* Espaçador para equilibrar o ornamento do topo */}
            <View style={styles.ornamentSpacer} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  leather: {
    flex: 1,
  },
  spine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 28,
    borderRightWidth: 1,
    borderRightColor: "rgba(0,0,0,0.4)",
  },
  frameArea: {
    flex: 1,
    paddingLeft: 40, // deixa a lombada respirar
    paddingRight: 22,
  },
  outerBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.goldFrame,
    borderRadius: 2,
    padding: 6,
  },
  innerBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.4)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  ornament: {
    fontFamily: fonts.cinzel,
    fontSize: 14,
    letterSpacing: 4,
    color: colors.gold,
  },
  ornamentSpacer: {
    height: 14,
  },
  content: {
    alignItems: "center",
    gap: 10,
  },
  fleur: {
    fontSize: 21,
    color: colors.gold,
    opacity: 0.9,
  },
  pretitle: {
    fontFamily: fonts.cormorant,
    fontSize: 18,
    letterSpacing: 2,
    color: GOLD_LIGHT,
  },
  title: {
    fontFamily: fonts.cinzel,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: 4,
    textAlign: "center",
    color: colors.gold,
    textShadowColor: "rgba(0,0,0,0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    width: 48,
    height: 1,
    marginVertical: 6,
    backgroundColor: GOLD_DARK,
  },
  subtitle: {
    fontFamily: fonts.cormorant,
    fontSize: 15,
    letterSpacing: 1.5,
    textTransform: "lowercase",
    color: GOLD_LIGHT,
    opacity: 0.85,
  },
  // text-shadow que simula gravação em ouro (--gold-stamp-shadow)
  goldShadow: {
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
