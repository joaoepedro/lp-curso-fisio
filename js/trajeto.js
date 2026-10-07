/**
 * TRAJETO — faixas que deslizam da esquerda conforme a rolagem
 * ------------------------------------------------------------
 * Cada degrau do trajeto é observado com IntersectionObserver.
 * Quando entra na tela, recebe .is-visivel e a faixa desliza
 * até o lugar (a transição está no CSS).
 *
 * Melhoria progressiva:
 * - sem JS, ou sem suporte a IntersectionObserver, as faixas
 *   aparecem normalmente (a classe que esconde nunca é aplicada);
 * - quem pediu "reduzir movimento" no sistema vê só um esmaecer suave.
 */
(function () {
  "use strict";

  var trajeto = document.querySelector("[data-trajeto]");
  if (!trajeto) return;

  if (!("IntersectionObserver" in window)) return;

  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var degraus = trajeto.querySelectorAll("[data-trajeto-item]");

  // Esconde as faixas; a partir daqui o CSS anima.
  // Quem pediu "reduzir movimento" vê só um esmaecer, sem deslizar.
  trajeto.classList.add(reduzirMovimento ? "trajeto--suave" : "trajeto--animado");

  var observador = new IntersectionObserver(
    function (entradas) {
      // Se várias faixas entram na tela juntas (tela alta ou rolagem rápida),
      // cada uma espera um pouco mais que a anterior: continuam vindo uma por vez.
      var ordem = 0;
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.querySelector(".faixa").style.transitionDelay = ordem * 0.25 + "s";
        entrada.target.classList.add("is-visivel");
        observador.unobserve(entrada.target); // anima só uma vez
        ordem++;
      });
    },
    {
      // Dispara quando ~metade do degrau já está visível,
      // um pouco antes do fim da tela: uma faixa por vez ao rolar.
      threshold: 0.5,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  degraus.forEach(function (degrau) {
    observador.observe(degrau);
  });
})();
