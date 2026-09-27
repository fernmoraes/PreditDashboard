import { colors } from '@/constants/theme';

// Limiares — Documentacao.md seção 9.1: Alto ≥ 75 · Médio ≥ 55 · Baixo < 55
export function riskLevel(score) {
  if (score >= 75) return 'high';
  if (score >= 55) return 'medium';
  return 'low';
}

export function riskLabel(score) {
  return { high: 'Alto', medium: 'Médio', low: 'Baixo' }[riskLevel(score)];
}

export function riskColor(level) {
  return { high: colors.red, medium: colors.yellow, low: colors.green }[level];
}

export function riskSoft(level) {
  return { high: colors.redSoft, medium: colors.yellowSoft, low: colors.greenSoft }[level];
}
