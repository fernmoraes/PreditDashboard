import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

export function chatBubbleLabel(entry, customer) {
  if (entry.from === 'ai') return 'Predit';
  if (entry.from === 'consultant') return 'Consultor';
  return customer.name.split(' ')[0];
}

// Histórico como conversa: cliente à esquerda, Predit/consultor à direita
export default function ChatHistory({ customer }) {
  return (
    <View style={styles.list}>
      {customer.approach.log.map((entry, i) => {
        const incoming = entry.from === 'customer';
        return (
          <View key={i} style={[styles.bubble, incoming ? styles.in : styles.out]}>
            <Text style={styles.text}>{entry.text}</Text>
            <Text style={[styles.meta, !incoming && styles.metaOut]}>
              {chatBubbleLabel(entry, customer)} · {entry.time}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 6,
    marginTop: 12,
    padding: 10,
    backgroundColor: colors.panel2,
    borderRadius: 6,
  },
  bubble: { maxWidth: '86%', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 11 },
  in: {
    alignSelf: 'flex-start',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderBottomLeftRadius: 2,
  },
  out: { alignSelf: 'flex-end', backgroundColor: colors.bubbleOut, borderBottomRightRadius: 2 },
  text: { fontFamily: fonts.regular, fontSize: 15, color: colors.text, lineHeight: 20 },
  meta: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 4 },
  metaOut: { textAlign: 'right' },
});
