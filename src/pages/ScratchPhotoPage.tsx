import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, PanResponder } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Svg, { Defs, Mask, Rect, Path } from 'react-native-svg';

import { WashiTape } from '../components/WashiTape';
import { Polaroid } from '../components/Polaroid';
import { scratchPhoto } from '../content/story';
import { colors, fonts } from '../theme/tokens';

export function ScratchPhotoPage() {
  const { width } = useWindowDimensions();
  const [revealed, setRevealed] = useState(false);
  const [pathData, setPathData] = useState('');
  
  const pathRef = useRef('');
  const pointsCountRef = useRef(0);

  const polaroidWidth = width * 0.78;
  const imageSize = polaroidWidth * 0.86; // Tamanho exato da área da foto dentro da Polaroid

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        if (revealed) return;
        const { locationX, locationY } = evt.nativeEvent;
        const startPath = `M ${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        pathRef.current = startPath;
        setPathData(startPath);
      },
      onPanResponderMove: (evt) => {
        if (revealed) return;
        const { locationX, locationY } = evt.nativeEvent;
        pathRef.current += ` L ${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        pointsCountRef.current += 1;
        setPathData(pathRef.current);

        // Após raspar uma boa quantidade de pontos (~45 pontos de movimento), revela a foto
        if (pointsCountRef.current > 45 && !revealed) {
          setRevealed(true);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.tapeWrapper}>
          <WashiTape rotation={-3} width={100} />
        </View>

        <Text style={styles.title}>{scratchPhoto.title}</Text>
        <Text style={styles.hint}>{scratchPhoto.hint}</Text>

        <View style={styles.cardWrapper}>
          <Polaroid 
            source={scratchPhoto.photo} 
            note={revealed ? scratchPhoto.note : '?'} 
            date={revealed ? scratchPhoto.date : '?'}
            width={polaroidWidth} 
            rotation={2}
          />

          {/* Área interativa da raspadinha por cima da foto da Polaroid */}
          {!revealed && (
            <Animated.View 
              exiting={FadeOut.duration(600)}
              style={[
                styles.scratchOverlay, 
                { 
                  width: imageSize, 
                  height: imageSize, 
                  top: polaroidWidth * 0.07, 
                  left: (polaroidWidth - imageSize) / 2 
                }
              ]}
              {...panResponder.panHandlers}
            >
              <Svg width={imageSize} height={imageSize}>
                <Defs>
                  <Mask id="scratchMask">
                    {/* Fundo branco = MÁSCARA VISÍVEL (tinta rosa) */}
                    <Rect x="0" y="0" width={imageSize} height={imageSize} fill="white" />
                    
                    {/* Linha preta = MÁSCARA TRANSPARENTE (onde o dedo raspou) */}
                    {pathData !== '' && (
                      <Path
                        d={pathData}
                        stroke="black"
                        strokeWidth={38}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    )}
                  </Mask>
                </Defs>

                {/* Retângulo com a cor rosa da raspadinha usando a máscara */}
                <Rect
                  x="0"
                  y="0"
                  width={imageSize}
                  height={imageSize}
                  fill={colors.scratchHeart}
                  mask="url(#scratchMask)"
                />
              </Svg>
            </Animated.View>
          )}
        </View>

        <View style={styles.footer}>
          {revealed && (
            <Animated.Text entering={FadeIn.duration(600)} style={styles.unlocked}>
              Foto desbloqueada ✨
            </Animated.Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.scratchBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tapeWrapper: {
    position: 'absolute',
    top: -40,
    zIndex: 20,
  },
  title: {
    fontFamily: fonts.nunitoBold,
    fontSize: 22,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontFamily: fonts.caveat,
    fontSize: 24,
    color: colors.waxSeal,
    textAlign: 'center',
    marginBottom: 30,
  },
  cardWrapper: {
    position: 'relative',
    marginTop: 10,
  },
  scratchOverlay: {
    position: 'absolute',
    borderRadius: 2,
    overflow: 'hidden',
    zIndex: 10,
  },
  footer: {
    height: 40,
    marginTop: 30,
    justifyContent: 'center',
  },
  unlocked: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: '#a35a70',
    textAlign: 'center',
  },
});
