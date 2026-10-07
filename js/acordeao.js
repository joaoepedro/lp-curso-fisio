/**
 * ACORDEÃO — abrir e fechar com transição suave
 * ------------------------------------------------------------
 * Os acordeões são <details>/<summary> nativos. Sem JS eles já
 * funcionam (e o atributo name="…" mantém só um aberto por grupo),
 * mas abrem de uma vez, sem transição.
 *
 * Com JS:
 * - a altura do item é animada ao abrir e ao fechar, e a resposta
 *   aparece esmaecendo, no mesmo ritmo das animações da página;
 * - a regra "só um aberto por grupo" passa a ser feita aqui, para
 *   que o item que fecha também anime (o navegador fecharia de uma vez).
 * Quem pediu "reduzir movimento" vê só um esmaecer rápido.
 */
(function () {
  "use strict";

  var DURACAO = 400; // ms
  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function alturaFechado(item) {
    return item.querySelector("summary").offsetHeight;
  }

  // Anima a altura do item. Se já havia uma animação nele (clique rápido),
  // ela é cancelada e a nova parte da altura atual.
  function animarAltura(item, de, para, aoTerminar) {
    if (item._animacao) item._animacao.cancel();
    if (reduzirMovimento) {
      aoTerminar();
      return;
    }
    item.classList.add("is-animando");
    var animacao = item.animate(
      { height: [de + "px", para + "px"] },
      { duration: DURACAO, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
    item._animacao = animacao;
    animacao.onfinish = function () {
      item._animacao = null;
      item.classList.remove("is-animando");
      aoTerminar();
    };
    animacao.oncancel = function () {
      item.classList.remove("is-animando");
    };
  }

  function esmaecerConteudo(item) {
    var conteudo = item.querySelector("summary ~ *");
    if (!conteudo) return;
    conteudo.animate(
      [
        { opacity: 0, transform: reduzirMovimento ? "none" : "translateY(-6px)" },
        { opacity: 1, transform: "none" }
      ],
      { duration: reduzirMovimento ? 200 : DURACAO, easing: "ease-out" }
    );
  }

  function fechar(item) {
    if (!item.open || item.dataset.estado === "fechando") return;
    item.dataset.estado = "fechando";
    animarAltura(item, item.offsetHeight, alturaFechado(item), function () {
      item.open = false;
      delete item.dataset.estado;
    });
  }

  function abrir(item) {
    var inicio = item.offsetHeight;   // altura atual (fechado ou no meio de fechar)
    item.dataset.estado = "abrindo";
    item.open = true;
    if (item._animacao) item._animacao.cancel();
    var fim = item.offsetHeight;      // altura com o conteúdo aberto
    esmaecerConteudo(item);
    animarAltura(item, inicio, fim, function () {
      delete item.dataset.estado;
    });
  }

  document.querySelectorAll("[data-acordeao]").forEach(function (grupo) {
    var itens = grupo.querySelectorAll("details");

    itens.forEach(function (item) {
      // Remove o name nativo: a exclusividade agora é feita aqui, com animação
      item.removeAttribute("name");

      item.querySelector("summary").addEventListener("click", function (evento) {
        evento.preventDefault();  // o JS controla quando abre e fecha

        if (item.open && item.dataset.estado !== "fechando") {
          fechar(item);
          return;
        }

        itens.forEach(function (outro) {
          if (outro !== item) fechar(outro);
        });
        abrir(item);
      });
    });
  });
})();
