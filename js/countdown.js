/**
 * CONTADOR — contagem regressiva do hero
 * ------------------------------------------------------------
 * O alvo muda conforme a fase:
 *   pré-lançamento → abertura do carrinho
 *   carrinho aberto → fim da condição da lista e, depois, fechamento
 * Atualiza a cada segundo. Ao chegar a zero, pede para a página
 * recalcular a fase (ex.: pré-lançamento vira carrinho aberto).
 */
(function () {
  "use strict";

  var LP = window.LP;
  var contador = document.querySelector("[data-contador]");
  if (!contador) return;

  var rotulo = contador.querySelector("[data-contador-rotulo]");
  var campos = {
    dias: contador.querySelector("[data-contador-dias]"),
    horas: contador.querySelector("[data-contador-horas]"),
    minutos: contador.querySelector("[data-contador-minutos]"),
    segundos: contador.querySelector("[data-contador-segundos]")
  };

  var alvo = null;
  var intervalo = null;

  function escolherAlvo(fase, datas) {
    var agora = new Date();
    if (fase === "pre") {
      return { data: datas.carrinhoAbre, rotulo: "O carrinho abre em" };
    }
    if (fase === "aberto") {
      if (agora < datas.condicaoAte) {
        return { data: datas.condicaoAte, rotulo: "A condição da lista de espera termina em" };
      }
      return { data: datas.carrinhoFecha, rotulo: "As inscrições fecham em" };
    }
    return null;
  }

  function doisDigitos(n) {
    return String(n).padStart(2, "0");
  }

  function atualizar() {
    if (!alvo) return;
    var restante = Math.max(0, alvo.data - new Date());

    var s = Math.floor(restante / 1000);
    campos.dias.textContent = doisDigitos(Math.floor(s / 86400));
    campos.horas.textContent = doisDigitos(Math.floor((s % 86400) / 3600));
    campos.minutos.textContent = doisDigitos(Math.floor((s % 3600) / 60));
    campos.segundos.textContent = doisDigitos(s % 60);

    if (restante === 0) {
      clearInterval(intervalo);
      // Com fase forçada (seletor/URL) a fase não muda; sem ela, recalcula pelas datas
      var forcada = new URLSearchParams(window.location.search).get("fase");
      LP.aplicarFase(forcada);
    }
  }

  function iniciar(fase, datas) {
    clearInterval(intervalo);
    alvo = escolherAlvo(fase, datas);
    if (!alvo) return;
    rotulo.textContent = alvo.rotulo;

    // Alvo já passou (ex.: fase forçada com datas antigas): mostra zeros e
    // não dispara a troca de fase, para não entrar em repetição infinita
    if (alvo.data <= new Date()) {
      Object.keys(campos).forEach(function (k) { campos[k].textContent = "00"; });
      return;
    }

    atualizar();
    intervalo = setInterval(atualizar, 1000);
  }

  // Reinicia sempre que a fase muda
  document.addEventListener("lp:fase", function (evento) {
    iniciar(evento.detail.fase, evento.detail.datas);
  });

  // O fase.js pode ter rodado antes deste arquivo: usa o estado atual
  if (LP.fase) iniciar(LP.fase, LP.datas);
})();
