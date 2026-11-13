# Capítulo VIII · Laura, a Lâmina · notas de entrega (v1)

*12/11/2026 · primeira versão completa: texto (PT e EN), seis momentos de jogo, codex, tela final. Imagens, sprites da Laura aos 36, o Maior e as vozes ainda são provisórios (ver MIDIAS_CAP8.md).*

---

## 1. O que o capítulo é

Laura, 36 anos, General-Rainha (o povo diz Lâmina), leva dois mil dos melhores de Redom à Boca Seca, uns três meses depois da morte do Simon nas Goelas. Seis partes, 54 páginas (as rotas escondem algumas), cerca de 25 a 35 minutos de leitura e jogo.

| Parte | Cartão | O que acontece | Jogo |
|---|---|---|---|
| I · O Prato Cheio | “Redom enterra os seus onde caem.” | O prato que volta cheio, Justine (rota), Dolores e a 21ª saída, Aubert (a hóspede sumiu), Markus fica, o templo, a laje com cal nova, o portão sul | — |
| II · A Estrada | “Exército conta lança. Deserto conta água.” | Laura come da panela dos soldados; Joseph quer a última campanha; a Nymae (rota do Cap. VII); água para onze dias | — |
| III · A Areia | “No deserto, quem carrega a água carrega o exército.” | Três noites de sabotagem, três suspeitos, a Lei da Lâmina; Laura começa a desconfiar da Madrinha | **Ler o corpo** (3×) |
| IV · As Goelas | “O posto das Goelas não tem muralha.” | Ansel mostra onde o Simon caiu, a roda, o túmulo (dois dedos no peito), Joseph pede para ficar, o Último Gole | **Girar a roda** |
| V · O Último Gole | “Quem chega chama de primeiro gole…” | 34 fogos; o chão bate em três; Varr e o Merrow; a tigela; a fila do amanhecer | **Ouvir o chão** |
| VI · O Dia Comido | “Dia ser comido, Maior nascer.” | A onda, o bronze, Varr mata a hóspede, o duelo, o eclipse, o Maior, os vivos | **O duelo**, **Erguer a espada**, **Ficar de pé**, **Contar os vivos** |

## 2. Decisões que vieram de você (todas aplicadas)

- Laura só sabe que a hóspede fugiu; a desconfiança nasce na marcha. Por isso o Markus fica, com a Capital e com a costa (a04).
- A sabotagem é real e lenta: cochos secos, barril salgado, odres dos feridos **secos por dentro e sem furo**, tinas da forja. A pista de que “não é gente” é essa.
- A desconfiança da Madrinha começa na Parte III (noite 2: “Penso nisso pela primeira vez aqui, com areia nos dentes”; noite 3: o livro de lendas, “nunca tem o mesmo rosto duas vezes”).
- Nas Goelas: o Ansel em pessoa (ou um soldado do posto, se a Laura o matou no Cap. VII) e o túmulo no alto do muro velho dos Grakh, de onde se vê a roda. O gesto dos dois dedos é no túmulo, não contra o Kronk.
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
`38 + 31 (rota A) + {12, 6, 0} (moral) + 8 (vigia dobrada) + 8 (água guardada na noite certa)`. Vai de 38 a 97. O número aparece por extenso na contagem final e define as rajadas do Maior (3, 4 ou 5).

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
  - **A:** Laura executa a pessoa certa na noite 3 → fuga → onda na crista → 97 voltam.
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

O relatório final está em `checagem_cap8.md`. O que foi cortado ou reescrito nesta passada (resumo): “o Grakh grande” de 12 para 4 linhas; “a Boca Seca” no texto de 9 para 3 (e os verbetes de Queimados e Tacets saíram do codex, porque nenhuma palavra do capítulo leva a eles); “os dois mil”, “cela da Ala Funda”, “diante da coluna”, “porta da cerca”, “desde a notícia”, “homens/soldado da Terceira”, “moça da cozinha”, “tenda dos feridos”, “o pulso desce” abaixo do limite; as três falas do Varr com a mesma abertura viraram uma linha fixa + a variante; “Aos dezesseis você” não aparece mais duas vezes na mesma tela; “as orelhas não mudam” virou cinco jeitos diferentes; a epígrafe da Parte VI deixou de antecipar a fala da hóspede (“…e a Boca Seca bebe todos” só aparece na boca dela).

### 6.2 Decisões para você (D)
- **D1 · “da Boca Seca”.** Nome próprio do lugar. No texto do capítulo sobraram 3 linhas (o cartão da Parte III virou “A Areia”), abaixo do limite. O grupo que ainda trava está **só nos verbetes de codex herdados dos Caps. V a VII** (Goelas, Boca Seca, Grakh), sem mudança. Proposta: declarar no bloco `motivos cap08` → `Boca Seca | nome do lugar; a fala da hóspede (f01a) e o eco “A Boca Seca bebeu a dela também” (f05)`.
- **D2 · “o Grakh grande”.** É o nome que a Laura dá ao Kronk (ela não sabe o nome dele). Ficaram 4 linhas: a opção do templo, o reconhecimento na carga (rota B) ou na subida da duna (rota A), que nunca aparecem juntos, e o fecho “Derrubei o Grakh grande. Ou derrubei um grande, e o grande era o outro.”, que precisa da repetição. Proposta: declarar como motivo.

### 6.3 Blocos propostos para o Anexo A (só regras de escrita)
```motivos cap08
Boca Seca | D1 · nome do lugar; a fala da hóspede e o eco dela
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

**Travas do capítulo:** “Lâmina” só na boca da tropa e no texto da Laura sobre si; “General-Rainha” na boca de quem é formal (Aubert, o padre, o Markus fora da rota de consorte). A Laura nunca diz “Kronk”, “Tacets” nem “Madrinha” como nome de quem está na frente dela: são “o Grakh grande”, “homens de bronze”, “a hóspede”. A Madrinha aparece só no livro de lendas lido aos catorze anos.

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
