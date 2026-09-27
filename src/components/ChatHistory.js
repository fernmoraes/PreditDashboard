import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radiusSm } from '../theme';

export function chatBubbleLabel(entry, customer) {
  if (entry.from === 'ai') return 'Agente IA';
  if (entry.from === 'consultant') return 'Consultor';
  return customer.name.split(' ')[0];
}

const BORDER = { ai: colors.blue, customer: colors.muted, consultant: colors.green };

// Histórico de conversa (.track-history do web)
export default function ChatHistory({ customer }) {
  return (
    <View style={styles.list}>
      {customer.approach.log.map((entry, i) => (
        <View key={i} style={[styles.bubble, { borderLeftColor: BORDER[entry.from] ?? colors.muted }]}>
          <Text style={styles.meta}>
            {chatBubbleLabel(entry, customer)} · {entry.time}
          </Text>
          <Text style={styles.text}>{entry.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 8, marginTop: 12 },
  bubble: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: radiusSm,
    padding: 10,
  },
  meta: { fontFamily: fonts.semibold, fontSize: 11, color: colors.muted, marginBottom: 4 },
  text: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 20 },
});
