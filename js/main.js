/**
 * MAIN — pequenos comportamentos da página
 * ------------------------------------------------------------
 * - Link do botão de WhatsApp (número e mensagem do config.js)
 * - Barra fixa de CTA no celular: aparece depois do hero e some
 *   quando a oferta/formulário já está na tela
 * - Botões "Entrar na lista": depois de rolar até o formulário,
 *   colocam o cursor no campo Nome
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;

  /* ---------- WhatsApp ---------- */
  var whatsapp = document.querySelector("[data-whatsapp]");
  if (whatsapp && CONFIG.contato.whatsapp) {
    whatsapp.href = "https://wa.me/" + CONFIG.contato.whatsapp +
      "?text=" + encodeURIComponent(CONFIG.contato.mensagemWhatsapp || "");
  }

  /* ---------- Barra fixa de CTA (só aparece no celular, via CSS) ---------- */
  var barra = document.querySelector("[data-barra-cta]");
  var hero = document.querySelector(".hero");
  var oferta = document.querySelector("#oferta");

  if (barra && hero && oferta && "IntersectionObserver" in window) {
    var heroVisivel = true;
    var ofertaVisivel = false;

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.target === hero) heroVisivel = entrada.isIntersecting;
        if (entrada.target === oferta) ofertaVisivel = entrada.isIntersecting;
      });
      barra.hidden = heroVisivel || ofertaVisivel;
    });

    observador.observe(hero);
    observador.observe(oferta);
  }

  /* ---------- "Entrar na lista" leva o foco ao formulário ---------- */
  var nome = document.querySelector("#nome");
  document.querySelectorAll('[data-cta="lista"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (!nome) return;
      // Espera a rolagem suave terminar antes de focar (sem rolar de novo)
      setTimeout(function () { nome.focus({ preventScroll: true }); }, 700);
    });
  });

  /* ---------- Modo portfólio: link da planilha de demonstração ---------- */
  var demo = document.querySelector("[data-demo-planilha]");
  if (demo && CONFIG.modoDemo && CONFIG.planilha.linkDemonstracao) {
    demo.querySelector("[data-link-planilha]").href = CONFIG.planilha.linkDemonstracao;
    demo.hidden = false;
  }
})();
