import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

const VARIANTS = {
  red: { bg: colors.redSoft, fg: colors.red },
  yellow: { bg: colors.yellowSoft, fg: colors.yellow },
  green: { bg: colors.greenSoft, fg: colors.green },
  blue: { bg: colors.blueSoft, fg: colors.blue },
  gray: { bg: colors.panel3, fg: colors.muted },
};

// Pílula de status/risco (raio 999, fundo "soft" + texto na cor cheia)
export default function Badge({ variant = 'blue', label, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.blue;
  return (
    <View style={[styles.badge, { backgroundColor: v.bg, borderColor: v.fg + '55' }, style]}>
      <Text style={[styles.label, { color: v.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: { fontFamily: fonts.bold, fontSize: 12 },
});
