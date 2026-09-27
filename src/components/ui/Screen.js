import { forwardRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

// Container padrão das telas. A área da status bar fica azul Ford (continua a faixa do AppHeader);
// o conteúdo rola sobre o fundo claro.
const Screen = forwardRef(function Screen({ children, edges = ['top'], contentStyle }, ref) {
  return (
    <SafeAreaView style={[styles.safe, edges.includes('top') && styles.brandTop]} edges={edges}>
      <ScrollView
        ref={ref}
        style={styles.scroll}
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
  brandTop: { backgroundColor: colors.brand },
  scroll: { backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 32 },
});
