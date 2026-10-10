import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeIn, FadeInUp, ZoomIn } from "react-native-reanimated";

import { useBook } from "../book/BookContext";
import { letter, couple } from "../content/story";
import { colors, fonts } from "../theme/tokens";
import { useTypewriter } from "../hooks/useTypewriter";
import { WashiTape } from "../components/WashiTape";

export function LoveLetterPage() {
  const { hasVisitedPage } = useBook();
  const hasVisited = hasVisitedPage(6);
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  const fullLetterText = `${letter.greeting}\n\n${letter.paragraphs.join(
    "\n\n",
  )}\n\n${letter.signoff}`;

  const { displayedText, isFinished, skip } = useTypewriter(
    modalVisible ? fullLetterText : "",
    35,
  );

  const envelopeWidth = width * 0.78;
  const envelopeHeight = envelopeWidth * 0.65;

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Capítulo 6 · Carta de Amor</Text>
      <Text style={styles.hintText}>Toque no selo de cera para abrir 💌</Text>

      {/* Envelope Stylized */}
      <Pressable onPress={() => setModalVisible(true)}>
        <Animated.View
          entering={hasVisited ? undefined : ZoomIn.duration(600)}
          style={[
            styles.envelope,
            { width: envelopeWidth, height: envelopeHeight },
          ]}
        >
          {/* Solapa / Flap Triângulo */}
          <View style={styles.envelopeFlap} />

          {/* Selo de Cera */}
          <View style={styles.waxSeal}>
            <Text style={styles.waxSealText}>{couple.sealInitial || "❦"}</Text>
          </View>
        </Animated.View>
      </Pressable>

      {/* Modal da Carta */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            entering={FadeInUp.duration(400)}
            style={styles.letterPaper}
          >
            {/* Cabeçalho do Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.letterBadge}>Uma carta para você 💕</Text>
              {!isFinished ? (
                <Pressable onPress={skip} style={styles.skipButton}>
                  <Text style={styles.skipText}>Pular ⏩</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Fechar ✕</Text>
                </Pressable>
              )}
            </View>

            {/* Conteúdo da Carta com Efeito Máquina de Escrever */}
            <ScrollView
              contentContainerStyle={styles.letterContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.typewrittenText}>{displayedText}</Text>
            </ScrollView>

            {/* Rodapé com botão fechar se finalizado */}
            {isFinished && (
              <Animated.View entering={FadeIn} style={styles.modalFooter}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>
                    Guardar no Coração 💖
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f0ea",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  tapeWrapper: {
    position: "absolute",
    top: 160,
    zIndex: 10,
  },
  pageTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#9c4d5d",
    marginBottom: 8,
  },
  hintText: {
    fontFamily: fonts.caveat,
    fontSize: 22,
    color: "rgba(59,34,25,0.7)",
    marginBottom: 40,
  },
  envelope: {
    backgroundColor: "#faf7f2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8ded2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    position: "relative",
    overflow: "hidden",
  },
  envelopeFlap: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 140,
    borderRightWidth: 140,
    borderTopWidth: 90,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#f3ece2",
  },
  waxSeal: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.waxSeal,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#b53e46",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  waxSealText: {
    fontFamily: fonts.cinzel,
    fontSize: 22,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  letterPaper: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: colors.letterBg,
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(59,34,25,0.1)",
  },
  letterBadge: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: "#9c4d5d",
    textTransform: "uppercase",
  },
  skipButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgba(156,77,93,0.1)",
    borderRadius: 12,
  },
  skipText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 12,
    color: "#9c4d5d",
  },
  closeButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  closeText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: "rgba(59,34,25,0.6)",
  },
  letterContent: {
    paddingVertical: 10,
  },
  typewrittenText: {
    fontFamily: fonts.caveat,
    fontSize: 24,
    lineHeight: 34,
    color: colors.letterInk,
  },
  modalFooter: {
    marginTop: 20,
    alignItems: "center",
  },
  doneButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#9c4d5d",
    borderRadius: 20,
  },
  doneButtonText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: "#fff",
  },
});
