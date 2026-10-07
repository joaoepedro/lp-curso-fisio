/**
 * REVELAR — conteúdo das seções aparece suavemente ao rolar
 * ------------------------------------------------------------
 * O script marca os blocos de cada seção com .revelar (começam
 * invisíveis e um pouco abaixo). Quando um bloco entra na tela,
 * recebe .is-visivel e sobe enquanto aparece (transição no CSS).
 *
 * - Listas e grades (depoimentos, benefícios, passos do método…)
 *   aparecem item por item, com um pequeno atraso entre eles.
 * - O hero e o trajeto não entram aqui: têm animação própria.
 * - Quem pediu "reduzir movimento" no sistema vê só o esmaecer,
 *   sem deslocamento (ajuste feito no CSS).
 * - Sem JS, nada é escondido: a página aparece completa.
 */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  // Grupos cujos ITENS aparecem um a um (em vez do grupo inteiro)
  var GRUPOS = [
    ".lista-dores",
    ".metodo",
    ".lista-beneficios",
    ".para-quem__grid",
    ".numeros",
    ".depoimentos",
    ".stack",
    ".objecoes"
  ];

  var alvos = [];

  // 1) Blocos diretos do conteúdo de cada seção (exceto hero e trajeto)
  document.querySelectorAll("main > section:not(.hero)").forEach(function (secao) {
    secao.querySelectorAll(".container > *, .container--texto > *").forEach(function (bloco) {
      if (bloco.matches(".trajeto, .container, .container--texto, .dores, .oferta__itens")) return;
      if (bloco.closest(".trajeto")) return;

      if (bloco.matches(GRUPOS.join(","))) {
        // 2) Grupos: marca cada item
        Array.prototype.forEach.call(bloco.children, function (item) {
          alvos.push(item);
        });
      } else {
        alvos.push(bloco);
      }
    });
  });

  // Blocos internos que ficam dentro de wrappers ignorados acima
  document.querySelectorAll(".dores__intro, .oferta__itens > *, .lista-dores > li").forEach(function (el) {
    if (alvos.indexOf(el) === -1) alvos.push(el);
  });

  alvos.forEach(function (el) {
    el.classList.add("revelar");
  });

  var observador = new IntersectionObserver(
    function (entradas) {
      var ordem = 0;
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        // Itens que entram juntos aparecem em sequência (máx. 0,5s de espera)
        entrada.target.style.transitionDelay = Math.min(ordem * 0.1, 0.5) + "s";
        entrada.target.classList.add("is-visivel");
        observador.unobserve(entrada.target);
        ordem++;
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );

  alvos.forEach(function (el) {
    observador.observe(el);
  });
})();
