import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radiusSm, type } from '../theme';

// Marca + eyebrow + título/subtítulo da tela (Documentacao.md seções 5.1 e 5.2)
// `onReset`: botão "Reiniciar" (e long-press no logo) volta a demo ao estado inicial, com confirmação
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
      <View style={styles.brand}>
        <Pressable onLongPress={confirmReset} delayLongPress={800} style={styles.logoBox}>
          <Image source={require('../../assets/splash-icon.png')} style={styles.logo} />
        </Pressable>
        <View style={styles.brandText}>
          <Text style={styles.brandName}>Predit</Text>
          <Text style={styles.brandSub}>VIN Share Intelligence</Text>
        </View>

        {onReset && (
          <Pressable
            onPress={confirmReset}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Reiniciar experiência"
            style={({ pressed }) => [styles.reset, pressed && styles.resetPressed]}
          >
            <Ionicons name="refresh" size={15} color={colors.soft} />
            <Text style={styles.resetText}>Reiniciar</Text>
          </Pressable>
        )}
      </View>

      <Text style={type.eyebrow}>Dashboard Ford / Concessionária</Text>
      <Text style={[type.h1, styles.title]}>{title}</Text>
      {subtitle ? <Text style={type.body}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.panel2,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 28, height: 28, resizeMode: 'contain' },
  brandText: { flex: 1 },
  brandName: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  brandSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  reset: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.panel3,
    borderColor: colors.lineStrong,
    borderWidth: 1,
    borderRadius: radiusSm,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  resetPressed: { opacity: 0.7 },
  resetText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.soft },
  title: { marginTop: 4, marginBottom: 4 },
});
