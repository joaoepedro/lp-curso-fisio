/**
 * FORMULÁRIO — lista de espera
 * ------------------------------------------------------------
 * 1. Máscara no WhatsApp: (11) 91234-5678
 * 2. Validação com mensagens claras, campo a campo
 * 3. Anti-spam (honeypot): se o campo invisível vier preenchido,
 *    finge sucesso e não envia nada
 * 4. Envio para o Google Sheets (Apps Script), junto com as UTMs
 * 5. Sucesso → página de obrigado
 *
 * Sem endereço da planilha no config.js, o envio é simulado:
 * o formulário funciona por inteiro, só não grava os dados.
 */
(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var LP = window.LP;

  var form = document.querySelector("[data-form-lista]");
  if (!form) return;

  var status = form.querySelector("[data-form-status]");
  var botao = form.querySelector('button[type="submit"]');
  var textoBotao = botao.textContent;
  var tentouEnviar = false;

  /* ---------- Máscara do WhatsApp ---------- */
  function soDigitos(texto) {
    return texto.replace(/\D/g, "");
  }

  function mascararTelefone(digitos) {
    var d = digitos.slice(0, 11);
    if (d.length <= 2) return d.length ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  form.whatsapp.addEventListener("input", function () {
    form.whatsapp.value = mascararTelefone(soDigitos(form.whatsapp.value));
  });

  /* ---------- Validação ---------- */
  var regras = {
    nome: function (v) {
      return v.trim().replace(/[^A-Za-zÀ-ÿ]/g, "").length >= 2 ? "" : "Informe seu nome.";
    },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido.";
    },
    whatsapp: function (v) {
      var d = soDigitos(v);
      return d.length === 10 || d.length === 11 ? "" : "Informe um WhatsApp válido com DDD.";
    },
    consentimento: function (v, campo) {
      return campo.checked ? "" : "É preciso aceitar para continuar.";
    }
  };

  function validarCampo(nome) {
    var campo = form[nome];
    var erro = regras[nome](campo.value, campo);
    var mensagem = document.getElementById(nome + "-erro");

    campo.closest(".campo").classList.toggle("campo--erro", Boolean(erro));
    campo.setAttribute("aria-invalid", String(Boolean(erro)));
    campo.setAttribute("aria-describedby", nome + "-erro");
    mensagem.textContent = erro;
    return !erro;
  }

  // Depois da primeira tentativa, a mensagem de erro some assim que a
  // pessoa corrige o campo (enquanto digita). Erros novos só aparecem ao
  // enviar: se aparecessem ao sair do campo, a página "pularia" no exato
  // momento do toque no próximo campo e o toque cairia no lugar errado.
  Object.keys(regras).forEach(function (nome) {
    var evento = nome === "consentimento" ? "change" : "input";
    form[nome].addEventListener(evento, function () {
      var campo = form[nome];
      if (tentouEnviar && campo.getAttribute("aria-invalid") === "true" && !regras[nome](campo.value, campo)) {
        validarCampo(nome);
      }
    });
  });

  /* ---------- Envio ---------- */
  function enviarParaPlanilha(dados) {
    var endpoint = CONFIG.planilha && CONFIG.planilha.endpoint;

    if (!endpoint) {
      // Modo simulado: espera um pouco para parecer um envio real
      console.info("[formulário] Envio simulado (sem endpoint no config.js):", dados);
      return new Promise(function (resolve) { setTimeout(resolve, 700); });
    }

    // "no-cors" + formulário simples: é o jeito compatível com o Apps Script.
    // A resposta vem "opaca" (não dá para ler), então sucesso = não houve erro de rede.
    return fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(dados)
    });
  }

  function definirEnviando(enviando) {
    botao.disabled = enviando;
    botao.textContent = enviando ? "Enviando…" : textoBotao;
    form.setAttribute("aria-busy", String(enviando));
  }

  function irParaObrigado(nome) {
    LP.sessao.gravar("lp_nome", nome.trim().split(/\s+/)[0]);
    LP.sessao.gravar("lp_lead_novo", true);  // o evento Lead é disparado na página de obrigado
    window.location.href = "obrigado.html";
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    tentouEnviar = true;
    status.textContent = "";

    // Honeypot preenchido = robô. Finge que deu certo.
    if (form.empresa.value) {
      irParaObrigado("");
      return;
    }

    var validos = Object.keys(regras).map(validarCampo);
    if (validos.indexOf(false) !== -1) {
      var primeiroErro = form.querySelector('[aria-invalid="true"]');
      if (primeiroErro) primeiroErro.focus();
      return;
    }

    var whatsapp = soDigitos(form.whatsapp.value);
    var dados = Object.assign(
      {
        nome: form.nome.value.trim(),
        email: form.email.value.trim().toLowerCase(),
        whatsapp: whatsapp,
        consentimento: "sim",
        empresa: form.empresa.value,       // o Apps Script confere de novo
        fase: LP.fase || "",
        pagina: window.location.href.split("?")[0]
      },
      LP.utms()
    );

    definirEnviando(true);

    enviarParaPlanilha(dados)
      .then(function () {
        // Guarda no aparelho para pré-preencher o checkout quando o carrinho abrir
        LP.local.gravar("lp_lead", { nome: dados.nome, email: dados.email, whatsapp: whatsapp });
        irParaObrigado(dados.nome);
      })
      .catch(function () {
        definirEnviando(false);
        status.textContent = "Não foi possível enviar agora. Tente de novo em instantes.";
      });
  });
})();
