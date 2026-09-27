// Copiado literalmente de ../../Prevyn-Dashboard/script.js (linhas 1–305). Tipos: Documentacao.md seção 9.1
export const initialCustomers = [
  {
    name: "Ana Souza",
    vin: "9BF-RNG25-A82",
    model: "Ranger 2025",
    dealer: "Ford Lapa",
    score: 82,
    leadStatus: "Aguardando",
    action: "Check-up prioritário + Ford Protect",
    warranty: "vence em 5 meses",
    lastService: "62 dias atrasada",
    revenue: 11910,
    reasons: [
      "Revisão obrigatória atrasada",
      "Garantia próxima do fim",
      "Baixa interação com a rede oficial",
      "Modelo com maior criticidade de pós-venda",
    ],
    message:
      "Ana, identificamos um ponto importante de manutenção na sua Ranger. Agende um check-up preventivo na Ford Lapa e preserve sua cobertura.",
    phone: "5511987654321",
    aiPlan: {
      generatedAt: "22 set. 2026 às 09:12",
      confidence: 94,
      tone: "Consultivo, com senso de urgência",
      channel: "WhatsApp",
      bestWindow: "Hoje, entre 17h e 19h",
      actionable: true,
      summary:
        "Ana está no grupo de maior risco de evasão: revisão obrigatória atrasada há 62 dias e garantia vencendo em 5 meses. Ação imediata reduz a chance de ela buscar uma oficina independente.",
      steps: [
        "Reconhecer o vínculo com a Ranger e o histórico de manutenção",
        "Alertar sobre a revisão atrasada sem soar como cobrança",
        "Oferecer 2 horários prioritários com busca e entrega do veículo",
        "Reforçar que a garantia Ford Protect segue válida se a revisão for feita em até 15 dias",
      ],
      whatsappMessage:
        "Oi Ana! Aqui é o assistente Predit da Ford Lapa 👋 Notei que a revisão da sua Ranger está com 62 dias de atraso e sua garantia vence em breve. Posso te ajudar a agendar um horário essa semana, com busca e entrega no seu endereço?",
    },
    approach: {
      status: "in_progress",
      startedAt: "22 set. 2026 às 09:14",
      log: [
        {
          from: "ai",
          time: "09:14",
          text: "Oi Ana! Aqui é o assistente Predit da Ford Lapa 👋 Notei que a revisão da sua Ranger está com 62 dias de atraso e sua garantia vence em breve. Posso te ajudar a agendar um horário essa semana, com busca e entrega no seu endereço?",
        },
      ],
    },
  },
  {
    name: "Rafael Lima",
    vin: "9BF-BRO24-B74",
    model: "Bronco 2024",
    dealer: "Ford Morumbi",
    score: 74,
    leadStatus: "Aguardando",
    action: "Inspeção preventiva + reserva técnica",
    warranty: "ativa",
    lastService: "8 meses sem passagem",
    revenue: 11910,
    reasons: [
      "Histórico de alerta por modelo",
      "Última passagem há 8 meses",
      "Uso severo informado no app",
    ],
    message:
      "Rafael, sua Bronco está próxima de uma janela recomendada de inspeção. Reserve um horário com prioridade na Ford Morumbi.",
    phone: "5511976543210",
    aiPlan: {
      generatedAt: "22 set. 2026 às 08:47",
      confidence: 88,
      tone: "Direto, focado no uso do veículo",
      channel: "WhatsApp",
      bestWindow: "Amanhã, entre 9h e 11h",
      actionable: true,
      summary:
        "Rafael está há 8 meses sem passar pela rede e informou uso severo no app. Perfil de risco por desgaste acelerado sem inspeção preventiva.",
      steps: [
        "Citar o uso severo informado no app Ford Connect",
        "Explicar o risco de desgaste em itens críticos sem inspeção",
        "Oferecer inspeção preventiva com peça técnica já reservada",
        "Disponibilizar horário de fim de semana para reduzir fricção",
      ],
      whatsappMessage:
        "Rafael, tudo bem? Aqui é o assistente Predit da Ford Morumbi. Vimos que sua Bronco está há 8 meses sem passar por uma inspeção e identificamos uso mais intenso pelo app. Posso reservar um horário com a peça já separada pra você?",
    },
    approach: { status: "not_started", log: [] },
  },
  {
    name: "Marina Costa",
    vin: "9BF-MAV23-C66",
    model: "Maverick 2023",
    dealer: "Ford Campinas",
    score: 66,
    leadStatus: "Aguardando",
    action: "Oferta de revisão + benefício de retorno",
    warranty: "vence em 72 dias",
    lastService: "fora do prazo",
    revenue: 11910,
    reasons: [
      "Garantia próxima do fim",
      "Revisão feita fora do prazo",
      "Cliente sem retorno após campanha anterior",
    ],
    message:
      "Marina, temos uma condição especial para sua próxima revisão na rede Ford. Agende pelo app e acompanhe tudo por aqui.",
    phone: "5519998877665",
    aiPlan: {
      generatedAt: "22 set. 2026 às 10:03",
      confidence: 81,
      tone: "Empático, recuperação de relacionamento",
      channel: "WhatsApp",
      bestWindow: "Hoje, após 18h",
      actionable: true,
      summary:
        "Marina não retornou após a última campanha e está com a revisão fora do prazo e garantia terminando em 72 dias. Precisa de uma abordagem que reconstrua a confiança.",
      steps: [
        "Reconhecer que o último contato não teve retorno, sem soar como cobrança",
        "Oferecer uma condição exclusiva de retorno",
        "Reforçar o prazo da garantia como urgência real, não pressão comercial",
        "Confirmar disponibilidade antes de sugerir horários",
      ],
      whatsappMessage:
        "Oi Marina! Aqui é o assistente Predit da Ford Campinas. Vi que não conseguimos falar com você na última campanha — sem problemas! Sua garantia vence em 72 dias e temos uma condição especial pra próxima revisão. Posso te mostrar as opções?",
    },
    approach: {
      status: "needs_human",
      startedAt: "22 set. 2026 às 10:05",
      log: [
        {
          from: "ai",
          time: "10:05",
          text: "Oi Marina! Aqui é o assistente Predit da Ford Campinas. Vi que não conseguimos falar com você na última campanha — sem problemas! Sua garantia vence em 72 dias e temos uma condição especial pra próxima revisão. Posso te mostrar as opções?",
        },
        {
          from: "customer",
          time: "10:22",
          text: "Meu amigo falou que eu não sou obrigada a revisar só na Ford pra manter a garantia, isso é verdade?",
        },
      ],
      handoff: {
        trigger:
          "Perguntou se é obrigatório revisar na rede Ford. Tema jurídico (garantia) — a IA não responde sozinha.",
        profile:
          "Cliente fiel em risco: nunca revisou fora da rede, mas enfrentou uma espera longa em jun/25. Garantia vence em 18/10.",
        topic: "Objeção: obrigatoriedade de revisão",
        steps: [
          "Dê razão a ela: pode revisar onde quiser, sem perder a garantia.",
          "Explique o que muda na prática — na Ford, um defeito de fábrica já fica registrado no histórico; fora, ela precisa guardar nota fiscal detalhada de peças e óleo, e sem isso a cobertura pode ser negada.",
          "Feche com um horário concreto, não com uma pergunta aberta.",
        ],
        neverSay:
          "que a garantia cai se ela revisar fora da rede — isso é falso, e ela já ouviu o contrário de alguém.",
        drafts: [
          [
            "Marina, aqui é o Rodrigo, consultor da Ford Campinas.",
            "Seu amigo está certo: você pode fazer a revisão onde quiser, sem perder a garantia.",
            "A diferença aparece se surgir algum defeito de fábrica. Fazendo aqui, fica tudo registrado no sistema da Ford — você não precisa provar nada. Fazendo fora, é preciso guardar nota fiscal detalhada das peças e do óleo usados, e sem isso a cobertura pode ser negada.",
            "Sua garantia vai até 18/10. Quinta às 9h ou sábado às 8h, o que fica melhor pra você?",
          ],
          [
            "Oi Marina, Rodrigo aqui, da Ford Campinas :)",
            "Pra ser bem transparente: você não é obrigada a revisar só com a gente pra manter a garantia — isso vale em qualquer marca.",
            "O que muda é a prova em caso de defeito de fábrica. Aqui na Ford já fica tudo no histórico do seu Maverick. Fora, você precisa guardar as notas fiscais certinhas de cada peça e óleo trocado.",
            "Como sua garantia vence dia 18/10, que tal já garantirmos um horário? Tenho quinta 9h ou sábado 8h.",
          ],
        ],
      },
    },
  },
  {
    name: "Bruno Martins",
    vin: "9BF-MUS24-D58",
    model: "Mustang 2024",
    dealer: "Ford Morumbi",
    score: 58,
    leadStatus: "Aguardando",
    action: "Convite para revisão premium",
    warranty: "ativa",
    lastService: "próxima do vencimento",
    revenue: 11910,
    reasons: [
      "Baixo engajamento no app",
      "Perfil premium com alto valor de recompra",
      "Última revisão próxima do vencimento",
    ],
    message:
      "Bruno, sua próxima revisão está chegando. A rede Ford pode preparar um atendimento premium para manter seu Mustang em alta performance.",
    phone: "5511965432198",
    aiPlan: {
      generatedAt: "22 set. 2026 às 07:55",
      confidence: 76,
      tone: "Premium, exclusivo",
      channel: "WhatsApp",
      bestWindow: "Hoje, entre 12h e 14h",
      actionable: true,
      summary:
        "Bruno tem baixo engajamento no app, mas alto valor de recompra. A abordagem precisa ser exclusiva para não parecer um lembrete genérico.",
      steps: [
        "Tratar como cliente premium, citando o perfil do Mustang",
        "Oferecer atendimento exclusivo fora do horário comercial padrão",
        "Evitar linguagem de 'lembrete' e focar em experiência",
        "Convidar para um test-drive de um novo lançamento como gancho",
      ],
      whatsappMessage:
        "Bruno, tudo certo? Aqui é o assistente Predit da Ford Morumbi. Preparamos um atendimento exclusivo para o seu Mustang, com horário reservado e sem espera. Quer que eu já separe um horário essa semana?",
    },
    approach: { status: "not_started", log: [] },
  },
  {
    name: "Camila Rocha",
    vin: "9BF-RNG24-E41",
    model: "Ranger 2024",
    dealer: "Ford Lapa",
    score: 41,
    leadStatus: "Monitorar",
    action: "Lembrete preventivo",
    warranty: "ativa",
    lastService: "em dia",
    revenue: 11910,
    reasons: [
      "Revisões em dia",
      "Garantia ativa",
      "Boa interação com concessionária",
    ],
    message:
      "Camila, sua Ranger está com manutenção em dia. Continue acompanhando seus alertas pelo app Ford Connect.",
    phone: "5511991234567",
    aiPlan: {
      generatedAt: "22 set. 2026 às 06:30",
      confidence: 97,
      tone: "Informativo, sem necessidade de ação",
      channel: "App",
      bestWindow: "Não é necessário contato ativo",
      actionable: false,
      summary:
        "Camila está com tudo em dia. O agente recomenda apenas manter as notificações automáticas ativas, sem abordagem direta agora.",
      steps: [
        "Manter lembretes automáticos ativos no app",
        "Nenhuma ação humana necessária neste momento",
        "Reavaliar em 90 dias ou se o score subir acima de 55%",
      ],
      whatsappMessage: "",
    },
    approach: { status: "not_started", log: [] },
  },
  {
    name: "Diego Nunes",
    vin: "9BF-TER25-F63",
    model: "Territory 2025",
    dealer: "Ford Campinas",
    score: 63,
    leadStatus: "Aguardando",
    action: "Contato consultivo de 1ª revisão",
    warranty: "ativa",
    lastService: "primeira revisão próxima",
    revenue: 11910,
    reasons: [
      "Primeiro ciclo de pós-venda",
      "Cliente novo sem vínculo com concessionária",
      "Baixa abertura de notificações",
    ],
    message:
      "Diego, sua primeira revisão está chegando. Agende pelo app e mantenha seu Territory protegido pela rede Ford.",
    phone: "5519987651234",
    aiPlan: {
      generatedAt: "22 set. 2026 às 09:40",
      confidence: 84,
      tone: "Acolhedor, boas-vindas",
      channel: "WhatsApp",
      bestWindow: "Hoje, entre 15h e 17h",
      actionable: true,
      summary:
        "Diego é cliente novo, ainda sem vínculo com a concessionária, e está com baixa abertura de notificações. A primeira revisão é o momento-chave para criar relacionamento.",
      steps: [
        "Dar boas-vindas à rede Ford, sem tom comercial",
        "Explicar a importância da primeira revisão de forma simples",
        "Oferecer atendimento consultivo, apresentando o consultor por nome",
        "Convidar para conhecer o app Ford Connect",
      ],
      whatsappMessage:
        "Oi Diego! Aqui é o assistente Predit da Ford Campinas. Seja bem-vindo à rede Ford! Sua primeira revisão do Territory está próxima e eu posso te ajudar a agendar com um consultor dedicado. Quer que eu já verifique os horários disponíveis?",
    },
    approach: {
      status: "done",
      startedAt: "22 set. 2026 às 09:40",
      outcome: "Agendamento confirmado para sábado às 9h na Ford Campinas.",
      log: [
        {
          from: "ai",
          time: "09:40",
          text: "Oi Diego! Aqui é o assistente Predit da Ford Campinas. Seja bem-vindo à rede Ford! Sua primeira revisão do Territory está próxima e eu posso te ajudar a agendar com um consultor dedicado. Quer que eu já verifique os horários disponíveis?",
        },
        { from: "customer", time: "09:58", text: "Pode ser sábado de manhã?" },
        {
          from: "ai",
          time: "09:59",
          text: "Perfeito, Diego! Agendamento confirmado para sábado às 9h na Ford Campinas. Te esperamos!",
        },
      ],
    },
  },
];
