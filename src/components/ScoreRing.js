import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts } from '../theme';
import { riskColor, riskLabel, riskLevel } from '../utils/risk';

// Medidor de score (substitui o conic-gradient do web — Documentacao.md 6.1 / 14)
export default function ScoreRing({ score, size = 112, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = riskColor(riskLevel(score));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.panel3} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* (StyleSheet.absoluteFillObject não existe mais no RN 0.86 — posicionamento explícito) */}
      <View style={styles.center}>
        <Text style={[styles.value, { color }]} numberOfLines={1} adjustsFontSizeToFit maxFontSizeMultiplier={1.2}>
          {score}
        </Text>
        <Text style={[styles.caption, { color }]}>risco {riskLabel(score).toLowerCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  value: { fontFamily: fonts.extrabold, fontSize: 38, lineHeight: 40 },
  caption: { fontFamily: fonts.condensed, fontSize: 13 },
});
