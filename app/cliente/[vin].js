// Tela do cliente — painel "Caso selecionado" (Documentacao.md 6.1 e 7)
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import AiPlanCard from '../../src/components/AiPlanCard';
import Panel from '../../src/components/Panel';
import ScoreRing from '../../src/components/ScoreRing';
import Screen from '../../src/components/Screen';
import { useCustomer } from '../../src/state/PreditContext';
import { colors, fonts, radiusSm, type } from '../../src/theme';

export default function ClienteScreen() {
  const router = useRouter();
  const { vin } = useLocalSearchParams();
  const customer = useCustomer(vin);

  if (!customer) {
    return (
      <Screen edges={[]}>
        <Stack.Screen options={{ title: 'Cliente' }} />
        <Text style={type.body}>Cliente não encontrado.</Text>
      </Screen>
    );
  }

  // Volta para as abas já abertas (em vez de empilhar outra) e rola até o card do cliente
  const goToTracking = () =>
    router.dismissTo({ pathname: '/acompanhamento', params: { vin: customer.vin, t: Date.now() } });

  return (
    <Screen edges={['bottom']}>
      <Stack.Screen options={{ title: customer.name }} />

      <Panel style={styles.panel}>
        <Text style={type.eyebrow}>Caso selecionado</Text>
        <Text style={[type.h2, styles.name]}>{customer.name}</Text>
        <Text style={styles.vehicle}>
          {customer.model} | {customer.vin} | {customer.dealer}
        </Text>

        <View style={styles.ring}>
          <ScoreRing score={customer.score} />
        </View>

        <View style={styles.reasons}>
          {customer.reasons.map((reason) => (
            <View key={reason} style={styles.reason}>
              <Text style={styles.reasonText}>{reason}</Text>
            </View>
          ))}
        </View>
      </Panel>

      {/* Fora do Panel para usar a largura toda da tela (evita padding duplo em celular) */}
      <AiPlanCard customer={customer} onGoToTracking={goToTracking} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: { gap: 0 },
  name: { fontSize: 22, fontFamily: fonts.bold, marginTop: 2 },
  vehicle: { ...type.body, color: colors.muted, marginTop: 4 },
  ring: { marginVertical: 22 },
  reasons: { gap: 8 },
  reason: {
    backgroundColor: colors.panel2,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radiusSm,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  reasonText: { fontFamily: fonts.regular, fontSize: 13, color: colors.soft },
});
