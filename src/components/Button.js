import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts, radiusSm } from '../theme';

// Variantes — Documentacao.md seções 6.4 e 7
const VARIANTS = {
  primary: { bg: colors.blue, border: colors.blue, fg: '#fff' },
  ghost: { bg: colors.panel3, border: colors.lineStrong, fg: colors.text },
  soft: { bg: colors.blueSoft, border: colors.blue, fg: colors.blue }, // "✨ Gerar mensagem"
  secondary: { bg: 'transparent', border: colors.lineStrong, fg: colors.text },
  alert: { bg: colors.redSoft, border: colors.red, fg: colors.red },
  whatsapp: { bg: colors.whatsapp, border: colors.whatsapp, fg: '#0a0b0f' },
};

export default function Button({ label, onPress, variant = 'ghost', icon, disabled, style }) {
  const v = VARIANTS[variant] ?? VARIANTS.ghost;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={6}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: v.bg, borderColor: v.border },
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={16} color={disabled ? colors.dim : v.fg} />}
      <Text style={[styles.label, { color: disabled ? colors.dim : v.fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: radiusSm,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  label: { fontFamily: fonts.semibold, fontSize: 14, textAlign: 'center', flexShrink: 1 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  disabled: { backgroundColor: colors.panel3, borderColor: colors.line },
});
