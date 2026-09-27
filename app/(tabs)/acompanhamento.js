// Aba "Acompanhamento" — conversas conduzidas pela IA (Documentacao.md 6.4)
// UX mobile: filtros por status + cards recolhidos (toque expande) para achar o cliente rápido.
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../src/components/AppHeader';
import Screen from '../../src/components/Screen';
import TrackCard from '../../src/components/TrackCard';
import { usePredit } from '../../src/state/PreditContext';
import { colors, fonts, type } from '../../src/theme';

const ORDER = { needs_human: 0, in_progress: 1, deferred: 2, done: 3 };

const FILTERS = [
  { key: 'all', label: 'Todos', color: colors.blue },
  { key: 'needs_human', label: 'Assumir', color: colors.red },
  { key: 'in_progress', label: 'Em andamento', color: colors.blue },
  { key: 'deferred', label: 'Repassados', color: colors.muted },
  { key: 'done', label: 'Concluídos', color: colors.green },
];

const EMPTY_BY_FILTER = {
  needs_human: 'Nenhum caso pedindo apoio agora. 🎉',
  in_progress: 'Nenhuma conversa em andamento.',
  deferred: 'Nenhum caso repassado.',
  done: 'Nenhuma abordagem concluída ainda.',
};

export default function AcompanhamentoScreen() {
  const { state, actions } = usePredit();
  const { vin, t } = useLocalSearchParams();
  const [filter, setFilter] = useState('all');
  const scrollRef = useRef(null);
  const positions = useRef({}); // { [vin]: y dentro do conteúdo do ScrollView }
  const pendingVin = useRef(null);

  const active = useMemo(
    () =>
      state.customers
        .filter((c) => c.approach.status !== 'not_started')
        .sort((a, b) => ORDER[a.approach.status] - ORDER[b.approach.status] || b.score - a.score),
    [state.customers],
  );

  const counts = useMemo(() => {
    const out = { all: active.length };
    for (const c of active) out[c.approach.status] = (out[c.approach.status] ?? 0) + 1;
    return out;
  }, [active]);

  const visible = filter === 'all' ? active : active.filter((c) => c.approach.status === filter);

  const scrollTo = (y) => scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true });

  // Veio da tela do cliente (?vin=&t=): mostra todos, abre o card e rola até ele
  useEffect(() => {
    if (!vin) return;
    setFilter('all');
    actions.expand(vin);
    pendingVin.current = vin;
    if (positions.current[vin] != null) {
      // espera o card expandir antes de rolar
      setTimeout(() => {
        if (pendingVin.current === vin) {
          pendingVin.current = null;
          scrollTo(positions.current[vin]);
        }
      }, 250);
    }
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          style={styles.chipsScroll}
        >
          {FILTERS.map((f) => {
            const selected = filter === f.key;
            const count = counts[f.key] ?? 0;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.chip, selected && { borderColor: f.color, backgroundColor: colors.panel3 }]}
              >
                {f.key !== 'all' && <View style={[styles.chipDot, { backgroundColor: f.color }]} />}
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{f.label}</Text>
                <View style={[styles.count, f.key === 'needs_human' && count > 0 && styles.countAlert]}>
                  <Text style={[styles.countText, f.key === 'needs_human' && count > 0 && styles.countTextAlert]}>
                    {count}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.hint}>Toque em um cliente para ver detalhes e responder.</Text>

        {active.length === 0 ? (
          <Text style={styles.empty}>
            Nenhum plano de ação foi iniciado ainda. Abra um cliente e toque em “Iniciar Plano de Ação”.
          </Text>
        ) : visible.length === 0 ? (
          <Text style={styles.empty}>{EMPTY_BY_FILTER[filter]}</Text>
        ) : null}

        {/* Cards são filhos diretos do conteúdo do ScrollView para o onLayout.y servir de alvo do scroll */}
        {visible.map((customer) => (
          <TrackCard key={customer.vin} customer={customer} onLayout={onCardLayout(customer.vin)} />
        ))}
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  chipsScroll: { marginHorizontal: -16, marginBottom: 8 },
  chips: { gap: 8, paddingHorizontal: 16 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipDot: { width: 8, height: 8, borderRadius: 4 },
  chipText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
  chipTextSelected: { color: colors.text },
  count: {
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
    backgroundColor: colors.panel3,
    alignItems: 'center',
  },
  countAlert: { backgroundColor: colors.red },
  countText: { fontFamily: fonts.bold, fontSize: 11, color: colors.soft },
  countTextAlert: { color: '#fff' },
  hint: { ...type.small, marginBottom: 10 },
  empty: { ...type.body, color: colors.muted, textAlign: 'center', paddingVertical: 24 },
});
