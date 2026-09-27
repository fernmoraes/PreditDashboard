import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

const VARIANTS = {
  red: { bg: colors.redSoft, fg: colors.red },
  yellow: { bg: colors.yellowSoft, fg: colors.yellow },
  green: { bg: colors.greenSoft, fg: colors.green },
  blue: { bg: colors.blueSoft, fg: colors.blue },
  gray: { bg: colors.panel3, fg: colors.muted },
  solidRed: { bg: colors.red, fg: '#FFFFFF' },
};

// Etiqueta de status: retangular, caixa alta condensada (estilo etiqueta de oficina)
export default function Badge({ variant = 'blue', label, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.blue;
  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, style]}>
      <Text style={[styles.label, { color: v.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  label: { fontFamily: fonts.condensedBold, fontSize: 13, letterSpacing: 0.3, textTransform: 'uppercase' },
});
