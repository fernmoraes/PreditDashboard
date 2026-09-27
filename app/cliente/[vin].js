// Tela do cliente — painel "Caso selecionado" (Documentacao.md 6.1 e 7)
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import AiPlanCard from '@/components/clients/AiPlanCard';
import Badge from '@/components/ui/Badge';
import { APPROACH_BADGE } from '@/constants/status';
import Panel from '@/components/ui/Panel';
import ScoreRing from '@/components/clients/ScoreRing';
import Screen from '@/components/ui/Screen';
import { useCustomer } from '@/context/PreditContext';
import { colors, fonts, type } from '@/constants/theme';
import { riskColor, riskLevel } from '@/utils/risk';

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

  const status = APPROACH_BADGE[customer.approach.status];
  const color = riskColor(riskLevel(customer.score));

  return (
    <Screen edges={['bottom']}>
      <Stack.Screen options={{ title: customer.name }} />

      <Panel>
        <View style={styles.top}>
          <View style={styles.identity}>
            <Text style={styles.name}>{customer.name}</Text>
            <Text style={styles.vehicle}>{customer.model}</Text>
            <Text style={styles.detail}>{customer.dealer}</Text>
            <Text style={styles.vin}>VIN {customer.vin}</Text>
            {status && <Badge variant={status.variant} label={status.label} style={styles.status} />}
          </View>
          <ScoreRing score={customer.score} />
        </View>

        <View style={styles.facts}>
          <Fact label="Garantia" value={customer.warranty} />
          <Fact label="Última revisão" value={customer.lastService} />
        </View>

        <Text style={styles.sectionLabel}>Por que está em risco</Text>
        {customer.reasons.map((reason) => (
          <View key={reason} style={styles.reason}>
            <View style={[styles.bullet, { backgroundColor: color }]} />
            <Text style={styles.reasonText}>{reason}</Text>
          </View>
        ))}
      </Panel>

      <AiPlanCard customer={customer} onGoToTracking={goToTracking} />
    </Screen>
  );
}

function Fact({ label, value }) {
  return (
    <View style={styles.fact}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  identity: { flex: 1 },
  name: { fontFamily: fonts.condensedBold, fontSize: 26, color: colors.text, lineHeight: 30 },
  vehicle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.soft, marginTop: 2 },
  detail: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
  vin: { fontFamily: fonts.medium, fontSize: 13, color: colors.dim, marginTop: 2, letterSpacing: 0.3 },
  status: { marginTop: 8 },
  facts: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingTop: 12,
    borderTopColor: colors.line,
    borderTopWidth: 1,
  },
  fact: { flex: 1 },
  factLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.muted },
  factValue: { fontFamily: fonts.semibold, fontSize: 15, color: colors.text, marginTop: 1 },
  sectionLabel: { ...type.eyebrow, marginTop: 18, marginBottom: 8 },
  reason: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 },
  bullet: { width: 6, height: 6, borderRadius: 1 },
  reasonText: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.soft },
});
