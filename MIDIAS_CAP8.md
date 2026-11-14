# Cap. VIII · A Lâmina · Tudo o que você precisa criar

O capítulo já roda inteiro com mídia provisória: tela escura com o nome do arquivo, silhueta no lugar do rosto, som feito por código, ou silêncio. **Para trocar uma peça:** gere, salve com o **nome exato** na pasta indicada, por cima da provisória. Não precisa mexer em código.

Este é o capítulo-auge. Tudo aqui foi pensado para parecer cinema: a imagem parada é o primeiro quadro, o vídeo dá vida a ela, o som e os efeitos de tela (tremor, clarão, água, sangue na borda, eclipse) já estão programados no código e disparam sozinhos.

---

## ✅ Situação em 13/11/2026 (o que já está no livro e o que falta)

**Imagens das páginas: prontas e já instaladas (64).** Todas as imagens da §2 que você gerou estão no pacote, em 1920 px. O texto foi ajustado onde a imagem pedia (ver as notas). Duas extras entraram:
- `b03-laura.jpg` (a sua Laura parada diante das dunas): virou a imagem da página **b03**, "No sexto dia a terra vira areia". A `b03-borda` continua no cartão da Parte II.
- `f-eclipse-luta.jpg` (a luta continuando no escuro): virou a imagem da página **f07b**, "Firmes! É só o escuro! Segurem a linha!". A `f-eclipse` ficou só no **f07**, o instante em que todo mundo olha para cima.
- `og-cover.jpg` (a imagem que aparece quando alguém compartilha o link) agora é a sua capa.

**Imagens que ainda faltam** (todas com prompt neste arquivo):
| Arquivo | Onde | Por quê |
|---|---|---|
| `duelo-fundo.jpg` ⭐ | fundo do duelo contra o Kronk | a atual é a do Cap. VI (o pé gigante e o jarro). Prompt na §2, "Fundos dos minijogos". |
| `codex-picos-de-cinza.jpg` ◻ | verbete novo do codex | hoje é uma cópia da imagem das Goelas. Prompt na §2, "Codex". |
| Sprites da Laura aos 36 ⭐ | duelo e Maior | §4.1. Hoje são poses provisórias. |
| Sprites do Maior ⭐ | luta contra o Maior | §4.3. Hoje é o Kronk pintado de cinza. |
O resto do codex, os retratos de `rostos/` e o `maior-fundo` vêm dos capítulos anteriores e servem.

**Refazer só se você quiser (◻, nada quebra):**
- `f-eclipse.jpg`: os Grakh e os homens de bronze aparecem de pé, em fila, no meio dos soldados de Redom, todos de costas e calmos, como se fossem um exército só. Como agora é só o instante em que todos olham o céu, passa. Se refizer, peça só soldados de Redom, ou os três grupos separados olhando para cima.
- `f-pira.jpg` e `f-kronk.jpg`: a maça do Kronk saiu de ferro com espetos. No Cap. VI (e nos sprites do duelo) ela é de **pedra escura enrolada em couro**. Quem jogou o VI pode notar.
- `a05-markus`, `a05-levar`, `a05-deixar`: o peito do Markus tem a balança com espada. Na ficha do Cap. VII ele usa a **estrela de oito pontas dourada** da Cavalaria. Está coerente entre as três imagens, então só mude se quiser alinhar com o VII.

**Ainda por fazer:** os 8 vídeos (§5, só as cenas de impacto), os sons novos (§6) e as 31 falas da Laura (§7).

---

## 0. Como usar este arquivo

### 0.1 Que ferramenta para quê
| O quê | Ferramenta | Por quê |
|---|---|---|
| Imagem **sem** personagem importante (lugar, objeto, figurante) | **GPT (ChatGPT Images)** | segue texto longo muito bem, ótimo em cenário |
| Imagem **com** Laura, Justine, Markus, Joseph, Varr, Dolores, a Madrinha, o Kronk ou o Maior | **Flow · Nano Banana** (o mais novo que o seu Flow oferecer) com **Personagens** (`@nome`) | segura o rosto e o corpo pela ficha cadastrada |
| Vídeo de fundo | **Flow · Omni Flash** (modo Frames; Ingredientes/Personagens quando precisar) | o primeiro quadro é a imagem da página: o vídeo nasce colado nela |
| Efeitos sonoros e loops | **ElevenLabs · Sound Effects v3** | duração, loop e "prompt influence" controláveis |
| Dublagem da Laura | **ElevenLabs · Eleven v4** com tags de áudio | emoção por tag, como no seu exemplo |

### 0.2 As regras deste capítulo
- **No máximo 3 personagens nítidos por imagem ou vídeo.** Exército, fila, multidão: sempre ao longe, pequenos, sem rosto, em poeira ou contraluz. Todo prompt abaixo já respeita isso.
- **Sem violência explícita.** Nada de sangue jorrando, corte aberto, corpo partido ou cabeça aberta na tela. A violência fica no texto e no som; a imagem mostra o antes, o depois e o rosto de quem vê. Onde a cena é pesada (Joseph, a morte da Madrinha), a imagem mostra outra coisa de propósito.
- **Quem está na imagem** vem marcado na linha **Personagens:** e, dentro do prompt, cada um aparece com o nome e a descrição completa entre parênteses. Não corte a descrição: é ela que segura o rosto, junto com o ingrediente.
- **O lado do texto:** o painel de texto fica à **esquerda**. O assunto vai no **centro-direita**, salvo nota.
- **Regra do capítulo:** se uma escolha muda o que acontece na cena, ela tem a **sua própria imagem**. Não se reaproveita a mesma imagem para ramos diferentes.
- ⭐ = o capítulo perde muito sem isto · ◻ = melhora, mas a provisória segura · 🔀 = só aparece em algumas rotas.

### 0.3 Como o prompt de imagem foi montado (o que a pesquisa recomenda)
**GPT:** cena e lugar → sujeito → detalhe e textura → linguagem de câmera (lente, ângulo, profundidade de campo) → luz → a palavra *photorealistic* → as proibições no fim (*no text, no watermark*). Frases completas funcionam melhor que lista de palavras-chave.

**Flow (Nano Banana + Personagens):** cadastre as fichas da §1 como **Personagens** no Flow, com o nome indicado (`Laura`, `LauraArmor`, `Varr`, `Maior`…). No prompt, digite `@` e escolha o personagem **no lugar do nome** (`@Laura` onde o texto diz *Laura D’Orrose*), e **mantenha a descrição entre parênteses**: ela ajuda a não trocar um pelo outro. O prompt descreve **o que acontece entre eles e onde**. Cena com dois personagens: dois `@`. Fundo liso nas fichas ajuda.

**Formato:** 16:9, 1920×1080, `.jpg`. Retratos `rostos/` em 3:4 (900×1200). Codex em 16:9.

**Negativo para todas as imagens** (cole no campo de negativo, ou no fim do prompt como "Avoid: …"):
```
text, subtitles, captions, watermark, logo, signature, cartoon, anime, painting, illustration, 3d render, plastic skin, extra fingers, deformed hands, fused fingers, modern objects, electric light, glasses, zippers, gore, open wounds, dismemberment, blood spray, duplicate person, crowd of detailed faces
```

### 0.4 Como o prompt de vídeo foi montado (Omni Flash no Flow)
Fórmula: **[câmera e movimento] + [sujeito] + [ação] + [lugar e luz] + [estilo]**, em frases completas. O Omni Flash gera **o som junto** com o vídeo, mas no livro o vídeo toca **mudo e em loop** (o som é do jogo), então os prompts não descrevem áudio. O guia do Google para o Omni Flash recomenda:
1. **Uma tomada só.** O modelo pode inventar vários planos por conta própria; por isso todo prompt termina com *Single continuous shot, no scene cuts.* O negativo é uma frase simples no próprio prompt (*no dialogue, no music, no subtitles, no on-screen text*); não existe campo de negativo.
2. **Modo Frames:** no Flow, **Vídeo → Frames**, ponha a **imagem `.jpg` da página** em *Add start frame* e descreva a ação. Como a imagem já nasceu com o personagem (Nano Banana + `@Personagem`), o rosto vem preso no primeiro quadro. **Para loop limpo**, ponha **a mesma imagem também em *Add end frame***. (Frames não combina com Personagens: é um ou outro.)
3. **Modo Ingredientes (só se o personagem se mexer muito, virar de costas ou o rosto derivar no Frames):** **Vídeo → Ingredientes**, adicione a imagem da página e digite `@Personagem` no prompt, dizendo como ele aparece. Ingredientes e Personagens dividem o limite de referências (7 no Omni 1.1, 10 no 1.2).
4. **Duração:** o Omni 1.1 gera 4, 6, 8 ou 10 s; o Omni 1.2 gera de 3 a 15 s. Use **8 s** (10 s nos de câmera lenta). Para mais, use **Extend** (cerca de 10 s por vez, até 40 s).
5. 16:9, na resolução mais alta que o seu plano der (720p é o padrão).
6. Para marcar o tempo, o modelo entende *"after 3 seconds, …"* ou *[0-3s] …*.
7. Exporte `.mp4` (H.264) **e** `.webm` com o mesmo nome. O código usa o `.mp4` e cai para o `.webm` sozinho. Pasta: `assets/video/`.
8. **Movimento lento é o que vende.** Push-in, dolly lateral, paralaxe de poeira. Câmera nervosa só nas cenas de batalha marcadas.
*Os nomes dos modelos mudam depressa: se o seu menu mostrar uma versão mais nova do Omni Flash, use a mais nova.*

### 0.5 Como o prompt de som foi montado (ElevenLabs Sound Effects v3)
Diga **a ação, o lugar, a atmosfera e o "desempenho"** (peso, distância, textura), e descreva os eventos **em ordem**. A escolha das palavras importa. **Contagens exatas** ("bata 4 vezes") nem sempre são seguidas. Termos que o modelo conhece: *impact, whoosh, braam, drone, ambience, riser, sub-bass, debris, tail, loop*. Cada item traz **duração** (0,1 a 30 s), **loop** (sim/não) e **prompt influence** (alta = segue o texto à risca; baixa = mais criativo). Fixe o modelo em **SFX v3** (o v2 sai do ar em março de 2027). Gere 4 variações e escolha a melhor. Exporte `.mp3`, normalize em -14 LUFS para os loops e -10 LUFS para os impactos.

### 0.6 Como a dublagem foi montada (Eleven v4)
Só a **Laura** é dublada. No Eleven v4 as **tags entre colchetes são texto livre** e vão **antes ou logo depois** do trecho que colorem; use **uma emoção por frase** (emoções opostas na mesma frase perdem precisão). Famílias que funcionam: **emoção** (`[sad]`, `[furious]`, `[tired]`), **entrega** (`[whispers]`, `[shouts]`, `[rushed]`, `[slowly]`), **reações** (`[sighs]`, `[gasps]`), **pausas** (`[pause]`, `[long pause]`). Não existe SSML nem controle de velocidade: o ritmo vem de **reticências** (batida curta), **tags de pausa** e **MAIÚSCULAS** para ênfase; um hífen corta a fala. Se uma tag virar som em vez de interpretação, descreva a voz em palavras (*a low, gravelly voice*). Tags são orientação, não garantia: gere 2 ou 3 takes e fique com o melhor. Os controles são **Stability** (menor = mais alcance emocional, bom para os gritos e o choro; maior = mais fiel ao texto, bom para L01 e L02) e **Resemblance**. Rascunhe no **v4 Turbo** (mais rápido e barato) e renderize o final no **v4**. Um arquivo por fala, `assets/audio/voz/<código>.mp3`.
**Português:** o v4 aceita mais de 90 idiomas com sotaque nativo, e o guia recomenda **escrever o roteiro direto no idioma de destino**. Se quiser a voz em pt-BR, cole a coluna "Fala (PT)" **com as mesmas tags em inglês** e salve como `<código>-pt.mp3` (ex.: `L08a-pt.mp3`). Teste uma fala antes de fazer todas.

---

## 1. Fichas de personagem (Flow · Personagens)

Gere cada ficha de corpo inteiro, de frente, luz neutra, fundo cinza-escuro liso, e cadastre no Flow como **Personagem** (o nome entre crases abaixo é o que você digita depois com `@`). As que já existem do Cap. VII: **reaproveite** (Laura 36, Justine 36, Markus 48, Joseph 61, Varr 38, Madrinha). Do Cap. VI: **REF-K21** (Kronk).

### REF-LAURA36 ⭐ (já existe, Cap. VII)
Personagens: **(Laura)**
```
Full-body character reference, front view, neutral studio light, plain dark grey background, photorealistic, cinematic. Laura D’Orrose (36-year-old woman, the General-Queen of Redom; tall for a woman, about 1.72 m, lean and athletic with a fencer’s shoulders and forearms; long wavy golden-blonde hair the color of ripe wheat, tied back hastily at the nape with loose strands by the face; green eyes, steady and calculating; a strong, tired face with faint shadows under the eyes, no makeup; calloused hands; plain high-collared dark crimson wool doublet with no ornament, black trousers, worn riding boots, a black mourning band knotted around her left upper arm; a plain steel ring). She stands straight, arms at her sides, face unreadable.
```

### REF-LAURA36-ARMOR ⭐ (nova: da estrada até o fim)
Personagens: **(Laura, de armadura)** · use a REF-LAURA36 como referência de rosto ao gerar.
```
Full-body character reference, front view, neutral studio light, plain dark grey background, photorealistic, cinematic. Laura D’Orrose (36-year-old woman, the General-Queen of Redom; tall, lean and athletic with a fencer’s shoulders; long wavy golden-blonde hair the color of ripe wheat, braided tight down the back; green eyes; a strong, tired face; no helmet) in worn field armor of Redom: a steel breastplate scratched and dulled by sand over a dark crimson padded gambeson, steel pauldrons, vambraces and gauntlets, mail skirt at the hips, steel greaves over brown leather boots, a black mourning band tied around her left upper arm over the gambeson sleeve; a plain, well-used longsword with a worn leather grip in her right hand and a round steel-rimmed wooden shield painted dark crimson with a white sword on her left arm. Fine dust on the steel. She stands in guard, weight low, eyes forward.
```

### REF-JUSTINE36 🔀 (já existe, Cap. VII)
Personagens: **(Justine)** · Guardiã da Lei, poeta famosa de Redom.
```
Full-body character reference, front view, neutral light, plain dark grey background, photorealistic, cinematic. Justine Avellan (36-year-old woman, Keeper of the Law of Redom and the most famous poet of the realm; slim, about 1.65 m; dark brown hair pinned in a low, severe bun with a few grey threads; pale skin, sharp intelligent dark eyes, a thin mouth that almost smiles; a high-collared slate-blue dress under a dark charcoal over-robe, ink stains on her fingers, a goose quill held between her teeth).
```

### REF-DOLORES ⭐ (se já houver ficha dela dos Caps. II/IV, use-a como referência e só acrescente a idade)
Personagens: **(Dolores, a mãe)**
```
Full-body character reference, front view, neutral soft light, plain dark grey background, photorealistic, cinematic. Dolores D’Orrose (the queen mother of Redom, about 62, gravely ill; once tall and proud, now frail and gaunt; long thin silver hair loose over the shoulders; pale papery skin, sunken cheeks, the same green eyes as her daughter, now dulled; a plain white linen nightgown and a dark wool shawl; a thin gold wedding band loose on her finger). She stands with one hand on a bedpost, tired but upright.
```

### REF-MARKUS48 🔀 (já existe, Cap. VII)
Personagens: **(Markus)** · Marechal da Cavalaria, consorte da Laura na rota sem Justine.
```
Full-body character reference, front view, neutral light, plain dark grey background, photorealistic, cinematic. Markus (48-year-old man, Marshal of the Cavalry of Redom; broad-shouldered, about 1.85 m, still fit; short dark brown hair going grey at the temples, a short greying beard, strong square jaw, deep lines around the eyes; a quiet, controlled face; a red surcoat with a gold eight-pointed star over a padded arming doublet, sleeves rolled to the elbow, a sword belt).
```

### REF-JOSEPH61 ⭐ (já existe, Cap. VII)
Personagens: **(Joseph)** · velho general, mão direita que treme, anel de ouro.
```
Full-body character reference, front view, neutral light, plain dark grey background, photorealistic, cinematic. Sir Joseph (61-year-old man, retired general of Redom; once broad and powerful, now heavy; curly hair gone iron-grey, a full grey beard, ruddy cheeks, small shrewd eyes; his right hand trembles; a heavy gold signet ring on the right hand; a faded dark-blue surcoat embroidered with a white pair of scales over mail and a linen shirt; riding boots, a sword belt).
```

### REF-VARR38 ⭐ (já existe, Cap. VII)
Personagens: **(Varr)** · comandante da Terceira, a infantaria pesada.
```
Full-body character reference, front view, neutral light, plain dark grey background, photorealistic, cinematic. Lord Varr (38-year-old man, commander of Redom’s heavy infantry, the Third; big, thick-necked, heavy-shouldered, about 1.88 m; close-cropped dark blond hair, a broken nose, a loud open face, stubble; a dented steel breastplate over a red-brown padded gambeson with the infantry’s white stripe across the chest, sleeves pushed up over thick forearms; a heavy infantry longsword).
```

### REF-MADRINHA ⭐ (já existe, Cap. VII)
Personagens: **(a Madrinha)** · a conjuradora Nymae de olhos de ouro.
```
Full-body character reference, front view, neutral studio light, plain dark grey background, photorealistic, cinematic. The Godmother (a Nymae woman who looks about thirty, petite at about 1.50 m, slender, lithe like a swimmer; smooth blue-grey skin covered in very fine iridescent scales, densest along the collarbones, shoulders, the sides of the neck and the backs of the hands; ears shaped like delicate translucent fins swept back from the temples; long heavy dark navy-blue hair, always slightly wet; large eyes of molten gold with no pupils and no whites, faintly luminous; high sharp cheekbones, a knowing half-smile; fine webbing between the fingers; layered dark purple clothes, small silver and old-gold coins sewn along the hems; barefoot).
```
*No Cap. VIII ela aparece de roupa de servo cinza, grande demais, por cima disso tudo. Os prompts já dizem.*

### REF-K21 ⭐ (já existe, Cap. VI: o Kronk)
Personagens: **(Kronk)** · use a ficha de três vistas do Cap. VI. Para o Cap. VIII, acrescente no prompt de cada cena: *"a big animal tooth hanging on a cord at his throat, fresh white clay war stripes on his shoulders"*.

### REF-MAIOR ⭐ (nova: o Maior)
Personagens: **(o Maior)** · uma aberração entre os Grakh; não é deste mundo.
```
Full-body character reference, three-quarter view, neutral studio light, plain dark grey background, photorealistic, cinematic. The Biggest (a monstrous desert brute of the Grakh people, impossibly large, about 3.4 m tall, twice the mass of the largest Grakh warrior; ash-grey skin cracked like the floor of a dried-up well, the cracks faintly darker; muscles bulging in places where no human or Grakh has muscle: ridges along the ribs, knots behind the jaw, a second swell above the elbow; strongly asymmetric: the right arm and shoulder much thicker than the left, the right shoulder bone visibly pushing up under the skin as if still growing; HANDS LIKE CLAWS: long thick fingers ending in heavy, hooked, black-grey nails like a predator’s talons; two lower canine teeth far too big for the mouth, jutting up past the upper lip; small deep-set dark eyes; long matted black dreadlocks; a loincloth of cracked hide and rope; barefoot; no weapon). He stands with his head tilted back, laughing. Something about him looks wrong, like a creature that does not belong to this world.
```

### Os pequenos (só GPT, uma imagem cada ou retrato)
Ansel, Tasso, o intendente, Tobias, o padre, os batedores, a lavadeira Nymae, Wil, Bram, Ilse, Nell: vão pelo GPT, com a descrição completa no prompt. Os rostos de Wil (`estrebaria`), Bram (`forja`), Ilse e Nell **já existem** do Cap. VII.

---

## 2. Imagens das páginas (`assets/images/`)

### Capa

#### `capa.jpg` ⭐ · Flow
Personagens: **(Laura, de armadura)** · Personagens no Flow: @LauraArmor
**Contexto:** a capa e o cartão de abertura. O título fica à esquerda.
```
Photorealistic cinematic portrait at dawn on the edge of a great desert. Laura D’Orrose (36-year-old woman, General-Queen of Redom; long wavy golden-blonde hair braided down the back, loose strands whipped by the wind; green eyes; strong, tired face; worn steel field armor over a dark crimson gambeson, black mourning band on her left upper arm) stands alone, the point of her longsword resting on the sand, both gauntleted hands on the pommel, looking out over endless dunes. Framed from the knees up in the right third of the frame, shot on an 85mm lens at eye level, shallow depth of field. Low warm sun raking across the dunes, cold blue shadows, fine sand blowing past her in the light, film grain. Mood: grief turned into resolve.
```

### Parte I · O Prato Cheio

#### `a01-prato.jpg` ⭐ · GPT
Personagens: nenhum.
**Contexto:** a primeira imagem do capítulo. O prato que volta cheio há oitenta e um dias.
```
Photorealistic cinematic still life inside a royal bedchamber of white limestone at night. On a small dark wooden table, a silver tray holds untouched food: a round loaf of bread, a cold roasted chicken leg and three dark plums. Behind it, an empty high-backed wooden chair is turned toward a tall arched window whose curtains are open on a sleeping city of white roofs under a dark blue sky. A single beeswax candle burns beside the tray, its flame perfectly still. The tray sits center-right, shot at table height with a 50mm lens, shallow depth of field, the chair softly out of focus. Warm candlelight against cold moonlight, deep shadows, film grain. No people, no text, no watermark.
```

#### `a02-capela.jpg` 🔀 ⭐ (rota Justine) · Flow
Personagens: **(Justine)** · Personagens no Flow: @Justine
**Contexto:** a capela da Juíza, à noite. Justine escreve um poema no último banco.
```
Photorealistic cinematic shot inside a small stone chapel of the Judge at night. Two tall white candles burn side by side on a plain altar under a weathered stone statue of a blindfolded woman holding a pair of scales. Justine Avellan (36-year-old woman, Keeper of the Law and famous poet of Redom; slim, dark brown hair in a low severe bun with a few grey threads, pale skin, sharp dark eyes; slate-blue high-collared dress under a charcoal over-robe, ink-stained fingers) sits alone on the last wooden pew with a sheet of paper on her lap, a goose quill held between her teeth, frowning at the page. She is center-right, framed from the waist up, 50mm lens, shallow depth of field, the altar glowing behind her. Warm amber candlelight on her face, cold grey stone, floating dust in the light, film grain. No text, no watermark.
```

#### Cena da Justine (rota Justine) · 5 imagens, uma por momento 🔀
A conversa tem cinco momentos e cada um tem a sua imagem: ela sozinha escrevendo (`a02-capela`, acima), as duas lado a lado de mãos dadas, o beijo, a porta, e a saída fria. O jogo troca sozinho de uma para a outra. Todas em **Flow · Personagens `@Laura` e `@Justine`** (use a ficha de Laura sem armadura, com o gibão carmesim, porque ela ainda está na capital).

#### `a02-lado.jpg` ⭐ 🔀 · Flow
Personagens: **(Laura)** e **(Justine)** · Personagens no Flow: @Laura, @Justine
**Contexto:** as duas sentadas lado a lado no último banco. Justine passa o polegar nos calos da mão da Laura, "como faz quando vai me dizer uma coisa difícil". É a pergunta "você ama mais a mim ou ao seu título?". **Só as duas, juntas no centro-direita.**
```
Photorealistic cinematic shot inside a small stone chapel at night, two white candles burning on the altar behind. Laura D’Orrose (36-year-old woman, General-Queen of Redom; long wavy golden-blonde hair tied back at the nape, green eyes, strong tired face; plain high-collared dark crimson wool doublet, black mourning band on her left arm) sits shoulder to shoulder with Justine Avellan (36-year-old woman, Keeper of the Law and famous poet; slim, dark brown hair in a low severe bun with a few grey threads, pale skin, sharp dark eyes; slate-blue high-collared dress under a charcoal over-robe, ink-stained fingers) on the last wooden pew. Justine holds Laura’s calloused hand in both of hers, her thumb slowly tracing the calluses one by one, her eyes on the hand, a folded poem forgotten on her lap; Laura looks at Justine’s face, her jaw tight, her fingers about to squeeze. They are center-right, framed from the waist up, 50mm lens, shallow depth of field, the altar softly glowing behind them. Warm amber candlelight on both faces, cold grey stone, floating dust in the light, film grain. Intimate, heavy with what is not said. Two people only, no text, no watermark.
```

#### `a02-beijo.jpg` ⭐ 🔀 · Flow
Personagens: **(Laura)** e **(Justine)** · Personagens no Flow: @Laura, @Justine
**Contexto:** ela promete sossegar. Justine fecha as mãos em volta das da Laura e a beija, longo. "Eu te amo, Laura." / "Sempre te amei, minha Justine."
```
Photorealistic cinematic shot inside a small stone chapel at night. Laura D’Orrose (36-year-old woman, long wavy golden-blonde hair, tired strong face, dark crimson wool doublet, black mourning band on her left arm) and Justine Avellan (36-year-old woman, dark brown hair in a low bun with a few grey threads, slate-blue dress under a charcoal over-robe) share a long, slow kiss on the pew, Justine’s two hands wrapped around both of Laura’s hands in Laura’s lap, their foreheads almost touching, eyes closed; a quill and a sheet of paper have slipped to the stone floor beside the pew. They are center-right, framed from the chest up, seen from the side at eye level, 85mm lens, very shallow depth of field, the candles behind them turned into soft golden orbs. Warm candlelight wrapping both faces, deep blue shadows, film grain. Tender, chaste, cinematic romance. Two people only, no text, no watermark.
```

#### `a02-porta.jpg` ⭐ 🔀 · Flow
Personagens: **(Laura)** (de costas, na porta) e **(Justine)** (pequena, ao fundo) · Personagens no Flow: @Laura, @Justine
**Contexto:** depois da promessa. Laura sai sem se virar, querendo olhar. Justine continua no banco. **A Laura é o assunto; a Justine é pequena, no fundo.**
```
Photorealistic cinematic wide shot from inside a small stone chapel at night, looking down the center aisle toward the open heavy wooden door. Laura D’Orrose (36-year-old woman, long golden-blonde hair tied back, dark crimson wool doublet, black mourning band on her left arm), seen from behind, stands in the doorway as a dark silhouette against cold blue pre-dawn light, one hand on the door frame, her head slightly turned as if she is fighting the urge to look back, and not doing it. Far behind her, small in the empty chapel, Justine Avellan (slate-blue dress, dark bun) sits alone on the last pew in the glow of two candles, her hands folded on her lap, watching her go. Laura is center-right, 35mm lens, deep focus, strong depth, symmetrical aisle. Warm candlelight inside, cold blue outside, dust in the air, film grain. Quiet longing. Two people only, no text, no watermark.
```

#### `a02-saida.jpg` ⭐ 🔀 · Flow
Personagens: **(Justine)** (saindo) e **(Laura)** (sentada, sozinha) · Personagens no Flow: @Justine, @Laura
**Contexto:** quando a Laura diz "uma coisa não tem a ver com a outra" (e não promete) ou escolhe o dever. "Ótimo. Obrigada por esclarecer as coisas… e boa viagem, Lâmina." Ela sai sem olhar para trás.
```
Photorealistic cinematic shot inside a small stone chapel at night. Justine Avellan (36-year-old woman, dark brown hair in a low severe bun, pale face set hard, eyes wet but dry-cheeked; slate-blue dress under a charcoal over-robe) walks away from the camera down the aisle toward the heavy wooden door with quick, stiff steps, her over-robe swinging, a sheet of paper crushed in her fist, not looking back; the door is swinging open ahead of her and the candle flames all bend sideways in the draft. In the foreground at the left, out of focus, Laura D’Orrose (36-year-old woman, golden-blonde hair tied back, dark crimson doublet, black mourning band) sits alone on the pew with her empty hand still open on her knee, staring at the place where Justine was. Justine is center-right, 35mm lens, deep focus. Warm candle glow against cold blue night in the doorway, film grain. Cold, abrupt, aching. Two people only, no text, no watermark.
```

### Os ramos que mudam a cena (uma imagem por escolha) · mãe, Markus, Joseph, Varr e o fim
*Estas 14 imagens estão agrupadas aqui, fora da ordem do livro (as páginas são a03, a05, b01, d06, e03 e a última, f13).* Cada escolha abaixo mostra a **sua** imagem assim que o jogador responde. Todas em Flow, com os personagens indicados.

#### `a03-maos.jpg` ⭐ · Flow
Personagens: **(Laura)** e **(Dolores, a mãe)** · Personagens no Flow: @Laura, @Dolores
**Contexto:** qualquer resposta à mãe. Ela pega a mão da filha: "Senta, Laura… Esta é a vigésima primeira vez."
```
Photorealistic cinematic shot of a dim royal bedchamber, heavy dark-red curtains drawn, one candle burning on the bedside table. Dolores D’Orrose (queen mother, about 62, frail and gaunt, long thin silver hair, pale papery skin, sunken cheeks, the same green eyes as her daughter, white linen nightgown and dark wool shawl) lies propped on pillows and holds both of the hands of Laura D’Orrose (36-year-old woman, golden-blonde hair tied back, dark crimson doublet, black mourning band on her left arm), who sits on the edge of the bed leaning in, her head bowed over their joined hands. They are center-right, framed from the chest up, seen from the side at eye level, 50mm lens, shallow depth of field. A thin blade of daylight between the curtains and warm candlelight on their hands, film grain. Tender and heavy. Two people only, no text, no watermark.
```

#### `a03-corredor.jpg` ⭐ · Flow
Personagens: **(Laura)** (de costas, saindo) e **(Dolores, a mãe)** (pequena, ao fundo) · Personagens no Flow: @Laura, @Dolores
**Contexto:** "Beijo a mão dela e saio." A promessa de comer ou de rezar. Cheiro de pão subindo a escada.
```
Photorealistic cinematic shot from the dim corridor looking back through the open door of a royal bedchamber. Laura D’Orrose (36-year-old woman, golden-blonde hair tied back, dark crimson doublet, black mourning band), seen from behind in the doorway with a hand on the frame, looks back at the bed; across the room, small and frail in the big carved bed, Dolores D’Orrose (queen mother, silver hair, white nightgown, dark shawl) raises one thin hand in a small wave, a candle by her side. Laura is center-right, 35mm lens, deep focus, long perspective down the corridor. Warm candle glow in the bedroom, a cold blue stone corridor in the foreground, film grain. Quiet goodbye. Two people only, no text, no watermark.
```

#### `a05-levar.jpg` ⭐ · Flow
Personagens: **(Laura)** e **(Markus)** · Personagens no Flow: @Laura, @Markus
**Contexto:** ela leva a espada do Simon. "Fique com o Cavaleiro, Markus. Eu te amo." Markus entrega a lâmina reforjada.
```
Photorealistic cinematic shot inside a royal armory before dawn. Markus (48-year-old man, Marshal of the Cavalry of Redom; broad-shouldered, short dark brown hair greying at the temples, short greying beard, red surcoat with a gold eight-pointed star) holds out a fine, freshly reforged longsword across both palms, the blade catching the lantern light; Laura D’Orrose (36-year-old woman, golden-blonde hair tied back, dark crimson doublet, black mourning band on her left arm) takes it by the grip with her right hand, her eyes on his face, a faint warmth in her tired expression; his jaw is set and his eyes are wet. They are center-right, framed from the chest up, 50mm lens at eye level, shallow depth of field. One hanging lantern, cold blue light from a high window, racks of spears behind, film grain. Two people only, no text, no watermark.
```

#### `a05-deixar.jpg` ⭐ · Flow
Personagens: **(Markus)** e **(Laura)** (de costas, saindo) · Personagens no Flow: @Markus, @Laura
**Contexto:** ela deixa a espada com ele: "Use-a para proteger Redom."
```
Photorealistic cinematic shot inside a royal armory before dawn. Markus (48-year-old man, short dark brown hair greying at the temples, short greying beard, red surcoat with a gold eight-pointed star over a padded doublet) stands in the foreground holding a fine longsword upright in front of him with both hands, the point resting on the stone floor like a knight at vigil, looking toward the door; in the background, Laura D’Orrose (golden-blonde hair tied back, dark crimson doublet, black mourning band), seen from behind, walks out through the arched doorway into pale dawn light. Markus is center-right, 50mm lens, shallow depth of field, Laura soft in the background. Lantern light on his face, cold blue dawn at the door, film grain. Two people only, no text, no watermark.
```

#### `b01-brinde.jpg` ⭐ · Flow
Personagens: **(Joseph)** e **(Laura)** · Personagens no Flow: @Joseph, @Laura
**Contexto:** "Na volta do deserto, eu bebo com você." Joseph ri, ergue o odre, e a roda de soldados ao redor do fogo aplaude. **Os soldados são só silhuetas.**
```
Photorealistic cinematic night shot of a military camp by a large fire. Sir Joseph (61-year-old retired general of Redom; heavy, curly iron-grey hair, full grey beard, ruddy cheeks, small shrewd eyes; faded dark-blue surcoat with white scales over mail; a heavy gold signet ring on his right hand) laughs with his whole face, lifting a leather wineskin high toward Laura D’Orrose (36-year-old woman, golden-blonde hair tied back, dark crimson gambeson, black mourning band on her left arm), who sits next to him with a wooden bowl in her hands and the first genuine half-smile of the whole chapter. They are center-right, framed from the chest up, 35mm lens, shallow depth of field. Behind them, a ring of soldiers as warm firelit silhouettes with no faces. Orange firelight, sparks rising, deep blue night, film grain. Warm and a little sad. Two people in focus, no text, no watermark.
```

#### `b01-recusa.jpg` ⭐ · Flow
Personagens: **(Joseph)** e **(Laura)** · Personagens no Flow: @Joseph, @Laura
**Contexto:** "Nada de beber até cumprirmos a missão" e depois "É uma ordem." A roda para de rir. Também é o fundo da página seguinte.
```
Photorealistic cinematic night shot of a military camp by a large fire. Laura D’Orrose (36-year-old woman, golden-blonde hair tied back, strong tired face, dark crimson gambeson, black mourning band on her left arm) stands, one open palm held out flat in front of her in a firm "no", her eyes level on Sir Joseph (61-year-old retired general; curly iron-grey hair, full grey beard, ruddy cheeks; faded dark-blue surcoat with white scales over mail), who sits with the wineskin lowered halfway, his smile frozen, his eyes dropping to the fire. They are center-right, framed from the knees up, 35mm lens. Behind them, a ring of soldiers as still firelit silhouettes, no faces, the laughter gone. Harsh orange firelight on one side of their faces, deep blue night, film grain. Two people in focus, no text, no watermark.
```

#### `b01-sozinho.jpg` ◻ · Flow
Personagens: **(Joseph)** · Personagens no Flow: @Joseph
**Contexto:** ela não responde. Joseph bebe sozinho e os homens voltam a falar entre eles.
```
Photorealistic cinematic night shot of a military camp. Sir Joseph (61-year-old retired general of Redom; heavy, curly iron-grey hair, full grey beard, ruddy cheeks, small shrewd eyes; faded dark-blue surcoat with white scales over mail) sits alone on a log at the edge of the firelight, drinking from a leather wineskin, his eyes on the ground; behind him, soldiers have turned their backs and talk among themselves in small groups, only blurred silhouettes. Joseph is center-right, framed from the waist up, 50mm lens, shallow depth of field. Orange firelight on one side of his face, deep blue night, film grain. Lonely. One person in focus, no text, no watermark.
```

#### `d06-ficar.jpg` ⭐ · Flow
Personagens: **(Joseph)** · Personagens no Flow: @Joseph
**Contexto:** ela deixa o Joseph no posto. Ele fica na cerca, com as mãos no cinto, vendo a coluna partir.
```
Photorealistic cinematic shot at the stake-fence gate of a desert outpost at sunset. Sir Joseph (61-year-old retired general of Redom; heavy, curly iron-grey hair, full grey beard, ruddy cheeks; faded dark-blue surcoat with white scales over mail) stands at the gate with both hands tucked into his sword belt so they will not tremble, watching, with a quiet proud smile that does not reach his eyes; far beyond him, a long column of soldiers and wagons marches away across the dunes as tiny silhouettes in orange dust. Joseph is center-right, framed from the waist up, 50mm lens, the column soft in the distance. Long golden light, purple shadows, film grain. One person in focus, no text, no watermark.
```

#### `d06-ir.jpg` ⭐ · Flow
Personagens: **(Joseph)** · Personagens no Flow: @Joseph
**Contexto:** ela manda o Joseph seguir. "Ele monta com a mão esquerda e não fala mais até o fim da tarde."
```
Photorealistic cinematic shot at dusk beside a well in a desert outpost. Sir Joseph (61-year-old retired general; heavy, curly iron-grey hair, full grey beard, ruddy cheeks; faded dark-blue surcoat with white scales over mail; his right hand, trembling, is tucked firmly into his belt) pulls himself up into the saddle of a tall dark horse using only his left hand, his jaw set, his eyes on the road ahead and nowhere else. Center-right, framed from the knees up, 35mm lens at a slightly low angle, a few soldiers behind him as soft silhouettes. Low orange sun, long shadows, dust, film grain. One person in focus, no text, no watermark.
```

#### `e03-cancao.jpg` ⭐ · Flow
Personagens: **(Varr)** e **(Laura)** · Personagens no Flow: @Varr, @LauraArmor
**Contexto:** "Você vai ter a sua canção, e eu vou ter a minha vingança." Ele ri baixo, para não acordar os cavalos.
```
Photorealistic cinematic night shot by a horse line in a desert camp. Lord Varr (38-year-old man, big, thick-necked, close-cropped dark blond hair, broken nose, stubble; dented steel breastplate over a red-brown gambeson) laughs low, his heavy hand still on the shoulder of Laura D’Orrose (36-year-old woman, golden-blonde braided hair, green eyes, tired strong face; worn steel armor over a crimson gambeson, black mourning band on her left arm), who looks straight ahead into the dark with a hard, quiet, determined face. They are center-right, framed from the waist up, 50mm lens. Moonlight from above, a distant orange campfire on one side, horses as dark shapes behind, film grain. Two people only, no text, no watermark.
```

#### `e03-mao-solta.jpg` ⭐ · Flow
Personagens: **(Varr)** e **(Laura)** · Personagens no Flow: @Varr, @LauraArmor
**Contexto:** "Para dois mil, não." / "Concentre-se na batalha." Ele tira a mão do ombro dela.
```
Photorealistic cinematic night shot by a horse line in a desert camp. Lord Varr (38-year-old man, big, thick-necked, close-cropped dark blond hair, broken nose, stubble; dented steel breastplate over a red-brown gambeson) lifts his hand away from the shoulder of Laura D’Orrose (36-year-old woman, golden-blonde braided hair, worn steel armor over a crimson gambeson, black mourning band on her left arm), his face turning serious, a hint of respect; she keeps her eyes front, unreadable, arms crossed. They are center-right, framed from the waist up, 50mm lens. Cold moonlight, a distant orange campfire, horses behind, film grain. Two people only, no text, no watermark.
```

#### `e03b-terceira.jpg` ⭐ · Flow
Personagens: **(Varr)** · Personagens no Flow: @Varr
**Contexto:** "Ele levanta, bate a areia da roupa e vai dormir com a Terceira, no chão, do jeito deles." **Os outros são vultos adormecidos.**
```
Photorealistic cinematic night shot of a desert camp. Lord Varr (38-year-old man, big, thick-necked, close-cropped dark blond hair, broken nose; dented steel breastplate) lies back on the bare sand in the middle of rows of sleeping infantrymen, his cloak balled up as a pillow, one forearm across his eyes; the sleeping soldiers of the Third around him are only dark bundles and blurred shapes under blankets, no faces; a few low embers glow beyond them. Varr is center-right, framed from the knees up, 35mm lens at ground level. Cold silver moonlight, warm embers, stars overhead, film grain. Peaceful, a little ominous. One person in focus, no text, no watermark.
```

#### `f13-joseph.jpg` ⭐ · Flow (rota em que o Joseph ficou)
Personagens: **(Joseph)** e **(Laura)** · Personagens no Flow: @Joseph, @LauraArmor
**Contexto:** a última imagem do capítulo. Alguém põe uma tigela cheia na mão dela. "Na Capital, minha mãe vai contar vinte e uma."
```
Photorealistic cinematic shot at the stake-fence gate of a desert outpost at dusk. Sir Joseph (61-year-old retired general; heavy, curly iron-grey hair, full grey beard, ruddy cheeks, small shrewd eyes; faded dark-blue surcoat with white scales over mail), his eyes wet, presses a full wooden bowl of steaming stew into the hands of Laura D’Orrose (36-year-old woman, golden-blonde braid half undone, dented and dusty steel armor over a crimson gambeson, a dark bruise on her cheek, black mourning band on her left arm), who is swaying with exhaustion and looks at the bowl as if she has forgotten what it is. They are center-right, framed from the waist up, 50mm lens at eye level, shallow depth of field. Behind them, out of focus, the first of the battered returning soldiers pass through the gate. Last red light of dusk, warm lantern glow at the gate, film grain. Exhausted, quiet, grieving. Two people in focus, no blood, no text, no watermark.
```

#### `f13-posto.jpg` ⭐ · Flow (rota em que o Joseph morreu)
Personagens: **(Laura)** · Personagens no Flow: @LauraArmor
**Contexto:** igual, mas sem o Joseph: na porta, os trinta e um do posto esperam os que voltam, e alguém dá a tigela. **A mão que oferece é de um soldado sem rosto.**
```
Photorealistic cinematic shot at the stake-fence gate of a desert outpost at dusk. Laura D’Orrose (36-year-old woman, golden-blonde braid half undone, dented and dusty steel armor over a crimson gambeson, a dark bruise on her cheek, black mourning band on her left arm), swaying with exhaustion, takes a full wooden bowl of steaming stew from an outstretched hand that enters the frame from the left (the person offering it is out of frame, only a rough soldier’s sleeve is visible); she looks down at the bowl as if she has forgotten what it is. Behind her, a line of thirty-one small, dim figures of the post stands along the fence as silhouettes, waiting for those who come back. Laura is center-right, framed from the waist up, 50mm lens, shallow depth of field. Last red light of dusk, warm lantern glow, film grain. One person in focus, no blood, no text, no watermark.
```

#### `a03-dolores.jpg` ⭐ · Flow
Personagens: **(Dolores, a mãe)** · Personagens no Flow: @Dolores
**Contexto:** a mãe doente, cortinas fechadas, uma vela acesa de dia.
```
Photorealistic cinematic shot of a dim royal bedchamber with heavy dark-red curtains drawn closed against the daylight; a thin blade of sun leaks between them. Dolores D’Orrose (queen mother of Redom, about 62, frail and gaunt, long thin silver hair loose on the pillow, pale papery skin, sunken cheeks, eyes closed; white linen nightgown, dark wool shawl) lies propped on pillows in a large carved wooden bed, one thin hand open on the coverlet, palm up, as if waiting for another hand. A single candle burns on the bedside table. She is center-right, shot from the foot of the bed at a slight high angle, 35mm lens. Warm candlelight on one side of her face, the rest of the room in soft shadow, film grain. No text, no watermark.
```

#### `a04-aubert.jpg` ⭐ · reaproveite `aubert` do Cap. VII

#### `a05-markus.jpg` ⭐ · Flow
Personagens: **(Markus)** · Personagens no Flow: @Markus
**Contexto:** a sala de armas antes do sol. Ele dorme ali, com a espada do Simon nos joelhos.
```
Photorealistic cinematic shot inside a royal armory of grey stone before dawn: racks of spears and round shields along the walls, an unmade soldier’s cot pushed into a corner. Markus (48-year-old man, Marshal of the Cavalry of Redom; broad-shouldered, short dark brown hair greying at the temples, short greying beard, square jaw, deep lines around the eyes; red surcoat with a gold eight-pointed star over a padded doublet, sleeves rolled up) sits on a wooden bench in his boots with a fine longsword lying across his knees, both hands resting on the blade, looking down at it. He is center-right, framed from the knees up, 50mm lens at seated eye level. One hanging lantern, cold blue light from a high window, film grain. No text, no watermark.
```

#### `a06-templo.jpg` ⭐ · GPT
Personagens: nenhum.
```
Photorealistic cinematic interior of a temple of the Knight before dawn: a tall stone statue of an armored knight standing with a lowered longsword, facing the great wooden doors; at its feet, dozens of small votive candles left by widows, some burnt down to stubs; an empty floor of worn stone flags; incense smoke hanging in the air. The statue is center-right, shot from low at the end of the nave, 24mm lens, symmetrical and solemn. Warm candle glow at the base, cold grey stone above, faint blue dawn in a high window, film grain. No people, no text, no watermark.
```

#### `a06-laje.jpg` ⭐ · GPT
Personagens: nenhum. **Também é o fundo do jogo "O quarto dela":** os pontos de toque ficam na esteira (esquerda), na bacia (direita), na janela (alto, à direita) e na laje (embaixo, no centro). Não mude a composição.
```
Photorealistic cinematic wide shot of a tiny stone cell beneath a temple, seen from the doorway at standing eye level, 24mm lens. A worn straw sleeping mat on the floor at the left; a dry clay basin on the floor at the right; a high narrow barred window up on the right wall, a pale shaft of light falling from it; in the center of the floor, one flagstone whose lime mortar joints are visibly whiter and newer than all the others, the dust around it swept. Bare walls, cobwebs in the corners. Cold pale light, dust floating in the beam, film grain. No people, no text, no watermark.
```

#### `a07-portao.jpg` ⭐ · GPT
Personagens: nenhum em destaque (o exército é distante).
```
Photorealistic cinematic wide shot of the south gate of a white limestone city opening at sunrise. Through the gate, far away and small, an army marches out into a golden haze: red banners with a white sword, a glint of steel, a long line of wagons with water barrels, all reduced to silhouettes in the dust, no visible faces. In the foreground, center-right, a tall grey warhorse, saddled and riderless, turns its head toward the road, reins hanging. 35mm lens at a low angle, the horse sharp, the army soft. Golden backlight, long shadows, dust glowing in the sun, film grain. No text, no watermark.
```

### Parte II · A Estrada

#### `b01-panela.jpg` ⭐ · GPT
Personagens: nenhum importante (três soldados no máximo).
```
Photorealistic cinematic night shot of a military camp on a dry road: a huge black iron cooking pot hanging over a crackling fire, steam rising; a young kitchen girl with a ladle filling the wooden bowl of a soldier in a crimson padded gambeson; one more soldier waits behind him, the rest of the camp only small fires and tent shapes in the dark. The pot is center-right, 35mm lens at chest height. Warm orange firelight on faces, deep blue night, sparks rising, film grain. No more than three people visible, no text, no watermark.
```

#### `b02-lavadeira.jpg` 🔀 · GPT (reaproveite a lavadeira Nymae do Cap. VII, se já existir)
Personagens: a lavadeira Nymae.
```
Photorealistic cinematic shot at the edge of a desert road camp at dusk. A Nymae water-carrier (a young woman of a sea people, blue-grey skin with faint scales on the neck and shoulders, small fin-shaped ears, dark wet-looking hair tied back, pupil-less pale yellow eyes cast down; a faded grey servant’s dress; an iron captive’s ring around her bare left ankle) carries two wooden buckets hung from a yoke over her shoulders toward a row of kitchen barrels. She is center-right, full figure, 50mm lens. Purple dusk sky, warm firelight behind her, dust on the ground, film grain. No text, no watermark.
```

#### `b03-borda.jpg` ⭐ · GPT
```
Photorealistic cinematic wide shot where a dry road disappears under drifting sand at the edge of a great desert; a tall stone cairn marks the way; far behind, a small army column with wagons and water barrels stretches back to the horizon as tiny silhouettes in heat haze. The cairn is center-right, 35mm lens at eye level. Harsh white noon light, heat shimmer, sand blowing across the road, film grain. No visible faces, no text, no watermark.
```

### Parte III · A Areia

| Arquivo | Personagens | Prompt (GPT) |
|---|---|---|
| `c-dia.jpg` ⭐ | nenhum | `Photorealistic cinematic wide shot of an army column crossing high dunes under a white sky, seen from far away: wagons sinking to the axles, small figures walking beside their horses, banners hanging limp. The lead wagon is center-right. Blinding light, heat haze, long telephoto compression, film grain. No visible faces, no text, no watermark.` |
| `c-noite.jpg` ⭐ | nenhum | `Photorealistic cinematic night shot of an army camp in the desert: rows of small canvas tents, a few low fires, water barrels on wagons in the foreground, a horse line in the distance. The barrels are center-right. Cold silver moonlight, warm embers, stars, film grain. No people in focus, no text, no watermark.` |
| `c-estrebaria.jpg` ⭐ | nenhum | `Photorealistic cinematic dawn shot of a horse line in a desert camp: dry wooden troughs cracked by the sun, a dark patch of wet hay under them, two horses lying in the sand with their heads low. Center-right. Pale cold dawn, long shadows, film grain. No people, no text, no watermark.` |
| `c-cozinha.jpg` ⭐ | nenhum | `Photorealistic cinematic dawn shot of a field kitchen in a desert camp: water barrels with their lids off, salt sacks, a black iron pot, a wooden ladle left across a barrel head. Center-right. Pale dawn light, film grain. No people, no text, no watermark.` |
| `c-feridos.jpg` ⭐ | nenhum | `Photorealistic cinematic dawn shot inside a canvas field-hospital tent: limp, empty leather waterskins hanging from a pole in the foreground, cots with sleeping wounded men as soft shapes in the shadow behind. Center-right. Pale light through canvas, film grain. No visible faces, no text, no watermark.` |
| `c-forja.jpg` ⭐ | nenhum | `Photorealistic cinematic dawn shot of a forge on wheels in a desert camp: an anvil, leather bellows, empty wooden quenching tubs with dry bottoms, a red-hot spearhead held in iron tongs above a dry tub. Center-right. Ember glow against grey dawn, film grain. No visible faces, no text, no watermark.` |
| `c-cai.jpg` ⭐ | nenhum | `Photorealistic cinematic shot of a supply wagon in the desert at midday, salt sacks stacked beside it, a dropped wooden bucket and a trail of footprints in the sand leading out of frame. Center-right. Harsh white light, heat haze, film grain. No people, no text, no watermark.` |

### Parte IV · As Goelas

#### `d01-goelas.jpg` ⭐ · GPT
```
Photorealistic cinematic wide shot of a small military outpost in the deep desert at sunset: a fence of sharpened wooden stakes, a stretch of ancient crude stone wall built by giants around a deep rock well, a wooden wheel and thick rope over the well, a wooden watchtower, a few tents, and a freshly washed red banner with white scales snapping in the wind. Thirty-one small, distant figures stand in a line at the fence gate, silhouettes only. The well and wheel are center-right, 35mm lens from a dune slightly above. Long golden light, purple shadows, film grain. No visible faces, no text, no watermark.
```

#### `d02-noite.jpg` ⭐ · GPT
```
Photorealistic cinematic night shot of the same desert outpost: full water troughs reflecting the moon, waterskins hanging heavy and wet on a rail, a lone sentry wrapped in a cloak by a small fire, the well wheel in silhouette against the stars. The wheel is center-right. Cold moonlight, a warm ember glow, film grain. No more than one person, no text, no watermark.
```

#### `d03-chao.jpg` ⭐ · GPT
**Contexto:** o lugar onde o Simon caiu. A areia é igual à do resto: é isso que dói.
```
Photorealistic cinematic shot of an empty sandy courtyard between a deep stone well and a stake fence, the sand smooth and unremarkable, one dusty soldier’s boot at the very edge of the frame pointing at a spot a hand’s breadth ahead of it. Center-right. Low afternoon light raking across tiny ripples in the sand, film grain. No faces, no text, no watermark.
```

#### `d04-roda.jpg` ⭐ · GPT
**Contexto:** a roda que o Simon veio montar. A Laura gira a manivela (minijogo).
```
Photorealistic cinematic close shot of a well wheel built from old wagon wheels bolted together, a thick hemp rope running down into a dark rock well, a wooden crank handle worn pale and smooth in the middle by many hands; a wet wooden bucket resting on the stone lip. Center-right, 50mm lens, shallow depth of field. Warm afternoon light, dust in the air, film grain. No people, no text, no watermark.
```

#### `d05-tumulo.jpg` ⭐ · GPT
**Contexto:** o túmulo do Simon em cima do muro velho. **Sem espada** no túmulo (a espada dele está com o Markus ou com a Laura).
```
Photorealistic cinematic shot of a soldier’s grave on top of an ancient crude stone wall in the desert: a fresh cairn of pale stones and a red banner rolled tight around its staff, planted upright in the stones; below, out of focus, the well wheel and the tents of a small outpost. The cairn is center-right, 35mm lens from a low angle against the sky. Dusk, wind tugging the banner’s edge, sand drifting, film grain. No people, no weapons, no text, no watermark.
```

#### `d05-pai.jpg` 🔀 ◻ (se ela desce ao túmulo do pai) · GPT
```
Photorealistic cinematic shot of an old, weathered soldier’s grave at the foot of an ancient crude stone wall in the desert: faded sun-bleached stones half buried in sand, the rotted stump of a banner staff with only its rusted iron tip left; on one smooth stone, the name KASSIAN scratched by a knife point. Center-right, 50mm lens at kneeling height. Late afternoon wind, drifting sand, long shadows, film grain. No people, no watermark; the only lettering allowed is the scratched name on the stone.
```

#### `d06-joseph.jpg` ⭐ · Flow
Personagens: **(Joseph)** · Personagens no Flow: @Joseph
**Contexto:** ele pede para ficar no posto. Gira o anel e espera a resposta.
```
Photorealistic cinematic shot by a desert well at dusk. Sir Joseph (61-year-old retired general of Redom; heavy, curly iron-grey hair, full grey beard, ruddy cheeks, small shrewd eyes; faded dark-blue surcoat with white scales over mail; a heavy gold signet ring on his right hand) stands beside the well wheel with both hands tucked into his sword belt so they will not tremble, his thumb turning the gold ring, looking straight at the camera, waiting for an answer. He is center-right, framed from the waist up, 50mm lens at eye level. Warm low sun on his face, the outpost blurred behind, film grain. No text, no watermark.
```

#### `d07-batedores.jpg` ⭐ · GPT
```
Photorealistic cinematic shot of two desert scouts in dusty crimson cloaks reining in their lathered horses at a stake-fence gate at sunset, foam on the horses’ necks, dust rising around the hooves. Far in the background, a jagged line of black volcanic peaks on the horizon. Center-right, 35mm lens. Long orange light, film grain. Two people only, no text, no watermark.
```

### Parte V · O Último Gole

#### `e01-fogos.jpg` ⭐ · GPT
```
Photorealistic cinematic night shot from the top of a dune looking down into a shallow valley of bare stone with seven round well mouths cut into the rock; only one well glints with water under the moon; around it, about thirty-five small campfires of a nomad camp, bigger fires in front, smaller ones behind; beyond the valley, the black volcanic rock begins and rises toward distant ash-grey peaks with a faint red glow. Center-right. Deep blue night, orange points of fire, stars, telephoto compression, film grain. No people visible, no text, no watermark.
```

#### `e02-chao.jpg` ⭐ · Flow
Personagens: **(Laura)** (só a mão e o rosto de perfil) · Personagens no Flow: @LauraArmor
```
Photorealistic cinematic close night shot at ground level: Laura D’Orrose (36-year-old woman, golden-blonde braided hair, green eyes, worn steel armor over a crimson gambeson) lies with her ear pressed to rippled desert sand, eyes open and listening, one gauntleted hand flat on the sand beside her face. Her face is center-right, 85mm lens, extremely shallow depth of field, the sand grains sharp in front of her eye. Cold silver moonlight, film grain. No text, no watermark.
```

#### `e03-varr.jpg` ⭐ · Flow
Personagens: **(Laura)** e **(Varr)** · Personagens no Flow: @LauraArmor, @Varr
**Contexto:** a véspera. Ele põe a mão no ombro dela como faz com os soldados dele.
```
Photorealistic cinematic night shot by a horse line in a desert camp. Lord Varr (38-year-old man, big, thick-necked, close-cropped dark blond hair, broken nose, stubble; dented steel breastplate over a red-brown gambeson) stands beside Laura D’Orrose (36-year-old woman, General-Queen of Redom; golden-blonde braided hair, green eyes, tired strong face; worn steel armor over a crimson gambeson, black mourning band on her left arm) and rests one heavy hand on her shoulder, the way a commander touches his soldiers. He looks at the dark valley with a half-grin; she keeps her eyes ahead, unreadable. They are center-right, framed from the waist up, 50mm lens. Moonlight from above, a distant campfire glowing orange on one side of their faces, horses as dark shapes behind, film grain. Two people only, no text, no watermark.
```

#### `e04-tenda.jpg` ⭐ · GPT
```
Photorealistic cinematic interior of a command tent before dawn: a hand-drawn map of a valley with seven wells weighted down with stones on a field table, a bowl of cold stew beside it with a wooden spoon, a single oil lamp, a sword belt hanging over a camp chair. Center-right, 35mm lens at table height. Warm lamplight, blue dawn at the tent flap, film grain. No people, no text other than faint ink lines on the map, no watermark.
```

#### `e05-fila.jpg` ⭐ · Flow
Personagens: **(Laura)** (de costas) · Personagens no Flow: @LauraArmor
**Contexto:** ela passa diante da fila de servos procurando quem roubou a água. Três servos em foco; o resto vira silhueta.
```
Photorealistic cinematic dawn shot on a dune crest. Laura D’Orrose (36-year-old woman, golden-blonde hair braided down her back, worn steel armor over a crimson gambeson, black mourning band on her left arm), seen from behind over her shoulder, walks slowly past a single line of camp servants who stand with their backs to a valley; the three nearest servants are in focus (a stable boy with straw in his hair, a kitchen girl gripping her apron, a soot-stained smith’s boy), the rest of the line fades into soft silhouettes. Far below, small smoke columns rise from a nomad camp. Center-right, 50mm lens at shoulder height. Cold pink dawn, long shadows on the sand, film grain. No more than three faces in focus, no text, no watermark.
```

### Parte VI · O Dia Comido

#### `f-rosto.jpg` 🔀 ⭐ (rota A: ela é desmascarada ou foge) · Flow
Personagens: **(a Madrinha)** · Personagens no Flow: @Madrinha
**Contexto:** o rosto falso escorrega. A forma verdadeira aparece dentro da roupa de servo.
```
Photorealistic cinematic close shot at dawn. The Godmother (a petite Nymae woman, blue-grey skin of fine iridescent scales, translucent fin-shaped ears opening like fans, long wet dark navy hair, molten-gold eyes with no pupils, glowing) stands half emerged from an oversized grey servant’s tunic whose sleeves hang past her hands; the last of a borrowed human face is sliding off her cheek like wet sand, dissolving into fine grains in the air and revealing the scales beneath. She opens her webbed hands toward the camera with a calm, amused half-smile. Center-right, 85mm lens, shallow depth of field, sand and droplets suspended in the light. Cold pink dawn from behind, a faint gold glow from her eyes on her cheekbones, film grain. Elegant and eerie, not gory. No text, no watermark.
```

#### `f-onda.jpg` ⭐ · GPT
```
Photorealistic cinematic wide shot of an impossible wall of water rising straight up out of a desert well, taller than the dunes, curling over a stone valley of dry sand; tiny distant shields and banners of an army at the foot of it give the scale. Center-right. Dawn light glowing green-gold through the water, spray and mist blown off the crest, sand blasting outward at its base, low angle, 24mm lens, epic scale, film grain. No visible faces, no text, no watermark.
```

#### `f-carga.jpg` 🔀 ⭐ (rota B: Redom ataca) · Flow
Personagens: **(Laura)** · Personagens no Flow: @LauraArmor
```
Photorealistic cinematic action shot of a cavalry charge pouring down a dune at dawn. In the foreground, Laura D’Orrose (36-year-old woman, golden-blonde braid flying, green eyes narrowed, worn steel armor over a crimson gambeson, black mourning band on her left arm, longsword raised) rides a tall grey warhorse at full gallop toward the camera’s right; behind and below her, the charge is a wave of dust, red banners and glints of steel with no detailed faces, racing toward a stone valley where a single well glints and a nomad camp waits. She is center-right, 35mm lens at a low angle, slight motion blur on the hooves. Golden dawn backlight, sand thrown into the air, film grain. One person in focus, no text, no watermark.
```

#### `f-bronze.jpg` ⭐ · GPT
**Contexto:** os Tacets, homens de bronze, descem a duna no compasso de três.
```
Photorealistic cinematic wide shot of a line of tall bronze automatons with grey stone joints at knees, elbows and shoulders, walking in perfect step over a dune crest with the low sun behind them; their heads are smooth and faceless; sand pours off their feet with every step; dust hangs in the backlight around them. The nearest one is center-right, 50mm telephoto compression so the line seems endless. Dusty gold backlight, metallic glints, film grain. No humans, no text, no watermark.
```

#### `f-pira.jpg` ⭐ · Flow
Personagens: **(Kronk)** · Personagens no Flow: @Kronk
**Contexto:** os Grakh sobem para a batalha, com o grande na frente.
```
Photorealistic cinematic shot of Grakh warriors charging up a dune at dawn. In front, Kronk (a giant Grakh warrior about 2.3 m tall, massive muscle, ash-grey skin, scar across the left eye, black dreadlocks with bone beads, two big lower canines over the lip, a big animal tooth hanging on a cord at his throat, white clay war stripes on his shoulders, leather loincloth, a huge stone mace in his right hand) leads the charge, roaring; behind him, two more grey-skinned Grakh warriors with clubs and spears, the rest only dust and silhouettes. Kronk is center-right, 35mm lens from low on the slope, looking up at him. Golden backlight, sand thrown up, film grain. No more than three warriors in focus, no text, no watermark.
```

#### `f-linha.jpg` ⭐ (novo: a luta de três lados) · GPT
**Contexto:** a Terceira contra o bronze. Martelos nas juntas.
```
Photorealistic cinematic battle shot in a muddy stone valley: a soldier of Redom in a dented steel helmet and crimson gambeson swings a heavy war hammer into the stone knee joint of a tall bronze automaton, which bursts into a cloud of grey stone dust; a second soldier braces a cracked round shield beside him. Behind them, out of focus, more bronze shapes and shields in a haze of dust and spray. Center-right, 35mm lens at waist height, slight motion blur on the hammer. Harsh dawn light through dust, mud on everything, film grain. Two soldiers and one automaton in focus, no blood, no gore, no text, no watermark.
```

#### `f-varr.jpg` ⭐ · Flow
Personagens: **(Varr)** · Personagens no Flow: @Varr
**Contexto:** a luta contra a Madrinha acabou. Ele grita para o céu. **Não mostrar o corpo dela.**
```
Photorealistic cinematic shot in a muddy stone valley after a brutal fight. Lord Varr (38-year-old man, big, thick-necked, close-cropped dark blond hair, broken nose; dented steel breastplate over a red-brown gambeson, mud to the chest, a strip of torn cloak wrapped around his forehead) stands with his heavy longsword raised high in both hands and roars at the sky; at his feet, a puddle of strange water glows faintly gold and drains into the mud. He is center-right, 35mm lens from a low angle. Smoke and spray in the air, cold dawn light, film grain. One person, no blood, no corpse, no text, no watermark.
```

#### `f-kronk.jpg` ⭐ · Flow
Personagens: **(Kronk)** · Personagens no Flow: @Kronk
**Contexto:** ele vem na direção da Laura. Os homens saem do caminho dele.
```
Photorealistic cinematic shot of Kronk (a giant Grakh warrior about 2.3 m tall, massive muscle, ash-grey skin, scar across the left eye, black dreadlocks with bone beads, two big lower canines over the lip, a big animal tooth on a cord at his throat, white clay stripes on his shoulders, leather loincloth, a huge stone mace in his right hand) walking straight toward the camera through churned sand and drifting dust, eyes locked on the lens with a cold will to kill; at the frame edges, blurred shapes of soldiers stepping out of his way. He is center-right, framed from the knees up, 50mm lens at Laura’s eye level. Hard morning light, dust glowing behind him, film grain. One character in focus, no text, no watermark.
```

#### `f-eclipse.jpg` ⭐ · GPT
```
Photorealistic cinematic wide shot of a desert battlefield as a total solar eclipse begins: a black disk biting into the sun high in the sky, the daylight thinning into an eerie bronze dusk, shadows on the sand with knife-sharp edges, a long line of shields and raised spears of Redom seen from behind as small silhouettes, all heads turned up toward the sky. The sun is upper-right, 24mm lens. Strange metallic light, a cold blue cast creeping in, film grain. No visible faces, no text, no watermark.
```

#### `f-maior.jpg` ⭐ · Flow
Personagens: **(o Maior)** · Personagens no Flow: @Maior
```
Photorealistic cinematic low-angle shot during a total solar eclipse. The Biggest (a monstrous Grakh about 3.4 m tall, ash-grey skin cracked like a dry well floor, muscles where no creature has muscles, the right arm and shoulder much heavier than the left with the shoulder bone pushing up under the skin, hands like claws with long hooked black nails, lower canines jutting past the lip, long matted black dreadlocks) stands with his head thrown back, laughing; a few arrow shafts stick out of his chest and shoulders and he does not seem to notice. Behind him, the black sun with a blazing white corona. He is center-right, 24mm lens from the ground, looking up. Bronze half-light, deep shadows, dust hanging in the air, film grain. One character, no blood, no text, no watermark.
```

#### `f-depois.jpg` ⭐ · GPT
**Contexto:** o vale quando o sol volta. Sem corpos na imagem: a perda é dita pelo que ficou no chão.
```
Photorealistic cinematic wide shot of a desert valley after a battle as the sunlight returns: shattered bronze plates and grey stone joints scattered across churned sand, broken spears planted at angles, abandoned dented shields, a torn red banner half buried; in the middle distance, a faint pale glow rising from the ground like embers going out. Center-right, 24mm lens at standing height. Clean gold light breaking through settling dust, long shadows, film grain. No people, no bodies, no blood, no text, no watermark.
```

#### `f-conta.jpg` ⭐ · Flow
Personagens: **(Laura)** e **(Varr)** · Personagens no Flow: @LauraArmor, @Varr
```
Photorealistic cinematic shot in a desert valley in late afternoon. Laura D’Orrose (36-year-old woman, golden-blonde braid half undone, green eyes, a dark bruise on her cheek, dented and dirty steel armor over a crimson gambeson, black mourning band on her left arm) walks slowly past a seated, exhausted soldier and rests her gauntleted hand on his shoulder; beyond them, Lord Varr (38-year-old man, big, broken nose, his head bound in a strip of his own cloak, dented breastplate) sits on a broken shield, talking with his hands. Laura is center-right, 50mm lens at eye level. Dusty amber light, film grain. Three people at most, no blood, no text, no watermark.
```

#### `f-recuo.jpg` ⭐ · GPT
```
Photorealistic cinematic wide shot of a small, battered column of soldiers walking back across the desert toward a stake-fence outpost at dusk, a few horses carrying wounded men slumped in the saddles, all small silhouettes. Center-right, 35mm telephoto. Long purple shadows, a last band of red light on the horizon, film grain. No visible faces, no text, no watermark.
```

#### Fundos dos minijogos
| Arquivo | Prompt (GPT) |
|---|---|
| `duelo-fundo.jpg` ⭐ | `Photorealistic cinematic wide empty desert valley floor at morning: churned sand, a dune on one side, distant smoke columns, scattered broken spears at the edges. Nothing in the center of the frame (characters are drawn on top). Wide 16:9, eye level, film grain. No people, no text, no watermark.` |
| `maior-fundo.jpg` ⭐ | `Photorealistic cinematic wide empty desert valley during a total solar eclipse: a black sun with a white corona high in the sky, bronze half-light, sharp shadows, dust in the air. Nothing in the center of the frame (characters are drawn on top). Wide 16:9, film grain. No people, no text, no watermark.` |

### Codex
| Arquivo | Prompt (GPT) |
|---|---|
| `codex-ultimo-gole.jpg` ⭐ | `Photorealistic aerial drone shot of a shallow valley of bare stone in the desert with seven round well mouths cut into the rock, only one holding a disk of dark water reflecting the sky; beyond it, the sand ends at a line of black volcanic rock. Late afternoon, long shadows, film grain. No people, no text, no watermark.` |
| `codex-picos-de-cinza.jpg` ◻ (novo) | `Photorealistic cinematic wide shot of a range of black volcanic peaks rising from a desert of dark rock, ash drifting from the summits, thin plumes of sulphur steam from cracks, a red glow deep in a crater; the sun is a dull copper disk behind the haze, as if something vast sleeps beneath. 24mm lens, heat shimmer, film grain. No people, no dragon visible, no text, no watermark.` |
Os outros verbetes reaproveitam as imagens dos Caps. V a VII.

---

## 3. Retratos (`assets/images/rostos/`, 3:4) · GPT
Busto, fundo de acampamento no deserto desfocado, luz de manhã, olhando para a câmera. **Wil (`estrebaria`), Bram (`forja`), Ilse e Nell já existem** do Cap. VII.

| Arquivo | Personagem | Prompt |
|---|---|---|
| `ansel.jpg` ⭐ | (Ansel) | `Photorealistic bust portrait, 3:4. Ansel (a young cavalry sentry of Redom, about 19; thin face, sunburnt nose, cropped brown hair, frightened grey eyes, a split lip healing; a dusty crimson gambeson) clutches a piece of bread against his chest and looks at the camera as if waiting to be accused. Blurred desert camp behind, soft morning light, 85mm lens, film grain. No text, no watermark.` |
| `grisalho.jpg` ⭐ | (Tasso) | `Photorealistic bust portrait, 3:4. Tasso (a soldier of the Third of Redom, about 45; grizzled stubble, a thick neck, small shifting eyes, beads of sweat on his brow; a dented helmet under his arm, crimson gambeson) wipes his forehead with his sleeve, avoiding the camera’s gaze. Blurred desert camp behind, morning light, 85mm lens, film grain. No text, no watermark.` |
| `intendente.jpg` ◻ | (o intendente) | `Photorealistic bust portrait, 3:4. The quartermaster (a lean balding man of Redom, about 50; ink-stained fingers, a wax tablet hanging from his belt, narrow careful eyes; a brown leather jerkin over a crimson shirt). Blurred wagons and water barrels behind, morning light, 85mm lens, film grain. No text, no watermark.` |
| `varr.jpg` ◻ | (Varr) | recorte do `e03-varr` ou Flow com REF-VARR38: `Photorealistic bust portrait, 3:4, of Lord Varr (38-year-old man, big, close-cropped dark blond hair, broken nose, stubble, loud open face; dented breastplate), grinning. Blurred desert camp at night, firelight, 85mm lens, film grain.` |
| `lavadeira.jpg` ◻ | (a lavadeira Nymae) | reaproveite do Cap. VII ou use a descrição do `b02-lavadeira`, busto, olhos baixos. |

---

## 4. Sprites

### 4.1 Laura aos 36 (duelo e Maior) ⭐ · Flow
Hoje o duelo usa poses provisórias. **Uma pose parada por arquivo**, `.webp` com fundo transparente (gere em verde #00FF00 e recorte), corpo inteiro, **virada para a direita**, ~640 px de altura, pés na base. Pasta `assets/sprites/laura/` (oito arquivos, os nomes já estão no código). Ingrediente: REF-LAURA36-ARMOR. *Quando chegarem, me mande: eu acerto o eixo do corpo e a linha do pé de cada pose no `duelo8.js`.*

| Arquivo | Pose (troque no prompt) |
|---|---|
| `guarda.webp` | in guard, shield forward at chest height, sword low and ready, knees bent |
| `escudo.webp` | shield raised overhead absorbing a heavy blow from above, knees deeply bent, teeth clenched |
| `lateral.webp` | a wide sidestep, body twisted, sword cocked back ready to cut |
| `golpe.webp` | a full lunge to the right, sword arm extended, back leg straight |
| `atingido.webp` | struck on the shoulder, body folding, shield swinging wide |
| `respirar.webp` | standing, sword low, shoulders loose, catching her breath |
| `cansado.webp` | panting, shield low, a dark stain on the left sleeve between the pauldron and the gauntlet (no visible wound) |
| `impacto.webp` | down on one knee, shield over her head |

Prompt-base:
```
Full-body photorealistic character sprite on a plain pure green background (#00FF00), strict side view facing right, feet on the bottom edge of the frame, the figure filling about 80% of the frame height with empty margin on all sides. Laura D’Orrose (36-year-old woman, General-Queen of Redom; tall, lean and athletic; long wavy golden-blonde hair braided tight down the back; green eyes; strong tired face; no helmet; worn steel breastplate over a dark crimson padded gambeson, steel pauldrons, vambraces and gauntlets, mail at the hips, steel greaves, black mourning band tied around her left upper arm; longsword in her right hand; round dark crimson shield with a white sword on her left arm). POSE: [pose]. Even studio light from the upper left, no shadow on the background, no text.
```

### 4.2 Kronk ⭐
As folhas do Cap. VI já estão no pacote e funcionam.

### 4.3 O Maior ⭐ · Flow
Hoje é o Kronk em cinza, ampliado. Ideal: folhas no mesmo formato das do Kronk (grade quadrada, virado para a direita, fundo verde para recorte) a partir da REF-MAIOR, em `assets/sprites/maior/`. *O código ainda desenha o Kronk em cinza no lugar dele: quando as folhas chegarem, eu troco a linha.*
| Arquivo | Pose |
|---|---|
| `guarda` | laughing, head tilted back, the huge right arm hanging, claw-hand open |
| `golpe` | the smaller left arm sweeps across at waist height, claws spread |
| `pesado` | the huge right arm rises high and comes down like a hammer, claws closing |
| `apanha` | arrows strike his chest (shafts only, no blood), he keeps laughing |
| `cai` | on his knees, head bowed, a faint white light glowing through the cracks of his skin from the inside |
```
Full-body photorealistic creature sprite on a plain pure green background (#00FF00), strict side view facing right, feet on the bottom edge, about 80% of the frame height. The Biggest (a monstrous Grakh about 3.4 m tall, ash-grey cracked skin, impossible muscles, the right arm and shoulder much heavier than the left, hands like claws with long hooked black nails, lower canines jutting past the lip, long matted black dreadlocks, hide loincloth, barefoot). POSE: [pose]. Even studio light, no shadow on the background, no blood, no text.
```

---

## 5. Vídeos de fundo (`assets/video/`, Flow · Omni Flash)

Só **8 vídeos**, os de cena impactante (as outras páginas ficam com a imagem, que já basta; paisagem parada não precisa de vídeo): **16:9, 8 s, mudo no jogo, primeiro quadro = a imagem da página (modo Frames)**. A coluna indica, quando houver personagem, qual `@Personagem` usar **se** você precisar do modo Ingredientes (§0.4). Todo prompt já termina com: *Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.*

| Arquivo | Página | Primeiro quadro · Personagem (se precisar) | Prompt |
|---|---|---|---|
| `f-rosto.mp4` 🔀 ⭐ | f01a | `f-rosto.jpg` · @Madrinha | `Close-up, slow push-in on the Godmother at dawn. The last fragments of a borrowed human face slide off her cheek and dissolve into fine glittering grains that drift away in the wind, revealing blue-grey iridescent scales; her fin-shaped ears unfold like fans; her molten-gold eyes brighten and glow; she raises her webbed hands toward camera with a calm, knowing half-smile. Droplets of water begin to float upward around her. Photorealistic, cinematic, eerie and beautiful, 85mm, shallow depth of field. No gore. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-onda.mp4` ⭐ | f02a/f02b | `f-onda.jpg` | `Epic low-angle wide shot, camera slowly tilting up as a colossal wall of water rises straight out of a desert well, climbing higher than the dunes, its crest curling forward and beginning to fall over the valley; spray and mist tear off the top; sand blasts outward at its base; dawn light glows green-gold through the water. Slight camera shake as it peaks. Photorealistic, cinematic, blockbuster scale, 24mm. No visible faces. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-carga.mp4` 🔀 ⭐ | f01b | `f-carga.jpg` · @LauraArmor | `Tracking shot alongside Laura D’Orrose (36-year-old woman, golden-blonde braid flying, worn steel armor over crimson, black mourning band, longsword raised) galloping a grey warhorse down a dune at dawn; the camera runs low beside the horse, hooves throwing sand into the lens; behind her, a wave of dust, red banners and steel glints pours down the slope. Her face is set and furious. Photorealistic, cinematic, handheld energy, 35mm, slight motion blur. One person in focus, no blood. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-bronze.mp4` ⭐ | f03 | `f-bronze.jpg` | `Locked-off telephoto shot of a line of faceless bronze automatons with stone joints stepping over a dune crest in perfect unison against the low sun: three heavy steps and a pause, three steps and a pause; sand pours off their feet; heat haze ripples; on the last beat the rhythm breaks into four relentless steps and the line keeps coming toward camera. Photorealistic, cinematic, ominous, 85mm compression. No humans. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-kronk.mp4` ⭐ | f06 | `f-kronk.jpg` · @Kronk | `Slow dolly-back as Kronk (giant ash-grey Grakh warrior, scar over the left eye, black dreadlocks with bone beads, big lower canines, animal tooth on a cord at his throat, huge stone mace) walks straight toward the camera through drifting dust, each footstep heavy, eyes locked on the lens; at the edges of frame, blurred soldiers step aside. He stops, rolls his shoulders, and lifts the mace. Photorealistic, cinematic, tense, 50mm. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-eclipse.mp4` ⭐ | f07 | `f-eclipse.jpg` | `Time-lapse feel, locked-off wide shot: over a desert battlefield, a black disk slides across the sun and the daylight drains into an eerie bronze dusk, then cold blue; the shadows on the sand sharpen; a line of shields and spears in silhouette all tilt their heads up; dust stops moving in the air. Photorealistic, cinematic, ominous, 24mm. No visible faces. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-eclipse-luta.mp4` ⭐ | f07b | `f-eclipse-luta.jpg` | `Handheld battle shot under a total solar eclipse in a desert valley, bronze half-light and dust: a soldier of Redom braces his shield as a huge ash-grey Grakh warrior swings a weapon down and a faceless bronze automaton lunges between them; all three keep fighting in the dark; dust swirls through the strange metallic light, the black sun with its white corona hangs above. The camera pushes slowly forward through the fight with a slight shake. Photorealistic, cinematic, chaotic, 35mm, motion blur. No blood, no gore. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |
| `f-maior.mp4` ⭐ | f08/f09 | `f-maior.jpg` · @Maior | `Very low angle, slow push-in on the Biggest (a monstrous ash-grey Grakh about 3.4 m tall, cracked skin, impossible muscles, the right arm far heavier than the left, hands like claws, jutting lower canines, matted black dreadlocks) standing under a black eclipsed sun with a blazing white corona; he throws his head back and laughs; a few arrows thud into his shoulders and he does not flinch; he lowers his head and looks straight into the lens. Photorealistic, cinematic, horror-epic, 24mm. No blood. Single continuous shot, no scene cuts. No dialogue, no music, no subtitles, no on-screen text.` |

---

## 6. Efeitos sonoros (`assets/audio/sfx/`, ElevenLabs · Sound Effects)

**Já existem e funcionam:** rangido-roda, compasso-tres, virotes, virote-impacto, escudo-impacto-1/2, corte, golpe, golpe-ar, tambores-guerra, sol-volta, eclipse-total, onda-gigante, coracao-rapido, coracao-lento, corneta-redom, balde-poco, passos-areia, tacet_passos.

### 6.1 Novos ⭐
| Arquivo | Onde | Duração · Loop · Influência | Prompt |
|---|---|---|---|
| `vento-ferro.mp3` | d05b (túmulo do pai) | 6 s · não · 0.6 | `Lonely desert wind blowing across an old rusted iron spear tip planted in stones, a thin metallic whistle and soft hum, sand hissing over rocks, distant and desolate, cinematic.` |
| `pedra-poco.mp3` | e01 (o Último Gole) | 4 s · não · 0.6 | `A small stone dropped into a very deep rock well at night: a long fall, then a distant hollow plop with a long reverberant tail echoing up the stone shaft, eerie silence after.` |
| `rosto-escorrega.mp3` | f01a | 4 s · não · 0.5 | `Close-up wet organic slide, like damp sand and silk peeling off skin, a soft crackle of tiny scales unfolding, a shimmering magical hiss rising at the end, eerie, intimate, no gore.` |
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
| `maior-chega.mp3` | f08 | 4 s · não · 0.5 | `A colossal creature landing on the ground in front of the listener: a deep earth-shaking impact, sand blasting outward, a low monstrous breath, a cinematic braam with sub-bass that rattles armor.` |
| `maior-riso.mp3` | f08 | 6 s · não · 0.4 | `A gigantic monster laughing: an enormous, deep, booming, slow laugh, not quite human, rumbling in the chest, echoing across a silent valley, unsettling and joyful at once.` |
| `luz-apaga.mp3` | f09 | 5 s · não · 0.4 | `An eerie inner light dying out inside a huge body: a soft crystalline hum fading down in pitch, crackling like embers, a final breath of wind, then silence. Ethereal, otherworldly.` |
| `bronze-arrasta.mp3` | f10 | 6 s · não · 0.6 | `A broken bronze machine dragging itself across sand with one arm: metal scraping, a cracked stone joint grinding, a broken rhythmic clank in three beats, then a final hammer blow and silence.` |
| `vento-campo.mp3` | f10 | 12 s · **sim** · 0.4 | `Wind blowing across a silent battlefield after the fight: loose cloth and a torn banner flapping, distant metal ticking as it cools, sand hissing over shields, no voices, desolate, seamless loop.` |
| `passos-guarda.mp3` | caça (noite) | 3 s · não · 0.6 | `A night guard’s boots walking on sand past a tent, a soft clink of mail, getting closer then stopping.` |
| `pedra-arrasta.mp3` | jogo "O quarto dela" | 3 s · não · 0.7 | `A heavy stone floor slab being lifted and dragged aside in a small cell, stone grinding on stone, mortar crumbling, a hollow draft of air from below.` |

### 6.2 Upgrades "hollywoodianos" ◻ (as provisórias funcionam; estas elevam o pico)
| Arquivo | Duração · Loop · Influência | Prompt |
|---|---|---|
| `onda-gigante.mp3` | 8 s · não · 0.5 | `A colossal tidal wave rising out of the desert and crashing down on an army: a deep sub-bass rumble building, a roaring wall of water, the crash with an explosion of spray and stone, men and horses swallowed, a long draining tail into rock. Epic, blockbuster cinematic.` |
| `eclipse-total.mp3` | 8 s · não · 0.4 | `A total solar eclipse arriving over a battlefield: all the wind and noise drain away into silence, a slow ominous low drone rises, a faint metallic shimmer, a deep cinematic braam at the end.` |
| `sol-volta.mp3` | 6 s · não · 0.4 | `Sunlight returning after an eclipse: a warm shimmering swell like a choir without voices, wind returning, a soft rising tone, relief.` |
| `coracao-rapido.mp3` | 8 s · **sim** · 0.6 | `A human heart pounding very fast in the ears, heavy and close, muffled as if heard from inside the body, steady rhythm, seamless loop.` |

### 6.3 Ambientes (loops de zona, `assets/audio/`) ◻
Já existem como provisórios. Se for regravar, todos com **loop ligado, 20–30 s**: `batalha-loop` (*distant battle ambience in a desert valley: clashing metal, shouts, horses, war drums far off, wind, seamless loop*), `eclipse-loop` (*an eerie silent battlefield under an eclipse: a low drone, faint wind, distant whispers of an army, a single horse snorting, seamless loop*), `goelas-loop` (*desert outpost at evening: wind on stakes, a banner flapping, a wooden well wheel creaking now and then, distant men talking, seamless loop*).

---

## 7. Dublagem da Laura (`assets/audio/voz/`, ElevenLabs · Eleven v4)

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

## 8. Ordem sugerida
1. Fichas da §1 (Laura de armadura e o Maior são as novas).
2. As imagens ⭐ da Parte VI (o pico) e a capa.
3. Os vídeos ⭐ da Parte VI, a partir das imagens prontas.
4. Os sons novos da §6.1 e as falas L14–L20.
5. O resto, na ordem do livro.

---

### Fontes da pesquisa (atualizadas em 13/11/2026)
- [Google Flow · Create videos (Ingredients, Frames, Characters com @, Omni Flash)](https://support.google.com/flow/answer/16353334?hl=en&co=GENIE.Platform%3DDesktop)
- [Google AI for Developers · Generate and edit videos with Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/omni)
- [useapi.net · Gemini Omni Flash no Google Flow (durações e limites de referências)](https://useapi.net/docs/articles/omni-flash-bash)
- [Google Flow guide · Images, Video & Tools](https://novarixstudio.substack.com/p/google-flow-guide)
- [ElevenLabs · Emotional text to speech with Eleven v4](https://elevenlabs.io/blog/emotional-text-to-speech-with-eleven-v4)
- [Morphic · Eleven v4 prompt guide](https://morphic.com/resources/how-to/eleven-v4-guide)
- [ElevenLabs · Sound effects (SFX v3)](https://elevenlabs.io/docs/overview/capabilities/sound-effects)
- [OpenAI Cookbook · GPT Image Generation Models Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
