/**
 * UTILS — funções compartilhadas pelos outros scripts
 * ------------------------------------------------------------
 * Tudo fica dentro de window.LP, para não espalhar variáveis
 * globais pela página. Carregado logo depois do config.js.
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var LP = (window.LP = window.LP || {});

  var DIA = 24 * 60 * 60 * 1000;

  /* ---------- Armazenamento seguro ----------
     O navegador pode bloquear o storage (aba anônima, cookies
     bloqueados). Nesses casos tudo continua funcionando, só não
     guarda nada. */
  function armazenamento(tipo) {
    return {
      ler: function (chave) {
        try {
          var valor = window[tipo].getItem(chave);
          return valor ? JSON.parse(valor) : null;
        } catch (e) {
          return null;
        }
      },
      gravar: function (chave, valor) {
        try {
          window[tipo].setItem(chave, JSON.stringify(valor));
        } catch (e) { /* sem storage: segue sem guardar */ }
      },
      remover: function (chave) {
        try {
          window[tipo].removeItem(chave);
        } catch (e) { /* idem */ }
      }
    };
  }

  LP.sessao = armazenamento("sessionStorage");  // some ao fechar a aba
  LP.local = armazenamento("localStorage");     // fica no aparelho

  /* ---------- Formatação ---------- */

  // 597 → "R$ 597" | 49.7 → "R$ 49,70"
  LP.formatarMoeda = function (valor) {
    var inteiro = valor % 1 === 0;
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: inteiro ? 0 : 2,
      maximumFractionDigits: 2
    });
  };

  // Date → "03/11, às 20h" | "10/11, às 23h59"
  LP.formatarData = function (data) {
    var dia = String(data.getDate()).padStart(2, "0");
    var mes = String(data.getMonth() + 1).padStart(2, "0");
    var hora = data.getHours();
    var min = data.getMinutes();
    return dia + "/" + mes + ", às " + hora + "h" + (min ? String(min).padStart(2, "0") : "");
  };

  /* ---------- Datas do lançamento ----------
     Modo real: usa as datas do config.js.
     Modo demonstração: mantém os intervalos entre as datas reais,
     mas desloca o calendário para que a fase escolhida faça sentido
     "hoje" (o contador nunca aparece zerado no portfólio). */
  LP.calcularDatas = function (faseDemo) {
    var real = {
      carrinhoAbre: new Date(CONFIG.datas.carrinhoAbre),
      condicaoAte: new Date(CONFIG.datas.condicaoAte),
      carrinhoFecha: new Date(CONFIG.datas.carrinhoFecha)
    };
    if (!CONFIG.modoDemo) return real;

    var agora = new Date();
    var abreDemo;

    if (faseDemo === "aberto") {
      // Carrinho abriu ontem (a condição da lista ainda vale)
      abreDemo = new Date(agora.getTime() - DIA);
    } else if (faseDemo === "encerrado") {
      // Carrinho fechou há pouco mais de um dia
      var duracao = real.carrinhoFecha - real.carrinhoAbre;
      abreDemo = new Date(agora.getTime() - 2 * DIA - duracao);
    } else {
      // Pré-lançamento: abre daqui a "diasDemo" dias
      abreDemo = new Date(agora.getTime() + CONFIG.diasDemo * DIA);
    }
    // Mesmo horário das datas reais (ex.: 20h), para as datas ficarem "redondas"
    abreDemo.setHours(real.carrinhoAbre.getHours(), real.carrinhoAbre.getMinutes(), 0, 0);

    var deslocamento = abreDemo - real.carrinhoAbre;
    return {
      carrinhoAbre: new Date(real.carrinhoAbre.getTime() + deslocamento),
      condicaoAte: new Date(real.condicaoAte.getTime() + deslocamento),
      carrinhoFecha: new Date(real.carrinhoFecha.getTime() + deslocamento)
    };
  };

  // Fase pelas datas: "pre" | "aberto" | "encerrado"
  LP.faseDasDatas = function (datas) {
    var agora = new Date();
    if (agora < datas.carrinhoAbre) return "pre";
    if (agora < datas.carrinhoFecha) return "aberto";
    return "encerrado";
  };

  /* ---------- Preenche preços e datas na página ----------
     Elementos com data-preco="preco|precoLista|valorTotal",
     data-parcelas e data-data="carrinhoAbre|condicaoAte|carrinhoFecha"
     (com data-formato="dia" para mostrar só o dia). */
  LP.preencherValores = function (datas) {
    document.querySelectorAll("[data-preco]").forEach(function (el) {
      var valor = CONFIG.oferta[el.dataset.preco];
      if (typeof valor === "number") el.textContent = LP.formatarMoeda(valor);
    });
    document.querySelectorAll("[data-parcelas]").forEach(function (el) {
      el.textContent = CONFIG.oferta.parcelas;
    });
    document.querySelectorAll("[data-data]").forEach(function (el) {
      var data = datas[el.dataset.data];
      if (!data) return;
      // data-formato="dia" → só "03/11"; padrão → "03/11, às 20h"
      el.textContent = el.dataset.formato === "dia"
        ? LP.formatarData(data).split(",")[0]
        : LP.formatarData(data);
    });
  };

  /* ---------- UTMs (origem da visita) ----------
     Lidas da URL do anúncio e guardadas na sessão, para não se
     perderem se a pessoa navegar pela página antes de converter. */
  var CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  LP.utms = function () {
    var daUrl = {};
    var params = new URLSearchParams(window.location.search);
    CHAVES_UTM.forEach(function (chave) {
      if (params.get(chave)) daUrl[chave] = params.get(chave).slice(0, 150);
    });
    if (Object.keys(daUrl).length) {
      LP.sessao.gravar("lp_utms", daUrl);
      return daUrl;
    }
    return LP.sessao.ler("lp_utms") || {};
  };

  /* ---------- Aviso flutuante (toast) ----------
     Usado no modo demonstração, ex.: ao clicar em "comprar". */
  LP.aviso = function (mensagem) {
    var aviso = document.querySelector(".aviso-toast");
    if (!aviso) {
      aviso = document.createElement("div");
      aviso.className = "aviso-toast";
      aviso.setAttribute("role", "status");
      document.body.appendChild(aviso);
    }
    aviso.textContent = mensagem;
    aviso.classList.add("is-visivel");
    clearTimeout(aviso._timer);
    aviso._timer = setTimeout(function () {
      aviso.classList.remove("is-visivel");
    }, 5000);
  };

  // Rastreamento: substituído pelo tracking.js. Este fallback evita erro
  // caso o tracking.js não carregue (bloqueador de anúncios, por exemplo).
  LP.rastrear = LP.rastrear || function () {};
})();
