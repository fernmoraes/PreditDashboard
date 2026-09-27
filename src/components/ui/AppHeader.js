import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { DEALERS } from '@/constants/dealers';
import { colors, fonts, type } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useResetExperience } from '@/hooks/useResetExperience';

// Faixa do topo com a marca, saudação ao usuário logado e título da tela (Documentacao.md 5.1 e 5.2).
// "Reiniciar" (e long-press no logo) apaga tudo — clientes, contas e login lembrado — com confirmação.
// Deve ser o 1º filho do <Screen> — as margens negativas estendem a faixa até as bordas.
export default function AppHeader({ title, subtitle }) {
  const { session, logout } = useAuth();
  const resetExperience = useResetExperience();

  const firstName = session?.name.split(' ')[0];
  const dealerName = DEALERS.find((d) => d.id === session?.dealer)?.name;

  const confirmReset = () => {
    Alert.alert(
      'Reiniciar experiência?',
      'Os clientes voltam ao estado inicial e todas as contas cadastradas e o login salvo são apagados. Você volta para a tela de login.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Reiniciar', style: 'destructive', onPress: resetExperience },
      ],
    );
  };

  const confirmLogout = () => {
    Alert.alert('Sair da conta?', 'Você volta para a tela de login.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: logout },
    ]);
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
      </View>

      {session && (
        <View style={styles.greeting}>
          <View style={styles.greetingText}>
            <Text style={styles.welcome} numberOfLines={1}>
              Bem-vindo, {firstName}
            </Text>
            {dealerName ? (
              <Text style={styles.dealer} numberOfLines={1}>
                {dealerName}
              </Text>
            ) : null}
          </View>
          <Pressable
            onPress={confirmLogout}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
            style={({ pressed }) => [styles.logout, pressed && styles.resetPressed]}
          >
            <Ionicons name="log-out-outline" size={16} color={colors.soft} />
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
        </View>
      )}

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
  greeting: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  greetingText: { flex: 1 },
  welcome: { fontFamily: fonts.semibold, fontSize: 17, color: colors.text },
  dealer: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderColor: colors.lineStrong,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  logoutText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.soft },
  title: { marginTop: 14 },
  subtitle: { ...type.body, color: colors.muted, marginTop: 2 },
});
