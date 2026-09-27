// Tokens de design — Documentacao.md seção 4 (tema dark "enterprise", sem glow)

export const colors = {
  bg: '#0a0b0f',
  sidebar: '#0c0d12',
  panel: '#14161c',
  panel2: '#191b22',
  panel3: '#1e2028',
  line: '#23252d',
  lineStrong: '#343740',
  blue: '#4c7dff',
  blueHover: '#6b93ff',
  blueSoft: 'rgba(76,125,255,0.12)',
  blueSoftStrong: 'rgba(76,125,255,0.2)',
  text: '#eef0f4',
  soft: '#c6c9d2',
  muted: '#8a8d99',
  dim: '#5b5e69',
  green: '#34c98f',
  greenSoft: 'rgba(52,201,143,0.12)',
  yellow: '#e0a83c',
  yellowSoft: 'rgba(224,168,60,0.12)',
  red: '#e2596b',
  redSoft: 'rgba(226,89,107,0.12)',
  whatsapp: '#25d366',
};

export const radius = 10;
export const radiusSm = 7;

export const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.22,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 6 },
  elevation: 4,
};

// Nomes exportados por @expo-google-fonts/inter (carregados em app/_layout.js)
export const fonts = {
  regular: 'Inter_400Regular',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
};

export const type = {
  h1: { fontFamily: fonts.bold, fontSize: 26, color: colors.text, letterSpacing: -0.26 },
  h2: { fontFamily: fonts.semibold, fontSize: 18, color: colors.text, letterSpacing: -0.09 },
  eyebrow: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
  },
  body: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft },
  small: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
};
