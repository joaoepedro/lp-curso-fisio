# Guia: lista de espera no Google Sheets

Tempo: uns 10 minutos. Você só precisa de uma conta Google.

Ao final você terá:
- uma planilha que recebe cada inscrição da landing page;
- a URL do "App da Web" para colar no `js/config.js`;
- um link público que mostra **só** a aba "Demonstração" (dados mascarados), para o portfólio.

---

## 1. Criar a planilha

1. Acesse [sheets.new](https://sheets.new) (cria uma planilha em branco).
2. Dê um nome, por exemplo: **Lista de espera · Saúde da Mulher na Prática**.

## 2. Colar o script

1. Na planilha, clique em **Extensões → Apps Script**. Abre uma nova aba com um editor de código.
2. Apague o código que vem de exemplo (`function myFunction() {}`).
3. Abra o arquivo `integracoes/google-sheets/Codigo.gs` do projeto, copie **todo** o conteúdo e cole no editor.
4. Clique no ícone de disquete (**Salvar**). Se pedir um nome para o projeto, use "Lista de espera".

## 3. Preparar as abas (rodar uma vez)

1. No topo do editor, ao lado do botão **Executar**, há uma lista de funções. Escolha **configurarPlanilha**.
2. Clique em **Executar**.
3. Na primeira vez, o Google pede autorização:
   - **Revisar permissões** → escolha sua conta;
   - aparece "O Google não verificou este app". É normal, porque o app é seu. Clique em **Avançado** → **Acessar Lista de espera (não seguro)** → **Permitir**.
4. Volte para a aba da planilha: devem existir as abas **Leads** e **Demonstração**, e um aviso "Pronto!".

> **Se a aba "Demonstração" mostrar erro nas fórmulas:** apague as fórmulas e cole estas, manualmente, na linha 2 (formato brasileiro, com ponto e vírgula):
>
> | Célula | Fórmula |
> |---|---|
> | A2 | `=ARRAYFORMULA(SE(Leads!A2:A="";;Leads!A2:A))` |
> | B2 | `=ARRAYFORMULA(SE(Leads!B2:B="";;PRI.MAIÚSCULA(REGEXEXTRACT(Leads!B2:B;"^\S+"))))` |
> | C2 | `=ARRAYFORMULA(SE(Leads!C2:C="";;REGEXREPLACE(Leads!C2:C;"^(.{2})[^@]*";"$1***")))` |
> | D2 | `=ARRAYFORMULA(SE(Leads!D2:D="";;"("&ESQUERDA(Leads!D2:D;2)&") "&EXT.TEXTO(Leads!D2:D;3;1)&"****-**"&DIREITA(Leads!D2:D;2)))` |
> | E2 | `=ARRAYFORMULA(SE(Leads!F2:F="";;Leads!F2:F))` |

## 4. Publicar como App da Web

1. No editor do Apps Script, clique em **Implantar → Nova implantação**.
2. Na engrenagem ao lado de "Selecione o tipo", escolha **App da Web**.
3. Preencha:
   - **Descrição:** Lista de espera v1
   - **Executar como:** **Eu** (seu e-mail)
   - **Quem pode acessar:** **Qualquer pessoa**
4. Clique em **Implantar** e copie a **URL do app da Web** (termina em `/exec`).
5. Teste: cole essa URL no navegador. Deve aparecer `{"ok":true,"status":"Lista de espera no ar"}`.

> "Qualquer pessoa" significa que qualquer um pode **enviar** uma inscrição para essa URL (é o que a landing page faz). Ninguém consegue **ler** a planilha por ela. O script também valida os dados e descarta envios inválidos.

## 5. Ligar a landing page à planilha

No arquivo `js/config.js`, cole a URL no campo `endpoint`:

```js
planilha: {
  endpoint: "https://script.google.com/macros/s/AKfy.../exec",
  linkDemonstracao: ""   // preenchido no passo 6
},
```

Abra a landing page, faça uma inscrição de teste e confira: em alguns segundos aparece uma linha nova na aba **Leads**.

## 6. Link público só da aba "Demonstração" (portfólio)

> Não use o botão "Compartilhar" com "qualquer pessoa com o link": ele daria acesso a **todas** as abas, inclusive aos dados completos da aba Leads.

1. Na planilha: **Arquivo → Compartilhar → Publicar na Web**.
2. Em "Link", troque **Documento inteiro** por **Demonstração**, e mantenha **Página da Web**.
3. Abra **Configurações e conteúdo publicado**, escolha **Demonstração** (só ela) e confira que a opção de republicar automaticamente as alterações está marcada.
4. Clique em **Publicar** e copie o link.
5. Cole no `js/config.js`, em `linkDemonstracao`.

Agora, no modo portfólio, a página de obrigado mostra o botão **"Abrir planilha de demonstração"**. A versão publicada pode levar alguns minutos para mostrar uma inscrição nova.

---

## Se precisar mudar o script depois

Editou o código? Ele só passa a valer depois de uma nova versão **na mesma implantação** (assim a URL não muda):

**Implantar → Gerenciar implantações → ✏️ (editar) → Versão: Nova versão → Implantar.**

Se você criar uma "Nova implantação", o Google gera uma URL nova e será preciso atualizar o `config.js`.
