/**
 * RASTREAMENTO — pixels da Meta e do Google Ads
 * ------------------------------------------------------------
 * Cada pixel só é carregado se o ID estiver preenchido no
 * config.js. Eventos usados:
 *   PageView          → toda página aberta (automático)
 *   Lead              → inscrição na lista (disparado na página de obrigado)
 *   InitiateCheckout  → clique para ir ao checkout da Hotmart
 *
 * Com esses três eventos dá para criar, nos gerenciadores de anúncio,
 * o público "virou lead e não comprou" (a compra é registrada pelo
 * pixel configurado dentro da Hotmart).
 *
 * Sem IDs (modo portfólio), os eventos aparecem só no console do
 * navegador (F12 → Console), para demonstrar que estão disparando.
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var LP = window.LP;
  var r = CONFIG.rastreamento || {};

  /* ---------- Meta Pixel (código oficial, só reorganizado) ---------- */
  if (r.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", r.metaPixelId);
    window.fbq("track", "PageView");
  }

  /* ---------- Google Ads (gtag.js) ---------- */
  if (r.googleAdsId) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(r.googleAdsId);
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", r.googleAdsId);
  }

  /* ---------- Função usada pelos outros scripts ---------- */
  LP.rastrear = function (evento, dados) {
    dados = dados || {};

    if (window.fbq) window.fbq("track", evento, dados);

    if (window.gtag) {
      if (evento === "Lead") {
        window.gtag("event", "generate_lead", dados);
        if (r.googleAdsLeadLabel) {
          window.gtag("event", "conversion", { send_to: r.googleAdsId + "/" + r.googleAdsLeadLabel });
        }
      }
      if (evento === "InitiateCheckout") window.gtag("event", "begin_checkout", dados);
    }

    if (!r.metaPixelId && !r.googleAdsId) {
      console.info("[rastreamento] " + evento + " (pixels desligados no config.js)", dados);
    }
  };
})();
