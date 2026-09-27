import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';
import { riskColor, riskLabel, riskLevel } from '@/utils/risk';
import Badge from '@/components/ui/Badge';
import { APPROACH_BADGE } from '@/constants/status';

// Linha da "Fila de prioridade" (Documentacao.md 6.1): faixa lateral na cor do risco + score em destaque
export default function CustomerRow({ customer, onPress }) {
  const level = riskLevel(customer.score);
  const color = riskColor(level);
  const status = APPROACH_BADGE[customer.approach.status];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.stripe, { backgroundColor: color }]} />

      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.name} numberOfLines={1}>
            {customer.name}
          </Text>
          {status && <Badge variant={status.variant} label={status.label} />}
        </View>
        <Text style={styles.meta} numberOfLines={1}>
          {customer.model} · {customer.dealer.replace('Ford ', '')}
        </Text>
        <Text style={styles.action} numberOfLines={2}>
          {customer.action}
        </Text>
      </View>

      <View style={styles.scoreBox}>
        <Text style={[styles.score, { color }]}>{customer.score}</Text>
        <Text style={[styles.scoreLabel, { color }]}>{riskLabel(customer.score)}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.dim} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius,
    paddingRight: 10,
    overflow: 'hidden',
  },
  pressed: { backgroundColor: colors.panel2 },
  stripe: { width: 5, alignSelf: 'stretch' },
  body: { flex: 1, paddingVertical: 12, paddingLeft: 12, paddingRight: 8, gap: 2 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flexShrink: 1, fontFamily: fonts.bold, fontSize: 17, color: colors.text },
  meta: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  action: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 19, marginTop: 2 },
  scoreBox: { alignItems: 'center', minWidth: 48, marginRight: 4 },
  score: { fontFamily: fonts.extrabold, fontSize: 30, lineHeight: 32 },
  scoreLabel: { fontFamily: fonts.condensed, fontSize: 12, textTransform: 'uppercase' },
});
