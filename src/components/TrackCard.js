import { StyleSheet, Text, TextInput, View } from 'react-native';
import { getDrafts } from '../data/drafts';
import { usePredit } from '../state/PreditContext';
import { colors, fonts, radius, radiusSm, type } from '../theme';
import Badge from './Badge';
import Button from './Button';
import ChatHistory, { chatBubbleLabel } from './ChatHistory';
import { APPROACH_BADGE } from './CustomerRow';

// Card de acompanhamento (Documentacao.md 6.4). Diferente do web:
// - todo status ativo tem o compositor (Gerar mensagem / Editar / Gerar outra / Enviar), não só needs_human;
// - "Enviar" é simulado: a mensagem entra no histórico como enviada pelo Agente IA (sem WhatsApp);
// - caso repassado (deferred) pode ser retomado.
export default function TrackCard({ customer, onLayout }) {
  const { state, actions } = usePredit();
  const { approach } = customer;
  const ui = state.trackingUi[customer.vin] ?? {};
  const vin = customer.vin;
  const badge = APPROACH_BADGE[approach.status];
  const deferred = approach.status === 'deferred';

  return (
    <View onLayout={onLayout} style={[styles.card, approach.status === 'needs_human' && styles.needsHuman]}>
      <View style={styles.head}>
        <Badge variant={badge.variant} label={badge.label} />
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.sub}>
          {customer.model} · Score {customer.score}%
        </Text>
      </View>

      {approach.status === 'needs_human' && <HandoffInfo handoff={approach.handoff} />}
      {approach.status === 'in_progress' && <LastMessage customer={customer} />}
      {approach.status === 'done' && <Text style={styles.outcome}>{approach.outcome ?? 'Abordagem concluída.'}</Text>}
      {deferred && <Text style={styles.outcome}>Caso repassado para outro consultor.</Text>}

      <View style={styles.actions}>
        {deferred ? (
          <Button label="Retomar caso" icon="arrow-undo" variant="soft" onPress={() => actions.resumeCase(vin)} style={styles.action} />
        ) : (
          <Button label="✨ Gerar mensagem" variant="soft" onPress={() => actions.showDraft(vin)} style={styles.action} />
        )}
        <Button
          label={ui.historyVisible ? 'Ocultar histórico' : 'Ver histórico'}
          onPress={() => actions.toggleHistory(vin)}
          style={styles.action}
        />
        {!deferred && <Button label="Passar adiante" onPress={() => actions.deferCase(vin)} style={styles.action} />}
      </View>

      {ui.draftVisible && !deferred && <DraftComposer customer={customer} ui={ui} />}

      {ui.historyVisible && <ChatHistory customer={customer} />}
    </View>
  );
}

function HandoffInfo({ handoff }) {
  return (
    <>
      <Block label="Perfil" text={handoff.profile} />
      <Block label="Chegou até você" text={handoff.trigger} />

      <View style={styles.script}>
        <Text style={[type.eyebrow, styles.label]}>Abordagem: {handoff.topic}</Text>
        {handoff.steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <Text style={styles.stepNum}>{i + 1}.</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
        <View style={styles.neverSay}>
          <Text style={styles.neverSayText}>
            <Text style={styles.neverSayStrong}>⚠ Nunca diga </Text>
            {handoff.neverSay}
          </Text>
        </View>
      </View>
    </>
  );
}

function LastMessage({ customer }) {
  const last = customer.approach.log.at(-1);
  if (!last) return null;
  return (
    <Text style={styles.outcome}>
      Última mensagem ({chatBubbleLabel(last, customer)}): “{last.text}”
    </Text>
  );
}

function DraftComposer({ customer, ui }) {
  const { actions } = usePredit();
  const vin = customer.vin;
  const drafts = getDrafts(customer);
  const draftLines = drafts[ui.draftIndex ?? 0] ?? [];

  return (
    <View style={styles.draft}>
      <Text style={[type.eyebrow, styles.label]}>
        O que o botão gera{drafts.length > 1 ? ` · opção ${(ui.draftIndex ?? 0) + 1} de ${drafts.length}` : ''}
      </Text>

      {ui.editing ? (
        <TextInput
          value={ui.draftText ?? draftLines.join('\n\n')}
          onChangeText={(text) => actions.setDraftText(vin, text)}
          multiline
          textAlignVertical="top"
          style={styles.input}
        />
      ) : ui.draftText != null ? (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{ui.draftText}</Text>
        </View>
      ) : (
        draftLines.map((line, i) => (
          <View key={i} style={styles.bubble}>
            <Text style={styles.bubbleText}>{line}</Text>
          </View>
        ))
      )}

      <View style={styles.actions}>
        <Button label="Enviar" icon="send" variant="whatsapp" onPress={() => actions.sendDraft(vin)} style={styles.action} />
        <Button
          label={ui.editing ? 'Concluir edição' : 'Editar'}
          onPress={() => actions.toggleEdit(vin)}
          style={styles.action}
        />
        {drafts.length > 1 && <Button label="Gerar outra" onPress={() => actions.nextDraft(vin)} style={styles.action} />}
      </View>

      <Text style={styles.note}>
        O texto nunca sai sem alguém apertar Enviar. O agente acelera a digitação, não transfere a decisão.
      </Text>
    </View>
  );
}

function Block({ label, text }) {
  return (
    <View style={styles.block}>
      <Text style={[type.eyebrow, styles.label]}>{label}</Text>
      <Text style={styles.blockText}>{text}</Text>
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
    marginBottom: 12,
  },
  needsHuman: { borderColor: colors.red + '88' },
  head: { gap: 4, marginBottom: 10 },
  name: { fontFamily: fonts.bold, fontSize: 17, color: colors.text, marginTop: 6 },
  sub: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  label: { fontSize: 10, color: colors.dim, marginBottom: 4 },
  block: { marginTop: 8 },
  blockText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 },
  script: {
    backgroundColor: colors.bg,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radiusSm,
    padding: 12,
    marginTop: 12,
    gap: 6,
  },
  step: { flexDirection: 'row', gap: 6 },
  stepNum: { fontFamily: fonts.semibold, fontSize: 14, color: colors.muted, width: 18 },
  stepText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 },
  neverSay: {
    backgroundColor: colors.yellowSoft,
    borderColor: colors.yellow + '66',
    borderWidth: 1,
    borderRadius: radiusSm,
    padding: 10,
    marginTop: 6,
  },
  neverSayText: { fontFamily: fonts.regular, fontSize: 13, color: colors.soft, lineHeight: 19 },
  neverSayStrong: { fontFamily: fonts.bold, color: colors.yellow },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  action: { flexGrow: 1 },
  outcome: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 20 },
  draft: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 12,
    gap: 8,
  },
  bubble: {
    backgroundColor: colors.greenSoft,
    borderLeftColor: colors.whatsapp,
    borderLeftWidth: 3,
    borderRadius: radiusSm,
    padding: 10,
  },
  bubbleText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text, lineHeight: 20 },
  input: {
    minHeight: 180,
    backgroundColor: colors.panel2,
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: radiusSm,
    padding: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  note: { fontFamily: fonts.regular, fontStyle: 'italic', fontSize: 12, color: colors.muted, lineHeight: 17 },
});
