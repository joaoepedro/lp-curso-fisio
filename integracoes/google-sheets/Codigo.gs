/**
 * LISTA DE ESPERA → GOOGLE SHEETS
 * ------------------------------------------------------------
 * Recebe as inscrições enviadas pela landing page (js/form.js)
 * e grava cada uma como uma linha na aba "Leads".
 *
 * Como instalar: veja docs/guia-planilha.md
 *
 * Funções:
 *   configurarPlanilha() → rode UMA vez: cria as abas "Leads" e
 *                          "Demonstração" (com os dados mascarados)
 *   doPost(e)            → chamada pela landing page a cada inscrição
 *   doGet()              → abrir a URL no navegador mostra se está no ar
 */

var ABA_LEADS = "Leads";
var ABA_DEMO = "Demonstração";

var COLUNAS = [
  "Data/hora", "Nome", "E-mail", "WhatsApp", "Consentimento",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "Fase da página", "Página"
];

/* ------------------------------------------------------------
 * Recebe uma inscrição
 * ------------------------------------------------------------ */
function doPost(e) {
  var p = (e && e.parameter) || {};

  // Anti-spam (honeypot): campo invisível preenchido = robô.
  // Responde "ok" para o robô não insistir, mas não grava nada.
  if (p.empresa) return resposta({ ok: true });

  // Validação do lado da planilha (nunca confiar só no navegador)
  var nome = limpar(p.nome, 120);
  var email = limpar(p.email, 160).toLowerCase();
  var whatsapp = String(p.whatsapp || "").replace(/\D/g, "");

  var valido =
    nome.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
    (whatsapp.length === 10 || whatsapp.length === 11) &&
    p.consentimento === "sim";

  if (!valido) return resposta({ ok: false, erro: "dados inválidos" });

  // Trava: evita que duas inscrições simultâneas se atropelem
  var trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    obterAbaLeads().appendRow([
      new Date(),
      nome,
      email,
      whatsapp,
      "sim",
      limpar(p.utm_source, 150),
      limpar(p.utm_medium, 150),
      limpar(p.utm_campaign, 150),
      limpar(p.utm_content, 150),
      limpar(p.utm_term, 150),
      limpar(p.fase, 20),
      limpar(p.pagina, 300)
    ]);
  } finally {
    trava.releaseLock();
  }

  return resposta({ ok: true });
}

/* Abrir a URL do app no navegador: confirma que está publicado */
function doGet() {
  return resposta({ ok: true, status: "Lista de espera no ar" });
}

/* ------------------------------------------------------------
 * Rode uma vez para preparar a planilha
 * ------------------------------------------------------------ */
function configurarPlanilha() {
  obterAbaLeads();

  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var demo = planilha.getSheetByName(ABA_DEMO) || planilha.insertSheet(ABA_DEMO);
  demo.clear();

  demo.getRange("A1:E1")
    .setValues([["Data/hora", "Nome", "E-mail", "WhatsApp", "Origem (utm_source)"]])
    .setFontWeight("bold");

  // Fórmulas que espelham a aba Leads, mascarando os dados pessoais.
  // (setFormula usa a sintaxe em inglês, com vírgulas, em qualquer idioma)
  var L = "'" + ABA_LEADS + "'!";
  demo.getRange("A2").setFormula('=ARRAYFORMULA(IF(' + L + 'A2:A="",,' + L + 'A2:A))');
  demo.getRange("B2").setFormula('=ARRAYFORMULA(IF(' + L + 'B2:B="",,PROPER(REGEXEXTRACT(' + L + 'B2:B,"^\\S+"))))');
  demo.getRange("C2").setFormula('=ARRAYFORMULA(IF(' + L + 'C2:C="",,REGEXREPLACE(' + L + 'C2:C,"^(.{2})[^@]*","$1***")))');
  demo.getRange("D2").setFormula('=ARRAYFORMULA(IF(' + L + 'D2:D="",,"("&LEFT(' + L + 'D2:D,2)&") "&MID(' + L + 'D2:D,3,1)&"****-**"&RIGHT(' + L + 'D2:D,2)))');
  demo.getRange("E2").setFormula('=ARRAYFORMULA(IF(' + L + 'F2:F="",,' + L + 'F2:F))');

  demo.getRange("A2:A").setNumberFormat("dd/mm/yyyy hh:mm");
  demo.setFrozenRows(1);
  demo.autoResizeColumns(1, 5);

  SpreadsheetApp.getUi().alert("Pronto! Abas \"Leads\" e \"Demonstração\" configuradas.");
}

/* ------------------------------------------------------------
 * Auxiliares
 * ------------------------------------------------------------ */
function obterAbaLeads() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA_LEADS);
  if (!aba) {
    aba = planilha.insertSheet(ABA_LEADS, 0);
    aba.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS]).setFontWeight("bold");
    aba.setFrozenRows(1);
    aba.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm:ss");
    aba.getRange("D:D").setNumberFormat("@"); // WhatsApp como texto
  }
  return aba;
}

/**
 * Limpa um texto recebido: corta no tamanho máximo e neutraliza
 * "injeção de fórmula" (um texto começando com = + - @ viraria uma
 * fórmula na planilha; o apóstrofo faz o Sheets tratá-lo como texto).
 */
function limpar(valor, max) {
  var texto = String(valor || "").trim().slice(0, max);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function resposta(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
