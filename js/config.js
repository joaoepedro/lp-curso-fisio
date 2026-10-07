/**
 * ============================================================
 *  CONFIG — painel de controle da landing page
 * ============================================================
 *  Tudo o que muda de um lançamento para outro fica aqui.
 *  Os outros scripts (countdown, form, checkout, tracking…)
 *  apenas LEEM estes valores. Para mudar data, preço ou link,
 *  altere só este arquivo.
 *
 *  Este arquivo precisa ser carregado ANTES dos demais scripts.
 * ============================================================
 */

window.CONFIG = Object.freeze({

  /* ----------------------------------------------------------
   * 1. CALENDÁRIO DO LANÇAMENTO
   * Formato: "AAAA-MM-DDTHH:MM:SS-03:00" (horário de Brasília)
   * ---------------------------------------------------------- */
  datas: {
    carrinhoAbre:  "2026-11-03T20:00:00-03:00", // fim do pré-lançamento
    condicaoAte:   "2026-11-05T20:00:00-03:00", // fim do preço da lista de espera
    carrinhoFecha: "2026-11-10T23:59:00-03:00"  // fim das vendas
  },

  /* ----------------------------------------------------------
   * 2. MODO PORTFÓLIO
   * modoDemo: true  → ignora as datas acima e simula um lançamento
   *                   que abre sempre "diasDemo" dias à frente.
   *                   Assim o contador nunca aparece zerado.
   * modoDemo: false → usa as datas reais (versão para o cliente).
   *
   * mostrarSeletorFase: exibe um seletor discreto para o visitante
   * do portfólio alternar entre as fases da página.
   *
   * Dica: também é possível forçar a fase pela URL, útil para testes:
   *   ?fase=pre  |  ?fase=aberto  |  ?fase=encerrado
   * ---------------------------------------------------------- */
  modoDemo: true,
  diasDemo: 12,
  mostrarSeletorFase: true,

  /* ----------------------------------------------------------
   * 3. OFERTA
   * Valores em reais (número, sem "R$"). O JS formata e escreve
   * os preços nos lugares certos da página.
   * ---------------------------------------------------------- */
  oferta: {
    valorTotal: 1891,  // soma do "stack de valor" (ancoragem)
    preco: 597,        // preço cheio
    precoLista: 497,   // preço para quem está na lista de espera
    parcelas: 12       // número máximo de parcelas no cartão
  },

  /* ----------------------------------------------------------
   * 4. HOTMART
   * checkoutUrl: link de pagamento do produto (HotLink).
   * O JS acrescenta automaticamente: nome, e-mail e telefone
   * do lead (checkout pré-preenchido) e as UTMs da visita.
   * checkoutUrlLista: link de uma oferta separada com o preço
   * da lista de espera (na Hotmart, cada preço é uma "oferta").
   * ---------------------------------------------------------- */
  hotmart: {
    checkoutUrl:      "https://pay.hotmart.com/XXXXXXXXXX",
    checkoutUrlLista: "https://pay.hotmart.com/XXXXXXXXXX?off=XXXXXXXX"
  },

  /* ----------------------------------------------------------
   * 5. LISTA DE ESPERA (Google Sheets)
   * URL do app da web publicado pelo Google Apps Script.
   * Vazio = modo simulado (o formulário funciona, mas não salva).
   * ---------------------------------------------------------- */
  planilha: {
    endpoint: "https://script.google.com/macros/s/AKfycbwSGX96PsmoNGEYiPPW_h_FIa_21rZoD7SaSlxZQ-Tc4jxhaDCqHsCPN_2VSzUGO-ze/exec",
    // Link público da aba "Demonstração" (dados mascarados),
    // exibido na página de obrigado quando modoDemo = true.
    linkDemonstracao: ""
  },

  /* ----------------------------------------------------------
   * 6. CONTATO
   * WhatsApp com DDI + DDD, só números.
   * ---------------------------------------------------------- */
  contato: {
    whatsapp: "5511999999999",
    mensagemWhatsapp: "Olá! Tenho uma dúvida sobre o curso Saúde da Mulher na Prática.",
    grupoAvisos: "https://chat.whatsapp.com/XXXXXXXXXXXX", // grupo da lista de espera
    email: "contato@exemplo.com.br"
  },

  /* ----------------------------------------------------------
   * 7. RASTREAMENTO (tráfego pago)
   * Deixe vazio para desligar. Com o ID preenchido, o pixel é
   * carregado e dispara: PageView, Lead e InitiateCheckout.
   * ---------------------------------------------------------- */
  rastreamento: {
    metaPixelId: "",       // ex.: "123456789012345"
    googleAdsId: "",       // ex.: "AW-123456789"
    googleAdsLeadLabel: "" // rótulo da conversão de lead no Google Ads
  }
});
