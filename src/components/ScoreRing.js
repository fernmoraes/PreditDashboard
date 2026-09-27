import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts } from '../theme';
import { riskColor, riskLevel } from '../utils/risk';

// Substitui o conic-gradient do web (Documentacao.md 6.1 / 14)
export default function ScoreRing({ score, size = 160, stroke = 14 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = riskColor(riskLevel(score));

  return (
    <View style={{ width: size, height: size, alignSelf: 'center' }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.lineStrong} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit maxFontSizeMultiplier={1.2}>
          {score}%
        </Text>
        <Text style={styles.caption}>Score Predit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // (StyleSheet.absoluteFillObject não existe mais no RN 0.86 — posicionamento explícito)
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24, // mantém o texto dentro do anel
  },
  value: { fontFamily: fonts.extrabold, fontSize: 34, color: colors.text },
  caption: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 2 },
});
