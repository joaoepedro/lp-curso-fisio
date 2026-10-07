/**
 * OBRIGADO — página depois da inscrição
 * ------------------------------------------------------------
 * - Mostra o primeiro nome da pessoa (guardado na sessão; nunca vai na URL)
 * - Preenche a data de abertura e o preço da lista
 * - Dispara o evento "Lead" dos pixels, uma única vez por inscrição
 * - Link do grupo de avisos no WhatsApp
 * - Modo portfólio: mostra o link da planilha de demonstração
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var LP = window.LP;

  // Nome
  var nome = LP.sessao.ler("lp_nome");
  var alvoNome = document.querySelector("[data-nome-lead]");
  if (nome && alvoNome) alvoNome.textContent = ", " + nome;

  // Datas e preços (no modo portfólio, a mesma simulação da landing page)
  LP.preencherValores(LP.calcularDatas("pre"));

  // Evento de conversão: só quando a pessoa acabou de se inscrever
  // (recarregar a página não conta outro lead)
  if (LP.sessao.ler("lp_lead_novo")) {
    LP.rastrear("Lead");
    LP.sessao.remover("lp_lead_novo");
  }

  // Grupo do WhatsApp
  var grupo = document.querySelector("[data-grupo-whatsapp]");
  if (grupo) {
    if (CONFIG.contato.grupoAvisos && !/X{4,}/.test(CONFIG.contato.grupoAvisos)) {
      grupo.href = CONFIG.contato.grupoAvisos;
    } else {
      grupo.addEventListener("click", function (evento) {
        evento.preventDefault();
        LP.aviso("Modo demonstração: aqui a pessoa entraria no grupo de avisos do WhatsApp.");
      });
    }
  }

  // Planilha de demonstração (modo portfólio)
  var demo = document.querySelector("[data-demo-planilha]");
  if (demo && CONFIG.modoDemo && CONFIG.planilha.linkDemonstracao) {
    demo.querySelector("[data-link-planilha]").href = CONFIG.planilha.linkDemonstracao;
    demo.hidden = false;
  }
})();
