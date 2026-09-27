import { Ionicons } from '@expo/vector-icons';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePredit } from '../state/PreditContext';
import { colors, fonts, radius, type } from '../theme';
import Badge from './Badge';
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
        <Badge variant="blue" label="ANÁLISE PREDIT AI" />
        <Text style={styles.confidence}>{plan.confidence}% confiança</Text>
      </View>

      {!collapsed && (
        <View style={styles.body}>
          <Text style={styles.summary}>{plan.summary}</Text>

          <View style={styles.meta}>
            <Meta label="Tom recomendado" value={plan.tone} />
            <Meta label="Canal" value={plan.channel} />
            <Meta label="Melhor horário" value={plan.bestWindow} />
          </View>

          <View style={styles.steps}>
            {plan.steps.map((step, i) => (
              <View key={i} style={styles.step}>
                <Text style={styles.stepNum}>{i + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.whatsapp}>
            <Text style={[type.eyebrow, styles.whatsappLabel]}>Primeira mensagem do agente (WhatsApp)</Text>
            <Text style={styles.whatsappText}>
              {plan.whatsappMessage || 'Nenhuma abordagem ativa recomendada no momento.'}
            </Text>
          </View>
        </View>
      )}

      <Pressable onPress={toggle} hitSlop={8} style={styles.toggle}>
        <Ionicons name={collapsed ? 'chevron-down' : 'chevron-up'} size={16} color={colors.muted} />
        <Text style={styles.toggleText}>{collapsed ? 'Ver detalhes' : 'Ocultar detalhes'}</Text>
      </Pressable>

      <Button
        icon="flash"
        label={btn.label}
        variant={btn.variant}
        disabled={btn.disabled}
        onPress={onMainPress}
      />
      <Text style={styles.note}>{btn.note}</Text>
      <Text style={styles.timestamp}>Gerado por Predit AI em {plan.generatedAt}</Text>
    </View>
  );
}

function Meta({ label, value }) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel2,
    borderColor: colors.line,
    borderTopColor: colors.blue,
    borderTopWidth: 2,
    borderWidth: 1,
    borderRadius: radius,
    padding: 16,
    marginTop: 12,
  },
  // flexWrap: em tela estreita (ou fonte do sistema grande) a confiança desce para a linha de baixo
  head: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
    rowGap: 6,
  },
  confidence: { fontFamily: fonts.bold, fontSize: 13, color: colors.green, flexShrink: 1 },
  body: { marginTop: 14, gap: 14 },
  summary: { ...type.body, color: colors.text, lineHeight: 21 },
  meta: { gap: 8 },
  metaItem: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
  },
  metaLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  metaValue: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text, marginTop: 2 },
  steps: { gap: 6 },
  step: { flexDirection: 'row', gap: 6 },
  stepNum: { fontFamily: fonts.semibold, fontSize: 14, color: colors.muted, width: 18 },
  stepText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 20 },
  whatsapp: {
    backgroundColor: colors.greenSoft,
    borderLeftColor: colors.green,
    borderLeftWidth: 3,
    borderRadius: 7,
    padding: 12,
  },
  whatsappLabel: { fontSize: 10, color: colors.dim, marginBottom: 6 },
  whatsappText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 21 },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    marginTop: 14,
    paddingVertical: 12,
  },
  toggleText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
  note: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, textAlign: 'center', marginTop: 8 },
  timestamp: { fontFamily: fonts.regular, fontSize: 12, color: colors.dim, textAlign: 'center', marginTop: 8 },
});
