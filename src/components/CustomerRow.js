import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../theme';
import { riskColor, riskLevel } from '../utils/risk';
import Badge from './Badge';

// Status da abordagem mostrado na linha (not_started não mostra nada)
export const APPROACH_BADGE = {
  in_progress: { variant: 'blue', label: '● Em andamento' },
  needs_human: { variant: 'red', label: '● ASSUMIR' },
  deferred: { variant: 'gray', label: '↪ Repassado' },
  done: { variant: 'green', label: '✓ Concluído' },
};

// Linha da "Fila de prioridade" (Documentacao.md 6.1), empilhada para celular
export default function CustomerRow({ customer, onPress }) {
  const color = riskColor(riskLevel(customer.score));
  const status = APPROACH_BADGE[customer.approach.status];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <View style={styles.identity}>
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.vin}>{customer.vin}</Text>
        </View>
        <Text style={[styles.score, { color }]}>{customer.score}%</Text>
      </View>

      <Text style={styles.meta}>
        {customer.model} · {customer.dealer}
      </Text>

      <Text style={styles.action}>
        <Text style={styles.actionLabel}>Próxima ação: </Text>
        {customer.action}
      </Text>

      {status && <Badge variant={status.variant} label={status.label} style={styles.badge} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.panel2,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius,
    padding: 14,
    gap: 6,
  },
  pressed: { borderColor: colors.blue, backgroundColor: colors.panel3 },
  top: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  identity: { flex: 1 },
  name: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  vin: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 2 },
  score: { fontFamily: fonts.extrabold, fontSize: 24 },
  meta: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft },
  action: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 20 },
  actionLabel: { fontFamily: fonts.semibold, color: colors.muted },
  badge: { marginTop: 4 },
});
