// Clientes adicionais (mock) criados para o app mobile — mesmo formato de customers.js
// (tipos em Documentacao.md seção 9.1). Mantidos separados da cópia literal do web.

export const extraCustomers = [
  {
    name: "Lucas Ferreira",
    vin: "9BF-F1524-G88",
    model: "F-150 2024",
    dealer: "Ford Morumbi",
    score: 88,
    leadStatus: "Aguardando",
    action: "Revisão com condição comercial especial",
    warranty: "vence em 3 meses",
    lastService: "orçamento recusado",
    revenue: 18450,
    reasons: [
      "Recusou orçamento da última revisão",
      "Garantia vence em 3 meses",
      "Pesquisou oficina independente no app",
      "Ticket de pós-venda acima da média",
    ],
    message:
      "Lucas, preparamos uma condição especial para a revisão da sua F-150. Confira os detalhes no app e agende com prioridade.",
    phone: "5511976543210",
    aiPlan: {
      generatedAt: "22 set. 2026 às 08:47",
      confidence: 91,
      tone: "Direto, orientado a valor",
      channel: "WhatsApp",
      bestWindow: "Hoje, entre 12h e 14h",
      actionable: true,
      summary:
        "Lucas recusou o orçamento da última revisão e já pesquisou oficinas independentes. Com a garantia vencendo em 3 meses, é o cliente de maior risco da carteira.",
      steps: [
        "Reconhecer que o último orçamento não fez sentido para ele",
        "Mostrar o que está incluso na revisão Ford (peças originais, registro de garantia)",
        "Oferecer uma condição comercial para fechar ainda este mês",
        "Sugerir dois horários concretos",
      ],
      whatsappMessage:
        "Oi Lucas! Aqui é o assistente Predit da Ford Morumbi. Vi que o último orçamento da revisão da sua F-150 não fechou. Revisamos a proposta e temos uma condição nova, com peças originais e registro na garantia. Posso te mostrar?",
    },
    approach: {
      status: "needs_human",
      startedAt: "22 set. 2026 às 08:50",
      log: [
        {
          from: "ai",
          time: "08:50",
          text: "Oi Lucas! Aqui é o assistente Predit da Ford Morumbi. Vi que o último orçamento da revisão da sua F-150 não fechou. Revisamos a proposta e temos uma condição nova, com peças originais e registro na garantia. Posso te mostrar?",
        },
        {
          from: "customer",
          time: "09:31",
          text: "Uma oficina aqui perto faz a mesma revisão por quase metade do preço. Vocês cobrem esse valor?",
        },
      ],
      handoff: {
        trigger:
          "Pediu para cobrir o preço de uma oficina concorrente. Negociação de preço — a IA não tem autonomia para dar desconto.",
        profile:
          "Cliente de alto valor: F-150 com uso intenso, sempre revisou na Ford até o último orçamento. Sensível a preço, mas valoriza procedência.",
        topic: "Objeção: preço da concorrência",
        steps: [
          "Não brigue com o preço da oficina: pergunte o que está incluso no orçamento dela.",
          "Mostre a diferença concreta — peças originais, óleo especificado para a F-150 e registro automático na garantia.",
          "Use a condição que você tem autonomia para dar (parcelamento ou revisão com lavagem inclusa) e feche com um horário.",
        ],
        neverSay:
          "que a oficina dele é ruim ou que vai estragar a picape — ele vai se sentir julgado e encerrar a conversa.",
        drafts: [
          [
            "Lucas, aqui é da Ford Morumbi. Entendo total, preço pesa.",
            "Só pra comparar direitinho: o orçamento da oficina inclui peças originais e o óleo especificado pra F-150? Na nossa revisão isso já vem incluso e fica registrado na sua garantia, que vai até dezembro.",
            "Consigo parcelar em até 6x sem juros e incluir a lavagem completa. Quarta às 12h30 ou sexta às 13h, qual fica melhor?",
          ],
          [
            "Oi Lucas, tudo bem? Aqui é da Ford Morumbi.",
            "Não consigo igualar o valor da oficina, mas consigo te mostrar exatamente o que você leva a mais: peças originais, óleo certo pro motor da F-150 e o registro na garantia, que vence daqui a 3 meses.",
            "Pra facilitar, libero parcelamento em 6x sem juros. Posso reservar um horário essa semana?",
          ],
        ],
      },
    },
  },
  {
    name: "Juliana Alves",
    vin: "9BF-TER24-H77",
    model: "Territory 2024",
    dealer: "Ford Lapa",
    score: 77,
    leadStatus: "Pronto",
    action: "Agendamento com leva e traz",
    warranty: "ativa",
    lastService: "45 dias atrasada",
    revenue: 11910,
    reasons: [
      "Revisão atrasada há 45 dias",
      "Mudou de endereço recentemente",
      "Baixo uso do app Ford",
    ],
    message:
      "Juliana, sua Territory está com a revisão pendente. Agende pelo app com leva e traz na Ford Lapa.",
    phone: "5511965432109",
    aiPlan: {
      generatedAt: "22 set. 2026 às 09:30",
      confidence: 87,
      tone: "Prático, foco em conveniência",
      channel: "WhatsApp",
      bestWindow: "Hoje, entre 19h e 21h",
      actionable: true,
      summary:
        "Juliana mudou de endereço e ficou mais longe da concessionária. O atraso de 45 dias na revisão parece ligado à distância, não à insatisfação.",
      steps: [
        "Confirmar o novo endereço sem parecer invasivo",
        "Oferecer leva e traz como solução para a distância",
        "Sugerir horário fora do expediente dela",
      ],
      whatsappMessage:
        "Oi Juliana! Aqui é o assistente Predit da Ford Lapa. A revisão da sua Territory está pendente e agora temos leva e traz na sua região. Quer que eu veja um horário que não atrapalhe seu dia?",
    },
    approach: {
      status: "in_progress",
      startedAt: "22 set. 2026 às 19:05",
      log: [
        {
          from: "ai",
          time: "19:05",
          text: "Oi Juliana! Aqui é o assistente Predit da Ford Lapa. A revisão da sua Territory está pendente e agora temos leva e traz na sua região. Quer que eu veja um horário que não atrapalhe seu dia?",
        },
        {
          from: "customer",
          time: "19:40",
          text: "Oi! Quero sim, mas só consigo de manhã bem cedo. Tem como?",
        },
        {
          from: "ai",
          time: "19:41",
          text: "Tem sim! O motorista pode buscar a partir das 7h. Prefere terça ou quinta?",
        },
      ],
    },
  },
  {
    name: "Thiago Mendes",
    vin: "9BF-RNG23-M79",
    model: "Ranger 2023",
    dealer: "Ford Campinas",
    score: 79,
    leadStatus: "Aguardando",
    action: "Revisão de 40 mil km + checagem de freios",
    warranty: "vence em 2 meses",
    lastService: "40 mil km sem revisão",
    revenue: 11910,
    reasons: [
      "Quilometragem acima da revisão prevista",
      "Garantia vence em 2 meses",
      "Uso em estrada de terra (telemetria)",
      "Sem contato com a rede há 10 meses",
    ],
    message:
      "Thiago, sua Ranger já passou dos 40 mil km. Agende a revisão na Ford Campinas antes do fim da garantia.",
    phone: "5519987651234",
    aiPlan: {
      generatedAt: "22 set. 2026 às 11:15",
      confidence: 89,
      tone: "Técnico, com senso de urgência",
      channel: "WhatsApp",
      bestWindow: "Amanhã, entre 7h e 9h",
      actionable: true,
      summary:
        "Thiago roda muito em estrada de terra e passou da revisão de 40 mil km. Com a garantia acabando em 2 meses, freios e suspensão são o argumento mais concreto.",
      steps: [
        "Falar a língua dele: uso severo, quilometragem e itens de desgaste",
        "Explicar que a revisão agora garante a cobertura antes do vencimento",
        "Oferecer checagem de freios e suspensão sem custo adicional",
        "Sugerir horário cedo, antes do trabalho",
      ],
      whatsappMessage:
        "Fala, Thiago! Aqui é o assistente Predit da Ford Campinas. Sua Ranger já passou dos 40 mil km e roda bastante em terra — é hora de dar uma olhada em freios e suspensão. Faço a revisão com a checagem inclusa, antes da garantia vencer. Bora marcar?",
    },
    approach: { status: "not_started", log: [] },
  },
  {
    name: "Pedro Santos",
    vin: "9BF-TRN23-I71",
    model: "Transit 2023",
    dealer: "Ford Campinas",
    score: 71,
    leadStatus: "Aguardando",
    action: "Plano de manutenção para frota",
    warranty: "ativa",
    lastService: "3 veículos atrasados",
    revenue: 22300,
    reasons: [
      "Cliente frotista (3 Transits)",
      "Revisões atrasadas em 3 veículos",
      "Veículo parado custa faturamento ao cliente",
    ],
    message:
      "Pedro, montamos um plano de manutenção para a sua frota Transit, com agendamento em lote na Ford Campinas.",
    phone: "5519976540987",
    aiPlan: {
      generatedAt: "22 set. 2026 às 13:20",
      confidence: 84,
      tone: "Profissional, foco em produtividade",
      channel: "WhatsApp",
      bestWindow: "Dias úteis, entre 14h e 16h",
      actionable: true,
      summary:
        "Pedro tem uma pequena frota de 3 Transits com revisões atrasadas. Para ele, o que pesa é o tempo de veículo parado, não o preço.",
      steps: [
        "Tratar como cliente empresarial, com linguagem objetiva",
        "Propor revisão em lote com horário estendido",
        "Garantir prazo de entrega para não parar a operação",
      ],
      whatsappMessage:
        "Olá, Pedro! Aqui é o assistente Predit da Ford Campinas. As 3 Transits da sua frota estão com revisão pendente. Montamos um agendamento em lote, com entrega no mesmo dia pra não parar sua operação. Posso te enviar as datas?",
    },
    approach: { status: "not_started", log: [] },
  },
  {
    name: "Beatriz Carvalho",
    vin: "9BF-MCE25-J69",
    model: "Mustang Mach-E 2025",
    dealer: "Ford Morumbi",
    score: 69,
    leadStatus: "Pronto",
    action: "Check-up elétrico + recuperação de relacionamento",
    warranty: "ativa",
    lastService: "reclamação aberta",
    revenue: 9800,
    reasons: [
      "Reclamação aberta sobre o último atendimento",
      "Primeiro carro elétrico da cliente",
      "Avaliação baixa na pesquisa de satisfação",
    ],
    message:
      "Beatriz, queremos entender como foi sua última visita e cuidar do seu Mach-E da melhor forma.",
    phone: "5511954321098",
    aiPlan: {
      generatedAt: "22 set. 2026 às 14:05",
      confidence: 78,
      tone: "Empático, de escuta",
      channel: "WhatsApp",
      bestWindow: "Hoje, após 18h",
      actionable: true,
      summary:
        "Beatriz deu nota baixa no último atendimento e é a primeira vez que tem um carro elétrico. Antes de oferecer serviço, é preciso ouvir e recuperar a confiança.",
      steps: [
        "Abrir a conversa perguntando, não oferecendo",
        "Reconhecer a experiência ruim sem justificar",
        "Oferecer um check-up elétrico com especialista",
      ],
      whatsappMessage:
        "Oi Beatriz! Aqui é o assistente Predit da Ford Morumbi. Vi que sua última visita não foi como deveria, e quero entender o que aconteceu. Pode me contar um pouco?",
    },
    approach: {
      status: "needs_human",
      startedAt: "22 set. 2026 às 18:10",
      log: [
        {
          from: "ai",
          time: "18:10",
          text: "Oi Beatriz! Aqui é o assistente Predit da Ford Morumbi. Vi que sua última visita não foi como deveria, e quero entender o que aconteceu. Pode me contar um pouco?",
        },
        {
          from: "customer",
          time: "18:34",
          text: "Deixei o carro 5 dias por causa do carregador e ninguém me deu retorno. Quero falar com o gerente, vou registrar no Reclame Aqui.",
        },
      ],
      handoff: {
        trigger:
          "Pediu para falar com o gerente e ameaçou registrar reclamação pública. Escalonamento de reclamação — a IA não conduz sozinha.",
        profile:
          "Cliente nova em carro elétrico, ficou 5 dias sem o Mach-E por um problema no carregador e sem atualização da oficina.",
        topic: "Reclamação: falta de retorno no atendimento",
        steps: [
          "Peça desculpas pela falta de retorno — sem justificar o prazo.",
          "Assuma o caso pelo nome: diga que você vai acompanhar pessoalmente e que o gerente já está ciente.",
          "Ofereça algo concreto: check-up elétrico com especialista e carro reserva, com data marcada.",
        ],
        neverSay:
          "que o atraso foi culpa da fábrica ou da peça — ela vai entender como desculpa e escalar a reclamação.",
        drafts: [
          [
            "Beatriz, peço desculpas. Ficar 5 dias sem o carro e sem nenhum retorno não é o atendimento que você merece.",
            "Vou acompanhar seu caso pessoalmente e o gerente da Ford Morumbi já está ciente.",
            "Quero te oferecer um check-up completo do sistema elétrico com nosso especialista em Mach-E, com carro reserva enquanto isso. Consigo quinta às 18h. Pode ser?",
          ],
          [
            "Oi Beatriz. Você tem toda razão, e eu sinto muito pela falta de retorno.",
            "A partir de agora, sou eu que acompanho seu Mach-E, e o gerente já sabe do ocorrido.",
            "Posso agendar um check-up com o especialista em elétricos e deixar um carro reserva à sua disposição? Te mando atualização a cada etapa.",
          ],
        ],
      },
    },
  },
  {
    name: "Gustavo Ribeiro",
    vin: "9BF-MAV24-K61",
    model: "Maverick Híbrida 2024",
    dealer: "Ford Campinas",
    score: 61,
    leadStatus: "Aguardando",
    action: "Revisão do sistema híbrido",
    warranty: "ativa",
    lastService: "próxima do vencimento",
    revenue: 11910,
    reasons: [
      "Primeira revisão do sistema híbrido",
      "Dúvidas frequentes no app sobre bateria",
      "Mora a 40 km da concessionária",
    ],
    message:
      "Gustavo, a revisão do sistema híbrido da sua Maverick está chegando. Agende na Ford Campinas e tire suas dúvidas sobre a bateria.",
    phone: "5519965439876",
    aiPlan: {
      generatedAt: "22 set. 2026 às 15:40",
      confidence: 80,
      tone: "Didático, consultivo",
      channel: "App",
      bestWindow: "Sábado pela manhã",
      actionable: true,
      summary:
        "Gustavo tem dúvidas recorrentes sobre a bateria híbrida. A revisão é a oportunidade de resolver as dúvidas e mostrar que só a rede tem o diagnóstico completo do sistema.",
      steps: [
        "Responder a dúvida mais frequente dele sobre a bateria",
        "Explicar o que é verificado na revisão do sistema híbrido",
        "Sugerir sábado pela manhã, por causa da distância",
      ],
      whatsappMessage:
        "Oi Gustavo! Aqui é o assistente Predit da Ford Campinas. Vi que você tem algumas dúvidas sobre a bateria da sua Maverick Híbrida. Na revisão do sistema híbrido a gente faz o diagnóstico completo e te explica tudo. Quer agendar para um sábado?",
    },
    approach: { status: "not_started", log: [] },
  },
  {
    name: "Fernanda Lopes",
    vin: "9BF-BRS23-L56",
    model: "Bronco Sport 2023",
    dealer: "Ford Lapa",
    score: 56,
    leadStatus: "Concluído",
    action: "Revisão + troca de pneus",
    warranty: "ativa",
    lastService: "em dia",
    revenue: 11910,
    reasons: [
      "Pneus próximos do limite de desgaste",
      "Viagem de férias informada no app",
      "Cotou pneus em loja online",
    ],
    message:
      "Fernanda, antes da sua viagem, que tal revisar a Bronco Sport e trocar os pneus na Ford Lapa?",
    phone: "5511943210987",
    aiPlan: {
      generatedAt: "21 set. 2026 às 16:20",
      confidence: 83,
      tone: "Leve, voltado à viagem",
      channel: "WhatsApp",
      bestWindow: "Hoje, entre 12h e 13h",
      actionable: true,
      summary:
        "Fernanda informou uma viagem no app e os pneus estão no limite. É uma chance de vender revisão pré-viagem com troca de pneus antes que ela compre online.",
      steps: [
        "Conectar a revisão à viagem dela",
        "Oferecer pacote pré-viagem com pneus",
        "Garantir entrega antes da data da viagem",
      ],
      whatsappMessage:
        "Oi Fernanda! Aqui é o assistente Predit da Ford Lapa. Vi que você tem uma viagem chegando 🚙 Que tal deixar a Bronco Sport pronta, com revisão e pneus novos? Montei um pacote pré-viagem pra você.",
    },
    approach: {
      status: "done",
      startedAt: "21 set. 2026 às 16:25",
      outcome: "Pacote pré-viagem fechado: revisão + 4 pneus, entrega na sexta às 17h.",
      log: [
        {
          from: "ai",
          time: "16:25",
          text: "Oi Fernanda! Aqui é o assistente Predit da Ford Lapa. Vi que você tem uma viagem chegando 🚙 Que tal deixar a Bronco Sport pronta, com revisão e pneus novos? Montei um pacote pré-viagem pra você.",
        },
        {
          from: "customer",
          time: "16:50",
          text: "Adorei! Consigo pegar antes de sábado?",
        },
        {
          from: "ai",
          time: "16:51",
          text: "Consegue sim! Deixo tudo pronto pra retirada na sexta às 17h. Confirmado?",
        },
        {
          from: "customer",
          time: "16:58",
          text: "Confirmado, obrigada!",
        },
      ],
    },
  },
  {
    name: "Larissa Gomes",
    vin: "9BF-TER25-N35",
    model: "Territory 2025",
    dealer: "Ford Morumbi",
    score: 35,
    leadStatus: "Monitorar",
    action: "Monitorar",
    warranty: "ativa",
    lastService: "em dia",
    revenue: 11910,
    reasons: [
      "Revisões em dia na rede",
      "Alto engajamento no app",
      "Avaliação 10 no último atendimento",
    ],
    message:
      "Larissa, obrigado por confiar na Ford Morumbi! Sua Territory está com tudo em dia.",
    phone: "5511932109876",
    aiPlan: {
      generatedAt: "22 set. 2026 às 16:00",
      confidence: 95,
      tone: "Relacionamento",
      channel: "App",
      bestWindow: "—",
      actionable: false,
      summary:
        "Larissa é uma cliente engajada, com revisões em dia e avaliação máxima. Não há necessidade de contato ativo agora — só manter o relacionamento pelo app.",
      steps: [
        "Manter comunicações de relacionamento pelo app",
        "Reavaliar o score na próxima revisão",
      ],
      whatsappMessage: "",
    },
    approach: { status: "not_started", log: [] },
  },
];
