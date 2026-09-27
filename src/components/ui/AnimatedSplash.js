import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

// Abertura animada: começa idêntica à splash nativa (logo 140px no centro, fundo #0a0b0f — ver app.json)
// para a troca ser imperceptível, depois anima a marca e some revelando o app.
const LOGO_SIZE = 140;

export default function AnimatedSplash({ onFinish }) {
  const logo = useRef(new Animated.Value(0)).current; // 0 = como a splash nativa, 1 = posição final
  const wordmark = useRef(new Animated.Value(0)).current;
  const tagline = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(0)).current;
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fadeOut = Animated.timing(exit, {
      toValue: 1,
      duration: 380,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    });

    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduceMotion) => {
        if (cancelled) return;
        const ease = Easing.out(Easing.cubic);
        const intro = reduceMotion
          ? Animated.delay(300)
          : Animated.sequence([
              Animated.delay(150),
              Animated.timing(logo, { toValue: 1, duration: 520, easing: ease, useNativeDriver: true }),
              Animated.parallel([
                Animated.timing(wordmark, { toValue: 1, duration: 380, easing: ease, useNativeDriver: true }),
                Animated.sequence([
                  Animated.delay(140),
                  Animated.timing(tagline, { toValue: 1, duration: 360, easing: ease, useNativeDriver: true }),
                ]),
              ]),
              Animated.timing(bar, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
              Animated.delay(180),
            ]);

        Animated.sequence([intro, fadeOut]).start(({ finished }) => {
          if (finished) onFinish?.();
        });
        // deixa tocar no app durante o fade-out final
        setTimeout(() => !cancelled && setInteractive(true), reduceMotion ? 300 : 2000);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const logoStyle = {
    transform: [
      { translateY: logo.interpolate({ inputRange: [0, 1], outputRange: [0, -46] }) },
      { scale: logo.interpolate({ inputRange: [0, 1], outputRange: [1, 0.62] }) },
    ],
  };
  const riseIn = (v, distance) => ({
    opacity: v,
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
  });

  return (
    <Animated.View
      pointerEvents={interactive ? 'none' : 'auto'}
      style={[
        styles.overlay,
        {
          opacity: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          transform: [{ scale: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }) }],
        },
      ]}
    >
      <Animated.View style={logoStyle}>
        <Image source={require('@assets/images/splash-icon.png')} style={styles.logo} />
      </Animated.View>

      {/* Bloco de texto posicionado logo abaixo do centro, onde o logo "abre espaço" ao subir */}
      <View style={styles.textBlock}>
        <Animated.Text style={[styles.wordmark, riseIn(wordmark, 12)]}>Predit</Animated.Text>
        <Animated.Text style={[styles.tagline, riseIn(tagline, 8)]}>Retenção preditiva · Rede Ford</Animated.Text>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { transform: [{ scaleX: bar }] }]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 100,
  },
  logo: { width: LOGO_SIZE, height: LOGO_SIZE, resizeMode: 'contain' },
  textBlock: {
    position: 'absolute',
    top: '50%',
    marginTop: 18,
    alignItems: 'center',
  },
  wordmark: { fontFamily: fonts.condensedBold, fontSize: 44, color: colors.text, letterSpacing: 0.5 },
  tagline: { fontFamily: fonts.medium, fontSize: 15, color: colors.muted, marginTop: 2 },
  track: {
    width: 132,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.panel3,
    marginTop: 18,
    overflow: 'hidden',
  },
  fill: { width: '100%', height: '100%', backgroundColor: colors.blue },
});
