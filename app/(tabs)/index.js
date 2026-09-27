// Aba "Clientes" — "Fila de prioridade" da Visão geral (Documentacao.md 6.1)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AppHeader from '@/components/ui/AppHeader';
import CustomerRow from '@/components/clients/CustomerRow';
import Screen from '@/components/ui/Screen';
import { useCustomers, usePredit } from '@/context/PreditContext';
import { colors, fonts, radiusSm, type } from '@/constants/theme';

const LEGEND = [
  { label: 'Alto ≥75', color: colors.red },
  { label: 'Médio ≥55', color: colors.yellow },
  { label: 'Baixo', color: colors.green },
];

export default function ClientesScreen() {
  const router = useRouter();
  const { state, actions } = usePredit();
  const customers = useCustomers();

  return (
    <Screen>
      <AppHeader
        title="Clientes em risco"
        subtitle="Quem tem mais chance de sair da rede, e o que fazer a seguir."
      />

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput
          value={state.search}
          onChangeText={actions.setSearch}
          placeholder="Nome, VIN, modelo ou concessionária"
          placeholderTextColor={colors.dim}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
        />
        {state.search ? (
          <Ionicons name="close-circle" size={18} color={colors.muted} onPress={() => actions.setSearch('')} />
        ) : null}
      </View>

      <View style={styles.listHead}>
        <Text style={styles.count}>
          {customers.length} {customers.length === 1 ? 'cliente' : 'clientes'} · maior risco primeiro
        </Text>
        <View style={styles.legend}>
          {LEGEND.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.swatch, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.panel,
    borderColor: colors.lineStrong,
    borderWidth: 1,
    borderRadius: radiusSm,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 11,
  },
  listHead: { marginBottom: 10, gap: 6 },
  count: { fontFamily: fonts.semibold, fontSize: 14, color: colors.soft },
  legend: { flexDirection: 'row', gap: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
  legendText: { fontFamily: fonts.medium, fontSize: 13, color: colors.muted },
  list: { gap: 8 },
  empty: { ...type.body, color: colors.muted, textAlign: 'center', paddingVertical: 24 },
});
