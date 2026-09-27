// Tela de cadastro — nome, e-mail @ford.com, senha e concessionária
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AuthScreen from '@/components/auth/AuthScreen';
import DealerPicker from '@/components/auth/DealerPicker';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { DEALERS } from '@/constants/dealers';
import { colors, fonts } from '@/constants/theme';
import { MIN_PASSWORD, useAuth } from '@/context/AuthContext';
import { usePredit } from '@/context/PreditContext';

export default function CadastroScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { actions } = usePredit();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dealer, setDealer] = useState(null);
  const [error, setError] = useState(null); // { field, message }
  const [loading, setLoading] = useState(false);

  const clear = () => setError(null);
  const fieldError = (field) => (error?.field === field ? error.message : null);

  const submit = async () => {
    setLoading(true);
    const result = await register({ username, password, name, dealer });
    setLoading(false);
    if (result.error) {
      setError({ field: result.field, message: result.error });
      return;
    }
    const firstName = name.trim().split(' ')[0];
    const dealerName = DEALERS.find((d) => d.id === dealer)?.name;
    actions.showToast(`Conta criada. Bem-vindo, ${firstName}! (${dealerName})`);
    // sucesso: já está logado — o Stack.Protected leva para as abas
  };

  return (
    <AuthScreen
      title="Criar conta"
      subtitle="Use seu e-mail corporativo e escolha sua concessionária."
      showBrand={false}
      edges={['bottom']}
    >
      <TextField
        label="Nome completo"
        value={name}
        onChangeText={(t) => {
          setName(t);
          clear();
        }}
        placeholder="Seu nome completo"
        autoCapitalize="words"
        textContentType="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        error={fieldError('name')}
      />
      <TextField
        ref={emailRef}
        label="E-mail"
        value={username}
        onChangeText={(t) => {
          setUsername(t);
          clear();
        }}
        placeholder="nome.sobrenome@ford.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        error={fieldError('email')}
      />
      <TextField
        ref={passwordRef}
        label="Senha"
        value={password}
        onChangeText={(t) => {
          setPassword(t);
          clear();
        }}
        placeholder={`Mínimo ${MIN_PASSWORD} caracteres`}
        secure
        autoCapitalize="none"
        textContentType="newPassword"
        error={fieldError('password')}
      />
      <DealerPicker
        value={dealer}
        onChange={(id) => {
          setDealer(id);
          clear();
        }}
        error={fieldError('dealer')}
      />

      {error && !error.field ? <Text style={styles.error}>{error.message}</Text> : null}

      <Button
        label={loading ? 'Criando conta…' : 'Criar conta'}
        variant="primary"
        icon="person-add-outline"
        onPress={submit}
        disabled={loading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem conta?</Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text style={styles.link}>Entrar</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  error: { fontFamily: fonts.medium, fontSize: 14, color: colors.red },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4 },
  footerText: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted },
  link: { fontFamily: fonts.semibold, fontSize: 15, color: colors.blue },
});
