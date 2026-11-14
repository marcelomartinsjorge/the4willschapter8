# Cap. VIII · A Lâmina · O que falta criar (só som)

*Atualizado em 14/11/2026.* Imagens, retratos, sprites dos duelos e vídeos estão **fechados**: o que não chegou não vai ser feito, e o livro já roda sem eles. Este arquivo agora tem só o que ainda vale gerar no **ElevenLabs**:

1. **Efeitos sonoros** (§2): 19 novos e 4 upgrades opcionais.
2. **Ambientes** (§3): 7 loops de zona (5 para refazer, 2 novos).
3. **Dublagem da Laura** (§4): as falas com as tags do Eleven v4.

Para trocar uma peça: gere, salve com o **nome exato** na pasta indicada, por cima do provisório. Não precisa mexer em código (só os dois ambientes novos, que eu ligo).

**Os vídeos já trazem o próprio som** (`f-maior`, `f-kronk`, `f-rosto`), por isso saíram desta lista os efeitos `maior-chega`, `maior-riso` e `rosto-escorrega`.

---

## 0. Como os prompts foram montados

### 0.1 Como o prompt de som foi montado (ElevenLabs Sound Effects v3)
Diga **a ação, o lugar, a atmosfera e o "desempenho"** (peso, distância, textura), e descreva os eventos **em ordem**. A escolha das palavras importa. **Contagens exatas** ("bata 4 vezes") nem sempre são seguidas. Termos que o modelo conhece: *impact, whoosh, braam, drone, ambience, riser, sub-bass, debris, tail, loop*. Cada item traz **duração** (0,1 a 30 s), **loop** (sim/não) e **prompt influence** (alta = segue o texto à risca; baixa = mais criativo). Fixe o modelo em **SFX v3** (o v2 sai do ar em março de 2027). Gere 4 variações e escolha a melhor. Exporte `.mp3`, normalize em -14 LUFS para os loops e -10 LUFS para os impactos.

### 0.2 Como a dublagem foi montada (Eleven v4)
Só a **Laura** é dublada. No Eleven v4 as **tags entre colchetes são texto livre** e vão **antes ou logo depois** do trecho que colorem; use **uma emoção por frase** (emoções opostas na mesma frase perdem precisão). Famílias que funcionam: **emoção** (`[sad]`, `[furious]`, `[tired]`), **entrega** (`[whispers]`, `[shouts]`, `[rushed]`, `[slowly]`), **reações** (`[sighs]`, `[gasps]`), **pausas** (`[pause]`, `[long pause]`). Não existe SSML nem controle de velocidade: o ritmo vem de **reticências** (batida curta), **tags de pausa** e **MAIÚSCULAS** para ênfase; um hífen corta a fala. Se uma tag virar som em vez de interpretação, descreva a voz em palavras (*a low, gravelly voice*). Tags são orientação, não garantia: gere 2 ou 3 takes e fique com o melhor. Os controles são **Stability** (menor = mais alcance emocional, bom para os gritos e o choro; maior = mais fiel ao texto, bom para L01 e L02) e **Resemblance**. Rascunhe no **v4 Turbo** (mais rápido e barato) e renderize o final no **v4**. Um arquivo por fala, `assets/audio/voz/<código>.mp3`.
**Português:** o v4 aceita mais de 90 idiomas com sotaque nativo, e o guia recomenda **escrever o roteiro direto no idioma de destino**. Se quiser a voz em pt-BR, cole a coluna "Fala (PT)" **com as mesmas tags em inglês** e salve como `<código>-pt.mp3` (ex.: `L08a-pt.mp3`). Teste uma fala antes de fazer todas.

---

## 2. Efeitos sonoros (`assets/audio/sfx/`, ElevenLabs · Sound Effects)

### 2.1 Novos ⭐ (19, ainda não existem: o livro toca o efeito por código no lugar)
| Arquivo | Onde | Duração · Loop · Influência | Prompt |
|---|---|---|---|
| `vento-ferro.mp3` | d05b (túmulo do pai) | 6 s · não · 0.6 | `Lonely desert wind blowing across an old rusted iron spear tip planted in stones, a thin metallic whistle and soft hum, sand hissing over rocks, distant and desolate, cinematic.` |
| `pedra-poco.mp3` | e01 (o Último Gole) | 4 s · não · 0.6 | `A small stone dropped into a very deep rock well at night: a long fall, then a distant hollow plop with a long reverberant tail echoing up the stone shaft, eerie silence after.` |
| `agua-sobe.mp3` | f01a | 6 s · não · 0.5 | `Water being pulled up out of a deep stone well against gravity: a rising gurgle that grows into a deep rushing roar, stone grinding underneath, a sub-bass riser building to a peak, cinematic magic.` |
| `gritos-longe.mp3` | f02a/f02b | 5 s · não · 0.5 | `Distant screams of many men swept away by a flood, fading as they are dragged down into rushing water and stone, muffled and echoing, then silence. Cinematic, not close.` |
| `carga-cavalaria.mp3` | f01b | 8 s · não · 0.6 | `Massive cavalry charge down a sand dune: hundreds of hooves thundering and growing louder, armor and tack rattling, horses snorting, men shouting a war cry in the distance, a deep ground rumble. Epic, cinematic.` |
| `bronze-impacto.mp3` | f03b | 2 s · não · 0.7 | `A huge bronze automaton’s fist slamming into a wooden and steel shield wall: a deep metallic clang with a heavy bell-like ring, wood splintering, a sub-bass thump, cinematic impact with a short tail.` |
| `martelo-pedra.mp3` | f03b, f10 | 2 s · não · 0.7 | `A heavy iron war hammer smashing a stone joint: a sharp crack, stone shattering into gravel and dust, a metallic ring from bronze, debris falling, cinematic impact.` |
| `chicote-agua.mp3` | f03b, f05 | 2 s · não · 0.6 | `A giant whip made of water lashing through the air and striking armored men: a fast liquid whoosh, a violent crack like a wave hitting rock, heavy splash and spray, metal clatter. Magical, cinematic.` |
| `grakh-grito.mp3` | f04 | 4 s · não · 0.5 | `A war band of huge tribal desert warriors roaring together as they charge uphill: deep guttural bestial shouts, not human, beating chests, sand being kicked, cinematic and savage.` |
| `varr-grito.mp3` | f05 | 3 s · não · 0.6 | `A big man’s raw triumphant battle roar after a kill, deep and hoarse, cracking at the end, outdoors with a little echo off stone, cinematic.` |
| `passos-pesados.mp3` | f06 | 6 s · não · 0.6 | `Very heavy slow footsteps of a giant walking on packed sand toward the listener, each step a deep thud with sand crunch, a faint rattle of bone beads, growing closer, ominous.` |
| `espada-desembainha.mp3` | f06 | 2 s · não · 0.8 | `A longsword being slowly drawn from a leather and wood scabbard: a long clean metallic ring, crisp and close, a soft shimmer at the end, cinematic.` |
| `corpo-cai.mp3` | f06 | 3 s · não · 0.6 | `A huge heavy body collapsing onto sand: first the knees hitting the ground, then the whole weight falling to the side with a deep thud, a stone mace rolling away, a long final exhale.` |
| `gritos-redom.mp3` | f07 | 4 s · não · 0.5 | `An army of soldiers shouting in panic and awe as the sun goes dark, many voices overlapping in alarm, armor shifting, a few distant cries, outdoors, cinematic.` |
| `luz-apaga.mp3` | f09 | 5 s · não · 0.4 | `An eerie inner light dying out inside a huge body: a soft crystalline hum fading down in pitch, crackling like embers, a final breath of wind, then silence. Ethereal, otherworldly.` |
| `bronze-arrasta.mp3` | f10 | 6 s · não · 0.6 | `A broken bronze machine dragging itself across sand with one arm: metal scraping, a cracked stone joint grinding, a broken rhythmic clank in three beats, then a final hammer blow and silence.` |
| `vento-campo.mp3` | f10 | 12 s · **sim** · 0.4 | `Wind blowing across a silent battlefield after the fight: loose cloth and a torn banner flapping, distant metal ticking as it cools, sand hissing over shields, no voices, desolate, seamless loop.` |
| `passos-guarda.mp3` | caça (noite) | 3 s · não · 0.6 | `A night guard’s boots walking on sand past a tent, a soft clink of mail, getting closer then stopping.` |
| `pedra-arrasta.mp3` | jogo "O quarto dela" | 3 s · não · 0.7 | `A heavy stone floor slab being lifted and dragged aside in a small cell, stone grinding on stone, mortar crumbling, a hollow draft of air from below.` |

### 2.2 Upgrades "hollywoodianos" ◻ (as provisórias funcionam; estas elevam o pico)
| Arquivo | Duração · Loop · Influência | Prompt |
|---|---|---|
| `onda-gigante.mp3` | 8 s · não · 0.5 | `A colossal tidal wave rising out of the desert and crashing down on an army: a deep sub-bass rumble building, a roaring wall of water, the crash with an explosion of spray and stone, men and horses swallowed, a long draining tail into rock. Epic, blockbuster cinematic.` |
| `eclipse-total.mp3` | 8 s · não · 0.4 | `A total solar eclipse arriving over a battlefield: all the wind and noise drain away into silence, a slow ominous low drone rises, a faint metallic shimmer, a deep cinematic braam at the end.` |
| `sol-volta.mp3` | 6 s · não · 0.4 | `Sunlight returning after an eclipse: a warm shimmering swell like a choir without voices, wind returning, a soft rising tone, relief.` |
| `coracao-rapido.mp3` | 8 s · **sim** · 0.6 | `A human heart pounding very fast in the ears, heavy and close, muffled as if heard from inside the body, steady rhythm, seamless loop.` |

---

## 3. Ambientes (loops de zona, `assets/audio/`, ElevenLabs · Sound Effects)

Cada zona do capítulo toca um fundo em loop enquanto o leitor está nela. As 20 zonas já têm som, mas vários vieram do Cap. V com **14 s**, curtos demais para zonas de muitas páginas (o ouvido percebe a repetição). Estes 7 são os que valem a pena fazer. As outras zonas (capital, quarto, capela, palácio, templo, estrada, tenda) já têm loops de 26 a 60 s e servem.

**Como gerar:** Sound Effects, **30 s** (o máximo), **Loop ligado**, influência do prompt **0.4** (deixa o modelo variar dentro da textura). Salve com o **nome exato** em `assets/audio/`, por cima do atual. Ambiente não tem evento marcante: nada de grito alto, explosão ou palavra no meio, porque isso vira o "soluço" que denuncia o loop.

| Arquivo | Zona · páginas | Hoje | Prompt |
|---|---|---|---|
| `goelas-loop.mp3` ⭐ | goelas · 10 páginas (a chegada, Ansel, a roda, o túmulo, Joseph) | 14 s, do Cap. V | `Ambience of a small military outpost in a stone desert valley in the late afternoon: a steady dry wind over rock, a big wooden well wheel creaking slowly now and then, a rope rubbing on wood, a canvas banner flapping, distant horses shifting and snorting, a soldier hammering a stake far off, sand hissing over stones. Calm, lonely, sun-baked. Seamless loop, no music, no voices.` |
| `deserto-noite-loop.mp3` ⭐ | deserto-noite · 9 páginas (as três noites da caça) | 14 s, do Cap. V | `Night ambience of an army camp in the open desert: cold wind sweeping softly over dunes, a few small campfires crackling far apart, tent canvas breathing in the wind, a horse stamping once in a while, the faint creak of a wagon, insects almost silent, a sense of something watching in the dark. Tense, quiet, very spacious. Seamless loop, no music, no voices.` |
| `batalha-loop.mp3` ⭐ | batalha e duelo · 8 páginas | 14 s, do Cap. V | `Ambience of a large battle heard from inside the fighting line in a desert valley: continuous clash of steel and shields, heavy bronze footsteps, horses screaming in the distance, war drums beating far off, dust and wind, a wall of overlapping indistinct shouts with no clear words, dull impacts on wood. Chaotic but steady, no single event louder than the rest. Seamless loop, no music.` |
| `eclipse-loop.mp3` ⭐ | eclipse · 3 páginas (o Maior) | 14 s, do Cap. V | `Ambience of a battlefield frozen under a total solar eclipse: the wind has died, a deep low drone hangs in the air, a faint metallic shimmer and ringing like cooling bronze, scattered armor creaking as men stand still, a horse breathing nervously, distant muffled murmurs without words, an oppressive unnatural silence. Ominous, heavy, cold. Seamless loop, no music.` |
| `acampamento-loop.mp3` ◻ | acampamento · 3 páginas (a coluna na estrada, a lavadeira) | 14 s, do Cap. V | `Daytime ambience of a marching army camp on a dusty road: many tents being set up, ropes pulled tight, a cooking pot clattering, horses drinking from buckets, a farrier tapping a horseshoe, carts creaking, low background chatter of soldiers with no clear words, warm wind. Busy but relaxed. Seamless loop, no music.` |
| `amanhecer-loop.mp3` ⭐ (novo) | amanhecer · 3 páginas (o Último Gole de manhã, a fila, o rosto) | hoje usa o das dunas | `Ambience at dawn beside a deep rock well in the desert: the first cool breeze before the heat, a long silence, water dripping far down inside the stone shaft with a hollow echo, a few birds waking in the distance, horses breathing, soldiers waiting in line without speaking, leather and mail shifting quietly. Still, tense, expectant. Seamless loop, no music, no voices.` |
| `depois-loop.mp3` ⭐ (novo) | depois · 2 páginas (o campo quando o sol volta) | hoje usa o das dunas | `Ambience of a desert valley right after a great battle, as the sun returns: warm wind across an empty field, a torn banner snapping slowly, broken metal ticking as it cools, sand sliding off shields, a wounded horse breathing far off, a crow calling once in a while, no voices. Exhausted, mournful, open. Seamless loop, no music.` |

Os dois últimos são arquivos novos: quando chegarem, eu ligo as zonas `amanhecer` e `depois` a eles (hoje as duas usam `dunas-loop.mp3`).

---

## 4. Dublagem da Laura (`assets/audio/voz/`, ElevenLabs · Eleven v4)

**Voz (Voice Design, se for criar do zero):**
```
A woman in her mid-thirties, a seasoned military commander and queen. Low, steady, slightly husky voice with controlled authority; tired but never weak. Measured pace, clear diction, a faint warmth she rarely lets show. Neutral accent. Close, intimate microphone.
```
**Regra de atuação:** ela conta as coisas como quem conta soldados. Quando a emoção vem, ela segura. As tags dizem quando a represa vaza.

| Arquivo | Página | Contexto (para quem atua) | Texto para o ElevenLabs (EN, com tags) | Fala (PT) |
|---|---|---|---|---|
| `L01` | a01 | Primeira linha. Oitenta e um dias de prato devolvido desde a notícia da morte do irmão. Nenhuma cor. | `[flat, tired] The plate goes back full.` | O prato volta cheio. |
| `L02` | a07 | No portão sul, ao nascer do sol, contando a coluna como faz há vinte anos. Ritmo de contagem, quase uma oração militar. | `[calm, measured] The south gate opens with the sun. [slowly] I count by company, as I have for twenty years... twenty companies of a hundred. [pause] Two thousand.` | O portão sul abre com o sol. Conto por companhia, como conto há vinte anos: vinte companhias de cem. Dois mil. |
| `L03` | d05 | Ajoelhada no túmulo do irmão. A primeira vez que diz o nome dele em voz alta desde a notícia. | `[whispers, voice breaking] ...Simon.` | — Simon. |
| `L04` | f07b | No eclipse, virada para o exército em pânico, espada no alto. São as últimas palavras do pai, que ela só conhece por quem voltou. | `[shouts, commanding] STEADY! [shouts] It’s only the dark! [shouts, fierce] HOLD THE LINE!` | — Firmes! É só o escuro! Segurem a linha! |
| `L05` | f08 | Diante do Maior, o coração dispara pela primeira vez em vinte anos. Pensamento, não fala. | `[whispers, short of breath] The sword is heavy. [pause] [shaky] At sixteen... it was this heavy.` | A espada pesa. Aos dezesseis, pesava assim. |
| `L06` | f12 | Última linha. Alguém põe uma tigela cheia na mão dela. Exausta, em paz e em luto. | `[exhausted, soft] I hold the bowl. [pause] [sad, quiet] In the Capital, my mother will count twenty-one.` | Seguro a tigela. Na Capital, minha mãe vai contar vinte e uma. |
| `L07a` | a03 (opção) | A mãe ameaça amaldiçoar o Torneio se ela não voltar. Laura a tranquiliza, segurando a mão dela. | `[gently, reassuring] Don’t worry, Mother. I’m taking our best soldiers. [softly] I’ll come back.` | — Não se preocupe, mãe. Estou levando os nossos melhores soldados. Eu volto. |
| `L07b` | a03 (opção) | Mesmo momento. Raiva contida pelo irmão morto. | `[restrained anger] I’m doing this for Simon, Mother. [cold] There are few Grakh left. It will be more slaughter than battle.` | — Estou fazendo isso pelo Simon, mãe. Sobraram poucos Grakh. Vai ser mais massacre que batalha. |
| `L07c` | a03 (opção) | Mesmo momento. Quase um sorriso: defende o dia em que virou a Lâmina. | `[a faint smile in her voice] The Tournament was the best day of my life, Mother. [firm] Nothing will change that.` | — O Torneio foi o melhor dia da minha vida, mãe. Nada vai mudar isso. |
| `L08a` 🔀 | a02 (Justine) | Justine pergunta se ela ama mais a ela ou ao título. Resposta de amor, sem hesitar. | `[tender, sincere] You, Justine. [softly] I’ve loved you forever... and you know it.` | — Você, Justine. Te amo desde sempre, e você sabe. |
| `L08b` 🔀 | a02 | Mesmo momento. Ela tenta separar as coisas; sai racional demais. | `[calm, a little defensive] One thing has nothing to do with the other.` | — Uma coisa não tem nada a ver com a outra. |
| `L08c` 🔀 | a02 | Mesmo momento. O dever acima de tudo; dura, sem desculpa. | `[firm, cold] My duty to Redom comes first. [pause] Always.` | — O meu dever com Redom vem em primeiro lugar. Sempre. |
| `L09a` 🔀 | a02b | Justine pede que ela prometa sossegar depois desta campanha. Ela promete. | `[softly, a breath before] ...I promise.` | — Prometo. |
| `L09b` 🔀 | a02b | Mesmo momento. Ela não consegue prometer. | `[quiet, regretful] I won’t promise.` | — Não prometo. |
| `L10a` | a03b | A mãe pede que ela coma alguma coisa e diz "te amo". | `[softly, warm] I promise I’ll eat. [tender] I love you too.` | — Prometo que vou comer. Também te amo. |
| `L10b` | a03b | Mesmo momento. Ela promete rezar em vez de comer. | `[softly] I promise I’ll pray for you. [tender] I love you too.` | — Prometo que vou rezar por você. Também te amo. |
| `L11a` | b01 (Joseph) | Joseph, que jurou não beber, propõe um brinde. Ela adia para a volta, com afeto. | `[warm, a half-smile] When we’re back from the desert... I’ll drink with you.` | — Na volta do deserto, eu bebo com você. |
| `L11b` | b01 | Mesmo momento. Bronca de comandante. | `[stern] No drinking until the mission is done, Joseph.` | — Nada de beber até cumprirmos a missão, Joseph. |
| `L11c` | b01b | Ele ri; ela endurece. | `[cold, final] I mean it, Joseph. [pause] That’s an order.` | — Estou falando sério, Joseph. É uma ordem. |
| `L12a` | e03 (Varr) | Véspera da batalha. Varr diz que queria uma canção. | `[low, determined] You’ll have your song... [cold] and I’ll have my revenge.` | — Você vai ter a sua canção, e eu vou ter a minha vingança. |
| `L12b` | e03 | Mesmo momento. A conta de quem manda dois mil homens. | `[quiet, heavy] There’s no song for two thousand men, Varr.` | — Não existe canção para dois mil homens, Varr. |
| `L12c` | e03 | Mesmo momento. Ela corta a conversa. | `[curt, commanding] Keep your mind on the battle.` | — Concentre-se na batalha. |
| `L13` 🔀 | a02 | Justine pergunta se ela veio fazer as pazes com a fé. | `[softly, simply] I came to see you.` | — Vim te ver. |
| `L14` 🔀 | f02a | A água se levanta do poço. Ela dá a ordem gritando, com urgência total. | `[shouts, urgent] SHIELDS! [shouts, furious] And kill her! [shouts] Before anything else, KILL HER!` | — Escudos! E matem ela! Antes de qualquer outra coisa, matem ela! |
| `L15` | f03 | Depois da onda, atordoada, vê a lança entrar no bronze e o bronze continuar andando. Pensamento em voz alta, incrédula. | `[gasps] [panicked, disbelieving] What the hell is happening?!` | Que merda está acontecendo?! |
| `L16` | f03b | Na linha, contra o bronze. Ela descobre onde bater e grita para todos. | `[shouts, commanding] The joints! [shouts] HAMMERS ON THE JOINTS!` | — Nas juntas! Martelos nas juntas! |
| `L17a` | f01b / f04 | Ela vê o Grakh grande. Pensamento, entre dentes. | `[low, through clenched teeth] This is for you, Simon.` | É por você, Simon. |
| `L17b` 🔀 | f01b / f04 (se visitou o pai) | Mesmo momento, com o pai junto. | `[low, through clenched teeth] This is for you, Simon. [pause] [softer] And for you, Father.` | É por você, Simon. E por você, pai. |
| `L18` | f09 | O Maior vem. Ela chama os arqueiros para perto dela. | `[shouts, fierce] ARCHERS! [shouts] On me!` | — Arqueiros! Comigo! |
| `L19` | f06 (depois) | O Kronk caiu. Ela sangra por dentro da armadura e admite para si. Pensamento, ofegante. | `[breathing hard, quiet] I hate lying... [pause] to myself most of all. [exhales] I was nearly beaten. [pause] [a hard, quiet relief] But I won.` | Odeio mentir, mais ainda para mim mesma: quase fui derrotada. Mas venci. |
| `L20` | f07 | Em pé sobre o Kronk caído, antes do golpe final. Respeito e ódio na mesma frase. Pensamento. | `[low, cold respect] He was an excellent opponent. [pause] [hard, quiet] But now the Grakh end. No one else of my family... no one else of Redom... dies at the hands of these savages, in the sand of this desert.` | Foi um excelente adversário. Mas agora os Grakh acabam. Mais ninguém da minha família, mais ninguém de Redom, morre na mão desses selvagens, na areia deste deserto. |

*Dica para as falas gritadas (L04, L14, L16, L18): baixe a Stability, gere 3 ou 4 takes e escolha a que não estoura. Se `[shouts]` não pegar, escreva a fala em MAIÚSCULAS com exclamação, ou descreva a voz (*a hoarse, commanding voice*).*

---

### Fontes da pesquisa (atualizadas em 13/11/2026)
- [ElevenLabs · Emotional text to speech with Eleven v4](https://elevenlabs.io/blog/emotional-text-to-speech-with-eleven-v4)
- [Morphic · Eleven v4 prompt guide](https://morphic.com/resources/how-to/eleven-v4-guide)
- [ElevenLabs · Sound effects (SFX v3)](https://elevenlabs.io/docs/overview/capabilities/sound-effects)
