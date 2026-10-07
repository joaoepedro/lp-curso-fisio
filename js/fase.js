/**
 * FASE — decide e aplica a fase da página
 * ------------------------------------------------------------
 * "pre"       → pré-lançamento (lista de espera)
 * "aberto"    → carrinho aberto (vendas)
 * "encerrado" → vendas encerradas
 *
 * A fase vem, nesta ordem de prioridade:
 *   1. da URL (?fase=aberto), útil para testes e anúncios;
 *   2. do seletor de fase (modo portfólio);
 *   3. das datas do config.js.
 *
 * Aplicar a fase = colocar data-fase no <html> (o CSS mostra/esconde
 * os blocos) e preencher preços e datas. Ao terminar, avisa os outros
 * scripts com o evento "lp:fase".
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var LP = window.LP;
  var FASES = ["pre", "aberto", "encerrado"];

  var raiz = document.documentElement;
  var seletor = document.querySelector("[data-seletor-fase]");
  var timerTroca = null;

  function faseDaUrl() {
    var fase = new URLSearchParams(window.location.search).get("fase");
    return FASES.indexOf(fase) !== -1 ? fase : null;
  }

  LP.aplicarFase = function (faseForcada) {
    var fase, datas;

    if (faseForcada) {
      fase = faseForcada;
      datas = LP.calcularDatas(fase);
    } else {
      datas = LP.calcularDatas("pre");
      fase = LP.faseDasDatas(datas);
    }

    LP.fase = fase;
    LP.datas = datas;
    raiz.dataset.fase = fase;
    LP.preencherValores(datas);

    // Marca o botão ativo do seletor
    if (seletor) {
      seletor.querySelectorAll("[data-fase-opcao]").forEach(function (botao) {
        botao.setAttribute("aria-pressed", String(botao.dataset.faseOpcao === fase));
      });
    }

    // Sem fase forçada, troca sozinha quando chegar a próxima data
    clearTimeout(timerTroca);
    if (!faseForcada) agendarProximaTroca(datas);

    document.dispatchEvent(new CustomEvent("lp:fase", { detail: { fase: fase, datas: datas } }));
  };

  function agendarProximaTroca(datas) {
    var agora = Date.now();
    var proxima = [datas.carrinhoAbre, datas.carrinhoFecha]
      .map(Number)
      .filter(function (t) { return t > agora; })[0];
    if (!proxima) return;
    // setTimeout aceita no máximo ~24,8 dias; se for mais longe, reagenda depois
    var espera = Math.min(proxima - agora + 500, 2147483647);
    timerTroca = setTimeout(function () { LP.aplicarFase(faseDaUrl()); }, espera);
  }

  /* ---------- Seletor de fase (modo portfólio) ---------- */
  if (seletor && CONFIG.modoDemo && CONFIG.mostrarSeletorFase) {
    seletor.hidden = false;
    seletor.addEventListener("click", function (evento) {
      var botao = evento.target.closest("[data-fase-opcao]");
      if (!botao) return;
      var fase = botao.dataset.faseOpcao;

      // Guarda a escolha na URL: recarregar a página mantém a fase
      var url = new URL(window.location.href);
      url.searchParams.set("fase", fase);
      history.replaceState(null, "", url);

      LP.aplicarFase(fase);
    });
  }

  LP.aplicarFase(faseDaUrl());
})();
