// Tela de login — e-mail @ford.com + senha, com opção de lembrar as credenciais neste aparelho
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AuthScreen from '@/components/auth/AuthScreen';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { colors, fonts, radiusSm } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login, remembered } = useAuth();
  const passwordRef = useRef(null);

  // Se o login foi lembrado, já abre preenchido: é só tocar em Entrar
  const [username, setUsername] = useState(remembered?.email ?? '');
  const [password, setPassword] = useState(remembered?.password ?? '');
  const [remember, setRemember] = useState(!!remembered);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username.trim() || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    const result = await login({ username, password, remember });
    setLoading(false);
    if (result.error) setError(result.error);
    // sucesso: o Stack.Protected troca para as abas sozinho
  };

  return (
    <AuthScreen title="Entrar" subtitle="Acesse com seu e-mail corporativo Ford.">
      <TextField
        label="E-mail"
        value={username}
        onChangeText={(t) => {
          setUsername(t);
          setError(null);
        }}
        placeholder="nome.sobrenome@ford.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextField
        ref={passwordRef}
        label="Senha"
        value={password}
        onChangeText={(t) => {
          setPassword(t);
          setError(null);
        }}
        placeholder="Sua senha"
        secure
        autoCapitalize="none"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={submit}
      />

      <Pressable
        onPress={() => setRemember((r) => !r)}
        style={styles.checkRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: remember }}
        hitSlop={6}
      >
        <View style={[styles.checkbox, remember && styles.checkboxOn]}>
          {remember && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
        </View>
        <Text style={styles.checkText}>Lembrar e-mail e senha neste aparelho</Text>
      </Pressable>

      {error ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={18} color={colors.red} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <Button
        label={loading ? 'Entrando…' : 'Entrar'}
        variant="primary"
        icon="log-in-outline"
        onPress={submit}
        disabled={loading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem conta?</Text>
        <Pressable onPress={() => router.push('/cadastro')} hitSlop={8}>
          <Text style={styles.link}>Criar conta</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    backgroundColor: colors.panel2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.blue, borderColor: colors.blue },
  checkText: { fontFamily: fonts.medium, fontSize: 15, color: colors.soft },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.redSoft,
    borderRadius: radiusSm,
    padding: 10,
  },
  errorText: { flex: 1, fontFamily: fonts.medium, fontSize: 14, color: colors.text },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4 },
  footerText: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted },
  link: { fontFamily: fonts.semibold, fontSize: 15, color: colors.blue },
});
