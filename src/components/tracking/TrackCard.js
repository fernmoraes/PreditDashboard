import { Ionicons } from '@expo/vector-icons';
import { LayoutAnimation, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getDrafts } from '@/data/drafts';
import { usePredit } from '@/context/PreditContext';
import { colors, fonts, radius, radiusSm, type } from '@/constants/theme';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ChatHistory, { chatBubbleLabel } from '@/components/tracking/ChatHistory';
import { APPROACH_BADGE, STATUS_COLOR } from '@/constants/status';

// Card de acompanhamento (Documentacao.md 6.4). Diferente do web:
// - todo status ativo tem o compositor (Gerar mensagem / Editar / Gerar outra / Enviar), não só needs_human;
// - "Enviar" é simulado: a mensagem entra no histórico como enviada pelo Predit (sem WhatsApp);
// - caso repassado (deferred) pode ser retomado;
// - card começa recolhido (cabeçalho + prévia) para a lista ser fácil de percorrer; toque expande.

// Uma linha que resume o caso quando o card está recolhido
function previewText(customer) {
  const { approach } = customer;
  if (approach.status === 'needs_human') return approach.handoff.trigger;
  if (approach.status === 'deferred') return 'Caso repassado para outro consultor.';
  if (approach.status === 'done') return approach.outcome ?? 'Abordagem concluída.';
  const last = approach.log.at(-1);
  return last ? `${chatBubbleLabel(last, customer)}: “${last.text}”` : 'Aguardando resposta do cliente.';
}

export default function TrackCard({ customer, onLayout }) {
  const { state, actions } = usePredit();
  const { approach } = customer;
  const ui = state.trackingUi[customer.vin] ?? {};
  const vin = customer.vin;
  const badge = APPROACH_BADGE[approach.status];
  const deferred = approach.status === 'deferred';
  const expanded = !!ui.expanded;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    actions.toggleExpanded(vin);
  };

  return (
    <View onLayout={onLayout} style={styles.card}>
      <View style={[styles.stripe, { backgroundColor: STATUS_COLOR[approach.status] }]} />

      <View style={styles.inner}>
        <Pressable onPress={toggle} style={({ pressed }) => [styles.head, pressed && styles.headPressed]}>
          <View style={styles.headText}>
            <View style={styles.titleRow}>
              <Text style={styles.name} numberOfLines={1}>
                {customer.name}
              </Text>
              <Badge variant={badge.variant} label={badge.label} />
            </View>
            <Text style={styles.sub}>
              {customer.model} · score {customer.score}
            </Text>
          </View>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.muted} />
        </Pressable>

        {!expanded ? (
          <Text style={styles.preview} numberOfLines={2} onPress={toggle}>
            {previewText(customer)}
          </Text>
        ) : (
          <ExpandedBody customer={customer} ui={ui} deferred={deferred} />
        )}
      </View>
    </View>
  );
}

function ExpandedBody({ customer, ui, deferred }) {
  const { actions } = usePredit();
  const { approach } = customer;
  const vin = customer.vin;

  return (
    <>
      {approach.status === 'needs_human' && <HandoffInfo handoff={approach.handoff} />}
      {approach.status === 'in_progress' && <LastMessage customer={customer} />}
      {approach.status === 'done' && <Text style={styles.outcome}>{approach.outcome ?? 'Abordagem concluída.'}</Text>}
      {deferred && <Text style={styles.outcome}>Caso repassado para outro consultor.</Text>}

      <View style={styles.actions}>
        {deferred ? (
          <Button label="Retomar caso" icon="arrow-undo" variant="primary" onPress={() => actions.resumeCase(vin)} style={styles.action} />
        ) : (
          <Button
            label="Gerar mensagem"
            icon="chatbox-ellipses-outline"
            variant="primary"
            onPress={() => actions.showDraft(vin)}
            style={styles.action}
          />
        )}
        <Button
          label={ui.historyVisible ? 'Ocultar conversa' : 'Ver conversa'}
          onPress={() => actions.toggleHistory(vin)}
          style={styles.action}
        />
        {!deferred && <Button label="Passar adiante" onPress={() => actions.deferCase(vin)} style={styles.action} />}
      </View>

      {ui.draftVisible && !deferred && <DraftComposer customer={customer} ui={ui} />}

      {ui.historyVisible && <ChatHistory customer={customer} />}
    </>
  );
}

function HandoffInfo({ handoff }) {
  return (
    <>
      <View style={styles.trigger}>
        <Ionicons name="alert-circle" size={18} color={colors.red} />
        <Text style={styles.triggerText}>{handoff.trigger}</Text>
      </View>

      <Block label="Perfil" text={handoff.profile} />

      <View style={styles.script}>
        <Text style={styles.label}>Como responder · {handoff.topic}</Text>
        {handoff.steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <Text style={styles.stepNum}>{i + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
        <View style={styles.neverSay}>
          <Ionicons name="ban" size={16} color={colors.yellow} style={styles.neverSayIcon} />
          <Text style={styles.neverSayText}>
            <Text style={styles.neverSayStrong}>Não diga </Text>
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
      <Text style={styles.outcomeStrong}>Última mensagem ({chatBubbleLabel(last, customer)}): </Text>“{last.text}”
    </Text>
  );
}

function DraftComposer({ customer, ui }) {
  const { actions } = usePredit();
  const vin = customer.vin;
  const drafts = getDrafts(customer);
  const draftLines = drafts[ui.draftIndex ?? 0] ?? [];
  const text = ui.draftText ?? draftLines.join('\n\n');

  return (
    <View style={styles.draft}>
      <Text style={styles.label}>
        Rascunho{drafts.length > 1 ? ` ${(ui.draftIndex ?? 0) + 1} de ${drafts.length}` : ''}
        {ui.draftText != null ? ' · editado' : ''}
      </Text>

      {ui.editing ? (
        <TextInput
          value={text}
          onChangeText={(value) => actions.setDraftText(vin, value)}
          multiline
          autoFocus
          textAlignVertical="top"
          style={styles.input}
        />
      ) : (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button label="Enviar" icon="send" variant="whatsapp" onPress={() => actions.sendDraft(vin)} style={styles.action} />
        <Button
          label={ui.editing ? 'Concluir' : 'Editar'}
          icon={ui.editing ? 'checkmark' : 'create-outline'}
          onPress={() => actions.toggleEdit(vin)}
          style={styles.action}
        />
        {drafts.length > 1 && (
          <Button label="Gerar outra" icon="refresh" onPress={() => actions.nextDraft(vin)} style={styles.action} />
        )}
      </View>

      <Text style={styles.note}>
        Nada é enviado sem você tocar em Enviar. O Predit sugere o texto; a decisão é sua.
      </Text>
    </View>
  );
}

function Block({ label, text }) {
  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.blockText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius,
    marginBottom: 8,
    overflow: 'hidden',
  },
  stripe: { width: 5 },
  inner: { flex: 1, padding: 14 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  headPressed: { opacity: 0.7 },
  headText: { flex: 1, gap: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flexShrink: 1, fontFamily: fonts.bold, fontSize: 17, color: colors.text },
  sub: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  preview: { fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 19 },
  label: { ...type.eyebrow, fontSize: 12, marginBottom: 4 },
  trigger: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.redSoft,
    borderRadius: radiusSm,
    padding: 10,
    marginTop: 4,
  },
  triggerText: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.text, lineHeight: 19 },
  block: { marginTop: 12 },
  blockText: { fontFamily: fonts.regular, fontSize: 15, color: colors.soft, lineHeight: 20 },
  script: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radiusSm,
    padding: 12,
    marginTop: 12,
    gap: 8,
  },
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
  stepText: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text, lineHeight: 21 },
  neverSay: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.yellowSoft,
    borderRadius: radiusSm,
    padding: 10,
    marginTop: 2,
  },
  neverSayIcon: { marginTop: 1 },
  neverSayText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.soft, lineHeight: 19 },
  neverSayStrong: { fontFamily: fonts.bold, color: colors.yellow },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  action: { flexGrow: 1 },
  outcome: { fontFamily: fonts.regular, fontSize: 15, color: colors.soft, lineHeight: 20 },
  outcomeStrong: { fontFamily: fonts.semibold, color: colors.text },
  draft: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 12,
    gap: 8,
  },
  bubble: {
    alignSelf: 'flex-end',
    maxWidth: '94%',
    backgroundColor: colors.bubbleOut,
    borderRadius: 10,
    borderBottomRightRadius: 2,
    padding: 12,
  },
  bubbleText: { fontFamily: fonts.regular, fontSize: 15, color: colors.text, lineHeight: 21 },
  input: {
    minHeight: 180,
    backgroundColor: colors.panel,
    borderColor: colors.blue,
    borderWidth: 1.5,
    borderRadius: radiusSm,
    padding: 10,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    lineHeight: 21,
  },
  note: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 18 },
});
