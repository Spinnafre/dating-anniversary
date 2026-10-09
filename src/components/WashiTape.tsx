import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function WashiTape({ rotation = -2, color = 'rgba(255,182,193,0.65)', width = 120 }) {
  const height = 30;
  // Gerar borda serrilhada simples
  const createJaggedEdge = (isLeft: boolean) => {
    let d = `M ${isLeft ? 0 : width} 0`;
    const segments = 6;
    const step = height / segments;
    for (let i = 1; i <= segments; i++) {
      const spike = (i % 2 === 0 ? 0 : (isLeft ? 4 : -4));
      d += ` L ${isLeft ? spike : width + spike} ${i * step}`;
    }
    return d;
  };

  const d = `${createJaggedEdge(true)} L ${width} ${height} ${createJaggedEdge(false).replace('M', 'L')} Z`;

  return (
    <View style={[styles.container, { width, height, transform: [{ rotate: `${rotation}deg` }] }]}>
      <Svg width={width + 10} height={height} style={{ marginLeft: -5 }}>
        <Path d={d} fill={color} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});
