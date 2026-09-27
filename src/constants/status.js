// Status da abordagem (Documentacao.md seção 8) — rótulos, cores e ordem usados nas telas.
import { colors } from '@/constants/theme';

// Etiqueta mostrada na lista de clientes, na tela do cliente e no acompanhamento (not_started não tem)
export const APPROACH_BADGE = {
  in_progress: { variant: 'blue', label: 'Em andamento' },
  needs_human: { variant: 'solidRed', label: 'Assumir' },
  deferred: { variant: 'gray', label: 'Repassado' },
  done: { variant: 'green', label: 'Concluído' },
};

// Cor da faixa lateral dos cards de acompanhamento
export const STATUS_COLOR = {
  needs_human: colors.red,
  in_progress: colors.blue,
  deferred: colors.dim,
  done: colors.green,
};

// Ordem na aba Acompanhamento: quem precisa de apoio primeiro
export const STATUS_ORDER = { needs_human: 0, in_progress: 1, deferred: 2, done: 3 };
