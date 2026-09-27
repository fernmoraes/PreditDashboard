import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';
import Button from './Button';

// Caixa de confirmação no visual do app (substitui o Alert nativo, que é branco no Android).
// `destructive` pinta o ícone e o botão de confirmar de vermelho.
export default function ConfirmDialog({
  visible,
  icon = 'help-circle-outline',
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
  onConfirm,
  onCancel,
}) {
  const accent = destructive ? colors.red : colors.blue;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onCancel}>
      <View style={styles.center}>
        {/* toque fora fecha, como no Alert */}
        <Pressable style={styles.backdrop} onPress={onCancel} accessibilityLabel={cancelLabel} />

        <View style={styles.card} accessibilityViewIsModal>
          <View style={[styles.iconBox, { backgroundColor: destructive ? colors.redSoft : colors.blueSoft }]}>
            <Ionicons name={icon} size={24} color={accent} />
          </View>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            <Button label={cancelLabel} variant="secondary" onPress={onCancel} style={styles.action} />
            <Button
              label={confirmLabel}
              variant={destructive ? 'alert' : 'primary'}
              onPress={onConfirm}
              style={styles.action}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.panel,
    borderColor: colors.lineStrong,
    borderWidth: 1,
    borderRadius: radius * 1.5,
    padding: 20,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { fontFamily: fonts.condensedBold, fontSize: 24, color: colors.text },
  message: { fontFamily: fonts.regular, fontSize: 15, color: colors.soft, lineHeight: 21, marginTop: 6 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  action: { flex: 1 },
});
