// Login e cadastro locais (mock — não há backend).
// - Contas ficam no AsyncStorage; a senha é guardada só como hash SHA-256 com salt.
// - "Lembrar e-mail e senha" guarda as credenciais no armazenamento seguro do aparelho (SecureStore)
//   para preencher o login na próxima abertura. A sessão em si não persiste: sempre abre no login.
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ACCOUNTS_KEY = 'predit:accounts:v1';
const REMEMBER_KEY = 'predit.remember'; // SecureStore só aceita [A-Za-z0-9._-]

export const EMAIL_DOMAIN = '@ford.com';
const USERNAME_RE = /^[a-z0-9._-]{3,40}$/;
export const MIN_PASSWORD = 6;

/** Exige o e-mail completo "nome.sobrenome@ford.com" e devolve { email } normalizado ou { error }. */
export function toFordEmail(input) {
  const value = input.trim().toLowerCase();
  if (!value.endsWith(EMAIL_DOMAIN)) return { error: `Use seu e-mail corporativo (nome${EMAIL_DOMAIN}).` };
  const username = value.slice(0, -EMAIL_DOMAIN.length);
  if (!USERNAME_RE.test(username)) {
    return { error: `E-mail inválido: antes de ${EMAIL_DOMAIN} use pelo menos 3 caracteres (letras, números, ponto, hífen ou _).` };
  }
  return { email: value };
}

const hashPassword = (password, salt) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [session, setSession] = useState(null); // { email, name, dealer }
  const [remembered, setRemembered] = useState(null); // { email, password }

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(ACCOUNTS_KEY).catch(() => null),
      SecureStore.getItemAsync(REMEMBER_KEY).catch(() => null),
    ]).then(([rawAccounts, rawRemember]) => {
      try {
        if (rawAccounts) setAccounts(JSON.parse(rawAccounts));
        if (rawRemember) setRemembered(JSON.parse(rawRemember));
      } catch {
        // dado corrompido: ignora e segue com tudo vazio
      }
      setReady(true);
    });
  }, []);

  const saveAccounts = useCallback(async (next) => {
    setAccounts(next);
    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next));
  }, []);

  /** Retorna { ok: true, email } ou { error: 'mensagem', field }. Não inicia sessão. */
  const register = useCallback(
    async ({ username, password, name, dealer }) => {
      const { email, error } = toFordEmail(username);
      if (error) return { error, field: 'email' };
      if (name.trim().length < 3) return { error: 'Informe seu nome completo.', field: 'name' };
      if (password.length < MIN_PASSWORD) {
        return { error: `A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`, field: 'password' };
      }
      if (!dealer) return { error: 'Escolha sua concessionária.', field: 'dealer' };
      if (accounts.some((a) => a.email === email)) {
        return { error: 'Já existe uma conta com este e-mail.', field: 'email' };
      }

      const salt = Crypto.randomUUID();
      const account = {
        email,
        name: name.trim().replace(/\s+/g, ' '),
        dealer,
        salt,
        passwordHash: await hashPassword(password, salt),
        createdAt: new Date().toISOString(),
      };
      await saveAccounts([...accounts, account]);
      // não entra direto: a pessoa volta ao login e entra com a senha que acabou de criar
      return { ok: true, email };
    },
    [accounts, saveAccounts],
  );

  /** Retorna { ok: true } ou { error: 'mensagem' }. */
  const login = useCallback(
    async ({ username, password, remember }) => {
      const { email, error } = toFordEmail(username);
      if (error) return { error, field: 'email' };
      const account = accounts.find((a) => a.email === email);
      // mesma mensagem para e-mail inexistente e senha errada (não revela quais contas existem)
      if (!account || (await hashPassword(password, account.salt)) !== account.passwordHash) {
        return { error: 'E-mail ou senha incorretos.' };
      }

      if (remember) {
        const creds = { email, password };
        await SecureStore.setItemAsync(REMEMBER_KEY, JSON.stringify(creds)).catch(() => {});
        setRemembered(creds);
      } else {
        await SecureStore.deleteItemAsync(REMEMBER_KEY).catch(() => {});
        setRemembered(null);
      }

      setSession({ email, name: account.name, dealer: account.dealer });
      return { ok: true };
    },
    [accounts],
  );

  const logout = useCallback(() => setSession(null), []);

  /** Usado pelo "Reiniciar experiência": apaga contas, login lembrado e sessão. */
  const resetAll = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(ACCOUNTS_KEY).catch(() => {}),
      SecureStore.deleteItemAsync(REMEMBER_KEY).catch(() => {}),
    ]);
    setAccounts([]);
    setRemembered(null);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ ready, session, remembered, register, login, logout, resetAll }),
    [ready, session, remembered, register, login, logout, resetAll],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  return ctx;
}
