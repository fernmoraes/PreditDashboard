// Aba "Clientes" — "Fila de prioridade" da Visão geral (Documentacao.md 6.1)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AppHeader from '../../src/components/AppHeader';
import CustomerRow from '../../src/components/CustomerRow';
import Panel from '../../src/components/Panel';
import Screen from '../../src/components/Screen';
import { useCustomers, usePredit } from '../../src/state/PreditContext';
import { colors, fonts, radiusSm, type } from '../../src/theme';

const LEGEND = [
  { label: 'Alto', color: colors.red },
  { label: 'Médio', color: colors.yellow },
  { label: 'Baixo', color: colors.green },
];

export default function ClientesScreen() {
  const router = useRouter();
  const { state, actions } = usePredit();
  const customers = useCustomers();

  return (
    <Screen>
      <AppHeader
        title="Retenção preditiva por VIN"
        subtitle="Identifique clientes em risco e acione a próxima melhor ação."
        onReset={actions.resetDemo}
      />

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.dim} />
        <TextInput
          value={state.search}
          onChangeText={actions.setSearch}
          placeholder="Buscar cliente, VIN ou modelo"
          placeholderTextColor={colors.dim}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
        />
        {state.search ? (
          <Ionicons name="close-circle" size={18} color={colors.muted} onPress={() => actions.setSearch('')} />
        ) : null}
      </View>

      <Panel>
        <Text style={type.eyebrow}>Fila de prioridade</Text>
        <Text style={[type.h2, styles.title]}>Clientes com maior risco de evasão</Text>

        <View style={styles.legend}>
          {LEGEND.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.list}>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.vin}
              customer={customer}
              onPress={() => router.push(`/cliente/${customer.vin}`)}
            />
          ))}
          {customers.length === 0 && (
            <Text style={styles.empty}>Nenhum cliente encontrado para “{state.search}”.</Text>
          )}
        </View>
      </Panel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radiusSm,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 12,
  },
  title: { marginTop: 2 },
  legend: { flexDirection: 'row', gap: 16, marginTop: 10, marginBottom: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  list: { gap: 10 },
  empty: { ...type.body, color: colors.muted, textAlign: 'center', paddingVertical: 24 },
});
