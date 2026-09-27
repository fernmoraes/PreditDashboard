import {
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
} from '@expo-google-fonts/barlow';
import { BarlowCondensed_600SemiBold, BarlowCondensed_700Bold } from '@expo-google-fonts/barlow-condensed';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AnimatedSplash from '@/components/ui/AnimatedSplash';
import Toast from '@/components/ui/Toast';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { PreditProvider, usePredit } from '@/context/PreditContext';
import { colors, fonts } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.blue,
    background: colors.bg,
    card: colors.panel,
    text: colors.text,
    border: colors.line,
    notification: colors.red,
  },
};

function AppShell() {
  const { state } = usePredit();
  const auth = useAuth();
  const [fontsLoaded, fontError] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
  });
  const ready = (fontsLoaded || fontError) && state.ready && auth.ready;
  const loggedIn = !!auth.session;
  const [introDone, setIntroDone] = useState(false);

  // A splash nativa só sai quando a abertura animada (idêntica a ela no 1º quadro) já está na tela
  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.bg },
          headerStyle: { backgroundColor: colors.brand },
          headerTintColor: colors.onBrand,
          headerTitleStyle: { fontFamily: fonts.condensedBold, fontSize: 20 },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        {/* Sem sessão só login/cadastro existem; com sessão, só o app. O router redireciona sozinho. */}
        <Stack.Protected guard={loggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="cliente/[vin]" options={{ title: 'Cliente' }} />
        </Stack.Protected>
        <Stack.Protected guard={!loggedIn}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ title: 'Criar conta' }} />
        </Stack.Protected>
      </Stack>
      <Toast />
      {!introDone && <AnimatedSplash onFinish={() => setIntroDone(true)} />}
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={navTheme}>
      <AuthProvider>
        <PreditProvider>
          <AppShell />
        </PreditProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
