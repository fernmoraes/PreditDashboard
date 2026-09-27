import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme';

// Card padrão (branco com borda). `level={2}` usa o cinza claro (blocos internos).
export default function Panel({ level = 1, style, children }) {
  return <View style={[styles.panel, level === 2 && styles.level2, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius,
    padding: 16,
  },
  level2: {
    backgroundColor: colors.panel2,
    padding: 14,
  },
});
