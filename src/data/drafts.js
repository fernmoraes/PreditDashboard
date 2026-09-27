// Rascunhos de mensagem de acompanhamento para quem NÃO tem `approach.handoff`
// (no web só a Marina tinha rascunhos). Mesmo formato de handoff.drafts: array de rascunhos,
// cada rascunho é um array de parágrafos. Mantido separado para não alterar a cópia literal de customers.js.

export const followUpDrafts = {
  // Ana Souza — Ranger 2025, revisão 62 dias atrasada, garantia vence em 5 meses
  '9BF-RNG25-A82': [
    [
      'Oi Ana, tudo bem? Passando pra saber se conseguiu ver minha mensagem sobre a revisão da sua Ranger.',
      'Separei dois horários com busca e entrega: quinta às 8h ou sexta às 14h, na Ford Lapa. Qual fica melhor pra você?',
    ],
    [
      'Ana, só um lembrete rápido: fazendo a revisão nos próximos 15 dias, sua cobertura Ford Protect segue garantida.',
      'Se preferir, eu mesmo agendo e o motorista busca a Ranger no seu endereço. Posso reservar?',
    ],
  ],

  // Rafael Lima — Bronco 2024, 8 meses sem passagem, inspeção preventiva + reserva técnica
  '9BF-BRO24-B74': [
    [
      'Rafael, tudo certo? Retomando sobre a inspeção preventiva da sua Bronco.',
      'Deixei a peça reservada na Ford Morumbi por 7 dias. Consigo te encaixar sábado às 9h ou segunda às 17h. Qual prefere?',
    ],
    [
      'Rafael, como a Bronco está com uso mais intenso, a inspeção evita desgaste maior na suspensão e nos freios.',
      'A reserva técnica já está feita, é só confirmar o dia. Quer que eu te mande as opções da semana?',
    ],
  ],

  // Bruno Martins — Mustang 2024, convite para revisão premium
  '9BF-MUS24-D58': [
    [
      'Bruno, tudo bem? Seu horário exclusivo para a revisão premium do Mustang ainda está disponível.',
      'Temos quarta às 10h ou sexta às 16h na Ford Morumbi, sem fila de espera. Posso confirmar um deles?',
    ],
    [
      'Bruno, na revisão premium o Mustang passa por checklist completo de performance, com lavagem inclusa.',
      'Se quiser, deixo o horário no seu nome e te aviso um dia antes. Fechado?',
    ],
  ],

  // Camila Rocha — Ranger 2024, baixo risco (plano não acionável; mantido por completude)
  '9BF-RNG24-E41': [
    [
      'Oi Camila! Tudo em dia com a sua Ranger por aqui.',
      'Quando a próxima revisão se aproximar, te aviso com antecedência na Ford Lapa. Qualquer dúvida, é só chamar!',
    ],
  ],

  // Diego Nunes — Territory 2025, 1ª revisão já agendada para sábado às 9h
  '9BF-TER25-F63': [
    [
      'Oi Diego! Passando pra lembrar da primeira revisão do seu Territory, sábado às 9h na Ford Campinas.',
      'Se precisar remarcar, é só me avisar por aqui. Até sábado!',
    ],
    [
      'Diego, obrigado por escolher a rede Ford! Como foi o atendimento na sua primeira revisão?',
      'Sua opinião ajuda a gente a melhorar. Pode responder com uma nota de 0 a 10?',
    ],
  ],
};

/** Rascunhos disponíveis para o cliente: os do handoff (Marina) ou os de acompanhamento. */
export function getDrafts(customer) {
  const drafts = customer.approach.handoff?.drafts ?? followUpDrafts[customer.vin];
  if (drafts?.length) return drafts;
  // Fallback para qualquer cliente novo sem rascunho escrito
  return [[`Oi ${customer.name.split(' ')[0]}! Aqui é o assistente Predit da ${customer.dealer}. Posso te ajudar com algo sobre o seu ${customer.model}?`]];
}
