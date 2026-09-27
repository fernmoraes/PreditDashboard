import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, type } from '@/constants/theme';

// Faixa azul Ford com a marca + título da tela (Documentacao.md 5.1 e 5.2)
// `onReset`: botão "Reiniciar" (e long-press no logo) volta a demo ao estado inicial, com confirmação.
// Deve ser o 1º filho do <Screen> — as margens negativas estendem a faixa até as bordas.
export default function AppHeader({ title, subtitle, onReset }) {
  const confirmReset = () => {
    if (!onReset) return;
    Alert.alert(
      'Reiniciar experiência?',
      'Todos os clientes voltam ao estado inicial e o histórico de conversas é apagado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reiniciar', style: 'destructive', onPress: onReset },
      ],
    );
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.band}>
        <Pressable onLongPress={confirmReset} delayLongPress={800} style={styles.brand}>
          <Image source={require('@assets/images/splash-icon.png')} style={styles.logo} />
          <View>
            <Text style={styles.brandName}>Predit</Text>
            <Text style={styles.brandSub}>Pós-venda · Rede Ford</Text>
          </View>
        </Pressable>

        {onReset && (
          <Pressable
            onPress={confirmReset}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Reiniciar experiência"
            style={({ pressed }) => [styles.reset, pressed && styles.resetPressed]}
          >
            <Ionicons name="refresh" size={16} color={colors.onBrand} />
            <Text style={styles.resetText}>Reiniciar</Text>
          </Pressable>
        )}
      </View>

      <Text style={[type.h1, styles.title]}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  band: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.brand,
    marginHorizontal: -16,
    marginTop: -16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 30, height: 30, resizeMode: 'contain' },
  brandName: { fontFamily: fonts.condensedBold, fontSize: 22, color: colors.onBrand, lineHeight: 24 },
  brandSub: { fontFamily: fonts.medium, fontSize: 12, color: colors.onBrandMuted },
  reset: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  resetPressed: { backgroundColor: 'rgba(255,255,255,0.12)' },
  resetText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.onBrand },
  title: { marginTop: 18 },
  subtitle: { ...type.body, color: colors.muted, marginTop: 2 },
});
