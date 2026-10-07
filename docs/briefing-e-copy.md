# Saúde da Mulher na Prática — Briefing e Copy

> **Projeto conceitual de portfólio.** A instrutora, o curso, os números e os depoimentos são fictícios. A página publicada deve exibir esse aviso (ver seção 5, "Microcopy").

---

## 1. Briefing

### Contexto (o "anúncio" que originou o projeto)
Fisioterapeuta quer uma landing page para o lançamento do seu curso online, vendido pela Hotmart, com abertura de vendas no início de novembro. Até lá, a página funciona como **pré-lançamento**, captando inscrições para uma lista de espera.

### Cliente
| Item | Definição |
|---|---|
| Instrutora | **Camila Rocha**, fisioterapeuta especialista em Saúde da Mulher |
| Experiência | Cerca de 10 anos de consultório, com atendimento a gestantes, puérperas e mulheres com disfunções do assoalho pélvico. Ministra turmas presenciais há 5 anos |
| Registro | CREFITO-3/000000-F (fictício) |

### Produto
| Item | Definição |
|---|---|
| Nome | **Saúde da Mulher na Prática** |
| Subtítulo | Fisioterapia pélvica e obstétrica, da avaliação ao atendimento |
| Posicionamento | Raciocínio clínico + aplicação prática: entender o porquê de cada conduta e sair sabendo atender |
| Formato | Cerca de 30h de aulas gravadas, 7 módulos, acesso por 1 ano, certificado e encontros ao vivo mensais |
| Plataforma | Hotmart (área de membros e checkout) |

### Módulos
1. **Fundamentos:** anatomia e fisiologia do assoalho pélvico e as mudanças do corpo na gestação
2. **Avaliação fisioterapêutica na saúde da mulher:** anamnese, exame físico, ética e consentimento
3. **Disfunções do assoalho pélvico:** incontinência urinária, prolapsos e dor pélvica
4. **Fisioterapia na gestação:** dor lombopélvica, exercícios e adaptações por trimestre
5. **Preparação para o parto e atuação no trabalho de parto**
6. **Pós-parto:** recuperação perineal, diástase abdominal e retorno ao exercício
7. **Raciocínio clínico na prática:** casos, quando encaminhar e como montar o plano de tratamento

### Bônus
1. **Fichas de avaliação prontas** (PDF editável) para usar no consultório
2. **Encontros ao vivo mensais** para tirar dúvidas e discutir casos
3. **Comunidade de alunas e alunos**

### Oferta
| Item | Definição |
|---|---|
| Preço cheio | R$ 597 à vista ou em até 12x no cartão |
| Condição da lista de espera | **R$ 497** nas primeiras 48h após a abertura do carrinho |
| Garantia | 7 dias, reembolso integral pela Hotmart |
| Calendário | Lista de espera aberta até 03/11 · Carrinho abre 03/11 às 20h · Condição especial até 05/11 às 20h · Carrinho fecha 10/11 às 23h59 |

### Público
- Fisioterapeutas que querem entrar ou se aprofundar na Saúde da Mulher
- Estudantes de fisioterapia dos últimos períodos

**Dores:** insegurança para avaliar o assoalho pélvico; não saber o que fazer com a gestante que chega com dor; condutas genéricas no pós-parto; a graduação passou rápido pela área; medo de errar num atendimento tão íntimo.

**Desejo:** atender com segurança e técnica uma área com demanda crescente e se tornar referência para essas pacientes.

**Nível de consciência:** morno a frio. Sabe que a área existe e que precisa se capacitar, mas ainda não conhece a instrutora.

### Objeções
1. "Dá para aprender avaliação do assoalho pélvico online?"
2. "Sou estudante, serve para mim?"
3. "Não tenho tempo."
4. "Já fiz curso e não consegui aplicar."
5. "Está caro."

### Tom de voz
Técnico sem ser acadêmico, acolhedor e respeitoso. Sem promessa de resultado clínico e sem sensacionalismo, respeitando as regras de publicidade do COFFITO.

### Tráfego
- **Meta Ads** (Instagram e Facebook), público frio e morno
- **Google Ads**, pessoas buscando curso na área

### Requisitos técnicos
- **Stack:** HTML, CSS e JavaScript puros
- **Duas fases:** pré-lançamento (lista de espera) e carrinho aberto (venda). A troca é automática pela data definida no `config.js`, com modo demonstração e seletor de fase para o portfólio
- **Lista de espera:** formulário com nome, e-mail, WhatsApp e consentimento LGPD → Google Sheets (Apps Script). Aba privada "Leads" e aba pública "Demonstração" com dados mascarados
- **Integração Hotmart:** link de checkout nos CTAs, checkout pré-preenchido (nome, e-mail, telefone) e repasse da origem da visita (UTMs)
- **Rastreamento:** captura de UTMs enviada junto com o lead; pixels da Meta e do Google com os eventos `PageView`, `Lead` e `InitiateCheckout` (IDs no `config.js`)
- **SEO:** title, meta description, um único `h1`, `alt` descritivos, schema.org `Course` e `FAQPage`, Open Graph, URL canônica, `sitemap.xml` e `robots.txt`
- **Performance:** mobile-first, imagens WebP com lazy load, meta de 90+ no Lighthouse mobile
- **Conversão:** menu mínimo, CTA repetido ao longo da página e barra fixa de CTA no celular

### Palavras-chave
- curso fisioterapia saúde da mulher *(principal)*
- curso fisioterapia obstétrica online
- curso assoalho pélvico para fisioterapeutas
- fisioterapia pélvica curso

---

## 2. Copy (15 blocos)

> Os textos estão escritos para a fase de **carrinho aberto**. Onde a fase de **pré-lançamento** muda o texto, a versão alternativa aparece marcada com **[Pré-lançamento]**.

### 1. HEADLINE PRINCIPAL

**Variação A — ângulo de segurança clínica** *(favorita)*
> Atenda gestantes, puérperas e mulheres com disfunções pélvicas com a segurança de quem sabe exatamente o que está avaliando.

**Variação B — ângulo de lacuna da formação**
> A graduação passou rápido pela Saúde da Mulher. Este curso preenche essa lacuna, da avaliação ao plano de tratamento.

**Variação C — ângulo de oportunidade na carreira**
> Saúde da Mulher é uma das áreas que mais procuram fisioterapeutas preparados. Esteja pronta para atender.

### 2. SUBHEADLINE

> Um curso online para fisioterapeutas e estudantes que une raciocínio clínico e prática: 7 módulos, cerca de 30 horas de aula e encontros ao vivo mensais com a fisioterapeuta Camila Rocha, especialista em Saúde da Mulher.

### 3. BLOCO DE ABERTURA / PROPOSTA DE VALOR

A paciente chega ao consultório com 32 semanas de gestação e dor lombopélvica. Outra, seis meses depois do parto, conta baixinho que perde urina quando corre atrás do filho. Uma terceira sente dor na relação e já passou por três profissionais.

Você sabe que pode ajudar essas mulheres. Mas, na hora da avaliação, fica a dúvida: estou olhando para o que importa? Essa conduta faz sentido para *esta* paciente?

O **Saúde da Mulher na Prática** foi criado para transformar essa dúvida em raciocínio clínico. Você vai entender o porquê de cada etapa (anatomia, fisiologia, avaliação) e sair sabendo montar um plano de tratamento que você consegue explicar e defender.

Sem protocolo decorado. Sem fórmula mágica. Com método.

### 4. CTA PRIMÁRIO (acima da dobra)

**Botão:** `Quero garantir minha vaga`
**Microcopy:** Acesso imediato · Certificado · Garantia de 7 dias

**[Pré-lançamento]**
**Botão:** `Entrar na lista de espera`
**Microcopy:** Gratuito · Quem está na lista paga R$ 497 nas primeiras 48h · Carrinho abre em 03/11

### 5. IDENTIFICAÇÃO DA DOR

**Título:** Talvez você se reconheça aqui

A Saúde da Mulher é uma das áreas mais bonitas da fisioterapia, e uma das que mais assustam quem está começando. Não por falta de interesse, mas porque a formação raramente prepara para a realidade do consultório.

- Você estudou o assoalho pélvico em poucas aulas na graduação e não se sente segura para avaliar uma paciente de verdade.
- Quando chega uma gestante com dor, você fica na dúvida sobre o que pode e o que não pode fazer em cada trimestre.
- No pós-parto, você acaba passando os mesmos exercícios para todas, porque não sabe bem como individualizar.
- Você tem receio de conduzir uma avaliação tão íntima e não saber deixar a paciente confortável.
- Você já assistiu a vídeos e leu artigos soltos, mas ainda não conseguiu juntar as peças num raciocínio clínico.
- Você vê a demanda crescendo, mas sente que ainda não está pronta para se apresentar como fisioterapeuta da área.

### 6. APRESENTAÇÃO DA SOLUÇÃO

**Título:** Conheça o Saúde da Mulher na Prática

Um curso online que segue o mesmo caminho que você percorre no consultório: **entender → avaliar → decidir → tratar.**

Cada módulo parte da base (o que está acontecendo com o corpo dessa mulher) e chega à conduta (o que fazer, como fazer e quando encaminhar). As aulas teóricas são acompanhadas de demonstrações em modelo anatômico, simulações de atendimento e discussão de casos reais, para você enxergar o raciocínio em ação, e não só a técnica.

É o **Método Entender-Avaliar-Tratar**: em vez de decorar protocolos, você aprende a construir o seu próprio plano para cada paciente.

**Conteúdo programático** (em acordeão na página):

1. **Fundamentos:** anatomia e fisiologia do assoalho pélvico e as mudanças do corpo na gestação
2. **Avaliação fisioterapêutica na saúde da mulher:** anamnese, exame físico, ética e consentimento
3. **Disfunções do assoalho pélvico:** incontinência urinária, prolapsos e dor pélvica
4. **Fisioterapia na gestação:** dor lombopélvica, exercícios e adaptações por trimestre
5. **Preparação para o parto e atuação no trabalho de parto**
6. **Pós-parto:** recuperação perineal, diástase abdominal e retorno ao exercício
7. **Raciocínio clínico na prática:** casos, quando encaminhar e como montar o plano de tratamento

### 7. BENEFÍCIOS

**Título:** O que muda na sua prática

- **Você vai conduzir uma avaliação do assoalho pélvico com segurança**, sabendo o que observar, o que perguntar e como deixar a paciente à vontade.
- **Você vai saber o que fazer com a gestante que chega com dor**, com condutas adequadas a cada trimestre e sem medo de errar.
- **Você vai individualizar o tratamento no pós-parto** em vez de repetir a mesma lista de exercícios para todas.
- **Você vai conseguir explicar cada conduta para a paciente**, o que gera confiança e adesão ao tratamento.
- **Você vai saber quando encaminhar**, trabalhando em parceria com médicos e outros profissionais.
- **Você vai começar a atender com as fichas de avaliação prontas**, sem precisar montar tudo do zero.
- **Você não vai estudar sozinha:** os encontros ao vivo e a comunidade estão lá para as dúvidas que surgem no consultório.
- **Você vai poder rever as aulas sempre que precisar** durante 1 ano, inclusive na véspera daquele atendimento difícil.

### 8. PROVA SOCIAL

**Números em destaque:**
> +600 fisioterapeutas formadas nas turmas presenciais · 10 anos de consultório · Nota 4,9/5 nas avaliações das turmas

**Título:** O que dizem as alunas das turmas presenciais

> "Eu evitava pacientes com queixa pélvica porque não me sentia preparada. Depois do curso, comecei a fazer a avaliação completa e hoje metade da minha agenda é de Saúde da Mulher."
> — **Juliana Mendes**, fisioterapeuta em Campinas (SP)

> "O que mais mudou foi o raciocínio. Antes eu seguia protocolo; agora eu entendo o que estou avaliando e consigo justificar cada escolha, inclusive para a equipe médica da clínica."
> — **Patrícia Lopes**, fisioterapeuta em Belo Horizonte (MG)

> "Fiz no último ano da faculdade e cheguei ao estágio de Saúde da Mulher sabendo o que fazer. A supervisora perguntou onde eu tinha aprendido a avaliação."
> — **Larissa Andrade**, estudante de Fisioterapia em Curitiba (PR)

> "Trabalho com pilates e sempre recebia gestantes. Hoje sei adaptar os exercícios por trimestre com segurança, e as alunas percebem a diferença."
> — **Renata Faria**, fisioterapeuta em Salvador (BA)

> "As fichas de avaliação valeram o curso. Uso em todos os atendimentos e elas me ajudaram a organizar minha primeira consulta."
> — **Mariana Teixeira**, fisioterapeuta em Recife (PE)

### 9. APRESENTAÇÃO DA OFERTA

**Título:** Tudo o que você recebe

```
✓ Curso Saúde da Mulher na Prática — 7 módulos, ~30h       (Valor: R$ 997)
✓ Certificado de conclusão                                  (incluso)
✓ Bônus 1: Fichas de avaliação prontas (PDF editável)       (Valor: R$ 97)
✓ Bônus 2: Encontros ao vivo mensais por 12 meses           (Valor: R$ 600)
✓ Bônus 3: Comunidade de alunas e alunos                    (Valor: R$ 197)
─────────────────────────────────────────────
Valor total: R$ 1.891
Hoje por: R$ 597 à vista ou em até 12x no cartão
Para quem está na lista de espera: R$ 497 (até 05/11, às 20h)
```

**Botão:** `Quero garantir minha vaga`
**Microcopy:** Pagamento seguro pela Hotmart · Cartão, Pix ou boleto

### 10. QUEBRA DE OBJEÇÕES

**Título:** Talvez você esteja pensando…

**"Mas dá para aprender avaliação do assoalho pélvico online?"**
Dá para aprender a base que sustenta toda avaliação: anatomia, raciocínio, o que observar e como conduzir. As demonstrações em modelo anatômico e as simulações mostram cada etapa em detalhe. A prática supervisionada continua sendo importante, e o curso te prepara para chegar a ela sabendo o que está fazendo.

**"Mas eu ainda sou estudante. Serve para mim?"**
Serve, principalmente para quem está nos últimos períodos. Você chega ao estágio e ao primeiro atendimento com uma base que a maioria só constrói anos depois.

**"Mas eu não tenho tempo."**
As aulas são gravadas e curtas, organizadas para caber na rotina de quem já atende. Com cerca de 3 horas por semana, você conclui o curso em uns dois meses, e tem 1 ano de acesso para ir no seu ritmo.

**"Mas eu já fiz curso e não consegui aplicar."**
Muitos cursos ensinam técnica solta. Aqui o foco é o raciocínio: você aprende a decidir o que fazer com cada paciente. E quando a dúvida aparecer no consultório, você leva o caso para o encontro ao vivo.

**"Mas está caro."**
Compare com o valor de uma pós-graduação ou de um curso presencial com passagem e hospedagem. E você tem 7 dias para assistir às aulas e decidir se o curso é para você.

### 11. GARANTIA

**Título:** Garantia incondicional de 7 dias

Entre no curso, assista às aulas, baixe as fichas. Se em até 7 dias você sentir que o Saúde da Mulher na Prática não é para você, basta pedir o reembolso pela própria Hotmart e você recebe 100% do valor de volta. Sem perguntas e sem burocracia.

O risco fica todo comigo.
— Camila Rocha

*(Selo visual: "Garantia de 7 dias")*

### 12. URGÊNCIA / ESCASSEZ

> Toda a escassez é real dentro do calendário do lançamento: o carrinho tem data para fechar, e a condição da lista de espera tem prazo.

**Carrinho aberto:**
> As inscrições desta turma ficam abertas só até **10/11, às 23h59**. Depois disso, o carrinho fecha e a próxima turma ainda não tem data.

**Condição da lista de espera:**
> Quem está na lista de espera paga **R$ 497** em vez de R$ 597, mas só até **05/11, às 20h**.

**[Pré-lançamento]**
> O carrinho abre em **03/11, às 20h** (com contador regressivo). Entre na lista de espera para receber o link antes de todo mundo e garantir R$ 100 de desconto nas primeiras 48h.

### 13. FAQ

**Quanto tempo por semana preciso dedicar?**
Com cerca de 3 horas por semana, você conclui em uns dois meses. Como o acesso dura 1 ano, você pode ir no seu ritmo.

**O curso serve para quem está começando? E para quem já atende na área?**
Sim para os dois. Quem está começando constrói a base do zero. Quem já atende organiza o raciocínio clínico e aprofunda avaliação, gestação e pós-parto.

**E se eu não gostar?**
Você tem 7 dias de garantia. Se não for para você, pede o reembolso pela Hotmart e recebe 100% do valor de volta.

**Como funciona o acesso?**
Logo após a confirmação do pagamento, você recebe por e-mail o acesso à área de membros da Hotmart. As aulas podem ser assistidas no computador ou no celular.

**Tenho suporte para tirar dúvidas?**
Sim. Você pode deixar dúvidas nas aulas e participar dos encontros ao vivo mensais com a Camila, além da comunidade de alunos.

**O curso dá certificado?**
Sim. Ao concluir as aulas, você emite o certificado de conclusão direto na plataforma.

**Quais são as formas de pagamento?**
Cartão de crédito em até 12x, Pix ou boleto, com pagamento processado pela Hotmart.

**Como funciona a lista de espera?**
Você deixa nome, e-mail e WhatsApp e recebe o link de compra assim que o carrinho abrir, em 03/11. Quem está na lista paga R$ 497 nas primeiras 48h.

### 14. CTA FINAL

**Título:** A próxima paciente pode chegar amanhã

Pense na gestante com dor, na mãe que perde urina e não conta para ninguém, na mulher que já ouviu de três profissionais que "isso é normal". Elas precisam de uma fisioterapeuta que saiba avaliar, explicar e tratar.

Essa fisioterapeuta pode ser você.

**Botão:** `Quero garantir minha vaga`
**Microcopy:** Acesso imediato · Certificado · Garantia de 7 dias

**[Pré-lançamento]**
**Botão:** `Entrar na lista de espera`
**Microcopy:** Gratuito · Condição especial de R$ 497 nas primeiras 48h

### 15. PS / BLOCO DE FECHAMENTO

**PS:** Lembre que você tem 7 dias para assistir às aulas e decidir. Se não for para você, recebe 100% de volta. E se você está na lista de espera, sua condição de R$ 497 vale só até 05/11, às 20h.

---

## 3. Mapa: blocos de copy → seções da página

| # | Seção da página | Blocos de copy |
|---|---|---|
| 1 | Hero | 1, 2, 4 (+ contador no pré-lançamento) |
| 2 | Problema | 3, 5 |
| 3 | O curso | 6 (apresentação) |
| 4 | Conteúdo programático | 6 (módulos, em acordeão) |
| 5 | Para quem é / para quem não é | ver seção 4 abaixo |
| 6 | Sobre a instrutora | ver seção 4 abaixo |
| 7 | Bônus | 9 (itens de bônus) |
| 8 | Depoimentos | 8 |
| 9 | Oferta | 7, 9, 12 |
| 10 | Garantia | 11 |
| 11 | FAQ | 10, 13 |
| 12 | CTA final + rodapé | 14, 15 |

---

## 4. Textos complementares

### Para quem é
- Fisioterapeutas que querem começar a atender Saúde da Mulher
- Fisioterapeutas que já atendem e querem organizar o raciocínio clínico
- Estudantes dos últimos períodos que querem chegar preparadas ao estágio
- Fisioterapeutas que atendem gestantes no pilates ou na academia e querem segurança

### Para quem não é
- Quem procura um protocolo pronto para aplicar igual em todas as pacientes
- Quem não é fisioterapeuta nem estudante de fisioterapia
- Quem espera substituir a prática supervisionada por um curso online

### Sobre a instrutora
**Título:** Quem vai te ensinar

Camila Rocha é fisioterapeuta especialista em Saúde da Mulher, com cerca de 10 anos de atendimento a gestantes, puérperas e mulheres com disfunções do assoalho pélvico. Há 5 anos ministra turmas presenciais para fisioterapeutas, e mais de 600 profissionais já passaram por elas.

O Saúde da Mulher na Prática reúne o que ela gostaria de ter aprendido no início da carreira: menos protocolo decorado e mais raciocínio para entender cada paciente.

*CREFITO-3/000000-F*

---

## 5. Microcopy

### Aviso de projeto conceitual (faixa no topo e rodapé)
> Projeto conceitual desenvolvido para portfólio. Instrutora, curso e depoimentos são fictícios.

### Formulário da lista de espera
- **Campos:** Nome · E-mail · WhatsApp (com DDD)
- **Consentimento (checkbox obrigatório):** Aceito receber comunicações sobre o curso por e-mail e WhatsApp, conforme a [Política de Privacidade].
- **Botão:** `Quero entrar na lista`
- **Enviando:** Enviando…
- **Erros:**
  - Informe seu nome.
  - Informe um e-mail válido.
  - Informe um WhatsApp válido com DDD.
  - É preciso aceitar para continuar.
  - Não foi possível enviar agora. Tente de novo em instantes.

### Página de obrigado
**Título:** Você está na lista! 🎉
> Pronto, [Nome]! Você vai receber o link de compra no seu e-mail e no WhatsApp quando o carrinho abrir, em **03/11, às 20h**. Lembre que quem está na lista paga **R$ 497** nas primeiras 48h.

**Botão:** `Entrar no grupo de avisos no WhatsApp`
**Linha de apoio:** Enquanto isso, adicione nosso e-mail aos seus contatos para não perder o aviso.

### Barra fixa no celular
- **Carrinho aberto:** `Garantir minha vaga · R$ 597`
- **[Pré-lançamento]:** `Entrar na lista de espera`

### Rodapé
> Saúde da Mulher na Prática · Camila Rocha · Fisioterapeuta · CREFITO-3/000000-F
> Política de Privacidade · Termos de Uso
> Pagamento processado pela Hotmart. Este site não é afiliado ao Facebook nem ao Google.

---

## 6. SEO

- **Title** (≤ 60 caracteres): `Curso de Fisioterapia em Saúde da Mulher e Obstetrícia`
- **Meta description** (≤ 155 caracteres): `Curso online de fisioterapia em Saúde da Mulher: assoalho pélvico, gestação e pós-parto. Raciocínio clínico e prática. Certificado e aulas ao vivo.`
- **H1:** a headline escolhida (Variação A)
- **Open Graph:**
  - título: `Saúde da Mulher na Prática | Curso para fisioterapeutas`
  - descrição: `Avalie e trate gestantes, puérperas e mulheres com disfunções pélvicas com segurança. Lista de espera aberta.`
- **Schema.org:**
  - `Course`: nome, descrição e provedor (Camila Rocha)
  - `FAQPage`: as perguntas do bloco 13
- **Alt das imagens:** descritivos e com contexto, por exemplo "Fisioterapeuta orientando exercício para gestante em consultório"
