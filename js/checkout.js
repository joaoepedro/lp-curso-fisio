/**
 * CHECKOUT — links para a página de pagamento da Hotmart
 * ------------------------------------------------------------
 * Monta o link de cada botão de compra com:
 * - checkout pré-preenchido: nome, e-mail e telefone de quem já
 *   entrou na lista de espera neste aparelho (menos digitação = mais vendas);
 * - origem da visita: as UTMs do anúncio, mais "src" e "sck", que a
 *   Hotmart usa para mostrar de onde veio cada venda.
 *
 * data-cta="checkout"       → preço cheio  (hotmart.checkoutUrl)
 * data-cta="checkout-lista" → preço da lista (hotmart.checkoutUrlLista)
 *
 * Modo demonstração: se o link ainda é o de exemplo (XXXX), o clique
 * não sai da página e mostra um aviso explicando o que aconteceria.
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var LP = window.LP;

  function montarLink(base) {
    var url = new URL(base);
    var lead = LP.local.ler("lp_lead");
    var utms = LP.utms();

    // Pré-preenchimento (parâmetros aceitos pelo checkout da Hotmart)
    if (lead) {
      url.searchParams.set("name", lead.nome);
      url.searchParams.set("email", lead.email);
      url.searchParams.set("phoneac", lead.whatsapp.slice(0, 2));
      url.searchParams.set("phonenumber", lead.whatsapp.slice(2));
    }

    // Origem da visita
    Object.keys(utms).forEach(function (chave) {
      url.searchParams.set(chave, utms[chave]);
    });
    url.searchParams.set("src", utms.utm_source || "landing-page");
    if (utms.utm_source) {
      url.searchParams.set("sck", [utms.utm_source, utms.utm_medium, utms.utm_campaign]
        .filter(Boolean).join("|"));
    }

    return url.toString();
  }

  function ehExemplo(link) {
    return /X{4,}/.test(link);
  }

  document.querySelectorAll('[data-cta="checkout"], [data-cta="checkout-lista"]').forEach(function (botao) {
    var base = botao.dataset.cta === "checkout-lista"
      ? CONFIG.hotmart.checkoutUrlLista
      : CONFIG.hotmart.checkoutUrl;

    // O link é montado na hora do clique: pega dados de inscrição recém-feita
    botao.href = montarLink(base);

    botao.addEventListener("click", function (evento) {
      var link = montarLink(base);
      botao.href = link;

      LP.rastrear("InitiateCheckout", {
        value: botao.dataset.cta === "checkout-lista" ? CONFIG.oferta.precoLista : CONFIG.oferta.preco,
        currency: "BRL"
      });

      if (ehExemplo(base)) {
        evento.preventDefault();
        LP.aviso("Modo demonstração: aqui a pessoa iria para o checkout da Hotmart, já com nome, e-mail e origem da visita preenchidos.");
        console.info("[checkout] Link que seria aberto:", link);
      }
    });
  });
})();
