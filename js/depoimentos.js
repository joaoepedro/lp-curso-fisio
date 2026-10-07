/**
 * DEPOIMENTOS — troca automática com transição suave
 * ------------------------------------------------------------
 * Mostra um depoimento por vez. A barra de tempo do item ativo
 * (animação no CSS) enche em ~7s; quando termina ("animationend"),
 * passa para o próximo. Assim o tempo e a barra estão sempre
 * sincronizados, inclusive quando o usuário pausa.
 *
 * Pausa: botão "Pausar depoimentos" e também ao passar o mouse ou
 * focar o bloco (regras no CSS). Exigência de acessibilidade para
 * conteúdo que se move sozinho (WCAG 2.2.2).
 *
 * Sem JS: os cinco depoimentos aparecem em lista.
 */
(function () {
  "use strict";

  var TEMPO = 7; // segundos por depoimento

  var bloco = document.querySelector("[data-depoimentos]");
  if (!bloco) return;

  var depoimentos = bloco.querySelectorAll("[data-depoimento]");
  var itens = bloco.querySelectorAll("[data-depoimento-item]");
  var botao = bloco.querySelector("[data-depoimentos-pausar]");
  if (depoimentos.length < 2) return;

  var atual = 0;

  // Leitores de tela: anuncia a troca de forma educada (sem interromper)
  bloco.querySelector(".depoimentos__palco").setAttribute("aria-live", "polite");
  bloco.style.setProperty("--tempo-depoimento", TEMPO + "s");
  bloco.classList.add("depoimentos--rotativo");

  function mostrar(indice) {
    depoimentos[atual].classList.remove("is-ativo");
    itens[atual].classList.remove("is-ativo");
    atual = indice;
    depoimentos[atual].classList.add("is-ativo");
    // Reinicia a barra: remove e recoloca a classe no próximo quadro
    itens[atual].classList.remove("is-ativo");
    void itens[atual].offsetWidth;
    itens[atual].classList.add("is-ativo");
  }

  itens.forEach(function (item) {
    item.querySelector(".depoimentos__progresso").addEventListener("animationend", function () {
      mostrar((atual + 1) % depoimentos.length);
    });
  });

  botao.addEventListener("click", function () {
    var pausado = bloco.classList.toggle("is-pausado");
    botao.setAttribute("aria-pressed", String(pausado));
    botao.textContent = pausado ? "Continuar depoimentos" : "Pausar depoimentos";
  });

  mostrar(0);
})();
