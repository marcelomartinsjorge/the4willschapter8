/* ==========================================================================
   Capítulo VIII · O DUELO (minijogo D1 e D2)
   O motor por turnos dos Caps. II e IV, agora com o corpo do Kronk do Cap. VI.
   - SEU TURNO: um menu (estocada, corte, finta, respirar e, ferido ele, rodear).
     O golpe só entra se o toque cair quando o anel fechar sobre ele.
   - O TURNO DELE: o corpo avisa, o anel fecha sobre a Laura, e a resposta é na
     hora: ↑ ESCUDO (janela larga) ou ↓ PASSO LATERAL (janela estreita; certo
     no golpe pesado, faz ele passar do ponto e abre um golpe de graça).
   - O CORAÇÃO DE PEDRA: perto de 52, as janelas são largas. Sobe com o sangue.
   - TRÊS MARCAS e a troca recomeça (do começo da fase, nunca do zero).
   Kronk: golpe rápido (o ombro da maça recua: escudo) e golpe pesado (a maça
   sobe e fica: passo lateral quando ela descer). Ele morde toda finta.
   Três fases: inteiro · a fúria (ele faz a Laura sangrar) · ferido, protegendo
   os acampamentos (rodear). O fim é sempre o passo lateral e o corte na coxa.
   O Maior (modo 'maior'): ela não precisa matar. Fica de pé e chama as rajadas.
   Com o pulso alto, a ordem sai tremida e atrasa (os deslizes do Cap. IV).
   API: window.DUELO8.start(root, opts) → Promise<resultado>
   ========================================================================== */
(() => {
'use strict';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const BOT = () => !!window.__JOGO_BOT;

const TX = {
  pt: {
    tK: 'O Grakh da maça', sK: 'Ler, aguentar, derrubar', tM: 'O Maior', sM: 'Ficar de pé. Chamar as rajadas.',
    regrasK: [['Seu turno', 'escolha o golpe e toque quando o anel fechar sobre ele'], ['O turno dele', '↑ Escudo segura. ↓ Passo lateral, no último instante, faz ele passar do ponto'], ['O ombro recua', 'o golpe vem rápido: escudo'], ['A maça sobe e fica', 'o golpe pesado: passo lateral quando ela descer, nem antes, nem depois'], ['Três marcas', 'e a troca recomeça']],
    regrasM: [['O turno dele', '↑ Escudo ou ↓ Passo lateral. Ele vem em sequência e não avisa duas vezes do mesmo jeito'], ['Seu turno', 'chamar a rajada quando o anel fechar sobre ele, ou respirar'], ['O peito aberto', 'depois de uma sequência inteira bem respondida, a rajada entra inteira'], ['A carne fecha', 'sem flecha nova, ele se recupera'], ['O pulso', 'alto, a ordem sai tremida e atrasa']],
    comecar: 'À areia', teclado: 'Teclado: 1 a 5 escolhem · Espaço golpeia · ↑ escudo · ↓ passo lateral',
    pergunta: 'O que Laura faz?',
    golpes: { estocada: ['Estocada', 'Rápida. Menos estrago.'], corte: ['Corte', 'Mais lenta. Mais estrago.'], finta: ['Finta', 'Ele morde.'], respirar: ['Respirar', 'Baixa o pulso. Ele também respira.'], rodear: ['Rodear', 'Andar para o lado dos acampamentos.'],
      chamar: ['Soltem!', 'A rajada.'], tremido: ['Sol… soltem!', 'A voz sai fina. A rajada atrasa.'], respirarM: ['Respirar', 'Baixa um pouco o pulso.'] },
    agora: 'Agora', escudo: 'Escudo', lateral: 'Passo lateral',
    rot: {perfeito: 'Na hora', bom: 'Entrou', defende: 'Ele desvia', cedo: 'Cedo', tarde: 'Tarde', segurou: 'Segurou', passou: 'Passou', contra: 'Ele passou do ponto', marca: 'Marca' },
    ele: 'Ele', coracao: 'Pulso', marcas: 'Marcas', rajadas: 'Rajadas',
    tell: { golpe: 'O ombro da maça recua.', pesado: 'A maça sobe e fica lá em cima.', pesadoRapido: 'A maça sobe. Desce quase sem parar.', desce: 'Desce!', mordeu: { golpe: 'Ele morde a finta. O próximo vem rápido, pelo ombro.', pesado: 'Ele morde a finta. O próximo vem de cima, pesado.' } },
    tellM: { golpe: 'O braço pequeno recua.', pesado: 'O braço grande sobe.', confuso: 'O ombro dele estala. Não sei o que vem.', desce: 'Vem!' },
    intro: 'Ele não gira a maça nem grita. Vem.',
    introM: 'Ele ri. O braço grande ainda está crescendo.',
    acertos: ['A lâmina entra no braço dele. Ele não para.', 'Abro um corte no flanco. Ele olha o corte e volta.', 'A ponta entra no ombro. Ele resmunga e vem.', 'Corto a mão da maça. Ele troca de mão e vem.', 'A lâmina raspa nas costelas. Ele nem olha.'],
    erro: 'Ele sai da frente da lâmina, rápido demais para o tamanho.',
    respirou: 'Respiro fundo. O coração assenta. Ele também respira e se recompõe.',
    segurou: 'O escudo canta. O braço treme até o ombro, e segura.',
    segurouPesado: 'Seguro a maça no escudo. O braço some até o ombro. Não dá para segurar sempre assim.',
    passou: 'O golpe passa rente.',
    contra: 'Passo para o lado no último instante. A maça afunda na areia onde eu estava, e ele fica aberto.',
    contraGolpe: 'Entro pela abertura. A lâmina abre a carne do lado dele.',
    cedoPesado: 'Saio cedo demais. Ele vê, e corrige no ar.',
    marca: ['A maça pega o escudo de lado. O escudo entorta para dentro e bate no meu peito.', 'O golpe passa. O escudo racha.', 'A maça pega o meu ombro. Caio sobre um joelho e levanto.'],
    reset: 'Recuo três passos. Ele também. Recomeça.',
    fase2: ['Ele grita. Os golpes começam a vir mais rápido, e mais perto.', 'A maça passa por cima do escudo. O ferro raspa no meu braço, entre a ombreira e a manopla.', 'Quente. Sangue. É meu.', 'Do outro lado do vale, os Grakh gritam uma palavra, muitas vezes: — Assobio! Assobio sangrar!', 'Não sei o que querem dizer. Sei que é comigo.'],
    fase3: ['Ele sangra pelos braços, pelo flanco. Fica entre mim e os acampamentos e não sai dali.', 'Pela primeira vez ele fala. Uma palavra, rouca, olhando para mim:', '— Assobio.'],
    rodear: 'Ando para o lado dos acampamentos. Ele urra e vem atrás, aberto.',
    fim: ['Ele desce a maça com tudo. Saio da frente dela por um palmo.', 'Atrás da coxa dele, onde nada protege, abro o corte.'],
    fimPronto: 'Ele está aberto. Mais um pesado, e eu termino.',
    chamou: 'As flechas cobrem o céu escuro e descem nele. A carne custa mais a fechar em volta das hastes.',
    chamouTremido: 'A voz sai fina. Os arqueiros demoram a soltar, e ele entra nessa demora.',
    quedaM: 'O braço grande pega o escudo. Caio. Levanto.',
    respirouM: 'Respiro. O pulso cede pouco.',
    ombro: 'Abro os pés na largura dos ombros e solto o ombro. Alguém me ensinou isso uma noite, com a mão no meu ombro, nunca na espada.',
    coragem: 'O ombro esquerdo pesa, como pesou no templo.',
    fimM: 'A última rajada desce.',
    abertoM: 'Ele erra tudo o que mandou. O peito fica aberto.',
    miraM: 'Os arqueiros esperam a minha voz.',
    chamouMeio: 'Metade das flechas pega o braço pequeno. A outra metade entra.',
    chamouPouco: 'As flechas batem no braço grande e caem na areia.',
    fechaM: 'A carne dele fecha em volta das hastes. Ele arranca uma e ri.',
  },
  en: {
    tK: 'The Grakh with the mace', sK: 'Read, hold, bring him down', tM: 'The Biggest', sM: 'Stay on your feet. Call the volleys.',
    regrasK: [['Your turn', 'pick a strike and tap when the ring closes on him'], ['His turn', '↑ Shield holds. ↓ Sidestep, at the last instant, carries him past the point'], ['The shoulder draws back', 'the blow comes fast: shield'], ['The mace rises and stays', 'the heavy blow: sidestep when it comes down, not before, not after'], ['Three marks', 'and the exchange starts over']],
    regrasM: [['His turn', '↑ Shield or ↓ Sidestep. He comes in sequences and never warns the same way twice'], ['Your turn', 'call the volley when the ring closes on him, or breathe'], ['The open chest', 'after a whole sequence answered well, the volley goes in whole'], ['The flesh closes', 'with no new arrow, he recovers'], ['Your pulse', 'high, the order comes out shaky and late']],
    comecar: 'To the sand', teclado: 'Keyboard: 1 to 5 choose · Space strikes · ↑ shield · ↓ sidestep',
    pergunta: 'What does Laura do?',
    golpes: { estocada: ['Thrust', 'Fast. Less damage.'], corte: ['Cut', 'Slower. More damage.'], finta: ['Feint', 'He bites.'], respirar: ['Breathe', 'The pulse drops. He breathes too.'], rodear: ['Circle', 'Walk toward the camps.'],
      chamar: ['Loose!', 'The volley.'], tremido: ['Loo… loose!', 'The voice comes out thin. The volley is late.'], respirarM: ['Breathe', 'The pulse drops a little.'] },
    agora: 'Now', escudo: 'Shield', lateral: 'Sidestep',
    rot: {perfeito: 'Right on time', bom: 'It lands', defende: 'He slips it', cedo: 'Too soon', tarde: 'Too late', segurou: 'Held', passou: 'Past', contra: 'He went past the point', marca: 'Mark' },
    ele: 'Him', coracao: 'Pulse', marcas: 'Marks', rajadas: 'Volleys',
    tell: { golpe: 'The mace shoulder draws back.', pesado: 'The mace rises and stays up there.', pesadoRapido: 'The mace rises. It comes down almost without stopping.', desce: 'Down!', mordeu: { golpe: 'He bites on the feint. The next one comes fast, from the shoulder.', pesado: 'He bites on the feint. The next one comes from above, heavy.' } },
    tellM: { golpe: 'The small arm draws back.', pesado: 'The big arm rises.', confuso: 'His shoulder cracks. I don’t know what’s coming.', desce: 'Now!' },
    intro: 'He doesn’t spin the mace or shout. He comes.',
    introM: 'He laughs. The big arm is still growing.',
    acertos: ['The blade goes into his arm. He doesn’t stop.', 'I open a cut in his flank. He looks at it and comes back.', 'The point goes into his shoulder. He grunts and comes on.', 'I cut the mace hand. He switches hands and comes on.', 'The blade scrapes his ribs. He doesn’t even look.'],
    erro: 'He gets out from in front of the blade, too fast for his size.',
    respirou: 'I breathe deep. My heart settles. He breathes too, and pulls himself together.',
    segurou: 'The shield sings. My arm shakes to the shoulder, and holds.',
    segurouPesado: 'I take the mace on the shield. My arm goes numb to the shoulder. I can’t hold like this forever.',
    passou: 'The blow goes by, close.',
    contra: 'I step aside at the last instant. The mace sinks into the sand where I was, and he is open.',
    contraGolpe: 'I go in through the opening. The blade opens the flesh of his side.',
    cedoPesado: 'I move too soon. He sees it, and corrects in the air.',
    marca: ['The mace catches the shield edge-on. The shield buckles inward and hits my chest.', 'The blow gets through. The shield cracks.', 'The mace catches my shoulder. I go down on one knee and get up.'],
    reset: 'I fall back three paces. So does he. It starts over.',
    fase2: ['He shouts. The blows start coming faster, and closer.', 'The mace goes over the shield. The iron scrapes my arm, between the pauldron and the gauntlet.', 'Warm. Blood. It’s mine.', 'Across the valley, the Grakh shout one word, over and over: — Whistle! Whistle bleed!', 'I don’t know what they mean. I know it’s about me.'],
    fase3: ['He is bleeding from the arms, from the flank. He stays between me and the camps and won’t leave that spot.', 'For the first time he speaks. One word, hoarse, looking at me:', '— Whistle.'],
    rodear: 'I walk toward the camps. He roars and comes after me, open.',
    fim: ['He brings the mace down with everything he has. I get out from under it by a hand’s width.', 'Behind his thigh, where nothing protects him, I open the cut.'],
    fimPronto: 'He’s open. One more heavy blow, and I finish it.',
    chamou: 'The arrows cover the dark sky and come down on him. The flesh is slower to close round the shafts.',
    chamouTremido: 'My voice comes out thin. The archers are slow to loose, and he comes in through that delay.',
    quedaM: 'The big arm catches the shield. I go down. I get up.',
    respirouM: 'I breathe. The pulse drops a little.',
    ombro: 'I set my feet shoulder-width apart and let my shoulder go loose. Someone taught me that one night, with a hand on my shoulder, never on the sword.',
    coragem: 'My left shoulder grows heavy, the way it did in the temple.',
    fimM: 'The last volley comes down.',
    abertoM: 'He misses everything he sent. His chest is left open.',
    miraM: 'The archers wait for my voice.',
    chamouMeio: 'Half the arrows catch the small arm. The other half go in.',
    chamouPouco: 'The arrows strike the big arm and fall into the sand.',
    fechaM: 'His flesh closes round the shafts. He pulls one out and laughs.',
  },
};

// (v16) o duelo híbrido: mais ações, golpes novos dele, a vida dela, A Lâmina
const TX2 = {
  pt: {
    regrasK: [['Seu turno', 'escolha o que a Laura faz. O golpe entra se o toque cair quando o anel fechar sobre ele'], ['O turno dele', 'o corpo dele avisa. ↑ Escudo segura. ↓ Passo lateral tira ela do caminho'], ['O pulso', 'cada ação cansa, e respirar baixa. Com o pulso alto, as janelas fecham'], ['A Lâmina', 'os toques na hora certa enchem a barra. Cheia, um golpe que quase decide a luta'], ['A vida dela', 'se acabar, a Laura cai']],
    regrasM: [['O turno dele', 'ele vem em sequências. ↑ Escudo ou ↓ Passo lateral, conforme o corpo avisa'], ['Seu turno', 'a Laura só se defende: escudo, ler o ombro, areia nos olhos, respirar'], ['Os arqueiros', 'só soltam quando ele fica exposto: depois de uma sequência inteira bem respondida, ou cego de areia'], ['A carne fecha', 'sem flecha nova, ele se recupera'], ['O pulso', 'alto, a ordem sai tremida e atrasa']],
    teclado: 'Teclado: 1 a 9 escolhem · Espaço golpeia · ↑ escudo · ↓ passo lateral',
    vida: 'Laura', lamina: 'A Lâmina',
    acao: { estocada: ['Estocada', 'Rápida. Abre um corte que sangra.'], corte: ['Corte', 'Lento. Mais estrago.'], mirar: ['Mirar', 'O braço, a perna ou o peito.'],
      braco: ['Braço', 'A mão da maça. Ele bate mais fraco.'], perna: ['Perna', 'O joelho. Ele fica lento.'], torso: ['Peito', 'Fundo e difícil. Cansa muito.'], voltar: ['Voltar', 'Outra coisa.'],
      finta: ['Finta', 'Ele morde. Eu vejo o que vem.'], escudo: ['Erguer o escudo', 'Segura melhor. Cansa o braço.'], manter: ['Manter o escudo', 'Cansa o braço.'],
      respirar: ['Respirar', 'Baixa o pulso.'], lamina: ['A Lâmina', 'Agora.'], soltar: ['Soltar-me', 'A mão dele no meu braço.'], curta: ['Estocada curta', 'Presa, de perto.'],
      ler: ['Ler o ombro', 'O próximo golpe não me engana.'], areia: ['Areia nos olhos', 'Um punhado de areia na cara dele.'] },
    est: { sangra: 'Sangra', braco: 'Braço ferido', perna: 'Perna ferida', firme: 'Plantado', presa: 'Presa', escudo: 'Escudo erguido', tonta: 'Tonta', cego: 'Cego', exposto: 'Exposto', lido: 'Lido' },
    tell2: { agarrar: 'A mão livre dele se abre.', peso: 'Ele planta os pés na areia e espera.', maca: 'Ele pega a maça pelo meio, com as duas mãos.', duas: 'Ele vem com duas, uma atrás da outra.' },
    mordeu2: { agarrar: 'Ele morde a finta. A mão livre vai vir.', peso: 'Ele morde a finta e planta os pés.', maca: 'Ele morde a finta. Vai pegar a maça pelo meio.', duas: 'Ele morde a finta. Vai vir com duas.' },
    escapou: 'Saio do alcance da mão por um dedo.',
    presa: 'A mão dele fecha no meu braço do escudo. Puxo, e ele não solta.',
    presaGolpe: 'Presa, não tenho para onde ir. A maça entra.',
    soltou: 'Torço o braço e saio da mão dele.',
    naoSoltou: 'Puxo. A mão não abre.',
    pesoCastiga: 'Erro, e ele está ali, plantado. O ombro dele me joga para trás.',
    pesoFim: 'Ele tira os pés da areia.',
    macaEsquiva: 'A maça sobe rente ao meu queixo.',
    macaEscudo: 'O cabo pega o escudo por baixo, e o escudo bate no meu rosto.',
    macaPega: 'A maça sobe por baixo do escudo e pega o meu queixo. O mundo gira.',
    tonta: 'O mundo ainda gira. Não consigo levantar a espada.',
    semAr: 'O ar não vem. Fico parada, a espada baixa, puxando o ar.',
    sangra: 'O corte da estocada pinga na areia.',
    abreSangra: 'A ponta abre um corte que não fecha.',
    acertoBraco: 'A lâmina pega o pulso da maça. A próxima pancada vai vir mais leve.',
    acertoPerna: 'A lâmina pega o joelho. Ele pisa torto.',
    acertoTorso: 'A lâmina entra fundo no peito dele. Ele dobra, e volta.',
    curta: 'Presa, enfio a ponta onde dá.',
    escudoUp: 'Ergo o escudo até os olhos.',
    escudoMantem: 'Mantenho o escudo. O braço arde.',
    escudoQuebra: 'O escudo racha de cima a baixo. O que passou me põe de joelhos.',
    escudoAbsorve: 'O escudo toma o golpe por mim.',
    laminaVai: ['Respiro uma vez.', 'Sei onde ele vai estar. A espada também sabe.'],
    laminaAcerta: 'Atravesso a guarda dele. A lâmina abre o corpo do ombro ao quadril.',
    laminaMeio: 'A lâmina entra pelo flanco e sai pelas costas.',
    laminaPouco: 'Ele vira o corpo a tempo. A lâmina pega só a carne do braço.',
    perdeuT: 'Laura cai', perdeu: 'A maça desce mais uma vez, e a areia vem até o meu rosto.', perdeuM: 'O braço grande me tira do chão. Não sei quando caio.', denovo: 'Lutar de novo',
    bonus: { levar: 'A espada do Simon pesa na mão. Conheço este peso.', deixar: 'A minha espada. A mão sabe onde ela termina.', comer: 'Comi na estrada, como prometi. As pernas aguentam.', agua: 'Bebi do barril que os guardas vigiaram.', pai: 'O pai está lá em cima, olhando a roda.', leu: 'Li o rosto dela. Leio o dele.' },
    tellM2: { golpe: 'O braço pequeno recua.', pesado: 'O braço grande sobe.', varredura: 'Os dois braços descem, rentes à areia.', pisao: 'Ele levanta o pé.', agarrar: 'A mão grande se abre.' },
    varrOk: 'Finco o escudo na areia. Os dois braços batem nele, e ele aguenta.',
    varrMal: 'Os braços passam por baixo de tudo e me levam junto.',
    pisaoOk: 'Saio de lado. O pé dele afunda na areia onde eu estava.',
    pisaoMal: 'O pé desce perto. O chão sobe e me derruba.',
    agarraOkM: 'A mão grande fecha no ar, onde eu estava.',
    agarraMalM: 'A mão grande fecha no meu ombro e me levanta do chão.',
    presaM: 'Presa, não tenho para onde ir. O braço pequeno entra.',
    soltouM: 'Bato o escudo nos dedos dele até a mão abrir.',
    acertoM: { golpe: 'O braço pequeno pega o meu flanco.', pesado: 'O braço grande pega o escudo e o ombro juntos.' },
    areiaOk: 'Jogo a areia na cara dele. Ele cobre os olhos com o braço pequeno e urra.',
    areiaMal: 'O vento leva a areia para o lado.',
    lerOk: 'Olho o ombro dele, não a mão.',
    cegoAberto: 'Ele não vê. O peito fica aberto para os arqueiros.',
  },
  en: {
    regrasK: [['Your turn', 'choose what Laura does. The strike lands if the tap falls when the ring closes on him'], ['His turn', 'his body warns you. ↑ Shield holds. ↓ Sidestep takes her out of the way'], ['The pulse', 'every action tires her, and breathing brings it down. With the pulse high, the windows close'], ['The Blade', 'taps right on time fill the bar. Full, one strike that nearly decides the fight'], ['Her life', 'if it runs out, Laura falls']],
    regrasM: [['His turn', 'he comes in sequences. ↑ Shield or ↓ Sidestep, as his body warns you'], ['Your turn', 'Laura only defends: shield, read the shoulder, sand in the eyes, breathe'], ['The archers', 'only loose when he is open: after a whole sequence answered well, or blinded by sand'], ['The flesh closes', 'with no new arrow, he recovers'], ['The pulse', 'high, the order comes out shaky and late']],
    teclado: 'Keyboard: 1 to 9 choose · Space strikes · ↑ shield · ↓ sidestep',
    vida: 'Laura', lamina: 'The Blade',
    acao: { estocada: ['Thrust', 'Fast. Opens a cut that bleeds.'], corte: ['Cut', 'Slow. More damage.'], mirar: ['Aim', 'The arm, the leg or the chest.'],
      braco: ['Arm', 'The mace hand. He hits softer.'], perna: ['Leg', 'The knee. He slows down.'], torso: ['Chest', 'Deep and hard. Very tiring.'], voltar: ['Back', 'Something else.'],
      finta: ['Feint', 'He bites. I see what’s coming.'], escudo: ['Raise the shield', 'Holds better. Tires the arm.'], manter: ['Keep the shield up', 'Tires the arm.'],
      respirar: ['Breathe', 'The pulse drops.'], lamina: ['The Blade', 'Now.'], soltar: ['Break free', 'His hand on my arm.'], curta: ['Short thrust', 'Held, up close.'],
      ler: ['Read the shoulder', 'The next blow won’t fool me.'], areia: ['Sand in the eyes', 'A fistful of sand in his face.'] },
    est: { sangra: 'Bleeding', braco: 'Wounded arm', perna: 'Wounded leg', firme: 'Planted', presa: 'Held', escudo: 'Shield up', tonta: 'Dazed', cego: 'Blind', exposto: 'Open', lido: 'Read' },
    tell2: { agarrar: 'His free hand opens.', peso: 'He plants his feet in the sand and waits.', maca: 'He takes the mace by the middle, with both hands.', duas: 'He comes with two, one after the other.' },
    mordeu2: { agarrar: 'He bites on the feint. The free hand is coming.', peso: 'He bites on the feint and plants his feet.', maca: 'He bites on the feint. He’ll take the mace by the middle.', duas: 'He bites on the feint. He’ll come with two.' },
    escapou: 'I get out of the hand’s reach by a finger.',
    presa: 'His hand closes on my shield arm. I pull, and he doesn’t let go.',
    presaGolpe: 'Held, I have nowhere to go. The mace gets in.',
    soltou: 'I twist my arm and get out of his hand.',
    naoSoltou: 'I pull. The hand doesn’t open.',
    pesoCastiga: 'I miss, and he’s right there, planted. His shoulder throws me back.',
    pesoFim: 'He pulls his feet out of the sand.',
    macaEsquiva: 'The mace comes up past my chin.',
    macaEscudo: 'The haft catches the shield from below, and the shield hits my face.',
    macaPega: 'The mace comes up under the shield and catches my chin. The world spins.',
    tonta: 'The world is still spinning. I can’t lift the sword.',
    semAr: 'The air won’t come. I stand still, sword low, dragging breath in.',
    sangra: 'The thrust’s cut drips onto the sand.',
    abreSangra: 'The point opens a cut that won’t close.',
    acertoBraco: 'The blade catches the mace wrist. The next blow will come lighter.',
    acertoPerna: 'The blade catches the knee. He steps crooked.',
    acertoTorso: 'The blade goes deep into his chest. He doubles over, and comes back.',
    curta: 'Held, I drive the point in wherever it goes.',
    escudoUp: 'I raise the shield to my eyes.',
    escudoMantem: 'I keep the shield up. My arm burns.',
    escudoQuebra: 'The shield splits from top to bottom. What got through puts me on my knees.',
    escudoAbsorve: 'The shield takes the blow for me.',
    laminaVai: ['I breathe once.', 'I know where he will be. So does the sword.'],
    laminaAcerta: 'I go through his guard. The blade opens his body from shoulder to hip.',
    laminaMeio: 'The blade goes in at the flank and out at the back.',
    laminaPouco: 'He turns his body in time. The blade only takes the flesh of his arm.',
    perdeuT: 'Laura falls', perdeu: 'The mace comes down once more, and the sand comes up to my face.', perdeuM: 'The big arm lifts me off the ground. I don’t know when I fall.', denovo: 'Fight again',
    bonus: { levar: 'Simon’s sword is heavy in my hand. I know this weight.', deixar: 'My own sword. My hand knows where it ends.', comer: 'I ate on the road, as I promised. My legs hold.', agua: 'I drank from the barrel the guards watched.', pai: 'Father is up there, watching the wheel.', leu: 'I read her face. I read his.' },
    tellM2: { golpe: 'The small arm draws back.', pesado: 'The big arm rises.', varredura: 'Both arms come down, close to the sand.', pisao: 'He lifts his foot.', agarrar: 'The big hand opens.' },
    varrOk: 'I dig the shield into the sand. Both arms strike it, and it holds.',
    varrMal: 'The arms go under everything and take me with them.',
    pisaoOk: 'I step aside. His foot sinks into the sand where I was.',
    pisaoMal: 'The foot comes down close. The ground rises and knocks me down.',
    agarraOkM: 'The big hand closes on the air where I was.',
    agarraMalM: 'The big hand closes on my shoulder and lifts me off the ground.',
    presaM: 'Held, I have nowhere to go. The small arm gets in.',
    soltouM: 'I beat the shield on his fingers until the hand opens.',
    acertoM: { golpe: 'The small arm catches my flank.', pesado: 'The big arm catches the shield and the shoulder together.' },
    areiaOk: 'I throw the sand in his face. He covers his eyes with the small arm and roars.',
    areiaMal: 'The wind carries the sand aside.',
    lerOk: 'I watch his shoulder, not his hand.',
    cegoAberto: 'He can’t see. His chest is open to the archers.',
  },
};

// ------------------------------------------------------------------ os corpos
const S = 'assets/sprites/';
// Kronk: as folhas do Cap. VI (grade de ceil(sqrt(frames)) colunas, virado para a direita)
const KR = {
  guarda: { src: S + 'kronk/guarda.webp', frames: 23, fps: 10, loop: true },
  golpe: { src: S + 'kronk/golpe.webp', frames: 20, impacto: 9 },
  pesado: { src: S + 'kronk/pesado.webp', frames: 23, segura: 7, impacto: 12 },
  apanha: { src: S + 'kronk/apanha.webp', frames: 12, fps: 26 },
  esquiva: { src: S + 'kronk/esquiva.webp', frames: 12, fps: 24 },
  cai: { src: S + 'kronk/cai.webp', frames: 28, fps: 20 },
};
// Laura aos 36: poses paradas, todas viradas para a direita. ax = o eixo dos pés; base = a sola (px do sprite).
const LA = {
  guarda: { src: S + 'laura/guarda.webp', ax: 168, base: 716 }, escudo: { src: S + 'laura/escudo.webp', ax: 231, base: 720 },
  lateral: { src: S + 'laura/lateral.webp', ax: 460, base: 732 }, golpe: { src: S + 'laura/golpe.webp', ax: 285, base: 687 },
  atingido: { src: S + 'laura/atingido.webp', ax: 364, base: 720 }, respirar: { src: S + 'laura/respirar.webp', ax: 129, base: 756 },
  cansado: { src: S + 'laura/cansado.webp', ax: 124, base: 723 }, impacto: { src: S + 'laura/impacto.webp', ax: 331, base: 748 },
};
const LREF = 720;
// (v10) cada pose foi gerada numa escala: k iguala o tamanho da cabeça entre as poses
Object.assign(LA.guarda, { k: 1 }); Object.assign(LA.escudo, { k: .7 }); Object.assign(LA.lateral, { k: .95 }); Object.assign(LA.golpe, { k: .93 });
Object.assign(LA.atingido, { k: .78 });
// (v17) poses novas, já salvas na escala da guarda
Object.assign(LA, { areia: { src: S + 'laura/areia.webp', ax: 232, base: 632, k: 1 }, baixo: { src: S + 'laura/baixo.webp', ax: 393, base: 685, k: 1 },
  rola: { src: S + 'laura/rola.webp', ax: 391, base: 621, k: 1 }, caida: { src: S + 'laura/caida.webp', ax: 478, base: 345, k: 1 } }); Object.assign(LA.respirar, { k: 1.03 }); Object.assign(LA.cansado, { k: .93 }); Object.assign(LA.impacto, { k: .62 });
// (v11) Kronk parado: 9 poses geradas pelo Marcelo, todas na mesma escala de corpo (o tamanho já vem acertado no arquivo)
const KP = {
  guarda: { ax: 242, base: 931 }, prep: { ax: 316, base: 896 }, golpe: { ax: 268, base: 905 }, alto: { ax: 378, base: 1234 }, pesado: { ax: 485, base: 717 },
  apanha: { ax: 241, base: 905 }, esquiva: { ax: 318, base: 858 }, joelho: { ax: 343, base: 671 }, cai: { ax: 466, base: 559 },
  meio: { ax: 297, base: 707 }, plantado: { ax: 338, base: 709 },   // (v17)
};
Object.keys(KP).forEach((k) => { KP[k].src = S + 'kronk/p/' + k + '.webp'; });
const KPREF = 931;   // altura do Kronk de pé (guarda), no sprite
const DA = 'assets/audio/duelo/';   // altura da Laura de pé, no sprite
// O Maior: poses paradas, viradas para a direita no arquivo (no jogo, viradas para ela). k = ajuste de escala da pose.
const MA = {
  guarda: { src: S + 'maior/guarda.webp', ax: 142, base: 929, k: 1 }, golpe: { src: S + 'maior/golpe.webp', ax: 349, base: 925, k: 1 },
  pesado: { src: S + 'maior/pesado.webp', ax: 398, base: 911, k: 1 }, apanha: { src: S + 'maior/apanha.webp', ax: 110, base: 929, k: 1 },
  cai: { src: S + 'maior/cai.webp', ax: 555, base: 913, k: .86 },
  // (v17) poses novas, já salvas na escala da guarda
  cego: { src: S + 'maior/cego.webp', ax: 310, base: 849, k: 1 }, pisao: { src: S + 'maior/pisao.webp', ax: 520, base: 903, k: 1 },
  varredura: { src: S + 'maior/varredura.webp', ax: 416, base: 688, k: 1 },
};
// (v17) o agarrão: os dois numa imagem só, já na posição do duelo (ela à esquerda, ele à direita; não espelha).
// meio = o ponto entre os dois quadris; px = escala da imagem para a tela
const PRESA = { kronk: { src: S + 'kronk/presa.webp', meio: 536, base: 784, px: .5 }, maior: { src: S + 'maior/presa.webp', meio: 589, base: 1060, px: .5 } };
const MREF = 934;
const load = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });

function start(root, opts) {
  const lang = opts.lang === 'en' ? 'en' : 'pt', t = Object.assign({}, TX[lang], TX2[lang]), A = opts.A, maior = opts.modo === 'maior';
  return new Promise(async (resolve) => {
    root.innerHTML = `
      <div class="d8">
        <canvas class="d8-cv" width="1280" height="720"></canvas>
        <div class="d8-hud">
          <div class="d8-ele"><b>${maior ? t.tM : t.tK}</b><i class="d8-bar d8-hpE"><em></em></i><span class="d8-est d8-estE"></span></div>
          <div class="d8-eu"><b class="d8-nome">${t.vida}</b><i class="d8-bar d8-vida"><em></em></i>
            <span class="d8-lin"><span class="d8-bpm"><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8 3 4 6.8 4c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3C21 4 23.1 8 21.6 11.6 19.5 16.4 12 21 12 21z"/></svg></span><i class="d8-bar d8-pulso"><em></em></i></span>
            ${maior ? '' : `<span class="d8-lin d8-lam"><small>${t.lamina}</small><i class="d8-bar d8-lamb"><em></em></i></span>`}
            <span class="d8-est d8-estL"></span></div>
        </div>
        <div class="d8-pop"></div>
        <div class="d8-caixa"><div class="d8-log"></div><div class="d8-menu"></div></div>
        <div class="d8-regras">
          <div class="d8-rin"><p class="eyebrow">${maior ? t.sM : t.sK}</p><h2>${maior ? t.tM : t.tK}</h2>
          <ul>${(maior ? t.regrasM : t.regrasK).map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
          <p class="d8-tec">${t.teclado}</p><button class="cta d8-go">${t.comecar}</button></div>
        </div>
      </div>`;
    const $ = (s) => root.querySelector(s);
    const cv = $('.d8-cv'), cx = cv.getContext('2d'), log = $('.d8-log'), menu = $('.d8-menu'), pop = $('.d8-pop');
    const bg = await load(opts.fundo);
    const kimg = {};   // as folhas antigas do Kronk não carregam mais: as poses paradas bastam e as folhas pesavam na memória
    const limg = {}; await Promise.all(Object.entries(LA).map(async ([k, a]) => { limg[k] = await load(a.src); }));
    const kpimg = {}; if (!maior) await Promise.all(Object.entries(KP).map(async ([k, a]) => { kpimg[k] = await load(a.src); }));
    const lamImg = maior ? null : await load('assets/images/d-lamina.jpg');
    const presaImg = await load(PRESA[maior ? 'maior' : 'kronk'].src);
    const mimg = {}; if (maior) await Promise.all(Object.entries(MA).map(async ([k, a]) => { mimg[k] = await load(a.src); }));
    // o filtro de cor do canvas custa caro a cada quadro (e trava no golpe final): assa uma vez, desenha direto
    const assa = (im, f) => { if (!im) return im; const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.filter = f; x.drawImage(im, 0, 0); return c; };
    const claro = (im) => (im ? (im._cl || (im._cl = assa(im, 'brightness(1.8) saturate(.2)'))) : im);
    for (const k in kpimg) kpimg[k] = assa(kpimg[k], 'saturate(.85) contrast(1.06)');
    for (const k in mimg) mimg[k] = assa(mimg[k], 'contrast(1.08) brightness(.92)');
    const bgG = assa(bg, 'grayscale(1) contrast(1.25)');
    // aquece o que o golpe final usa, durante a introdução
    { const fila = [].concat(Object.values(kpimg), Object.values(mimg)); const aquece = () => { const im = fila.shift(); if (im) { claro(im); setTimeout(aquece, 60); } }; setTimeout(aquece, 400); }
    if (A && A.buf) ['acerta-leve', 'kronk-apanha1', 'kronk-apanha2', 'kronk-esquiva', 'kronk-golpe', 'kronk-mata2', 'kronk-pesado', 'kronk-respira2', 'tambores-furia-loop', 'musica-loop'].forEach((n) => A.buf(DA + n + '.mp3'));
    if (A && A.buf) ['corte', 'escudo-impacto-1', 'escudo-impacto-2', 'golpe-ar', 'virote-impacto', 'virotes', 'espada-desembainha'].forEach((n) => A.buf('assets/audio/sfx/' + n + '.mp3'));

    // ------------------------------------------------------------ estado
    const R = { leituras: 0, laterais: 0, marcas: 0, recomecos: 0, rodeou: false, golpesRecebidos: 0, deslizes: 0, respostas: 0, quedas: 0, t0: performance.now() };
    let bpm = opts.bpm || 52, base = opts.bpm || 52;
    if (BOT()) window.__D8R = R;
    const HPMAX = maior ? (opts.rajadas || 4) : 180;
    let hp = HPMAX, fase = 1, marcas = 0, hpFase = HPMAX, revelado = null, rodeando = false, ombroUsado = 0, fimPronto = false, acabou = false;
    let poseL = 'guarda', poseLt = 0, kAnim = { nome: 'guarda', f: 0, t: 0 }, ring = null, shake = 0, flash = 0, rajadaFx = 0, escuro = maior ? .12 : 0;
    const BB = opts.bonus || {};
    let VMAX = 100 + (BB.comer ? 12 : 0) + (BB.agua ? 12 : 0), vida = VMAX, lamina = !maior && BB.espada === 'levar' ? 34 : 0, primeiroLido = !maior && !!BB.leu;
    let escudoUp = false, escudoHP = 0, presa = false, tonta = false, sangraT = 0, bracoT = 0, pernaT = 0, pesoT = 0, macaCD = 0, cegoT = 0, lidoM = false, areiaCD = 0, perdido = false;
    const janelaK = () => clamp(1.65 - (bpm - 52) / 95, .45, 1.65);

    // ------------------------------------------------------------ som
    const sfx = (n, v = .7, r) => A && A.sfx && A.sfx(n, v, r);
    const grunhe = (n, v = .8) => { if (A && A.ctx && A.on) A.once(DA + n + '.mp3', v); };
    let musica = null, furia = null;
    const tocaLoop = (n, v) => (A && A.ctx && A.loop ? A.loop(DA + n + '.mp3', v, 2.5).then((h) => { if (acabou && h) A.stop(h, .5); return h; }) : Promise.resolve(null));
    let batT = 0;
    const batidas = (dt) => { batT -= dt; if (batT <= 0) { batT = 60 / bpm; if (A && A.on && bpm >= 66) A.batida(clamp((bpm - 60) / 100, 0, 1)); } };

    // ------------------------------------------------------------ texto
    const linha = (s, cls = '') => { log.insertAdjacentHTML('beforeend', `<p class="${cls}">${s}</p>`); while (log.children.length > 4) log.firstElementChild.remove(); };
    const popTxt = (s, cls = '') => { pop.innerHTML = `<span class="${cls}">${s}</span>`; pop.classList.remove('on'); void pop.offsetWidth; pop.classList.add('on'); };
    const espera = (ms) => new Promise((r) => setTimeout(r, BOT() ? Math.min(ms, 30) : ms));
    let estAnt = '';
    const hud = () => {
      $('.d8-hpE em').style.width = (100 * hp / HPMAX) + '%';
      $('.d8-vida em').style.width = (100 * vida / VMAX) + '%';
      $('.d8-pulso em').style.width = clamp((bpm - 48) / 122, 0, 1) * 100 + '%';
      if (!maior) { $('.d8-lamb em').style.width = lamina + '%'; root.classList.toggle('d8-cheia', lamina >= 100); }
      root.classList.toggle('d8-alto', bpm >= 110);
      const E = [], L = [];
      if (sangraT > 0) E.push(['sangra', 'mal']); if (bracoT > 0) E.push(['braco', 'bom']); if (pernaT > 0) E.push(['perna', 'bom']); if (pesoT > 0) E.push(['firme', 'frio']);
      if (cegoT > 0) E.push(['cego', 'bom']); if (aberto) E.push(['exposto', 'bom']); if (revelado || lidoM) E.push(['lido', 'frio']);
      if (escudoUp) L.push(['escudo', 'bom']); if (presa) L.push(['presa', 'mal']); if (tonta) L.push(['tonta', 'mal']);
      const htm = (xs) => xs.map(([k, c]) => `<i class="${c}">${t.est[k]}</i>`).join('');
      const novo = htm(E) + '|' + htm(L);
      if (novo !== estAnt) { estAnt = novo; $('.d8-estE').innerHTML = htm(E); $('.d8-estL').innerHTML = htm(L); }
    };

    // ------------------------------------------------------------ desenho
    const W = 1280, H = 720, CHAO = 600, LX = 430, KX = 850;
    const KH = maior ? 545 : 465, LH = 352;   // Laura ~1,75 m; Kronk ~2,30 m (465/352 ≈ 1,32)
    // os dois corpos se mexem com mola: x/y deslocam, r inclina, hit = clarão branco no corpo
    const corpo = () => ({ x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0, hit: 0 });
    const CL = corpo(), CE = corpo();
    const empurra = (c, dx, ms = 260, dy = 0, dr = 0) => { c.tx = dx; c.ty = dy; c.tr = dr; setTimeout(() => { c.tx = 0; c.ty = 0; c.tr = 0; }, BOT() ? 5 : ms); };
    // câmera: zoom de soco, parada no impacto (hitstop), câmera lenta, faixas de cinema
    let zoom = 0, zoomX = W / 2, zoomY = H / 2, parada = 0, lento = 1, faixas = 0, faixasAlvo = 0, cinza = 0, T = 0;
    const soco = (z, x, y, para = .07) => { zoom = Math.max(zoom, z); zoomX = x; zoomY = y; parada = Math.max(parada, BOT() ? 0 : para); };
    // partículas: faíscas no escudo, areia nos pés, o risco da lâmina, flechas
    let parts = [];
    const faisca = (x, y, n = 18, cor = '255,214,150') => { for (let i = 0; i < n; i++) { const a = rnd(-2.6, -.4) + (Math.random() < .5 ? 0 : Math.PI), v = rnd(260, 720); parts.push({ k: 'f', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: rnd(.18, .45), t: 0, cor }); } };
    const areia = (x, n = 22, forca = 1) => { for (let i = 0; i < n; i++) parts.push({ k: 'a', x: x + rnd(-60, 60) * forca, y: CHAO + rnd(-4, 6), vx: rnd(-160, 160) * forca, vy: rnd(-180, -40) * forca, r: rnd(10, 28) * forca, vida: rnd(.7, 1.4), t: 0 }); };
    const risco = (x, y, ang = -.5) => parts.push({ k: 'r', x, y, ang, vida: .32, t: 0 });
    // sangue: gotas que voam e caem, e mancham a areia (as manchas ficam até o fim)
    let manchas = [];
    const sangue = (x, y, n = 26, dir = 1, forca = 1) => { for (let i = 0; i < n; i++) { const a = rnd(-1.1, .35), v = rnd(180, 620) * forca; parts.push({ k: 's', x: x + rnd(-10, 10), y: y + rnd(-14, 14), vx: Math.cos(a) * v * dir, vy: Math.sin(a) * v, r: rnd(2, 5.5), vida: rnd(.6, 1.1), t: 0 }); } };
    const onda = (x, y, cor = '255,240,220', r1 = 150) => parts.push({ k: 'o', x, y, cor, r1, vida: .38, t: 0 });
    let rastro = 0, respingo = 0;
    const flechas = () => { for (let i = 0; i < 46; i++) { const x0 = rnd(-200, 200), d = rnd(0, .55); parts.push({ k: 'v', x: KX - 520 + x0, y: -40 - rnd(0, 160), tx: KX + rnd(-130, 110), ty: CHAO - KH * rnd(.25, .85), t: -d, vida: .55 }); } };
    const kFrame = (nome, f) => {
      const a = KR[nome], im = kimg[nome]; if (!im) return null;
      const cols = Math.ceil(Math.sqrt(a.frames)), rows = Math.ceil(a.frames / cols), fw = im.width / cols, fh = im.height / rows;
      const k = clamp(Math.floor(f), 0, a.frames - 1);
      return { im, sx: (k % cols) * fw, sy: Math.floor(k / cols) * fh, fw, fh };
    };
    // o Maior: a pose parada do momento + respiração e inclinação
    let poseE = null;   // (v17) pose especial do inimigo durante um golpe (meio, varredura, pisao)
    const kronkPose = () => {
      const n = kAnim.nome, f = kAnim.f;
      if (poseE && KP[poseE]) return poseE;
      if (n === 'guarda' && pesoT > 0) return 'plantado';
      if (n === 'golpe') return f < KR.golpe.impacto - .5 ? 'prep' : 'golpe';
      if (n === 'pesado') return f < KR.pesado.impacto - .5 ? 'alto' : 'pesado';
      if (n === 'cai') return f < KR.cai.frames * .55 ? 'joelho' : 'cai';
      return KP[n] ? n : 'guarda';
    };
    const maiorPose = () => {
      if (poseE && MA[poseE]) return poseE;
      if (kAnim.nome === 'guarda' && cegoT > 0) return 'cego';
      return kAnim.nome === 'esquiva' ? 'guarda' : MA[kAnim.nome] ? kAnim.nome : 'guarda';
    };
    const desenhaInimigo = () => {
      cx.save(); cx.translate(KX + CE.x, CHAO + CE.y); cx.rotate(CE.r); cx.scale(-1, 1);
      if (maior) {
        const n = maiorPose(), a = MA[n], im = mimg[n];
        if (im) {
          const s = KH / MREF * a.k, resp = n === 'cai' ? 1 : 1 + Math.sin(T * 1.7) * .012;
          cx.drawImage(im, -a.ax * s, -a.base * s * resp, im.width * s, im.height * s * resp);
          if (CE.hit > 0) { cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = CE.hit * .2; cx.drawImage(claro(im), -a.ax * s, -a.base * s * resp, im.width * s, im.height * s * resp); }
          cx.restore(); return;
        }
      }
      const kn = kronkPose(), ka = KP[kn], ki = kpimg[kn];
      if (ki) {
        const s = KH / KPREF, resp = kn === 'cai' || kn === 'joelho' ? 1 : 1 + Math.sin(T * 1.9) * .014;
        cx.drawImage(ki, -ka.ax * s, -ka.base * s * resp, ki.width * s, ki.height * s * resp);
        if (CE.hit > 0) { cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = CE.hit * .25; cx.drawImage(claro(ki), -ka.ax * s, -ka.base * s * resp, ki.width * s, ki.height * s * resp); }
        cx.restore(); return;
      }
      const fr = kFrame(kAnim.nome, kAnim.f);
      if (fr) {
        const s = KH / fr.fh;
        cx.filter = 'saturate(.8)';
        cx.drawImage(fr.im, fr.sx, fr.sy, fr.fw, fr.fh, -fr.fw * s / 2, -fr.fh * s + 6, fr.fw * s, fr.fh * s);
        if (CE.hit > 0) { cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = CE.hit * .2; cx.filter = 'brightness(1.8) saturate(.2)'; cx.drawImage(fr.im, fr.sx, fr.sy, fr.fw, fr.fh, -fr.fw * s / 2, -fr.fh * s + 6, fr.fw * s, fr.fh * s); }
      } else { cx.fillStyle = '#4a4540'; cx.fillRect(-70, -KH * .8, 140, KH * .8); }
      cx.restore();
    };
    const desenhaLaura = () => {
      const L = LA[poseL] || LA.guarda, li = limg[poseL] || limg.guarda;
      if (rastro > 0 && li) {   // o passo lateral deixa o corpo para trás por um instante
        const s0 = LH / LREF * (L.k || 1);
        for (let g = 1; g <= 3; g++) { cx.save(); cx.globalAlpha = rastro * (.32 - g * .08); cx.translate(LX + CL.x + g * 34 * rastro, CHAO + CL.y); cx.drawImage(li, -L.ax * s0, -L.base * s0, li.width * s0, li.height * s0); cx.restore(); }
      }
      cx.save(); cx.translate(LX + CL.x, CHAO + CL.y); cx.rotate(CL.r);
      if (li) {
        const s = LH / LREF * (L.k || 1), resp = poseL === 'respirar' || poseL === 'cansado' ? 1 + Math.sin(T * (bpm / 60) * 3.14) * .008 : 1;
        cx.drawImage(li, -L.ax * s, -L.base * s * resp, li.width * s, li.height * s * resp);
      } else { cx.fillStyle = '#c9b48a'; cx.fillRect(-30, -LH, 60, LH); }
      cx.restore();
    };
    const desenhaParts = (dt) => {
      parts = parts.filter((p) => (p.t += dt) < p.vida);
      for (const p of parts) {
        const u = p.t / p.vida;
        if (p.k === 'f') { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 900 * dt; cx.strokeStyle = `rgba(${p.cor},${1 - u})`; cx.lineWidth = 2.2; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(p.x - p.vx * .025, p.y - p.vy * .025); cx.stroke(); }
        else if (p.k === 'a') { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 120 * dt; p.vx *= .97; const r = p.r * (1 + u * 1.6); cx.fillStyle = `rgba(196,160,112,${.32 * (1 - u)})`; cx.beginPath(); cx.arc(p.x, p.y, r, 0, 6.283); cx.fill(); }
        else if (p.k === 'r') { cx.save(); cx.translate(p.x, p.y); cx.rotate(p.ang); const L = 260 * Math.min(1, u * 3); cx.strokeStyle = `rgba(255,248,230,${.95 * (1 - u)})`; cx.lineWidth = 5 * (1 - u) + 1; cx.beginPath(); cx.moveTo(-L / 2, 0); cx.quadraticCurveTo(0, -24, L / 2, 0); cx.stroke(); cx.strokeStyle = `rgba(255,230,180,${.25 * (1 - u)})`; cx.lineWidth = 14 * (1 - u) + 2; cx.stroke(); cx.restore(); }
        else if (p.k === 's') { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 1500 * dt; cx.fillStyle = `rgba(120,8,6,${.95 * (1 - u * .4)})`; cx.beginPath(); cx.ellipse(p.x, p.y, p.r * 1.5, p.r, Math.atan2(p.vy, p.vx), 0, 6.283); cx.fill(); if (p.y >= CHAO + rnd(-6, 14)) { manchas.push({ x: p.x, y: Math.min(p.y, CHAO + 18), r: p.r * rnd(1.6, 3) }); if (manchas.length > 160) manchas.shift(); p.t = p.vida; } }
        else if (p.k === 'o') { const r = p.r1 * (.2 + u * .9); cx.strokeStyle = `rgba(${p.cor},${.8 * (1 - u)})`; cx.lineWidth = 7 * (1 - u) + 1; cx.beginPath(); cx.arc(p.x, p.y, r, 0, 6.283); cx.stroke(); }
        else if (p.k === 'v') { if (p.t < 0) continue; const k = Math.min(1, p.t / .38); const x = p.x + (p.tx - p.x) * k, y = p.y + (p.ty - p.y) * k; const ang = Math.atan2(p.ty - p.y, p.tx - p.x); cx.save(); cx.translate(x, y); cx.rotate(ang); cx.strokeStyle = `rgba(40,30,22,${k < 1 ? .95 : .95 * (1 - (p.t - .38) / .17)})`; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(-34, 0); cx.lineTo(0, 0); cx.stroke(); cx.fillStyle = 'rgba(220,220,210,.9)'; cx.fillRect(-36, -2, 6, 4); cx.restore(); }
      }
    };
    const desenha = (dt) => {
      cx.save(); cx.clearRect(0, 0, W, H);
      // câmera
      if (zoom > .001) { cx.translate(zoomX, zoomY); cx.scale(1 + zoom, 1 + zoom); cx.translate(-zoomX, -zoomY); }
      if (shake > 0) cx.translate(rnd(-1, 1) * shake * 14, rnd(-1, 1) * shake * 9);
      if (bg) { const s = Math.max(W / bg.width, H / bg.height) * 1.04; cx.drawImage(bg, (W - bg.width * s) / 2 - (CL.x - CE.x) * .02, (H - bg.height * s) / 2, bg.width * s, bg.height * s);
        if (cinza > .01 && bgG) { cx.globalAlpha = Math.min(1, cinza); cx.drawImage(bgG, (W - bg.width * s) / 2 - (CL.x - CE.x) * .02, (H - bg.height * s) / 2, bg.width * s, bg.height * s); cx.globalAlpha = 1; } }
      cx.fillStyle = `rgba(10,6,4,${.22 + escuro})`; cx.fillRect(0, 0, W, H);
      const gr = cx.createLinearGradient(0, CHAO - 90, 0, H); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.6)'); cx.fillStyle = gr; cx.fillRect(0, CHAO - 90, W, H);
      // o sangue na areia
      for (const m of manchas) { cx.fillStyle = 'rgba(70,6,4,.55)'; cx.beginPath(); cx.ellipse(m.x, m.y, m.r * 1.8, m.r * .55, 0, 0, 6.283); cx.fill(); }
      // sombras no chão
      cx.fillStyle = 'rgba(0,0,0,.4)'; cx.beginPath(); cx.ellipse(LX + CL.x, CHAO + 4, 78, 12, 0, 0, 6.283); cx.fill();
      cx.beginPath(); cx.ellipse(KX + CE.x, CHAO + 6, maior ? 170 : 115, 17, 0, 0, 6.283); cx.fill();
      // quem ataca fica na frente
      if (presa && presaImg && !perdido) {   // (v17) presa: os dois numa imagem só
        const P = PRESA[maior ? 'maior' : 'kronk'], s = P.px, mx = (LX + KX) / 2 + (CL.x + CE.x) / 2, resp = 1 + Math.sin(T * 2.2) * .008;
        cx.save(); cx.translate(mx, CHAO + CE.y); cx.rotate(CE.r * .5);
        cx.drawImage(presaImg, -P.meio * s, -P.base * s * resp, presaImg.width * s, presaImg.height * s * resp);
        if (CE.hit > 0) { cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = CE.hit * .2; cx.drawImage(claro(presaImg), -P.meio * s, -P.base * s * resp, presaImg.width * s, presaImg.height * s * resp); }
        cx.restore();
      } else if (poseL === 'golpe' || poseL === 'baixo') { desenhaInimigo(); desenhaLaura(); } else { desenhaLaura(); desenhaInimigo(); }
      cx.filter = 'none';
      desenhaParts(dt);
      // o anel
      if (ring) {
        const p = clamp((performance.now() - ring.t0) / ring.dur, 0, 1.25), r = ring.r1 + (ring.r0 - ring.r1) * (1 - Math.min(1, p));
        const alvoX = ring.sobre === 'ele' ? KX : LX, alvoY = CHAO - (ring.sobre === 'ele' ? KH * .55 : LH * .55);
        cx.lineWidth = 3; cx.strokeStyle = 'rgba(240,220,190,.55)'; cx.beginPath(); cx.arc(alvoX, alvoY, ring.r1, 0, 6.283); cx.stroke();
        cx.lineWidth = 5; cx.strokeStyle = ring.sobre === 'ele' ? 'rgba(242,220,192,.95)' : 'rgba(200,70,58,.95)'; cx.beginPath(); cx.arc(alvoX, alvoY, Math.max(4, r), 0, 6.283); cx.stroke();
        if (p > .82 && p <= 1) { cx.fillStyle = `rgba(255,240,215,${(p - .82) * 1.6})`; cx.beginPath(); cx.arc(alvoX, alvoY, ring.r1, 0, 6.283); cx.fill(); }
      }
      if (flash > 0) { cx.fillStyle = `rgba(150,10,8,${flash * .45})`; cx.fillRect(-40, -40, W + 80, H + 80); }
      cx.restore();
      // por cima da câmera: o pulso nas bordas e as faixas de cinema
      if (bpm >= 100) {
        const ph = (T * bpm / 60) % 1, a = clamp((bpm - 100) / 70, 0, 1) * (.35 + .4 * Math.max(0, 1 - ph * 3));
        const vg = cx.createRadialGradient(W / 2, H / 2, H * .38, W / 2, H / 2, H * .95); vg.addColorStop(0, 'rgba(120,0,0,0)'); vg.addColorStop(1, `rgba(120,8,6,${a})`); cx.fillStyle = vg; cx.fillRect(0, 0, W, H);
      }
      if (respingo > .01) {
        const g1 = cx.createRadialGradient(W / 2, H / 2, H * .25, W / 2, H / 2, H * .9); g1.addColorStop(0, 'rgba(90,0,0,0)'); g1.addColorStop(1, `rgba(110,4,2,${respingo * .85})`); cx.fillStyle = g1; cx.fillRect(0, 0, W, H);
        cx.fillStyle = `rgba(100,4,2,${respingo * .8})`;
        for (const b of borrao) { cx.beginPath(); cx.ellipse(b.x, b.y, b.r * 1.3, b.r, b.a, 0, 6.283); cx.fill(); }
      }
      if (faixas > .01) { cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H * .11 * faixas); cx.fillRect(0, H - H * .11 * faixas, W, H * .11 * faixas); }
    };
    let borrao = [];
    const mancharTela = () => { borrao = []; for (let i = 0; i < 9; i++) { const lado = i % 4; const x = lado === 0 ? rnd(0, 120) : lado === 1 ? W - rnd(0, 120) : rnd(0, W); const y = lado < 2 ? rnd(0, H) : lado === 2 ? rnd(0, 90) : H - rnd(0, 90); borrao.push({ x, y, r: rnd(18, 60), a: rnd(0, 3) }); } respingo = 1; };
    let last = performance.now();
    const mola = (c, dt) => { const k = Math.min(1, dt * 16); c.x += (c.tx - c.x) * k; c.y += (c.ty - c.y) * k; c.r += (c.tr - c.r) * k; c.hit = Math.max(0, c.hit - dt * 5); };
    const loop = (now) => {
      if (acabou) return;
      let dt = Math.min(.05, (now - last) / 1000); last = now;
      if (parada > 0) { parada -= dt; desenha(0); requestAnimationFrame(loop); return; }
      dt *= lento; T += dt;
      const a = KR[kAnim.nome] || KR.guarda;
      if (kAnim.play) { kAnim.f += dt * (kAnim.fps || a.fps || 26); if (kAnim.ate != null && kAnim.f >= kAnim.ate) { kAnim.f = kAnim.ate; kAnim.play = false; if (kAnim.fim) { const f = kAnim.fim; kAnim.fim = null; f(); } } else if (kAnim.f >= a.frames) { if (a.loop) kAnim.f = 0; else { kAnim.f = a.frames - 1; kAnim.play = false; if (kAnim.fim) { const f = kAnim.fim; kAnim.fim = null; f(); } } } }
      if (poseLt > 0) { poseLt -= dt; if (poseLt <= 0) poseL = escudoUp ? 'escudo' : bpm >= 120 ? 'cansado' : 'guarda'; }
      mola(CL, dt); mola(CE, dt);
      zoom = Math.max(0, zoom - dt * .35); faixas += (faixasAlvo - faixas) * Math.min(1, dt * 5); cinza = Math.max(0, cinza - dt * .25);
      rastro = Math.max(0, rastro - dt * 2.4); respingo = Math.max(0, respingo - dt * .55);
      if (fase >= 2 && !maior && Math.random() < dt * 1.4) sangue(LX + CL.x + 30, CHAO - LH * .6, 2, -1, .25);   // o braço dela pinga
      shake = Math.max(0, shake - dt * 2.2); flash = Math.max(0, flash - dt * 1.4); rajadaFx = Math.max(0, rajadaFx - dt * .9);
      bpm += (base - bpm) * dt * .04; batidas(dt); hud(); desenha(dt); requestAnimationFrame(loop);
    };
    const anima = (nome, o = {}) => new Promise((res) => { kAnim = { nome, f: o.de || 0, play: true, ate: o.ate, fps: o.fps, fim: res }; if (!o.ate && KR[nome].loop) res(); });
    const guarda = () => { kAnim = { nome: 'guarda', f: 0, play: true }; };
    const pose = (p, dur = .7) => { poseL = p; poseLt = dur; };
    // os momentos, com corpo: cada um junta pose, mola, partículas, câmera e som
    const MOM = {
      golpeDela: (forte, p = 'golpe') => { pose(p, .6); empurra(CL, 120, 280, 0, .02); setTimeout(() => { risco(KX - 10, CHAO - KH * .55, forte ? -.7 : -.35); CE.hit = 1; empurra(CE, 46, 240, 0, .05); soco(forte ? .07 : .04, KX - 120, CHAO - KH * .5, forte ? .13 : .07); sangue(KX - 40, CHAO - KH * rnd(.4, .65), forte ? 40 : 22, 1, forte ? 1.2 : .9); onda(KX - 40, CHAO - KH * .55, '255,235,215', forte ? 190 : 120); if (forte) { lento = .35; setTimeout(() => { lento = 1; }, BOT() ? 0 : 260); } }, BOT() ? 0 : 110); },
      erroDela: (p = 'golpe') => { pose(p, .5); empurra(CL, 90, 240); empurra(CE, 70, 300, 0, .06); },
      escudo: (forte) => { onda(LX + 70, CHAO - LH * .55, '255,214,150', forte ? 170 : 110); pose(forte ? 'impacto' : 'escudo', forte ? .9 : .7); empurra(CL, forte ? -46 : -24, 220, forte ? 6 : 0); empurra(CE, -90, 200, 0, -.05); faisca(LX + 70, CHAO - LH * .62, forte ? 30 : 18); soco(forte ? .045 : .025, LX + 60, CHAO - LH * .55, forte ? .09 : .05); if (forte) areia(LX + CL.x, 14, .7); },
      lateral: () => { rastro = 1; pose(maior ? 'rola' : 'lateral', .8); empurra(CL, -95, 420, 0, -.03); empurra(CE, -150, 360, 0, -.08); setTimeout(() => areia(KX - 160, 26, 1.1), BOT() ? 0 : 160); },
      marca: () => { sangue(LX + 40, CHAO - LH * .55, 30, -1, 1); mancharTela(); pose('atingido', .9); empurra(CL, -70, 300, 4, -.06); empurra(CE, -110, 220, 0, -.06); faisca(LX + 40, CHAO - LH * .5, 10, '255,120,90'); soco(.03, LX, CHAO - LH * .5, .08); },
      ataqueDele: () => { empurra(CE, 26, 500, 0, .04); },
    };

    // ------------------------------------------------------------ entrada: o anel
    // espera um toque (Espaço ou botão). Devolve o erro em segundos (negativo = cedo), ou null se não houve toque.
    let ouvinte = null;
    const anel = (sobre, dur, botoes, certo) => new Promise((res) => {
      ring = { sobre, t0: performance.now(), dur: dur * 1000, r0: 170, r1: 44 };
      menu.innerHTML = botoes.map((b) => `<button class="d8-b ${b.cls || ''}" data-k="${b.k}">${b.rot}</button>`).join('');
      let feito = false;
      const fecha = (k) => { if (feito) return; feito = true; const err = (performance.now() - ring.t0) / 1000 - dur; ring = null; menu.innerHTML = ''; ouvinte = null; res({ k, err }); };
      menu.querySelectorAll('.d8-b').forEach((b) => b.onpointerdown = (e) => { e.preventDefault(); fecha(b.dataset.k); });
      ouvinte = (k) => { if (botoes.some((b) => b.k === k)) fecha(k); };
      setTimeout(() => { if (!feito) { feito = true; ring = null; menu.innerHTML = ''; ouvinte = null; res({ k: null, err: null }); } }, (dur + .45) * 1000);
      if (BOT()) { const ruim = Math.random() < (window.__JOGO_BOT_RUIM || 0); setTimeout(() => fecha(ruim && Math.random() < .5 ? botoes[0].k : certo || botoes[window.__JOGO_BOT_LADO === 'escudo' ? 0 : botoes.length - 1].k), dur * 1000 * (ruim ? .55 : .98)); }
    });
    const onKey = (e) => {
      if (!ouvinte && !menuOuvinte) return;
      const mapa = { ' ': 'agora', ArrowUp: 'escudo', ArrowDown: 'lateral' };
      if (ouvinte && mapa[e.key]) { e.preventDefault(); ouvinte(mapa[e.key]); return; }
      if (menuOuvinte && /^[1-9]$/.test(e.key)) { e.preventDefault(); menuOuvinte(+e.key - 1); }
    };
    let menuOuvinte = null;
    addEventListener('keydown', onKey);

    // ------------------------------------------------------------ o menu dela
    const escolhe = (ops) => new Promise((res) => {
      menu.innerHTML = `<p class="d8-q">${t.pergunta}</p>` + ops.map((o, k) => `<button class="d8-op ${o.cls || ''}" data-k="${o.k}"><span class="k">${k + 1}</span><b>${o.nome}</b><small>${o.desc}</small></button>`).join('');
      const fim = (k) => { menuOuvinte = null; menu.innerHTML = ''; res(k); };
      menu.querySelectorAll('.d8-op').forEach((b) => b.onclick = () => fim(b.dataset.k));
      menuOuvinte = (i) => { const o = ops[i]; if (o) fim(o.k); };
      if (BOT()) { const pref = ['chamar', 'tremido', 'soltar', fimPronto ? 'rodear' : 'lamina', 'lamina', 'estocada', 'respirar']; setTimeout(() => fim((window.__JOGO_BOT_ALEA && Math.random() < .6 ? ops[Math.floor(Math.random() * ops.length)] : pref.map((p) => ops.find((o) => o.k === p)).find(Boolean) || ops[0]).k), 20); }
    });

    const julga = (err, jan) => (err == null ? 'nada' : Math.abs(err) <= jan * .45 ? 'perfeito' : Math.abs(err) <= jan ? 'bom' : err < 0 ? 'cedo' : 'tarde');

    // ------------------------------------------------------------ comum (v16)
    const B = opts.bonus || {};
    const ganha = (x) => { if (maior) return; lamina = Math.min(100, lamina + x * (B.pai ? 1.3 : 1) * (bpm >= 120 ? .5 : 1)); };
    const kAtk = (nome, dur) => { kAnim = { nome, f: 0, play: true, ate: KR[nome].impacto, fps: KR[nome].impacto / dur }; };
    const kSolta = (nome) => { kAnim = { nome, f: KR[nome].impacto, play: true, fps: 30, fim: guarda }; };
    const solta = () => { if (escudoUp) { escudoUp = false; escudoHP = 0; } };
    // o golpe que chega nela: o escudo erguido toma primeiro; o que passa vira vida
    const leva = (x, txt) => {
      if (!maior && bracoT > 0) x = Math.round(x * .6);
      if (escudoUp) {
        if (x >= escudoHP) { x -= escudoHP; escudoUp = false; escudoHP = 0; tonta = true; linha(t.escudoQuebra, 'mal'); MOM.escudo(true); sfx('escudo-impacto-2', 1); shake = .8; }
        else { escudoHP -= x; x = 0; linha(t.escudoAbsorve); MOM.escudo(true); sfx('escudo-impacto-1', .9); shake = .35; }
      }
      if (x > 0) { vida = Math.max(0, vida - x); R.marcas++; R.golpesRecebidos++; MOM.marca(); sfx('escudo-impacto-2', .9); shake = .6; flash = .6; bpm += 7; if (txt) linha(txt, 'mal'); popTxt(t.rot.marca, 'mal'); }
    };
    const perdeu = () => vida <= 0;
    const derrota = async () => {
      perdido = true; menu.innerHTML = ''; ring = null; pose(limg.caida ? 'caida' : 'atingido', 999); faixasAlvo = 1; cinza = 1; lento = .6; flash = 1;
      sangue(LX + 30, CHAO - LH * .5, 50, -1, 1.1); empurra(CL, -60, 900, 30, -.2);
      linha(maior ? t.perdeuM : t.perdeu, 'cena'); await espera(1900);
      const ov = document.createElement('div'); ov.className = 'd8-regras d8-perdeu';
      ov.innerHTML = `<div class="d8-rin"><h2>${t.perdeuT}</h2><button class="cta d8-denovo">${t.denovo}</button></div>`;
      root.querySelector('.d8').appendChild(ov);
      const de = () => { encerra(); start(root, Object.assign({}, opts, { derrotas: (opts.derrotas || 0) + 1 })).then(resolve); };
      ov.querySelector('.d8-denovo').onclick = de;
      if (BOT()) setTimeout(de, 10);
    };
    const abertura = async () => {
      const ls = [];
      if (!maior && B.espada === 'levar') ls.push(t.bonus.levar); else if (!maior && B.espada === 'deixar') ls.push(t.bonus.deixar);
      if (B.comer) ls.push(t.bonus.comer); if (B.agua) ls.push(t.bonus.agua);
      if (!maior && B.pai) ls.push(t.bonus.pai); if (!maior && B.leu) ls.push(t.bonus.leu);
      for (const l of ls.slice(0, 3)) { linha(l, 'ler'); await espera(1300); }
    };

    // ------------------------------------------------------------ KRONK
    const tipoDele = () => {
      if (rodeando) return 'pesado';
      if (fimPronto && Math.random() < .6) return 'pesado';
      if (fase === 1) return Math.random() < .4 ? 'pesado' : 'golpe';
      const pool = [['golpe', 35], ['pesado', 30], ['agarrar', presa ? 0 : 15], ['peso', pesoT > 0 ? 0 : 10], ['maca', macaCD > 0 ? 0 : 12], ['duas', fase === 3 ? 18 : 0]];
      let r = Math.random() * pool.reduce((s, p) => s + p[1], 0);
      for (const [k, w] of pool) { if ((r -= w) < 0) return k; }
      return 'golpe';
    };
    const lentoK = () => (pernaT > 0 ? 1.25 : 1);
    const ATK = {
      estocada: { dur: .95, jan: .1, d: [9, 6], c: 4 }, corte: { dur: 1.25, jan: .085, d: [15, 10], c: 7 },
      braco: { dur: 1.05, jan: .09, d: [6, 4], c: 6 }, perna: { dur: 1.05, jan: .09, d: [6, 4], c: 6 }, torso: { dur: 1.3, jan: .07, d: [19, 13], c: 10 },
      curta: { dur: .8, jan: .12, d: [4, 3], c: 3 },
    };
    const opK = (k, cls) => ({ k, nome: t.acao[k][0], desc: t.acao[k][1], cls });
    const turnoDela = async () => {
      R.turnos = (R.turnos || 0) + 1;
      if (tonta) { tonta = false; linha(t.tonta, 'mal'); pose('cansado', 1.2); await espera(1300); return; }
      if (bpm >= 168) { linha(t.semAr, 'mal'); bpm -= 24; pose('respirar', 1.3); await espera(1400); return; }
      let ops;
      if (presa) ops = [opK('soltar'), opK('curta')];
      else {
        ops = [opK('estocada'), opK('corte'), opK('mirar'), opK('finta'), opK(escudoUp ? 'manter' : 'escudo'), opK('respirar')];
        if (fase === 3) ops.push({ k: 'rodear', nome: t.golpes.rodear[0], desc: t.golpes.rodear[1], cls: 'risco' });
        if (lamina >= 100) ops.unshift(opK('lamina', 'lamina'));
      }
      let k = await escolhe(ops);
      if (k === 'mirar') { k = await escolhe([opK('braco'), opK('perna'), opK('torso'), opK('voltar', 'voltar')]); if (k === 'voltar') return turnoDela(); }
      if (k !== 'escudo' && k !== 'manter') solta();
      if (k === 'respirar') { bpm = Math.max(base, bpm - 16); pose('respirar', 1.2); linha(t.respirouM); await espera(900); return; }
      if (k === 'finta') { revelado = tipoDele(); R.leituras++; bpm += 3; ganha(6); pose('guarda', .4); empurra(CL, 40, 200); linha((t.tell.mordeu[revelado] || t.mordeu2[revelado]), 'ler'); await espera(900); return; }
      if (k === 'escudo' || k === 'manter') { if (!escudoUp) { escudoUp = true; escudoHP = 30; bpm += 5; linha(t.escudoUp); } else { bpm += 4; linha(t.escudoMantem); } pose('escudo', 1); sfx('escudo-impacto-1', .4); await espera(800); return; }
      if (k === 'rodear') { rodeando = true; R.rodeou = true; bpm += 3; linha(t.rodear, 'ler'); await espera(900); return; }
      if (k === 'soltar') {
        bpm += 4; const r = await anel('eu', .8, [{ k: 'agora', rot: t.agora, cls: 'agora' }]);
        const j = julga(r.err, .14 * janelaK());
        if (j === 'perfeito' || j === 'bom') { presa = false; MOM.lateral(); popTxt(t.rot.bom, 'bom'); linha(t.soltou); } else { pose('atingido', .8); popTxt(t.rot[j] || t.rot.tarde, 'mal'); linha(t.naoSoltou, 'mal'); }
        await espera(700); return;
      }
      if (k === 'lamina') { await golpeLamina(); return; }
      const c = ATK[k]; bpm += c.c;
      const jan = c.jan * janelaK() * lentoK() * (k === 'corte' && B.espada === 'deixar' ? 1.25 : 1);
      if (k === 'curta') linha(t.curta);
      const r = await anel('ele', c.dur, [{ k: 'agora', rot: t.agora, cls: 'agora' }]);
      const j = julga(r.err, jan);
      if (j === 'perfeito' || j === 'bom') {
        const dano = c.d[j === 'perfeito' ? 0 : 1];
        MOM.golpeDela(k === 'corte' || k === 'torso' || j === 'perfeito', k === 'perna' ? 'baixo' : 'golpe'); sfx('corte', .7); hp = Math.max(1, hp - dano); shake = .25;
        popTxt(j === 'perfeito' ? t.rot.perfeito : t.rot.bom, 'bom'); anima('apanha').then(guarda); grunhe(Math.random() < .5 ? 'kronk-apanha1' : 'kronk-apanha2', .75); grunhe('acerta-leve', .5);
        ganha(j === 'perfeito' ? 22 : 11);
        if (k === 'estocada') { sangraT = 3; linha(t.abreSangra); }
        else if (k === 'braco') { bracoT = 2; linha(t.acertoBraco); }
        else if (k === 'perna') { pernaT = 2; linha(t.acertoPerna); }
        else if (k === 'torso') linha(t.acertoTorso);
        else linha(t.acertos[Math.floor(Math.random() * t.acertos.length)]);
      } else {
        MOM.erroDela(k === 'perna' ? 'baixo' : 'golpe'); sfx('golpe-ar', .6); popTxt(j === 'nada' ? t.rot.tarde : t.rot[j] || t.rot.defende, 'mal'); anima('esquiva').then(guarda); grunhe('kronk-esquiva', .55); linha(t.erro);
        if (pesoT > 0) { await espera(600); empurra(CE, -60, 300); leva(10, t.pesoCastiga); }
      }
      await espera(800);
    };
    const golpeLamina = async () => {
      lamina = 0; bpm += 10; faixasAlvo = 1; lento = .5; cinza = .5;
      if (lamImg) { const ov = document.createElement('div'); ov.className = 'd8-ult'; ov.innerHTML = `<img src="${lamImg.src}" alt=""><b>${t.lamina}</b>`; root.querySelector('.d8').appendChild(ov); sfx('espada-desembainha', .9); await espera(1300); ov.classList.add('sai'); setTimeout(() => ov.remove(), 500); }
      for (const l of t.laminaVai) { linha(l, 'cena'); await espera(900); }
      const r = await anel('ele', 1.0, [{ k: 'agora', rot: t.lamina, cls: 'agora' }]);
      const j = julga(r.err, .12 * janelaK());
      const dano = j === 'perfeito' ? 40 : j === 'bom' ? 28 : 12;
      MOM.golpeDela(true); soco(.1, KX - 80, CHAO - KH * .45, .22); sfx('corte', 1); grunhe('kronk-apanha2', .9); sangue(KX - 40, CHAO - KH * .5, 70, 1, 1.4); flash = .3; shake = .8;
      hp = Math.max(1, hp - dano); anima('apanha').then(guarda); R.lamina = (R.lamina || 0) + 1;
      popTxt(j === 'perfeito' ? t.rot.perfeito : j === 'bom' ? t.rot.bom : t.rot.defende, j === 'perfeito' || j === 'bom' ? 'bom' : 'meio');
      linha(j === 'perfeito' ? t.laminaAcerta : j === 'bom' ? t.laminaMeio : t.laminaPouco);
      await espera(1100); faixasAlvo = 0; lento = 1;
    };

    // as respostas aos golpes dele
    const golpeRapido = async (lido, apertado = 1) => {
      linha(t.tell.golpe, 'tell'); MOM.ataqueDele(); grunhe('kronk-golpe', .7);
      const dur = (fase === 1 ? .95 : fase === 2 ? .78 : .82) * (lido ? 1.15 : 1) * lentoK() * apertado;
      kAtk('golpe', dur);
      const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }], 'escudo');
      kSolta('golpe');
      const jan = (r.k === 'lateral' ? .07 : .15 * (escudoUp ? 1.8 : 1)) * janelaK() * (lido ? 1.3 : 1), j = julga(r.err, jan);
      if ((j === 'perfeito' || j === 'bom') && r.k === 'escudo') { MOM.escudo(false); sfx('escudo-impacto-1', .8); popTxt(t.rot.segurou, 'bom'); linha(t.segurou); bpm += escudoUp ? 1 : 2; R.respostas++; ganha(j === 'perfeito' ? 10 : 5); }
      else if (j === 'perfeito' && r.k === 'lateral') { MOM.lateral(); sfx('golpe-ar', .6); popTxt(t.rot.passou, 'bom'); linha(t.passou); R.respostas++; ganha(12); }
      else { popTxt(j === 'cedo' ? t.rot.cedo : t.rot.tarde, 'mal'); leva(fase === 3 ? 12 : 10, t.marca[Math.floor(Math.random() * 3)]); }
    };
    const golpePesado = async (lido) => {
      const rapido = fase >= 2 || rodeando;
      linha(rapido ? t.tell.pesadoRapido : t.tell.pesado, 'tell'); empurra(CE, 34, 1600, 0, .07); grunhe('kronk-pesado', .75);
      await anima('pesado', { ate: KR.pesado.segura, fps: 22 });
      const segura = rodeando ? rnd(.15, .35) : rapido ? rnd(.35, .8) : rnd(.7, 1.4);
      const cedo = await new Promise((res) => {
        menu.innerHTML = `<button class="d8-b" data-k="escudo">↑ ${t.escudo}</button><button class="d8-b" data-k="lateral">↓ ${t.lateral}</button>`;
        let ok = false; const fim = (v) => { if (ok) return; ok = true; ouvinte = null; menu.innerHTML = ''; res(v); };
        menu.querySelectorAll('.d8-b').forEach((b) => b.onpointerdown = (e) => { e.preventDefault(); fim(b.dataset.k); });
        ouvinte = (k) => fim(k);
        setTimeout(() => fim(null), (BOT() ? .02 : segura * lentoK()) * 1000);
      });
      if (cedo) { popTxt(t.rot.cedo, 'mal'); linha(t.cedoPesado, 'mal'); kAnim = { nome: 'pesado', f: KR.pesado.segura, play: true, fps: 40, fim: guarda }; await espera(250); leva(18); return; }
      linha(t.tell.desce, 'tell');
      const dur = (fase === 1 ? .62 : .5) * (lido ? 1.2 : 1) * lentoK();
      kAnim = { nome: 'pesado', f: KR.pesado.segura, play: true, ate: KR.pesado.impacto, fps: (KR.pesado.impacto - KR.pesado.segura) / dur };
      const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }], 'lateral');
      kSolta('pesado');
      const jan = (r.k === 'lateral' ? .09 : .14 * (escudoUp ? 1.8 : 1)) * janelaK() * (lido ? 1.3 : 1), j = julga(r.err, jan);
      if ((j === 'perfeito' || j === 'bom') && r.k === 'lateral') {
        MOM.lateral(); sfx('golpe-ar', .7); popTxt(t.rot.contra, 'bom'); linha(t.contra); R.laterais++; R.leituras++; R.respostas++; ganha(18);
        await espera(650);
        if (fimPronto) { await fim(); return; }
        const dano = rodeando ? 24 : 14;
        MOM.golpeDela(true); sfx('corte', .8); grunhe('kronk-apanha1', .8); hp = Math.max(1, hp - dano); shake = .35; anima('apanha').then(guarda); linha(t.contraGolpe);
      } else if ((j === 'perfeito' || j === 'bom') && r.k === 'escudo') { MOM.escudo(true); sfx('escudo-impacto-2', .9); shake = .3; popTxt(t.rot.segurou, 'meio'); linha(t.segurouPesado); bpm += escudoUp ? 3 : 7; R.respostas++; ganha(6); }
      else { popTxt(j === 'cedo' ? t.rot.cedo : t.rot.tarde, 'mal'); leva(18, t.marca[Math.floor(Math.random() * 3)]); }
    };
    const agarrar = async (lido) => {
      linha(t.tell2.agarrar, 'tell'); empurra(CE, 30, 700, 0, .03); grunhe('kronk-golpe', .6);
      const dur = .8 * (lido ? 1.2 : 1) * lentoK(); kAtk('golpe', dur);
      const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }], 'lateral');
      kSolta('golpe');
      const j = julga(r.err, .12 * janelaK() * (lido ? 1.3 : 1));
      if ((j === 'perfeito' || j === 'bom') && r.k === 'lateral') { MOM.lateral(); popTxt(t.rot.passou, 'bom'); linha(t.escapou); R.respostas++; ganha(8); }
      else { presa = true; solta(); pose('atingido', 1.2); empurra(CL, 50, 900); empurra(CE, -40, 900); sfx('escudo-impacto-1', .6); popTxt(t.est.presa, 'mal'); linha(t.presa, 'mal'); vida = Math.max(0, vida - 3); bpm += 5; }
    };
    const macaCima = async (lido) => {
      linha(t.tell2.maca, 'tell'); macaCD = 3; empurra(CE, 20, 900, 0, -.04); grunhe('kronk-pesado', .7);
      const dur = .7 * (lido ? 1.2 : 1) * lentoK(); poseE = 'meio'; kAtk('golpe', dur);
      const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }], 'lateral');
      kSolta('golpe'); setTimeout(() => { poseE = null; }, BOT() ? 0 : 160);
      const j = julga(r.err, (r.k === 'lateral' ? .1 : .12) * janelaK() * (lido ? 1.3 : 1));
      if ((j === 'perfeito' || j === 'bom') && r.k === 'lateral') { MOM.lateral(); sfx('golpe-ar', .7); popTxt(t.rot.passou, 'bom'); linha(t.macaEsquiva); R.respostas++; ganha(12); }
      else if ((j === 'perfeito' || j === 'bom') && r.k === 'escudo') { popTxt(t.rot.segurou, 'meio'); leva(7, t.macaEscudo); }
      else { popTxt(t.rot.marca, 'mal'); leva(14, t.macaPega); if (!perdeu()) tonta = true; }
    };
    const turnoDele = async () => {
      if (sangraT > 0) { sangraT--; hp = Math.max(1, hp - 3); CE.hit = .5; sangue(KX - 30, CHAO - KH * .5, 14, 1, .6); if (Math.random() < .5) linha(t.sangra); await espera(500); }
      const tipo = revelado || tipoDele();
      const lido = !!revelado || primeiroLido; revelado = null; primeiroLido = false;
      if (presa && tipo !== 'peso' && tipo !== 'agarrar') {
        linha(t.tell.golpe, 'tell'); kAtk('golpe', .6); await espera(650); kSolta('golpe'); presa = false; leva(fase === 3 ? 14 : 12, t.presaGolpe);
      } else if (tipo === 'golpe') await golpeRapido(lido);
      else if (tipo === 'pesado') await golpePesado(lido);
      else if (tipo === 'agarrar') await agarrar(lido);
      else if (tipo === 'maca') await macaCima(lido);
      else if (tipo === 'peso') { pesoT = 4; linha(t.tell2.peso, 'tell'); empurra(CE, -20, 1200, 6, 0); areia(KX, 16, .6); await espera(1100); }
      else if (tipo === 'duas') { linha(t.tell2.duas, 'tell'); await espera(500); await golpeRapido(lido, .9); if (!perdeu() && !acabou) { await espera(260); await golpeRapido(false, .8); } }
      if (bracoT > 0) bracoT--; if (pernaT > 0) pernaT--; if (macaCD > 0) macaCD--;
      if (pesoT > 0 && --pesoT === 0) linha(t.pesoFim);
      if (rodeando) rodeando = false;
    };
    const cena = async (linhas, ms = 1500) => { menu.innerHTML = ''; for (const l of linhas) { linha(l, 'cena'); await espera(ms); } };
    const fim = async () => {
      faixasAlvo = 1; lento = .4; cinza = .7;
      MOM.lateral(); await espera(500);
      pose('golpe', 3); sfx('corte', .9); MOM.golpeDela(true); soco(.12, KX - 60, CHAO - KH * .35, .25); flash = .3; shake = .7;
      await cena(t.fim, 1700);
      lento = 1; areia(KX, 40, 1.6); shake = .9; hp = 0;
      sangue(KX - 30, CHAO - KH * .3, 60, 1, 1.3); grunhe('kronk-mata2', .9);
      await anima('cai', { fps: 18 });
      await espera(600); faixasAlvo = 0;
      fecha();
    };

    const kronk = async () => {
      linha(t.intro); await espera(1200); await abertura();
      while (!acabou && !perdido) {
        await turnoDela(); if (acabou) return; if (perdeu()) return derrota();
        if (fase === 1 && hp <= HPMAX * .6) {
          fase = 2;
          kAnim = { nome: 'pesado', f: 0, play: true, fps: 30 };
          grunhe('kronk-mata2', .9); if (!furia) tocaLoop('tambores-furia-loop', .32).then((h) => { furia = h; });
          await cena(t.fase2.slice(0, 2), 1400); pose('atingido', 1.5); flash = 1; shake = 1; sfx('escudo-impacto-2', 1); sangue(LX + 30, CHAO - LH * .62, 46, -1, 1.1); mancharTela();
          vida = Math.max(1, vida - 6); base = 78; bpm = Math.max(bpm, 82); R.golpesRecebidos++; guarda();
          await cena(t.fase2.slice(2), 1500);
        } else if (fase === 2 && hp <= HPMAX * .25) { fase = 3; await cena(t.fase3, 1500); }
        if (fase === 3 && hp <= HPMAX * .1 && !fimPronto) { fimPronto = true; linha(t.fimPronto, 'ler'); }
        await turnoDele(); if (acabou) return; if (perdeu()) return derrota();
      }
    };

    // ------------------------------------------------------------ O MAIOR
    // Ela só se defende. Os arqueiros soltam quando ele fica exposto: uma sequência inteira bem respondida, ou cego de areia.
    let aberto = false;
    const CERTO = { golpe: 'escudo', pesado: 'lateral', varredura: 'escudo', pisao: 'lateral', agarrar: 'lateral' };
    const DANO_M = { golpe: 8, pesado: 13, varredura: 11, pisao: 7, agarrar: 4 };
    const ataqueM = async (lido) => {
      const pool = [['golpe', 30], ['pesado', 30], ['varredura', 15], ['pisao', 15], ['agarrar', presa ? 0 : 10]];
      let r0 = Math.random() * pool.reduce((s, p) => s + p[1], 0), tipo = 'golpe';
      for (const [k, w] of pool) { if ((r0 -= w) < 0) { tipo = k; break; } }
      const confuso = !lido && !cegoT && Math.random() < (hp < HPMAX * .5 ? .38 : .25);
      if (presa) { linha(t.tellM2.golpe, 'tell'); kAtk('golpe', .6); await espera(650); kSolta('golpe'); presa = false; leva(10, t.presaM); return false; }
      linha(confuso ? t.tellM.confuso : t.tellM2[tipo], 'tell');
      const dur = rnd(.55, .9) * (hp < HPMAX * .4 ? .88 : 1) * (lido ? 1.2 : 1) * (cegoT ? 1.3 : 1); empurra(CE, 40, dur * 900, 0, .06);
      const an = tipo === 'golpe' || tipo === 'agarrar' ? 'golpe' : 'pesado'; kAtk(an, dur);
      poseE = tipo === 'varredura' || tipo === 'pisao' ? tipo : null;
      if (tipo === 'pisao') areia(KX - 60, 10, .5);
      const certo = CERTO[tipo];
      const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }], certo);
      kSolta(an); if (poseE) setTimeout(() => { poseE = null; }, BOT() ? 0 : 220);
      const flex = tipo === 'golpe' || tipo === 'pesado';   // nos dois braços, o lado errado ainda serve, com janela estreita
      const jan = r.k === certo ? .14 * (certo === 'escudo' && escudoUp ? 1.8 : 1) : flex ? .07 : 0;
      const j = jan ? julga(r.err, jan * janelaK() * (lido ? 1.3 : 1)) : 'tarde';
      if (j === 'perfeito' || j === 'bom') {
        if (r.k === 'lateral') MOM.lateral(); else MOM.escudo(tipo !== 'golpe');
        sfx('escudo-impacto-1', .8); popTxt(t.rot.segurou, 'bom'); R.respostas++; bpm += tipo === 'varredura' ? 5 : 2;
        linha(tipo === 'varredura' ? t.varrOk : tipo === 'pisao' ? t.pisaoOk : tipo === 'agarrar' ? t.agarraOkM : t.segurou);
        return true;
      }
      if (tipo === 'agarrar') { presa = true; solta(); pose('atingido', 1.2); popTxt(t.est.presa, 'mal'); linha(t.agarraMalM, 'mal'); vida = Math.max(0, vida - DANO_M.agarrar); bpm += 5; return false; }
      leva(DANO_M[tipo], tipo === 'varredura' ? t.varrMal : tipo === 'pisao' ? t.pisaoMal : t.acertoM[tipo]);
      if (tipo === 'pisao') bpm += 6;
      return false;
    };
    const maiorLuta = async () => {
      linha(t.introM); await espera(1300); await abertura();
      let atrasada = false, semFlecha = 0, rodadas = 0;
      while (!acabou && !perdido) {
        if (++rodadas >= 16 && hp > .5) hp = .5;
        const n = hp > HPMAX * .66 ? 1 : hp > HPMAX * .33 ? 2 : 3;
        const lido = lidoM; lidoM = false; R.turnos = (R.turnos || 0) + 1;
        let limpo = true;
        for (let i = 0; i < n && !acabou; i++) { if (!(await ataqueM(lido))) limpo = false; if (perdeu()) return derrota(); if (i < n - 1) await espera(380); }
        aberto = limpo || cegoT > 0;
        if (cegoT > 0) cegoT--;
        if (aberto) { linha(limpo ? t.abertoM : t.cegoAberto, 'ler'); CE.tr = -.05; }
        if (bpm >= 150 && ombroUsado < (opts.ombro ? 1 : 0) + (opts.coragem ? 1 : 0)) {
          ombroUsado++; await espera(500);
          linha(ombroUsado === 1 && opts.ombro ? t.ombro : t.coragem, 'ler'); bpm -= opts.ombro && opts.coragem ? 30 : 22; pose('respirar', 1.2); await espera(1400);
        }
        if (atrasada) { atrasada = false; semFlecha = 0; await rajada(false); if (acabou) return; continue; }
        await espera(450);
        // o turno dela: só defesa; os arqueiros, se ele estiver exposto
        let ops;
        if (presa) ops = [Object.assign(opK('soltar')), opK('respirar')];
        else {
          ops = [];
          if (aberto) ops.push(bpm >= 130 ? { k: 'tremido', nome: t.golpes.tremido[0], desc: t.golpes.tremido[1], cls: 'tremida' } : { k: 'chamar', nome: t.golpes.chamar[0], desc: t.golpes.chamar[1] });
          ops.push(opK(escudoUp ? 'manter' : 'escudo'), opK('ler'));
          if (areiaCD <= 0) ops.push(opK('areia'));
          ops.push(Object.assign(opK('respirar'), { desc: t.golpes.respirarM[1] }));
        }
        const k = await escolhe(ops);
        if (k !== 'escudo' && k !== 'manter') solta();
        if (areiaCD > 0) areiaCD--;
        if (k === 'respirar') { base = Math.max(96, base - 10); bpm = Math.max(base, bpm - 14); pose('respirar', 1.1); linha(t.respirouM); semFlecha++; }
        else if (k === 'escudo' || k === 'manter') { if (!escudoUp) { escudoUp = true; escudoHP = 30; bpm += 4; linha(t.escudoUp); } else { bpm += 3; linha(t.escudoMantem); } pose('escudo', 1); semFlecha++; }
        else if (k === 'ler') { lidoM = true; bpm += 2; linha(t.lerOk, 'ler'); semFlecha++; }
        else if (k === 'soltar') { bpm += 4; const r = await anel('eu', .8, [{ k: 'agora', rot: t.agora, cls: 'agora' }]); const j = julga(r.err, .14 * janelaK()); if (j === 'perfeito' || j === 'bom') { presa = false; MOM.lateral(); linha(t.soltouM); } else linha(t.naoSoltou, 'mal'); semFlecha++; }
        else if (k === 'areia') {
          areiaCD = 3; bpm += 4; pose('areia', .9); areia(LX + 80, 20, 1);
          const r = await anel('ele', .85, [{ k: 'agora', rot: t.agora, cls: 'agora' }]); const j = julga(r.err, .12 * janelaK());
          if (j === 'perfeito' || j === 'bom') { cegoT = 2; CE.hit = .6; areia(KX - 40, 30, 1.2); popTxt(t.est.cego, 'bom'); linha(t.areiaOk); } else { popTxt(t.rot[j] || t.rot.tarde, 'mal'); linha(t.areiaMal, 'mal'); }
          semFlecha++;
        }
        else if (k === 'tremido') { R.deslizes++; linha(t.chamouTremido, 'mal'); atrasada = true; await espera(700); }
        else { await rajada(true); semFlecha = 0; }
        if (acabou) return;
        if (semFlecha >= 2 && hp < HPMAX) { hp = Math.min(HPMAX, hp + .25); linha(t.fechaM, 'mal'); CE.hit = .4; semFlecha = 0; }
        aberto = false;
      }
    };
    const rajada = async (naHora) => {
      let forca = .5;
      if (naHora) {
        linha(t.miraM, 'tell');
        const r = await anel('ele', .9, [{ k: 'agora', rot: t.golpes.chamar[0], cls: 'agora' }]);
        const j = julga(r.err, .11 * janelaK());
        forca = j === 'perfeito' ? 1 : j === 'bom' ? .75 : .25;
      }
      forca *= aberto ? (cegoT > 0 || CE.hit > .3 ? 1.35 : 1.25) : .6;
      forca = Math.round(forca * 100) / 100;
      const ultima = hp - forca <= 0;
      if (ultima) { faixasAlvo = 1; lento = .5; cinza = .5; }
      sfx('virotes', .9); flechas(); await espera(560); sfx('virote-impacto', .9); hp = Math.max(0, hp - forca); shake = .45 + forca * .3; CE.hit = 1; empurra(CE, 40 + 50 * forca, 420, 0, .08); soco(.03 + .03 * forca, KX, CHAO - KH * .55, .08);
      sangue(KX - 20, CHAO - KH * .55, Math.round(18 + 30 * forca), 1, .8);
      kAnim = { nome: 'apanha', f: 0, play: true, fim: guarda };
      linha(forca >= .9 ? t.chamou : forca >= .45 ? t.chamouMeio : t.chamouPouco, forca >= .45 ? '' : 'mal'); await espera(1100);
      if (hp <= 0) { await cena([t.fimM], 1600); lento = 1; areia(KX, 50, 2); shake = 1.2; soco(.06, KX, CHAO - 100, .15); await anima('cai', { fps: 16 }); await espera(800); faixasAlvo = 0; fecha(); }
    };

    const encerra = () => {
      if (acabou) return; acabou = true; removeEventListener('keydown', onKey);
      if (A && A.stop) { if (musica) A.stop(musica, 1.5); if (furia) A.stop(furia, 1); }
    };

    const fecha = () => {
      if (acabou) return; acabou = true; removeEventListener('keydown', onKey);
      if (A && A.stop) { if (musica) A.stop(musica, 2.5); if (furia) A.stop(furia, 1.5); }
      R.tempo = Math.round((performance.now() - R.t0) / 1000); delete R.t0; R.bpmFinal = Math.round(bpm); R.bpm = R.bpmFinal; R.vida = Math.round(100 * vida / VMAX); R.derrotas = opts.derrotas || 0;
      setTimeout(() => resolve(R), BOT() ? 10 : 900);
    };

    requestAnimationFrame(loop);
    const go = () => {
      $('.d8-regras').remove();
      tocaLoop('musica-loop', maior ? .3 : .42).then((h) => { musica = h; });
      if (maior) tocaLoop('tambores-furia-loop', .22).then((h) => { furia = h; });
      (maior ? maiorLuta : kronk)();
    };
    $('.d8-go').onclick = go;
    if (BOT()) setTimeout(go, 10);
  });
}

window.DUELO8 = { start };
})();
