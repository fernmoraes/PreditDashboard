// Estado global do app — equivale às funções de script.js (Documentacao.md seções 8 e 10).
// Só `customers` é persistido; UI de acompanhamento, busca e toast resetam ao abrir o app.
// O envio é um SIMULACRO: nada sai do app — a mensagem aprovada entra no histórico como enviada pelo Agente IA.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialCustomers as webCustomers } from '@/data/customers';
import { getDrafts } from '@/data/drafts';
import { extraCustomers } from '@/data/extraCustomers';
import { nowTimeLabel } from '@/utils/time';

// 6 clientes do web + clientes extras criados para o mobile
const initialCustomers = [...webCustomers, ...extraCustomers];

// v2: base de clientes ampliada — chave nova para não carregar a lista antiga salva no aparelho
const STORAGE_KEY = 'predit:customers:v2';

const clone = (value) => JSON.parse(JSON.stringify(value));

const initialState = {
  ready: false,
  customers: clone(initialCustomers),
  search: '',
  aiPlanCollapsed: false,
  trackingUi: {}, // { [vin]: { expanded, historyVisible, draftVisible, draftIndex, editing, draftText } }
  toast: null, // { message, id }
};

function updateCustomer(state, vin, fn) {
  return {
    ...state,
    customers: state.customers.map((c) => (c.vin === vin ? fn(c) : c)),
  };
}

function updateUi(state, vin, patch) {
  const current = state.trackingUi[vin] ?? {};
  const next = typeof patch === 'function' ? patch(current) : { ...current, ...patch };
  return { ...state, trackingUi: { ...state.trackingUi, [vin]: next } };
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ready: true, customers: action.customers ?? state.customers };
    case 'reset':
      return { ...initialState, ready: true, customers: clone(initialCustomers) };
    case 'setSearch':
      return { ...state, search: action.text };
    case 'toggleAiPlan':
      return { ...state, aiPlanCollapsed: !state.aiPlanCollapsed };
    case 'toast':
      return { ...state, toast: action.message ? { message: action.message, id: Date.now() } : null };

    case 'startPlan':
      return updateCustomer(state, action.vin, (c) => ({
        ...c,
        approach: {
          ...c.approach,
          status: 'in_progress',
          startedAt: `agora (${action.time})`,
          log: [{ from: 'ai', time: action.time, text: c.aiPlan.whatsappMessage }],
        },
      }));
    case 'defer': {
      // guarda o status anterior para "Retomar caso" devolver o card ao mesmo ponto
      const next = updateCustomer(state, action.vin, (c) => ({
        ...c,
        approach: { ...c.approach, status: 'deferred', deferredFrom: c.approach.status },
      }));
      return updateUi(next, action.vin, (ui) => ({ expanded: ui.expanded }));
    }
    case 'resume':
      return updateCustomer(state, action.vin, (c) => {
        const { deferredFrom, ...approach } = c.approach;
        return { ...c, approach: { ...approach, status: deferredFrom ?? 'in_progress' } };
      });
    case 'aiSent': {
      // needs_human → in_progress (a dúvida foi respondida); os demais status se mantêm
      const next = updateCustomer(state, action.vin, (c) => ({
        ...c,
        approach: {
          ...c.approach,
          status: c.approach.status === 'needs_human' ? 'in_progress' : c.approach.status,
          log: [...c.approach.log, { from: 'ai', time: action.time, text: action.text }],
        },
      }));
      // fecha o rascunho e já mostra o histórico com a mensagem enviada
      return updateUi(next, action.vin, (ui) => ({ expanded: ui.expanded, historyVisible: true }));
    }

    case 'toggleExpanded':
      return updateUi(state, action.vin, (ui) => ({ ...ui, expanded: !ui.expanded }));
    case 'expand':
      return updateUi(state, action.vin, { expanded: true });

    case 'toggleHistory':
      return updateUi(state, action.vin, (ui) => ({ ...ui, historyVisible: !ui.historyVisible }));
    case 'showDraft':
      return updateUi(state, action.vin, (ui) => ({
        ...ui,
        draftVisible: true,
        draftIndex: 0,
        editing: false,
        draftText: null,
      }));
    case 'nextDraft':
      return updateUi(state, action.vin, (ui) => ({
        ...ui,
        draftIndex: ((ui.draftIndex ?? 0) + 1) % action.total,
        editing: false,
        draftText: null,
      }));
    case 'toggleEdit':
      return updateUi(state, action.vin, (ui) => ({
        ...ui,
        editing: !ui.editing,
        // ao entrar em edição pela 1ª vez, começa com o rascunho atual
        draftText: ui.draftText ?? action.initialText,
      }));
    case 'setDraftText':
      return updateUi(state, action.vin, { draftText: action.text });

    default:
      return state;
  }
}

/** Texto do rascunho atual: o editado (se houver) ou os parágrafos unidos. */
export function currentDraftText(customer, ui = {}) {
  if (ui.draftText != null) return ui.draftText;
  const lines = getDrafts(customer)[ui.draftIndex ?? 0] ?? [];
  return lines.join('\n\n');
}

const PreditContext = createContext(null);

export function PreditProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => dispatch({ type: 'hydrate', customers: raw ? JSON.parse(raw) : null }))
      .catch(() => dispatch({ type: 'hydrate' }));
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.customers)).catch(() => {});
  }, [state.ready, state.customers]);

  const find = useCallback((vin) => state.customers.find((c) => c.vin === vin), [state.customers]);

  const actions = useMemo(() => {
    const showToast = (message) => dispatch({ type: 'toast', message });

    return {
      showToast,
      hideToast: () => dispatch({ type: 'toast', message: null }),
      setSearch: (text) => dispatch({ type: 'setSearch', text }),
      toggleAiPlan: () => dispatch({ type: 'toggleAiPlan' }),

      /** Retorna 'not_actionable' | 'already_started' | 'started' — a tela decide se navega. */
      startActionPlan: (vin) => {
        const c = find(vin);
        if (!c) return null;
        if (!c.aiPlan?.actionable) {
          showToast(`${c.name} está com baixo risco: nenhuma ação recomendada agora.`);
          return 'not_actionable';
        }
        if (c.approach.status !== 'not_started') return 'already_started';
        dispatch({ type: 'startPlan', vin, time: nowTimeLabel() });
        showToast(`Agente de IA Predit iniciou o Plano de Ação com ${c.name} pelo WhatsApp.`);
        return 'started';
      },

      deferCase: (vin) => {
        const c = find(vin);
        dispatch({ type: 'defer', vin });
        showToast(`Caso de ${c.name} repassado para outro consultor.`);
      },

      resumeCase: (vin) => {
        const c = find(vin);
        dispatch({ type: 'resume', vin });
        showToast(`Caso de ${c.name} retomado.`);
      },

      // Simulacro de envio: registra no histórico como mensagem do Agente IA (não abre WhatsApp)
      sendDraft: (vin) => {
        const c = find(vin);
        const text = currentDraftText(c, state.trackingUi[vin]).trim();
        if (!text) {
          showToast('Escreva uma mensagem antes de enviar.');
          return;
        }
        dispatch({ type: 'aiSent', vin, text, time: nowTimeLabel() });
        showToast(`Agente de IA Predit enviou a mensagem para ${c.name}.`);
      },

      toggleExpanded: (vin) => dispatch({ type: 'toggleExpanded', vin }),
      expand: (vin) => dispatch({ type: 'expand', vin }),
      toggleHistory: (vin) => dispatch({ type: 'toggleHistory', vin }),
      showDraft: (vin) => dispatch({ type: 'showDraft', vin }),
      nextDraft: (vin) => {
        const c = find(vin);
        dispatch({ type: 'nextDraft', vin, total: c ? getDrafts(c).length : 1 });
      },
      toggleEdit: (vin) => {
        const c = find(vin);
        dispatch({ type: 'toggleEdit', vin, initialText: currentDraftText(c, state.trackingUi[vin]) });
      },
      setDraftText: (vin, text) => dispatch({ type: 'setDraftText', vin, text }),

      resetDemo: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
        dispatch({ type: 'reset' });
        showToast('Experiência reiniciada: clientes voltaram ao estado inicial.');
      },
    };
  }, [find, state.trackingUi]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <PreditContext.Provider value={value}>{children}</PreditContext.Provider>;
}

export function usePredit() {
  const ctx = useContext(PreditContext);
  if (!ctx) throw new Error('usePredit precisa estar dentro de <PreditProvider>');
  return ctx;
}

/** Clientes filtrados pela busca (nome/VIN/modelo/dealer), ordenados por score desc. */
export function useCustomers() {
  const { state } = usePredit();
  return useMemo(() => {
    const query = state.search.trim().toLowerCase();
    return state.customers
      .filter((c) => !query || `${c.name} ${c.vin} ${c.model} ${c.dealer}`.toLowerCase().includes(query))
      .sort((a, b) => b.score - a.score);
  }, [state.customers, state.search]);
}

export function useCustomer(vin) {
  const { state } = usePredit();
  return state.customers.find((c) => c.vin === vin);
}

export function useNeedsHumanCount() {
  const { state } = usePredit();
  return state.customers.filter((c) => c.approach.status === 'needs_human').length;
}
