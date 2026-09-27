import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts, radiusSm } from '@/constants/theme';

// Campo de formulário com rótulo, sufixo fixo opcional (ex.: "@ford.com"), olho para senha e erro.
const TextField = forwardRef(function TextField(
  { label, error, suffix, secure, style, ...inputProps },
  ref,
) {
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.box, focused && styles.boxFocused, error && styles.boxError]}>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={colors.dim}
          secureTextEntry={secure && hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
        {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}
          >
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

export default TextField;

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
  },
  boxFocused: { borderColor: colors.blue },
  boxError: { borderColor: colors.red },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 16, color: colors.text, paddingVertical: 12 },
  suffix: { fontFamily: fonts.medium, fontSize: 16, color: colors.muted },
  error: { fontFamily: fonts.medium, fontSize: 13, color: colors.red, marginTop: 5 },
});
