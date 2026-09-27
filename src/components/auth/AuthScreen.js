import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '@/constants/theme';

// Moldura das telas de login/cadastro: marca no topo + formulário que acompanha o teclado
export default function AuthScreen({ title, subtitle, children, showBrand = true, edges = ['top', 'bottom'] }) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {showBrand && (
            <View style={styles.brand}>
              <Image source={require('@assets/images/splash-icon.png')} style={styles.logo} />
              <Text style={styles.brandName}>Predit</Text>
              <Text style={styles.brandSub}>Retenção preditiva · Rede Ford</Text>
            </View>
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <View style={styles.form}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  brand: { alignItems: 'center', marginBottom: 32 },
  logo: { width: 72, height: 72, resizeMode: 'contain' },
  brandName: { fontFamily: fonts.condensedBold, fontSize: 36, color: colors.text, marginTop: 4 },
  brandSub: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  title: { fontFamily: fonts.condensedBold, fontSize: 26, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted, marginTop: 2 },
  form: { marginTop: 20, gap: 16 },
});
