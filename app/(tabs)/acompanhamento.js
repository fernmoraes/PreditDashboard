// Aba "Acompanhamento" — conversas conduzidas pela IA (Documentacao.md 6.4)
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../src/components/AppHeader';
import Badge from '../../src/components/Badge';
import Panel from '../../src/components/Panel';
import Screen from '../../src/components/Screen';
import TrackCard from '../../src/components/TrackCard';
import { usePredit } from '../../src/state/PreditContext';
import { colors, type } from '../../src/theme';

const ORDER = { needs_human: 0, in_progress: 1, deferred: 2, done: 3 };

export default function AcompanhamentoScreen() {
  const { state, actions } = usePredit();
  const { vin, t } = useLocalSearchParams();
  const scrollRef = useRef(null);
  const positions = useRef({}); // { [vin]: y dentro do conteúdo do ScrollView }
  const pendingVin = useRef(null);

  const active = useMemo(
    () =>
      state.customers
        .filter((c) => c.approach.status !== 'not_started')
        .sort((a, b) => ORDER[a.approach.status] - ORDER[b.approach.status]),
    [state.customers],
  );
  const needsHuman = active.filter((c) => c.approach.status === 'needs_human').length;
  const inProgress = active.filter((c) => c.approach.status === 'in_progress').length;

  const scrollTo = (y) => scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });

  // Veio da tela do cliente (?vin=&t=): rola até o card assim que ele tiver posição
  useEffect(() => {
    if (!vin) return;
    if (positions.current[vin] != null) scrollTo(positions.current[vin]);
    else pendingVin.current = vin;
  }, [vin, t]);

  const onCardLayout = (cardVin) => (e) => {
    positions.current[cardVin] = e.nativeEvent.layout.y;
    if (pendingVin.current === cardVin) {
      pendingVin.current = null;
      scrollTo(e.nativeEvent.layout.y);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen ref={scrollRef}>
        <AppHeader
          title="Acompanhamento de abordagens"
          subtitle="Veja o que o agente de IA já conversou e onde ele precisa da sua entrada."
          onReset={actions.resetDemo}
        />

        <Panel style={styles.summary}>
          <Text style={type.eyebrow}>Conversas conduzidas pela IA</Text>
          <Badge
            variant="blue"
            label={active.length ? `${inProgress} em andamento · ${needsHuman} pedindo apoio` : 'Nenhuma abordagem iniciada'}
            style={styles.pill}
          />
        </Panel>

        {active.length === 0 && (
          <Text style={styles.empty}>
            Nenhum plano de ação foi iniciado ainda. Abra um cliente e toque em “Iniciar Plano de Ação”.
          </Text>
        )}

        {/* Cards são filhos diretos do conteúdo do ScrollView para o onLayout.y servir de alvo do scroll */}
        {active.map((customer) => (
          <TrackCard key={customer.vin} customer={customer} onLayout={onCardLayout(customer.vin)} />
        ))}
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  summary: { marginBottom: 12 },
  pill: { marginTop: 10 },
  empty: { ...type.body, color: colors.muted, textAlign: 'center', paddingVertical: 24 },
});
