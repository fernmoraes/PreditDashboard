# Predit — Retenção preditiva por VIN (Mobile)

> Projeto acadêmico desenvolvido para a **FIAP** em parceria com a **Ford** — **entrega da Sprint 3**.

O **Predit** é um app mobile (Expo / React Native) que simula um produto de **retenção preditiva de clientes por VIN** para a rede de concessionárias Ford. Ele identifica clientes com risco de deixar a rede oficial de pós-venda e permite que o consultor **acione e acompanhe planos de ação conduzidos por um agente de IA**.

Esta versão mobile é uma **adaptação simplificada** do dashboard web do Predit, focada no fluxo principal: *ver quem está em risco → iniciar o plano de ação → acompanhar e responder as conversas da IA*.

---

## Integrantes

| Nome | RM |
|---|---|
| Fernando Navajas Moraes | RM555080 |
| José Guilherme Sipaúba Costa | RM557274 |
| Bruna da Costa Candeias | RM558938 |
| Weslley Cardoso | RM557927 |
| Gabriel Terra Lilla dos Santos | RM554575 |

---

## O problema

Depois que o carro sai da garantia (ou até antes), parte dos clientes deixa de fazer revisões na rede oficial Ford e passa a usar oficinas independentes. Isso reduz o **VIN Share** (a parcela da frota que continua sendo atendida pela concessionária) e a receita de pós-venda.

## A proposta

1. Um motor de IA calcula um **Score de risco de evasão (0–100%)** por cliente, com base em histórico de revisão, garantia e engajamento.
2. Para cada cliente, a IA gera um **Plano de Ação**: tom de abordagem, canal, melhor horário, passos recomendados e a primeira mensagem.
3. O consultor toca em **"Iniciar Plano de Ação"** e o agente de IA começa a conversa com o cliente.
4. Na tela de **Acompanhamento**, o consultor vê todas as conversas. Quando o cliente faz uma pergunta fora do escopo da IA (ex.: dúvida jurídica sobre garantia), o caso aparece como **"ASSUMIR"**, com perfil do cliente, motivo, roteiro de resposta e um aviso do que **nunca dizer**.
5. O consultor pode **gerar uma mensagem**, **editar**, **gerar outra opção** e **enviar**. A mensagem nunca sai sem um clique humano em "Enviar".

> **MVP / dados simulados:** não há IA real, backend nem integração com WhatsApp. Os 14 clientes (de 3 concessionárias e 9 modelos Ford), os planos e as conversas são dados mockados, e o envio de mensagens é um **simulacro** (a mensagem é registrada no histórico como enviada pelo agente de IA).

---

## Funcionalidades

**Aba Clientes**
- Fila de prioridade ordenada por score, com faixa de cor por nível de risco (Alto ≥ 75 · Médio ≥ 55 · Baixo < 55)
- Busca por nome, VIN, modelo ou concessionária
- Status da abordagem em cada cliente (Assumir, Em andamento, Concluído, Repassado)

**Tela do cliente**
- Medidor de score, garantia, última revisão e motivos do risco
- **Plano de ação** gerado pela IA: resumo, tom, canal, horário, passo a passo e primeira mensagem
- Botão principal que muda conforme o estado do plano (Iniciar / Em andamento / Pedir apoio / Concluído / Repassado)

**Aba Acompanhamento**
- Filtros por status com contagem (Todos, Assumir, Em andamento, Repassados, Concluídos)
- Cards recolhidos com prévia; toque para expandir
- Gerar mensagem, editar, gerar outra opção e enviar (simulado), para todos os clientes
- Conversa com o cliente em formato de chat
- Passar o caso adiante e **retomar** depois
- Badge vermelho na aba quando algum caso precisa de apoio humano

**Geral**
- Estado salvo no aparelho (AsyncStorage): o progresso continua ao fechar e abrir o app
- Botão **Reiniciar** no cabeçalho para voltar ao cenário inicial da demonstração

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 57 + React Native 0.86 |
| Navegação | Expo Router (abas + pilha) |
| Estado | React Context + `useReducer` |
| Persistência | `@react-native-async-storage/async-storage` |
| Gráfico do score | `react-native-svg` |
| Fonte | Barlow e Barlow Condensed (`@expo-google-fonts/barlow`) |
| Ícones | `@expo/vector-icons` (Ionicons) |

---

## Como rodar

**Pré-requisitos:** Node.js 20+ e o app **Expo Go** instalado no celular (Android ou iOS).

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start
```

3. Escaneie o QR Code exibido no terminal com o Expo Go (Android) ou com a câmera (iOS).

> Celular e computador precisam estar na mesma rede Wi-Fi. Se não conectar, tente `npx expo start --tunnel`.

### Roteiro sugerido de demonstração

1. **Clientes** → abra **Rafael Lima** → toque em **Iniciar Plano de Ação**.
2. **Acompanhamento** → abra **Marina Costa** (ASSUMIR) → leia o roteiro → **Gerar mensagem** → **Gerar outra** → **Editar** → **Enviar**.
3. Veja o caso da Marina passar para "Em andamento" e o badge vermelho sumir.
4. Em qualquer caso, teste **Passar adiante** e depois **Retomar caso**.
5. Toque em **Reiniciar** no cabeçalho para voltar ao início.

---

## Estrutura do projeto

```
PreditDashboard/
├── app/                          # Rotas (Expo Router — cada arquivo é uma tela)
│   ├── _layout.js                # Layout raiz: fontes, splash, tema, estado global, toast
│   ├── (tabs)/
│   │   ├── _layout.js            # Barra de abas: Clientes e Acompanhamento
│   │   ├── index.js              # Aba Clientes (fila de prioridade)
│   │   └── acompanhamento.js     # Aba Acompanhamento
│   └── cliente/[vin].js          # Detalhe do cliente + plano de ação
├── src/
│   ├── components/
│   │   ├── ui/                   # Componentes genéricos: Button, Badge, Panel, Screen, Toast, AppHeader
│   │   ├── clients/              # Lista e detalhe do cliente: CustomerRow, ScoreRing, AiPlanCard
│   │   └── tracking/             # Acompanhamento: TrackCard, ChatHistory
│   ├── constants/
│   │   ├── theme.js              # Cores, fontes e tokens de design
│   │   └── status.js             # Rótulos, cores e ordem dos status da abordagem
│   ├── context/PreditContext.js  # Estado global, ações e persistência (AsyncStorage)
│   ├── data/                     # Dados mockados: clientes e rascunhos de mensagem
│   └── utils/                    # Regras de risco e formatação de hora
├── assets/images/                # Logo, ícone do app e splash
├── app.json                      # Configuração do Expo (nome, ícone, splash, pacote Android)
└── jsconfig.json                 # Alias de importação @/ → src/
```

Os imports usam o alias `@/` para a pasta `src/` (ex.: `import Button from '@/components/ui/Button'`), em vez de caminhos relativos como `../../src/components/...`.

---

<sub>Projeto acadêmico — FIAP × Ford · Sprint 3. Os nomes, telefones e dados de clientes são fictícios.</sub>
