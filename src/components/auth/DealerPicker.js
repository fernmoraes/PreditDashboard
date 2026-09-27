import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEALERS } from '@/constants/dealers';
import { colors, fonts, radius, radiusSm } from '@/constants/theme';

// Campo "Concessionária": ao tocar abre uma lista (bottom sheet) com as opções de DEALERS.
export default function DealerPicker({ value, onChange, error, style }) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const selected = DEALERS.find((d) => d.id === value);

  return (
    <View style={style}>
      <Text style={styles.label}>Concessionária</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.box, error && styles.boxError]}
        accessibilityRole="button"
        accessibilityLabel="Escolher concessionária"
      >
        <View style={styles.boxText}>
          <Text style={[styles.value, !selected && styles.placeholder]}>
            {selected ? selected.name : 'Selecione sua concessionária'}
          </Text>
          {selected ? <Text style={styles.area}>{selected.area}</Text> : null}
        </View>
        <Ionicons name="chevron-down" size={18} color={colors.muted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.sheetHead}>
            <Text style={styles.sheetTitle}>Escolha a concessionária</Text>
            <Pressable onPress={() => setOpen(false)} hitSlop={10} accessibilityLabel="Fechar">
              <Ionicons name="close" size={22} color={colors.muted} />
            </Pressable>
          </View>
          <FlatList
            data={DEALERS}
            keyExtractor={(d) => d.id}
            renderItem={({ item }) => {
              const active = item.id === value;
              return (
                <Pressable
                  onPress={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
                >
                  <View style={styles.boxText}>
                    <Text style={[styles.optionName, active && { color: colors.blue }]}>{item.name}</Text>
                    <Text style={styles.area}>{item.area}</Text>
                  </View>
                  {active && <Ionicons name="checkmark" size={20} color={colors.blue} />}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.semibold, fontSize: 14, color: colors.soft, marginBottom: 6 },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.panel2,
    borderColor: colors.lineStrong,
    borderWidth: 1,
    borderRadius: radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 48,
  },
  boxError: { borderColor: colors.red },
  boxText: { flex: 1 },
  value: { fontFamily: fonts.medium, fontSize: 16, color: colors.text },
  placeholder: { color: colors.dim, fontFamily: fonts.regular },
  area: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  error: { fontFamily: fonts.medium, fontSize: 13, color: colors.red, marginTop: 5 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },
  sheet: {
    backgroundColor: colors.panel,
    borderTopLeftRadius: radius * 2,
    borderTopRightRadius: radius * 2,
    borderColor: colors.line,
    borderWidth: 1,
    maxHeight: '70%',
    paddingTop: 8,
  },
  sheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  sheetTitle: { fontFamily: fonts.condensedBold, fontSize: 20, color: colors.text },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  optionPressed: { backgroundColor: colors.panel2 },
  optionName: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text },
});
