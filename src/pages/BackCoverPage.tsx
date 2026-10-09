import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Svg, { Circle, Defs, Pattern, Rect } from "react-native-svg";

import { useBook } from "../book/BookContext";
import { NavButton } from "../components/NavButton";
import { HeartShower } from "../components/HeartShower";
import { backCover, START_DATE } from "../content/story";
import { useElapsedTime } from "../hooks/useElapsedTime";
import { colors, fonts } from "../theme/tokens";

export function BackCoverPage() {
  const { goTo, hasVisitedPage } = useBook();
  const hasVisited = hasVisitedPage(7);
  const elapsed = useElapsedTime(START_DATE);
  const [showerTrigger, setShowerTrigger] = useState(0);

  const triggerShower = () => {
    setShowerTrigger((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* Texture Background */}
      <View style={StyleSheet.absoluteFill}>
        <Svg width="100%" height="100%">
          <Defs>
            <Pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <Circle cx="2" cy="2" r="1.5" fill="#3b2219" opacity="0.04" />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#dots)" />
        </Svg>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={hasVisited ? undefined : FadeIn.duration(800)}
          style={styles.outerBorder}
        >
          <View style={styles.innerBorder}>
            <Text style={styles.meta}>{backCover.meta}</Text>
            <Text style={styles.fleuron}>❀</Text>

            <View style={styles.titleContainer}>
              {backCover.titleLines.map((line, idx) => (
                <Text key={idx} style={styles.titleLine}>
                  {line}
                </Text>
              ))}
            </View>

            <View style={styles.divider} />

            <Text style={styles.dedication}>{backCover.dedication}</Text>

            {/* Placa do Contador de Tempo */}
            <View style={styles.timerCard}>
              <Text style={styles.timerLabel}>{backCover.timerLabel}</Text>

              {elapsed ? (
                <View style={styles.timerRow}>
                  <View style={styles.timerUnit}>
                    <Text style={styles.timerNumber}>{elapsed.days}</Text>
                    <Text style={styles.timerUnitLabel}>dias</Text>
                  </View>
                  <Text style={styles.timerSeparator}>:</Text>
                  <View style={styles.timerUnit}>
                    <Text style={styles.timerNumber}>
                      {String(elapsed.hours).padStart(2, "0")}
                    </Text>
                    <Text style={styles.timerUnitLabel}>horas</Text>
                  </View>
                  <Text style={styles.timerSeparator}>:</Text>
                  <View style={styles.timerUnit}>
                    <Text style={styles.timerNumber}>
                      {String(elapsed.minutes).padStart(2, "0")}
                    </Text>
                    <Text style={styles.timerUnitLabel}>min</Text>
                  </View>
                  <Text style={styles.timerSeparator}>:</Text>
                  <View style={styles.timerUnit}>
                    <Text style={styles.timerNumber}>
                      {String(elapsed.seconds).padStart(2, "0")}
                    </Text>
                    <Text style={styles.timerUnitLabel}>seg</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.futureText}>
                  O começo da nossa história...
                </Text>
              )}
            </View>

            {/* Ações */}
            <View style={styles.actions}>
              <Pressable onPress={triggerShower} style={styles.loveButton}>
                <Text style={styles.loveButtonText}>
                  {backCover.loveButton}
                </Text>
              </Pressable>

              <NavButton 
                label={backCover.replayButton} 
                variant="text" 
                onPress={() => goTo(0)} 
              />
            </View>

            <Text style={styles.footer}>{backCover.footer}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Chuva de Corações */}
      <HeartShower trigger={showerTrigger} count={45} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingBottom: 60,
  },
  outerBorder: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: colors.creamBorder,
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  innerBorder: {
    borderWidth: 1,
    borderColor: colors.creamBorder,
    borderRadius: 4,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  meta: {
    fontFamily: fonts.nunitoBold,
    fontSize: 12,
    letterSpacing: 2,
    color: "rgba(59,34,25,0.4)",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  fleuron: {
    fontSize: 20,
    color: colors.wine,
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  titleLine: {
    fontFamily: fonts.cinzel,
    fontSize: 24,
    letterSpacing: 3,
    color: colors.textMain,
    textAlign: "center",
    lineHeight: 32,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: colors.wine,
    marginVertical: 16,
    opacity: 0.5,
  },
  dedication: {
    fontFamily: fonts.cormorant,
    fontSize: 18,
    color: colors.ink,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  timerCard: {
    width: "100%",
    backgroundColor: "#FAF6F0",
    borderWidth: 1,
    borderColor: "#E3D9CE",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  timerLabel: {
    fontFamily: fonts.nunitoBold,
    fontSize: 12,
    letterSpacing: 1,
    color: "rgba(59,34,25,0.6)",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerUnit: {
    alignItems: "center",
    minWidth: 40,
  },
  timerNumber: {
    fontFamily: fonts.cinzel,
    fontSize: 22,
    color: colors.wine,
  },
  timerUnitLabel: {
    fontFamily: fonts.nunito,
    fontSize: 10,
    color: "rgba(59,34,25,0.5)",
    marginTop: 2,
  },
  timerSeparator: {
    fontFamily: fonts.cinzel,
    fontSize: 18,
    color: colors.wine,
    marginHorizontal: 4,
    marginBottom: 12,
  },
  futureText: {
    fontFamily: fonts.caveat,
    fontSize: 20,
    color: colors.wine,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  loveButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: colors.wine,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: colors.wine,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  loveButtonText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 15,
    color: "#fff",
    letterSpacing: 1,
  },
  footer: {
    fontFamily: fonts.cormorant,
    fontSize: 16,
    color: "rgba(59,34,25,0.4)",
  },
});
