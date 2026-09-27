import { Ionicons } from '@expo/vector-icons';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePredit } from '../state/PreditContext';
import { colors, fonts, radius, type } from '../theme';
import Button from './Button';

// Estados do botão principal — Documentacao.md seção 7 (+ deferred, que o web não tratava)
function planButton(customer) {
  const status = customer.approach.status;
  if (!customer.aiPlan.actionable) {
    return {
      variant: 'primary',
      disabled: true,
      label: 'Sem ação recomendada agora',
      note: 'O agente não identificou necessidade de contato ativo.',
    };
  }
  switch (status) {
    case 'not_started':
      return {
        variant: 'primary',
        label: 'Iniciar Plano de Ação',
        note: 'O agente de IA envia a primeira mensagem pelo WhatsApp.',
      };
    case 'in_progress':
      return {
        variant: 'secondary',
        label: 'Plano em andamento — ver acompanhamento',
        note: 'O agente já está conversando com o cliente pelo WhatsApp.',
      };
    case 'needs_human':
      return {
        variant: 'alert',
        label: 'IA pediu apoio humano — ver caso',
        note: 'Pergunta fora do escopo da IA. Um consultor precisa responder.',
      };
    case 'done':
      return {
        variant: 'secondary',
        label: 'Plano concluído — ver histórico',
        note: 'Abordagem finalizada com sucesso.',
      };
    default:
      return {
        variant: 'secondary',
        label: 'Caso repassado — ver acompanhamento',
        note: 'Caso repassado para outro consultor.',
      };
  }
}

export default function AiPlanCard({ customer, onGoToTracking }) {
  const { state, actions } = usePredit();
  const plan = customer.aiPlan;
  const collapsed = state.aiPlanCollapsed;
  const btn = planButton(customer);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    actions.toggleAiPlan();
  };

  const onMainPress = () => {
    const result = actions.startActionPlan(customer.vin);
    if (result === 'already_started') onGoToTracking();
  };

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Text style={type.h2}>Plano de ação</Text>
        <Text style={styles.confidence}>Confiança do modelo: {plan.confidence}%</Text>
      </View>

      {!collapsed && (
        <View style={styles.body}>
          <Text style={styles.summary}>{plan.summary}</Text>

          <View style={styles.meta}>
            <Meta label="Tom" value={plan.tone} />
            <Meta label="Canal" value={plan.channel} />
            <Meta label="Horário" value={plan.bestWindow} last />
          </View>

          <View style={styles.steps}>
            <Text style={styles.sectionLabel}>Passo a passo</Text>
            {plan.steps.map((step, i) => (
              <View key={i} style={styles.step}>
                <Text style={styles.stepNum}>{i + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionLabel}>Primeira mensagem</Text>
            {plan.whatsappMessage ? (
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{plan.whatsappMessage}</Text>
                <Text style={styles.bubbleMeta}>{plan.channel} · enviada pelo Predit</Text>
              </View>
            ) : (
              <Text style={styles.stepText}>Nenhuma abordagem ativa recomendada no momento.</Text>
            )}
          </View>
        </View>
      )}

      <Pressable onPress={toggle} hitSlop={8} style={styles.toggle}>
        <Text style={styles.toggleText}>{collapsed ? 'Mostrar plano completo' : 'Recolher plano'}</Text>
        <Ionicons name={collapsed ? 'chevron-down' : 'chevron-up'} size={16} color={colors.blue} />
      </Pressable>

      <Button
        icon={customer.approach.status === 'not_started' ? 'play' : 'arrow-forward'}
        label={btn.label}
        variant={btn.variant}
        disabled={btn.disabled}
        onPress={onMainPress}
      />
      <Text style={styles.note}>{btn.note}</Text>
      <Text style={styles.timestamp}>Plano gerado em {plan.generatedAt}</Text>
    </View>
  );
}

function Meta({ label, value, last }) {
  return (
    <View style={[styles.metaRow, last && styles.metaRowLast]}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius,
    padding: 16,
    marginTop: 12,
  },
  head: { gap: 2 },
  confidence: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  body: { marginTop: 12, gap: 16 },
  summary: { ...type.body, color: colors.text },
  meta: { borderTopColor: colors.line, borderTopWidth: 1 },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 9,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  metaRowLast: { borderBottomWidth: 1 },
  metaLabel: { width: 64, fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  metaValue: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  sectionLabel: { ...type.eyebrow, marginBottom: 8 },
  steps: { gap: 8 },
  step: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 3,
    backgroundColor: colors.blue,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: fonts.condensedBold,
    fontSize: 14,
    overflow: 'hidden',
  },
  stepText: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.soft, lineHeight: 21 },
  bubble: {
    alignSelf: 'flex-end',
    maxWidth: '92%',
    backgroundColor: colors.bubbleOut,
    borderRadius: 10,
    borderBottomRightRadius: 2,
    padding: 12,
  },
  bubbleText: { fontFamily: fonts.regular, fontSize: 15, color: colors.text, lineHeight: 21 },
  bubbleMeta: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, marginTop: 6, textAlign: 'right' },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 14,
    marginBottom: 12,
  },
  toggleText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.blue },
  note: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, textAlign: 'center', marginTop: 8 },
  timestamp: { fontFamily: fonts.regular, fontSize: 12, color: colors.dim, textAlign: 'center', marginTop: 4 },
});
