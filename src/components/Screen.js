import { forwardRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

// Container padrão das abas: safe area no topo + scroll com fundo escuro
const Screen = forwardRef(function Screen({ children, edges = ['top'], contentStyle }, ref) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <ScrollView
        ref={ref}
        contentContainerStyle={[styles.content, contentStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
});

export default Screen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 32 },
});
