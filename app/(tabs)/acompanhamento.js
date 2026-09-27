// Aba "Acompanhamento" — conversas conduzidas pela IA (Documentacao.md 6.4)
// UX mobile: filtros por status + cards recolhidos (toque expande) para achar o cliente rápido.
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '@/components/ui/AppHeader';
import Screen from '@/components/ui/Screen';
import TrackCard from '@/components/tracking/TrackCard';
import { STATUS_ORDER } from '@/constants/status';
import { usePredit } from '@/context/PreditContext';
import { colors, fonts, type } from '@/constants/theme';

const FILTERS = [
  { key: 'all', label: 'Todos', color: colors.blue },
  { key: 'needs_human', label: 'Assumir', color: colors.red },
  { key: 'in_progress', label: 'Em andamento', color: colors.blue },
  { key: 'deferred', label: 'Repassados', color: colors.muted },
  { key: 'done', label: 'Concluídos', color: colors.green },
];

const EMPTY_BY_FILTER = {
  needs_human: 'Nenhum caso pedindo apoio agora.',
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
        .sort((a, b) => STATUS_ORDER[a.approach.status] - STATUS_ORDER[b.approach.status] || b.score - a.score),
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
          title="Acompanhamento"
          subtitle="Conversas em curso e os casos em que o Predit precisa de você."
          onReset={actions.resetDemo}
        />

        {/* Filtros como abas sublinhadas (rolam na horizontal em telas estreitas) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
          style={styles.tabsScroll}
        >
          {FILTERS.map((f) => {
            const selected = filter === f.key;
            const count = counts[f.key] ?? 0;
            const alert = f.key === 'needs_human' && count > 0;
            return (
              <Pressable
                key={f.key}
                onPress={() => setFilter(f.key)}
                style={[styles.tab, selected && { borderBottomColor: f.color }]}
              >
                <Text style={[styles.tabText, selected && styles.tabTextSelected]}>{f.label}</Text>
                <View style={[styles.count, alert && styles.countAlert]}>
                  <Text style={[styles.countText, alert && styles.countTextAlert]}>{count}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

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
  tabsScroll: {
    marginHorizontal: -16,
    marginBottom: 12,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexGrow: 0,
  },
  tabs: { gap: 18, paddingHorizontal: 16 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 6,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabText: { fontFamily: fonts.condensed, fontSize: 17, color: colors.muted },
  tabTextSelected: { color: colors.text, fontFamily: fonts.condensedBold },
  count: {
    minWidth: 20,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    backgroundColor: colors.panel3,
    alignItems: 'center',
  },
  countAlert: { backgroundColor: colors.red },
  countText: { fontFamily: fonts.condensedBold, fontSize: 13, color: colors.soft },
  countTextAlert: { color: '#fff' },
  empty: { ...type.body, color: colors.muted, textAlign: 'center', paddingVertical: 24 },
});
