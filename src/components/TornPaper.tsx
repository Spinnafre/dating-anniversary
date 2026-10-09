import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, Pattern, Line, Rect } from 'react-native-svg';

interface TornPaperProps {
  children: ReactNode;
  rotation?: number;
  ruled?: boolean;
}

export function TornPaper({ children, rotation = 0, ruled = false }: TornPaperProps) {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  return (
    <View
      style={[
        styles.container,
        { transform: [{ rotate: `${rotation}deg` }] },
      ]}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setLayout({ width, height });
      }}
    >
      {layout.width > 0 && layout.height > 0 && (
        <View style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%">
            <Defs>
              <Pattern id="ruled" patternUnits="userSpaceOnUse" width={100} height={32}>
                <Line x1={0} y1={31} x2="100%" y2={31} stroke="#e3edf5" strokeWidth={1} />
              </Pattern>
            </Defs>
            <Path
              d={generateTornPath(layout.width, layout.height)}
              fill="#fdfaf2"
              stroke="#ece5d3"
              strokeWidth={1}
            />
            {ruled && (
              <>
                <Path
                  d={generateTornPath(layout.width, layout.height)}
                  fill="url(#ruled)"
                />
                <Line x1={46} y1={0} x2={46} y2={layout.height} stroke="#f7cfcf" strokeWidth={2} />
              </>
            )}
          </Svg>
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

// Gera o caminho de um retângulo com bordas superior e inferior rasgadas/irregulares
function generateTornPath(w: number, h: number) {
  const points = [];
  const segments = 20;
  
  // Top edge
  points.push(`M 0,${6 + Math.random() * 4}`);
  for (let i = 1; i <= segments; i++) {
    const x = (w / segments) * i;
    const y = Math.random() * 8;
    points.push(`L ${x},${y}`);
  }
  
  // Right edge
  points.push(`L ${w},${h - (6 + Math.random() * 4)}`);
  
  // Bottom edge
  for (let i = segments - 1; i >= 0; i--) {
    const x = (w / segments) * i;
    const y = h - (Math.random() * 8);
    points.push(`L ${x},${y}`);
  }
  
  // Left edge
  points.push(`Z`);
  return points.join(' ');
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: '#5a2832',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
  content: {
    paddingTop: 55,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
});
