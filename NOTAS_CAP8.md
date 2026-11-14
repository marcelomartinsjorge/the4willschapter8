# Capítulo VIII · Laura, a Lâmina · notas de entrega (v1)

*12/11/2026 · primeira versão completa: texto (PT e EN), seis momentos de jogo, codex, tela final. Imagens, sprites da Laura aos 36, o Maior e as vozes ainda são provisórios (ver MIDIAS_CAP8.md).*

---

## 1. O que o capítulo é

Laura, 36 anos, General-Rainha (o povo diz Lâmina), leva dois mil dos melhores de Redom à Boca Seca, uns três meses depois da morte do Simon nas Goelas. Seis partes, 54 páginas (as rotas escondem algumas), cerca de 25 a 35 minutos de leitura e jogo.

| Parte | Cartão | O que acontece | Jogo |
|---|---|---|---|
| I · O Prato Cheio | “Redom enterra os seus onde caem.” | O prato que volta cheio, Justine (rota), Dolores e a 21ª saída, Aubert (a Nymae sumiu), Markus fica, o templo, a laje com cal nova, o portão sul | — |
| II · A Estrada | “Exército conta lança. Deserto conta água.” | Laura come da panela dos soldados; Joseph quer a última campanha; a Nymae (rota do Cap. VII); água para onze dias | — |
| III · A Areia | “No deserto, quem carrega a água carrega o exército.” | Três noites de sabotagem, três suspeitos, a Lei da Lâmina; Laura começa a desconfiar da Madrinha | **Ler o corpo** (3×) |
| IV · As Goelas | “O posto das Goelas não tem muralha.” | Ansel mostra onde o Simon caiu, a roda, o túmulo (dois dedos no peito), Joseph pede para ficar, o Último Gole | **Girar a roda** |
| V · O Último Gole | “Quem chega chama de primeiro gole…” | 34 fogos; o chão bate em três; Varr e o Merrow; a tigela; a fila do amanhecer | **Ouvir o chão** |
| VI · O Dia Comido | “Dia ser comido, Maior nascer.” | A onda, o bronze, Varr mata a Nymae, o duelo, o eclipse, o Maior, os vivos | **O duelo**, **Erguer a espada**, **Ficar de pé**, **Contar os vivos** |

## 2. Decisões que vieram de você (todas aplicadas)

- Laura só sabe que a Nymae fugiu; a desconfiança nasce na marcha. Por isso o Markus fica, com a Capital e com a costa (a04).
- A sabotagem é real e lenta: cochos secos, barril salgado, odres dos feridos **secos por dentro e sem furo**, tinas da forja. A pista de que “não é gente” é essa.
- A desconfiança da Madrinha começa na Parte III (noite 2: “Penso nisso pela primeira vez aqui, com areia nos dentes”; noite 3: o livro de lendas, “nunca tem o mesmo rosto duas vezes”).
- Nas Goelas: o Ansel em pessoa (ou um soldado do posto, se a Laura mandou executar o Ansel na segunda noite da caça; no Cap. VII ele não morre) e o túmulo no alto do muro velho dos Grakh, de onde se vê a roda. O gesto dos dois dedos é no túmulo, não contra o Kronk.
- Desmascarou cedo → a água e o bronze chegam cedo, e os Grakh atacam com o grande na frente (rota A). Não desmascarou → Redom carrega, a onda pega a carga no meio do vale, o bronze chega depois (rota B).
- Kronk apanha muito; o corte final é atrás da coxa; nada de “manco” fora do duelo. O eclipse interrompe; aparece o Maior.
- Laura não estava na morte do pai: as últimas palavras dele chegaram “pelos que voltaram… Eu estava atrás da porta” (d01). Joseph não estava lá.
- General-Rainha é o título oficial (Aubert, o padre, o Markus fora da rota de consorte); “Lâmina” é como a tropa a chama.
- O último poço: **Último Gole** nos mapas de Redom, **Primeiro Gole** para quem chega de fora.
- Queimados é um povo: nenhum guia. Redom conhece o caminho das campanhas.
- O cavalo não morre. Laura tem voz nova (mais madura).

## 3. Os sistemas

### 3.1 O coração de pedra
- O pulso da Laura fica perto de **52** (`st.base`). Abaixo de 64 o ícone fica cinza e a tela não aperta; abaixo de 68 a batida não se ouve.
- Três disparos, por página: **Dolores** (108), **o túmulo** (116), **o Maior** (166). Sobe rápido, desce devagar.
- Depois do sangue no duelo, a base vira **78**; depois do Maior, **70**. O capítulo seguinte lê isso em `aqv_estado.cap8`.
- No duelo, o pulso estreita as janelas do anel (como nos Caps. II e IV). Perto de 52 elas são largas: é a vantagem da Lâmina.

### 3.2 A caça (Parte III)
- O rosto que ela usa vem do Cap. VII (`cap7.disfarce`: estrebaria → Wil, forja → Bram, Ilse, Nell). As três noites são o lugar dela mais dois sorteados, em ordem sorteada.
- Cada noite: dois ou três suspeitos (quem dorme no lugar, mais um engano: Tasso, que vende água de verdade, ou Ansel, ou a Nymae do Cap. VII). O jogador lê **um** suspeito, com **quatro olhares** em seis lugares do corpo (testa, orelhas, boca, pescoço, mãos, pulso).
- Gente mostra gente (suor, orelha que esquenta, pulso de medo). Ela mostra o que não é de gente: **testa seca, sal na boca, escama no pescoço, pulso rachado**. Duas dessas pistas = “Sei onde olhar” na fila.
- A Nymae do Cap. VII é um engano honesto: mostra escama e nadadeira de verdade, porque é Nymae.
- **Executar** quem é ela → ela sai da corrente deixando a roupa com sal, e volta de dentro de um poço seco no amanhecer (rota A). Executar inocente → a tropa fica fria; a moral cai e menos gente volta.

### 3.3 Quantos voltam
~~`38 + 31 (rota A) + {12, 6, 0} (moral) + 8 (vigia dobrada) + 8 (água guardada na noite certa)`. Vai de 38 a 97.~~ **Substituída na v3:** `26 + 14 + {8, 4, 0} + 6 + 6`, de 26 a 60 (ver a seção v3). O número aparece por extenso na contagem final e define as rajadas do Maior (3, 4 ou 5).

### 3.4 Os jogos
| Jogo | Página | Mecânica | O que o texto lê depois |
|---|---|---|---|
| Ler o corpo | c0, c1, c2 | Escolher um suspeito; 4 olhares em 6 lugares | `st.leituras`, `st.lidoNoite`; “o que vi não é de gente” |
| Girar a roda | d04 | Segurar para girar; o rangido a cada meia volta; 12 voltas enchem o balde | 1–3, 4–11 ou 12 voltas |
| Ouvir o chão | e02 | Três batidas e um silêncio, no meio do vento; o primeiro ciclo só se ouve | 6+ acertos = o presságio volta em f03 |
| O duelo | f06 | Motor dos Caps. II/IV: menu (estocada, corte, finta, respirar, rodear), anel, ↑ escudo / ↓ passo lateral. Três fases; a fúria faz a Laura sangrar (“Assobio! Assobio sangrar!”); o fim é sempre passo lateral + corte na coxa | pontos; base 78 |
| Erguer a espada | f07 | Segurar: a espada sobe, mas o sol é comido antes de ela chegar lá | — |
| Ficar de pé | f09 | Sobreviver ao Maior e chamar as rajadas. Pulso ≥130: a ordem sai tremida (“Sol… soltem!”) e atrasa. A mão no ombro (Cap. III, 3+ correções) e a coragem do templo baixam o pulso uma vez cada | deslizes na tela final |
| Contar os vivos | f11 | Segurar para andar; Ansel, Varr e o intendente passam; contar duas vezes | o número por extenso |

## 4. Rotas e estado

- **Lê dos capítulos anteriores:** Cap. II (promessa), III (correções), IV (mãe/cinco mentiras, Varr e o Merrow, consorte), VI (o rangido, quem estava ao lado do Kronk: Ikk, Dorgh), VII (consorte, fuga, chefes da trégua, disfarce, rosto da coluna, Nymae, intendente, alarme, confissão, semente).
- **Escreve em `aqv_estado.cap8`:** mãe, prece, espada, Nymae, noites, leituras, mortos e inocentes, moral, fuga, desmascarou, rota, Joseph (ficou/morreu), Ansel, presságio, vigia, roda, duelo, Maior, sobreviventes, base do pulso, pontos.
- Testado de ponta a ponta em três rotas (headless, sem erro de JavaScript):
  - **A:** Laura executa a pessoa certa na noite 3 → fuga → onda na crista → 97 voltam (números da v1; na fórmula atual: A 60, B 42, C 56).
  - **B:** guarda tudo e não aponta ninguém → onda no meio da carga → 60 voltam.
  - **C (EN):** guarda tudo e aponta a pessoa certa na fila → o rosto escorrega → 91 voltam.

## 5. Geografia (nota)
O codex do Cap. V diz que a Boca Seca é o deserto **do sul**; o Cap. VII manda o Pira **para o norte**. O texto do VIII não usa bússola para o Último Gole: só “dois dias além das Goelas”, “antes de o deserto acabar”, e o bronze vem **do poente**. Quando a geografia for fechada, nenhuma frase precisa mudar.

## 6. Prompt Mestre (Etapas 0 a 6c)

### 6.1 Etapa 0 · checagem antes → depois
| | Antes | Depois |
|---|---|---|
| Muletas acima de 10 | 0 | 0 |
| Pior muleta | ninguém 5 | ninguém 4 |
| Grupos de molde ACIMA | 17 | **2** (ver D1 e D2) |

O relatório final está em `checagem_cap8.md`. O que foi cortado ou reescrito nesta passada (resumo): “o Grakh grande” de 12 para 4 linhas; “a Boca Seca” no texto de 9 para 3 (e os verbetes de Queimados e Tacets saíram do codex, porque nenhuma palavra do capítulo leva a eles); “os dois mil”, “cela da Ala Funda”, “diante da coluna”, “porta da cerca”, “desde a notícia”, “homens/soldado da Terceira”, “moça da cozinha”, “tenda dos feridos”, “o pulso desce” abaixo do limite; as três falas do Varr com a mesma abertura viraram uma linha fixa + a variante; “Aos dezesseis você” não aparece mais duas vezes na mesma tela; “as orelhas não mudam” virou cinco jeitos diferentes; a epígrafe da Parte VI deixou de antecipar a fala da Nymae (“…e a Boca Seca bebe todos” só aparece na boca dela).

### 6.2 Decisões para você (D)
- **D1 · “da Boca Seca”.** Nome próprio do lugar. No texto do capítulo sobraram 3 linhas (o cartão da Parte III virou “A Areia”), abaixo do limite. O grupo que ainda trava está **só nos verbetes de codex herdados dos Caps. V a VII** (Goelas, Boca Seca, Grakh), sem mudança. Proposta: declarar no bloco `motivos cap08` → `Boca Seca | nome do lugar; a fala da Nymae (f01a) e o eco “A Boca Seca bebeu a dela também” (f05)`.
- **D2 · “o Grakh grande”.** É o nome que a Laura dá ao Kronk (ela não sabe o nome dele). Ficaram 4 linhas: a opção do templo, o reconhecimento na carga (rota B) ou na subida da duna (rota A), que nunca aparecem juntos, e o fecho “Derrubei o Grakh grande. Ou derrubei um grande, e o grande era o outro.”, que precisa da repetição. Proposta: declarar como motivo.

### 6.3 Blocos propostos para o Anexo A (só regras de escrita)
```motivos cap08
Boca Seca | D1 · nome do lugar; a fala da Nymae e o eco dela
o Grakh grande | D2 · o nome que a Laura dá ao Kronk; fecho em f10
Firmes! É só o escuro! Segurem a linha! | as últimas palavras do pai (d01), gritadas pela Laura no eclipse (f07b)
Aos dezesseis | a Laura de 16 nos Caps. II e IV (Dolores, o templo, a espada que pesa)
conto | a Laura conta: dias, pulso, companhias, fogos, vivos (verbo literal, nunca figurado)
```
```gestos cap08
nomes: Markus, Joseph, Simon, Justine, Dolores, Varr, Ansel, Aubert, Nell, Wil, Bram, Ilse, Tasso
pelo nariz | Markus
dois dedos no peito | Simon, Laura
pena entre os dentes | Justine
polegar pelos calos | Justine, Dolores
gira o anel no dedo | Joseph
gira o odre | Joseph
conta as velas | Aubert
bate no meu ombro com o punho | Varr
```
Ligação declarada: os **dois dedos no peito** são do Simon (Ansel conta, d03) e a Laura completa o gesto no túmulo (d05). É o ponto da cena.

**Travas do capítulo:** “Lâmina” só na boca da tropa e no texto da Laura sobre si; “General-Rainha” na boca de quem é formal (Aubert, o padre, o Markus fora da rota de consorte). A Laura nunca diz “Kronk”, “Tacets” nem “Madrinha” como nome de quem está na frente dela: são “o Grakh grande”, “homens de bronze”, “a Nymae”. A Madrinha aparece só no livro de lendas lido aos catorze anos.

### 6.4 Etapa 6c (jogar como jogador)
Leitura corrida da rota B em `leitura_rota_B.md` (todo texto, na ordem, com as opções). O que a leitura achou e já foi corrigido:
- Markus: a fala “Você ainda não escolheu o dia” parecia da Laura e contradizia “o dia era meu”. Agora é dele, com gesto.
- “Joseph… abri a linha dos Grakh **nesta areia**” no primeiro dia de estrada, longe da areia → “no deserto”.
- c9: “Levanta **sozinho**” depois de “Uma moça da cozinha” → frase sem gênero.
- Decisão da noite: “Esta noite, li Wil” (a leitura é de manhã) → “O nome que eu tenho é Wil.”; “Pôr dois guardas **em a** estrebaria” → “na estrebaria”; “ao lado **de a**” → “da”.
- “Ele ri sozinho” no Varr: o gesto é do Joseph → “Ele bate no meu ombro com o punho”.
- d01: “Meu irmão morreu aqui faz noventa e dois dias” não fechava com os 81 dias desde a notícia → “A notícia levou oito dias até a Capital. Eu levei onze.”
- Dolores: “acende a vela… **até ao** meio-dia” (forma de Portugal) → “deixa uma vela acesa ao lado dela, de dia também”.

## 7. Pendências
- **Imagens** de todas as páginas, **retratos** dos suspeitos, **sprites da Laura aos 36** (hoje o duelo usa as poses do Laus como provisório) e **o Maior** (hoje é o Kronk em cinza, ampliado): ver MIDIAS_CAP8.md.
- **Vozes:** L01 a L07b (ver MIDIAS). Sem arquivo, o texto segue sem som.
- **Sons novos:** o riso do Maior; a água subindo de um poço (a onda); o resto já existe na pasta.
- **Cap. IX:** o botão do fim aponta para “Capítulo IX · Aheryn” sem link (`proximo.url` vazio).

---

## v2 · 12/11/2026 · o feedback das Partes I a III

**Aplicado do seu texto (com ajuste de português):** epígrafe da Parte I (“os seus guerreiros”); a01 sem a contagem dupla (a sede de vingança, a Capital Branca vista da cadeira); a mãe com a fala nova e três respostas da Laura (eu volto / pelo Simon / o Torneio), a resposta dela muda com a Consorte (Justine, Markus ou nenhuma), e uma segunda escolha (prometer comer ou rezar), que fecha com o beijo na mão; Aubert sem a leitura de orelha, com o detalhe da fuga do Cap. VII mantido numa linha; Markus com a espada reforjada e a versão de consorte (a revanche só aparece com ele, porque no Cap. IV ela só acontece se a Laura visitou o Markus); o templo com Força para a mãe / Matar o Grakh grande / Perdão (é o perdão que faz o ombro pesar, e é ele que ajuda diante do Maior); epígrafe da Parte II na boca do Kassian; a fila da panela com três tigelas e a escolha do vinho do Joseph (prometer / proibir → “Bah!” → ordem ou deixar / não responder); a Nymae com a fala nova.

**Novo jogo: O quarto dela** (a06b). Tocar na esteira (fria, nunca usada), na bacia (crosta de sal), na janela (muro cego) e na laje (balança). Levantar a laje mostra a cisterna; a Laura manda o Markus seguir a água. Fica em `aqv_estado.cap8.laje` para o Cap. IX.

**A caça, reescrita** (as dúvidas sobre Nell, Wil e Bram): o problema era real. Os nomes só apareciam dentro do jogo, e a decisão falava de alguém que o texto nunca apresentou. Agora:
1. A página da noite mostra o estrago, e a Laura manda trazer todos os que dormiram perto do lugar. Na primeira noite ela diz: “Servo não se conta, e eu nunca soube o nome de nenhum. Hoje, pergunto.”
2. O texto apresenta cada um: “São Nell, que serve a panela da cozinha, e Ansel, o sentinela, que fazia a ronda daquele lado.” Ela pergunta, dura, o que aconteceu, e ninguém responde.
3. **Ler o corpo:** todos os suspeitos da noite lado a lado, seis olhares para dividir entre eles.
4. **A Lei:** a Laura resume o que viu de cada um (“Em Nell, o que eu vi não é de gente.” / “Tasso mentiu sobre a água.”) e o jogador escolhe quem executar, ou põe guardas e espera.
- Quem são: em cada noite vem o servo que dorme naquele lugar (Wil na estrebaria, Nell na cozinha, Ilse com os feridos, Bram na forja) e um engano (Tasso, que vende água de verdade; o Ansel; a Nymae, se ela veio). **Um dos quatro servos é a Nymae disfarçada**: é o rosto que ela roubou no Cap. VII. Só ela mostra o que não é de gente (testa seca, sal na boca, escama no pescoço, pulso rachado).
- A Nymae do Cap. VII (a lavadeira com argola) e a Nell são pessoas diferentes. A Nymae só aparece se ela veio na coluna no Cap. VII.

**Justine:** a cena dela existe (a capela, a vírgula “e voltar”, as duas velas) e só aparece quando ela é a Consorte. A leitura que você recebeu era da rota com o Markus.

**O túmulo do pai:** nas Goelas, depois do Simon, a Laura vê um túmulo mais velho no pé do muro e pode descer (escolha). Kassian, o General-Rei, que ela conheceu “de costas, num cavalo saindo pelo portão sul”.

**A espada do Simon:** se ela leva, não finca mais no túmulo. Encosta o cabo nas pedras (“Ela volta suja, irmão”), desembainha diante do Grakh grande, e é com ela que abre a coxa dele.

**Menos conta no resto do capítulo:** saíram a pedra contada no poço seco, a tenda contando companhias e sargentos, o “Somem antes do sete”, o “Conto outra vez” no fim, e o intendente conferindo em vez de contar. Ficaram as contas que carregam alguma coisa: o portão sul, os fogos (trinta e quatro contra trezentos), os vivos no fim, e a mãe.

**Mais da Laura por dentro, no seu tom:** “Bebo também. A outra sede continua.” (Goelas), “Amanhã eu vejo a cara de quem matou o Simon.” (a véspera), “É o grande do Ansel. Não preciso perguntar.” e o laranjal antes de erguer a espada.

**“Oprato”:** no jogo, o “O” é a letra capitular grande, desenhada separada do resto. Na leitura corrida que eu extraí da tela ela saiu colada. Na tela está certo.

**Os números [1], [2], [3]…:** são as posições internas das páginas na rota jogada. Páginas que a rota pula (a Justine, na rota do Markus) não aparecem, por isso saltou do [1] para o [3].

---

## v3 · 13/11/2026 · o feedback das Partes IV a VI e a cena da Justine

### O que entrou do seu texto (com ajuste de português)
- **Justine (a02/a02b), reescrita inteira:** a poeta mais famosa de Redom; "Veio fazer as pazes com a sua fé?" / "Vim te ver" / ela franze a testa; o polegar nos calos; "Tenho saudade"; "Você sabe por que estive distante"; **"Você ama mais a mim ou o seu título?"**. Três respostas (você / uma coisa não tem a ver com a outra / o dever primeiro). Nas duas primeiras ela pede "promete que vai sossegar?" e vem a segunda escolha: **Prometo** → o beijo longo, "Eu te amo, Laura" / "Sempre te amei, minha Justine", e ela sai querendo olhar para trás; **Não prometo** ou **o dever** → "Ótimo… boa viagem, Lâmina", e ela vai embora. Grava `cap8.justine` = `prometeu` / `naoPrometeu` / `dever`.
- **d01:** "num dia de eclipse"; "A notícia levou oito dias até a Capital, e eu levei noventa e dois para chegar aqui. Parece que tudo aconteceu na mesma semana."
- **d03:** a variante para quando, no Cap. VI, o Kronk **não esperou** (rangido `acabar`): "o grande desceu a maça antes de ele bater. Nem isso deixaram ele pedir."
- **d04 (a roda):** foi para montar esta roda que o Simon veio às Goelas. Depois do jogo, o mundo fica em silêncio, o laranjal, os olhos molhados (a última vez foi antes do Torneio), e "Chorar na frente dos meus homens… seria trair a Juíza e o Cavaleiro. Me recomponho."
- **d06 (Joseph):** saiu a linha "Naquele tempo eu estava no seu caminho"; ele gira o anel e espera a resposta.
- **d07:** três dias, se forem rápidos; depois do poço o chão vira rocha vulcânica, até os picos onde dorme **Azrahekt, o Sol Faminto** (nome da Bíblia); "Nem os Grakh vivem lá"; a corneta toca e a coluna marcha forçada.
- **Epígrafe da Parte V:** "A última chance de beber água para quem segue adiante. E ela tem gosto de ovo podre." · *Teodric Vane, explorador de Redom* (nome inventado; troque se quiser).
- **e01:** 34 fogos para a Laura, 37 para o Varr, "Não faz diferença", e os mais de trezentos de vinte anos atrás.
- **e03 (Varr):** a mão no ombro dela como num soldado dele; "Eu queria uma canção"; três respostas (canção e vingança / não existe canção para dois mil / foco). As linhas do Merrow ("Amanhã eu pago, Laus da Casa Merrow") **só se, no Cap. IV, a Laura deixou o Varr copiar**. Nova página e03b: ele vai dormir com a Terceira.
- **f01b:** "Não só mais alto: mais musculoso também. O tipo de desvantagem que nunca foi desvantagem para mim. É por você, Simon" (+ "E por você, pai" se ela visitou o túmulo). Na rota A a mesma ideia vem em f04, com "O líder deles".
- **f02b:** "É ela." + a ordem de matá-la antes de tudo.
- **f03:** atordoada; "Dez. Vinte. Cem? Mais."; saiu "A água não derruba bronze"; entrou **"Que merda está acontecendo?!"**.
- **f05 (a Madrinha), como você escreveu:** o chicote de água gigante, dez homens por chicotada, a água acaba depois de umas dez; o Varr chega com seis (o primeiro morre, o segundo some na lama); a espada dele entra embaixo do braço, nas costelas; ela corta a garganta do soldado que tentava degolá-la; ferida, dança e corta homens como papel; o Varr abre o crânio dela de cima. **A luta acontece no caos do bronze:** "Só não somos mais porque metade da coluna está de frente para o bronze, e de costas para ela."
- **f06/f07:** "e porque eles sabem que eu quero ele"; nos olhos dele, a vontade de matar; "finalmente cai"; mais sangue dentro da armadura amassada; "Odeio mentir… quase fui derrotada. Mas venci."; o alívio que ela não sentia desde o Joseph no Torneio Real. "Foi um excelente adversário…"; "Ergo a espada, ainda olhando para ele"; o chão escurece como se um dragão passasse, mas a sombra não passa; **"— Eclipse! Eclipse!"**.
- **f08/f09 (o Maior):** "o dia que virou noite" (o "dia comido" ficou para a boca dos Grakh); "Uma aberração"; "muito maior"; músculos onde nenhum Grakh tem; a flecha entra e "Os olhos dele estão em mim"; **o Joseph partido ao meio com o cavalo** pela mão-garra (só se ele veio); centenas de flechas, ele ri e tenta levantar, o corpo cede devagar, a luz fraca por dentro que desfaz a carne; **"Essa besta não era do nosso mundo."**
- **f10 (o campo):** o último bronze se arrastando até ser desmontado; **nenhum Tacet e nenhum Grakh recuou**; bronze espatifado de ponta a ponta, os nossos e os deles uns sobre os outros, **quase dois mil dos nossos**; o corpo da Madrinha se desfazendo na mesma luz do Maior; o Kronk caído, virado para os acampamentos.
- **f12:** sem a cena do Kronk. A luta termina com ele ainda caído onde está (f10), e o capítulo volta para as Goelas sem mostrar ninguém levá-lo. Fica em aberto para o Cap. IX.

### Ajustes meus
- **A luta de três lados (nova página f03b, entre f04 e f05):** a Terceira contra o bronze ("— Nas juntas! Martelos nas juntas!"), os Grakh chegando por trás, e a água dela por cima. Deixa evidente que tudo acontece ao mesmo tempo, como você pediu.
- **"Madrinha" ou "a Nymae":** se no Cap. VII a Madrinha contou à Laura como a chamam na Orla, o capítulo inteiro diz **"a Madrinha"**; senão, "a Nymae" (e "a Nymae conjuradora" na batalha). A palavra "hóspede" saiu do capítulo inteiro, incluindo as falas do Aubert e do padre e as notas do resumo. Para isso o Cap. VII ganhou uma marca nova (`interrogatorio.nome`): **é preciso subir o patch do Cap. VII** (comandos no fim da resposta).
- **Efeitos de tela (novo, `livro8.js` + `cap8.css`):** tremor, clarão, água varrendo a tela, sangue pulsando na borda, bronze (tremor em quatro), apagão, e o **eclipse que escurece a tela e só sai quando o sol volta** (páginas `escuro: true`). Disparam no parágrafo certo, junto com os sons. Vibram o celular no tremor e na onda.
- **Vídeo de fundo:** todas as páginas grandes aceitam um `.mp4` (com `.webm` reserva). Sem o arquivo, fica a imagem. As rotas foram corrigidas para `.mp4`.
- **Dublagem:** de 9 para **31 falas da Laura** (todas as escolhas faladas, os gritos da batalha, os pensamentos do pico). O motor agora aceita voz que muda com a rota ("É por você, Simon" com ou sem o pai).
- **Quantos voltam:** `26 + 14 (rota A) + {8, 4, 0} (moral) + 6 (vigia) + 6 (água guardada)`, de 26 a 60. Rajadas do Maior: 48+ → 3; 36+ → 4; menos → 5.
- **Repetições:** o checador passou com zero grupo acima no texto do capítulo. Variei "a cela da Ala Funda" (agora três jeitos: a tocha da Ala Funda, a tarde inteira na Ala Funda, a cara atrás das grades), "olha para mim", "a minha mãe", "dedos no peito", "tem gosto de", "o Grakh grande" (o fecho de f10 virou "Derrubei o líder deles. Ou derrubei um grande, e o grande era o outro.").

### Decisões que continuam com você
- **D1 · "da Boca Seca"**: o único grupo que ainda trava o checador, **só nos verbetes de codex herdados dos Caps. V a VII**. Proposta: declarar como motivo (é o nome do lugar).
- **D2 · resolvido.** "O Grakh grande" caiu para o limite; não precisa mais de motivo.
- **Teodric Vane:** o explorador da epígrafe é invenção minha. Se a Bíblia tiver um explorador de Redom, troco.

### Blocos para o Anexo A (substituem os da v1)
```motivos cap08
Boca Seca | D1 · nome do lugar; a fala da Madrinha e o eco dela (f05)
Firmes! É só o escuro! Segurem a linha! | as últimas palavras do pai (d01), gritadas pela Laura no eclipse (f07b)
Aos dezesseis | a Laura de 16 nos Caps. II e IV (Dolores, o templo, a espada que pesa)
É por você, Simon | aparece em f01b (rota B) ou f04 (rota A), nunca nas duas
```
```gestos cap08
nomes: Markus, Joseph, Simon, Justine, Dolores, Varr, Ansel, Aubert, Nell, Wil, Bram, Ilse, Tasso
pelo nariz | Markus
dois dedos | Simon, Laura
pena entre os dentes | Justine
polegar pelos calos | Justine, Dolores
gira o anel | Joseph
mão no ombro | Varr
```
**Travas atualizadas:** a Laura chama a conjuradora de "a Madrinha" só se ouviu o nome no Cap. VII; senão "a Nymae"/"a conjuradora". Nunca diz "Kronk" nem "Tacets": "o Grakh grande"/"o líder deles", "homens de bronze".

### Testes
Três rotas jogadas do começo ao fim no navegador, sem erro de JavaScript: **A** (Justine, Prometo, executa a pessoa certa, ela foge) → 60 voltam; **B** (guarda tudo, ninguém apontado, Redom ataca) → 42; **C** (EN, aponta a pessoa certa na fila, Joseph fica) → 56. Leituras corridas em `leitura_rota_A/B/C.md`.

### Pendências
- Toda a mídia nova: ver **MIDIAS_CAP8.md** (fichas, imagens, 15 vídeos, 22 sons novos, 31 falas).
- Sprites da Laura aos 36 e do Maior: quando chegarem, eu acerto o eixo e a base das poses no `duelo8.js`.
- **Cap. IX:** o botão do fim continua sem link.

### Atualização das ferramentas (13/11/2026, mais tarde)
O `MIDIAS_CAP8.md` foi refeito com as ferramentas atuais: **Flow com Personagens (`@nome`) + Nano Banana** para imagens, **Omni Flash (Frames/Ingredientes)** para vídeo, **ElevenLabs Eleven v4** para as falas (tags livres, sem SSML, dá para gerar direto em pt-BR) e **Sound Effects v3** para os sons. A pesquisa anterior estava desatualizada (Veo 3.1, Eleven v3).

### Mais imagens nos ramos (13/11/2026)
Você apontou, com razão, que a conversa da Justine ficava presa numa imagem só. Agora **cada ramo que muda a cena tem a sua imagem**, e o jogo troca sozinho no momento da escolha (as imagens de ramo aparecem na hora em que o jogador responde):
- **Justine:** a cena virou 4 páginas (a02 ela sozinha escrevendo → a02a as duas lado a lado, de mãos dadas → a02b a promessa → a02c a porta) mais as imagens dos finais: o **beijo** (Prometo) e a **saída fria** (Não prometo ou o dever).
- **Mãe:** mãos dadas (qualquer resposta) e o corredor (a promessa de comer ou rezar).
- **Markus:** levar a espada (ele entrega a lâmina) × deixar (ele a segura como numa vigília).
- **Joseph na estrada:** brinde × recusa × bebe sozinho. **Joseph no posto:** fica × vai.
- **Varr:** a canção e a vingança × a mão que se solta; e ele indo dormir com a Terceira (e03b).
- **O fim:** a página final (f12) virou duas: a volta (f12, com vídeo) e o portão com a tigela (f13), com uma imagem se o Joseph voltou e outra se ele ficou.
Total: **18 imagens novas** (todas no `MIDIAS_CAP8.md`, com personagem entre parênteses e o `@` do Flow). Até chegarem, o jogo mostra uma tela escura com o nome do arquivo. Rotas A, B e C jogadas de novo sem erro.

### As imagens chegaram (13/11/2026, noite)
64 imagens instaladas, em 1920 px. O que mudou por causa delas:
- **b03** usa a Laura diante das dunas (`b03-laura`). **f07b** usa a luta no eclipse (`f-eclipse-luta`, com vídeo opcional novo). `og-cover` virou a capa.
- **Texto ajustado à imagem:**
  - O quarto da Nymae tem **um catre**, não uma esteira (texto da página e do minijogo).
  - No túmulo do Simon, o estandarte está **no alto do cabo, com a ponta rasgada pelo vento**, não enrolado.
  - No fim, na rota em que o Joseph ficou no posto, é **ele** quem põe a tigela na mão dela ("Ele vem até mim e põe uma tigela na minha mão, sem dizer nada").
- **Minijogo "O quarto dela":** os pontos foram reposicionados em cima do catre, da bacia, da janela e da laje iluminada. O palco agora tem a proporção da imagem: no computador cobre a tela, no celular em pé aparece inteiro, e os pontos não saem do lugar.
- **Enquadramento:** o ponto de foco de cada imagem foi acertado para o personagem não ser cortado no celular.
- **Faltam:** `duelo-fundo` (a atual é do Cap. VI), `codex-picos-de-cinza` (hoje é cópia), os sprites, os vídeos, os sons e as falas. Opcionais: refazer `f-eclipse` (inimigos em fila no meio de Redom) e a maça do Kronk (de ferro em vez de pedra).


## Revisão externa · 14/11/2026
- **Ansel:** ele não morre no Cap. VII. Só morre se a Laura mandar executá-lo na segunda noite da caça (é o engano da noite 2), e `anselVivo` lê `st.mortos`, que a caça preenche antes das Goelas. O código estava certo; a nota antiga dizia "Cap. VII" por engano e foi corrigida.
- **Dias:** "eu levei noventa e dois para chegar aqui" parecia tempo de viagem. Agora: "Eu levei oitenta e um para sair de lá, e onze para chegar aqui."
- **Sobreviventes:** a fórmula da v1 (38–97) estava riscada só pela seção v3; agora está marcada como substituída no próprio lugar. Canônica: 26–60. Rota A até 60, rota B até 46.
- **Pistas:** mantidas. A pergunta do jogo não é "Madrinha ou Nymae", é "qual destes humanos tem corpo de Nymae". As pistas fortes (testa, boca, pescoço, pulso) são justamente as que nos humanos mostram gente (suor, lábio rachado, queimadura, pulso rápido). A aguadeira Nymae da noite 3 é a armadilha: mostra o que é ser Nymae, mas é inocente, e nunca conta para `sabeOnde`.
- **Cisterna:** a laje agora mostra uma boca de pedra na parede do fundo, por onde a água escorre com cheiro de esgoto.
- **Polimentos:** "Ele vai me mostrar o lugar."; "Li aos catorze anos. Na página seguinte vinha o dragão do norte."
