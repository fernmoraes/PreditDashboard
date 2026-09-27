import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePredit } from '../state/PreditContext';
import { colors, fonts, radius, shadow } from '../theme';

const DURATION = 2200; // igual ao showToast() do web

export default function Toast() {
  const { state, actions } = usePredit();
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;
  const toast = state.toast;

  useEffect(() => {
    if (!toast) return;
    anim.setValue(0);
    Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    const timer = setTimeout(() => {
      Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() =>
        actions.hideToast(),
      );
    }, DURATION);
    return () => clearTimeout(timer);
  }, [toast?.id]);

  if (!toast) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        { bottom: insets.bottom + 72 },
        { opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] },
      ]}
    >
      <Text style={styles.text}>{toast.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: colors.panel2,
    borderColor: colors.lineStrong,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: colors.green,
    borderRadius: radius,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...shadow,
  },
  text: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
});
