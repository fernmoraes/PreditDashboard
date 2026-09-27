// Tema do app mobile. Cores = paleta do dashboard web (Documentacao.md seção 4.1, tema dark);
// o que muda em relação ao web é a forma: Barlow, cantos mais retos, faixas laterais de cor, sem emojis.

export const colors = {
  // superfícies (web: --bg, --sidebar, --panel, --panel-2, --panel-3, --line, --line-strong)
  bg: '#0a0b0f',
  sidebar: '#0c0d12', // tab bar
  panel: '#14161c',
  panel2: '#191b22',
  panel3: '#1e2028',
  line: '#23252d',
  lineStrong: '#343740',

  // faixa do topo (mesmo tom da sidebar do web)
  brand: '#0c0d12',
  onBrand: '#eef0f4',
  onBrandMuted: '#8a8d99',

  // ação (web: --blue, --blue-hover, --blue-soft, --blue-soft-strong)
  blue: '#4c7dff',
  blueHover: '#6b93ff',
  blueSoft: 'rgba(76,125,255,0.12)',
  blueSoftStrong: 'rgba(76,125,255,0.2)',

  // texto (web: --text, --soft, --muted, --dim)
  text: '#eef0f4',
  soft: '#c6c9d2',
  muted: '#8a8d99',
  dim: '#5b5e69',

  // semântica (risco / status)
  green: '#34c98f',
  greenSoft: 'rgba(52,201,143,0.12)',
  yellow: '#e0a83c',
  yellowSoft: 'rgba(224,168,60,0.12)',
  red: '#e2596b',
  redSoft: 'rgba(226,89,107,0.12)',
  whatsapp: '#25d366', // botão Enviar

  // balões do chat
  bubbleIn: '#191b22', // cliente (panel-2)
  bubbleOut: 'rgba(76,125,255,0.16)', // Predit / consultor (azul tênue)
};

export const radius = 6;
export const radiusSm = 4;

// web: --shadow 0 6px 18px rgba(0,0,0,0.22)
export const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.22,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 6 },
  elevation: 4,
};

// Nomes exportados por @expo-google-fonts/barlow e /barlow-condensed (carregados em app/_layout.js)
export const fonts = {
  regular: 'Barlow_400Regular',
  medium: 'Barlow_500Medium',
  semibold: 'Barlow_600SemiBold',
  bold: 'Barlow_700Bold',
  extrabold: 'BarlowCondensed_700Bold', // números grandes (score)
  condensed: 'BarlowCondensed_600SemiBold', // rótulos e títulos
  condensedBold: 'BarlowCondensed_700Bold',
};

export const type = {
  h1: { fontFamily: fonts.condensedBold, fontSize: 28, color: colors.text, lineHeight: 32 },
  h2: { fontFamily: fonts.condensedBold, fontSize: 21, color: colors.text },
  eyebrow: {
    fontFamily: fonts.condensed,
    fontSize: 13,
    color: colors.muted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  body: { fontFamily: fonts.regular, fontSize: 15, color: colors.soft, lineHeight: 21 },
  small: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
};
