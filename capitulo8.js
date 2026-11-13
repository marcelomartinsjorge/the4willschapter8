/* ==========================================================================
   AS QUATRO VONTADES · CAPÍTULO VIII · LAURA — A LÂMINA (roteiro interativo)
   --------------------------------------------------------------------------
   Cada texto vem em par: T('português', 'english'). O português é a chave;
   o inglês (o original do jogo) é registrado em window.LIVRO_EN.
   Mudou o PT, mude o EN na mesma linha.
   // N = texto novo, esperando a leitura do Marcelo.
   POV: Laura, 36 anos, presente do indicativo. Só a voz dela é dublada.
   O CORAÇÃO DE PEDRA: o pulso dela fica perto de 52 o capítulo inteiro e só
   dispara três vezes (a mãe, o túmulo, o Maior). Cada página pode ter
   pico: { bpm, ms } (o pulso sobe depois de ms e desce na página seguinte).
   TRAVAS: ninguém diz o nome do Simon na frente dela, e ela só o diz no
   túmulo · ela nunca diz Tacet, deus, Kronk ou Madrinha (diz homens de bronze,
   o Grakh grande, a hóspede) · nada de cheiro · o Gup não aparece.
   Estado lido dos capítulos anteriores: window.AQV_ANTES (aqv_estado).
   ========================================================================== */
window.LIVRO_EN = window.LIVRO_EN || {};
const T = (pt, en) => { if (en != null) window.LIVRO_EN[pt] = en; return pt; };
const se = (cond, t) => ({ se: cond, t });
const IMG = (n) => 'assets/images/' + n + '.jpg';
const SFX = (n) => 'assets/audio/sfx/' + n + '.mp3';

// ---------------------------------------------------------------- o que os capítulos anteriores deixaram
const antes = () => window.AQV_ANTES || {};
const c2 = () => antes().cap2 || {};
const c3 = () => antes().cap3 || {};
const c4 = () => antes().cap4 || {};
const c6 = () => antes().cap6 || {};
const c7 = () => antes().cap7 || {};
const e7 = () => c7().escolhas || {};
const consorte = () => c7().consorte || (c4().noite === 'markus' ? 'markus' : c4().beijoJustine ? 'justine' : null);
const comJustine = () => consorte() === 'justine';
const comMarkus = () => consorte() === 'markus';
const rangido = () => c6().rangido || 'olhar';
const promessa = () => c2().promessa || 'calar';
const mae4 = () => c4().mae || null;
const varr4 = () => c4().varr || (c4().escolhas || {}).varr || null;
const ombro = () => (c3().correcoes || 0) >= 3;
// a fuga do Cap. VII: a criada da estalagem (roubar, seduzir, matar) ou a sombra do comandante (trocar, matar)
const fuga = () => (e7().sombra ? 'sombra-' + e7().sombra : e7().trajeCriada ? 'criada-' + e7().trajeCriada : 'criada-roubar');
const chefes = () => { const n = (c7().tregua || {}).chefes; return Number.isFinite(n) && n > 0 ? n : 3; };
const disfarce = () => c7().disfarce || 'estrebaria';
const matouORosto = () => e7().trajeColuna === 'matar';
const lavadeiraVeio = () => c7().lavadeira === 'usar';
const intendenteViu = () => !!c7().intendenteViu;
const alarme = () => c7().alarme || 0;
const confessou = () => !!c7().confessou;
const semente = () => !!c7().semente;

// ---------------------------------------------------------------- as escolhas deste capítulo
const prece = (st) => st.escolhas.prece || null;
const anselVivo = (st) => !(st.mortos || []).includes('ansel');
const lavNaColuna = (st) => lavadeiraVeio() && st.escolhas.lavadeira8 !== 'devolver' && !(st.mortos || []).includes('lavadeira');
const josephVeio = (st) => st.escolhas.joseph === 'ir';
const fugiu = (st) => !!st.f.fugiu;
const rotaA = (st) => fugiu(st) || st.f.desmascarou === 'certo';

// ---------------------------------------------------------------- a caça: os lugares, os rostos e os suspeitos
// o lugar de cada rosto do Cap. VII; quem dorme lá; e o que a sede dela deixa de manhã
const LUGARES = {
  estrebaria: { quem: 'wil', nome: T('a estrebaria', 'the stables'), img: 'c-estrebaria' },
  cozinha: { quem: 'nell', nome: T('a cozinha', 'the kitchen'), img: 'c-cozinha' },
  feridos: { quem: 'ilse', nome: T('a tenda dos feridos', 'the wounded tent'), img: 'c-feridos' },
  forja: { quem: 'bram', nome: T('a forja', 'the forge'), img: 'c-forja' },
};
const LUGAR_DO_ROSTO = { estrebaria: 'estrebaria', nell: 'cozinha', ilse: 'feridos', forja: 'forja' };
const lugarVerdadeiro = () => LUGAR_DO_ROSTO[disfarce()] || 'estrebaria';
const ELA = () => LUGARES[lugarVerdadeiro()].quem;   // o rosto que ela usa
const lugarDaNoite = (st, k) => (st.noites || [])[k] || 'estrebaria';
const RETRATO = (n) => 'assets/images/rostos/' + n + '.jpg';

// os seis lugares do corpo. Gente de verdade mostra gente: suor, orelha que esquenta, mão que treme.
const SUSPEITOS = {
  wil: { nome: 'Wil', papel: T('moço da estrebaria', 'stable boy'), img: RETRATO('estrebaria'), olhar: {
    testa: T('Suor descendo da raiz do cabelo até a sobrancelha.', 'Sweat running from his hairline down to his brow.'),
    orelhas: T('Vermelhas de sol nas pontas. Pergunto onde ele dormiu. Ele responde, e as orelhas continuam da mesma cor.', 'Sunburnt at the tips. I ask where he slept. He answers, and his ears stay the same colour.'),
    boca: T('O lábio rachado no meio. A mesma sede de todo mundo.', 'His lip split down the middle. The same thirst as everyone else.'),
    pescoco: T('Queimado acima da gola, branco abaixo.', 'Burnt above the collar, white below.'),
    maos: T('Calo de rédea na palma e um corte de casco no polegar.', 'A rein callus on the palm and a hoof cut on the thumb.'),
    pulso: T('O pulso bate rápido, de medo. Medo de mim.', 'His pulse runs fast, with fear. Fear of me.'),
  } },
  bram: { nome: 'Bram', papel: T('ajudante de ferreiro', 'smith’s boy'), img: RETRATO('forja'), olhar: {
    testa: T('Fuligem e suor, em riscos.', 'Soot and sweat, in streaks.'),
    orelhas: T('Pergunto das tinas. Ele diz que dormiu do lado do fole. As orelhas ficam como estão.', 'I ask about the tubs. He says he slept beside the bellows. His ears stay as they are.'),
    boca: T('Seca e rachada nos cantos.', 'Dry, and cracked at the corners.'),
    pescoco: T('Pintas de queimadura de faísca até o peito.', 'Spark burns, freckled down to his chest.'),
    maos: T('As costas das mãos sem pelo, queimadas de forja. As palmas, de pedra.', 'The backs of his hands hairless, forge-burnt. The palms, stone.'),
    pulso: T('Grosso, com a veia batendo forte.', 'Thick, the vein beating hard.'),
  } },
  ilse: { nome: 'Ilse', papel: T('ajudante de curandeiro', 'healer’s helper'), img: RETRATO('ilse'), olhar: {
    testa: T('Suor, e um cabelo grudado nele.', 'Sweat, and a strand of hair stuck in it.'),
    orelhas: T('Pergunto dos odres. Ela diz que dormiu sentada. Nenhum vermelho nas orelhas.', 'I ask about the waterskins. She says she slept sitting up. No red in her ears.'),
    boca: T('Mordida no canto.', 'Bitten at one corner.'),
    pescoco: T('Uma corrente fina com a balança da Juíza.', 'A thin chain with the Judge’s scales.'),
    maos: T('Unhas cortadas rente e manchas de unguento nos dedos.', 'Nails cut short and salve stains on her fingers.'),
    pulso: T('Fino. Bate rápido.', 'Thin. Beating fast.'),
  } },
  nell: { nome: 'Nell', papel: T('moça da cozinha', 'kitchen girl'), img: RETRATO('nell'), olhar: {
    testa: T('Suor brilhando. Passou a manhã em cima da panela.', 'Sweat shining. She spent the morning over the pot.'),
    orelhas: T('Pergunto do barril. Ela diz que dormiu entre os sacos. As orelhas não esquentam.', 'I ask about the barrel. She says she slept among the sacks. Her ears don’t heat.'),
    boca: T('Rachada, com um corte velho de faca de descascar no lábio de cima.', 'Cracked, with an old paring-knife nick on the upper lip.'),
    pescoco: T('Vermelho de vapor.', 'Red from steam.'),
    maos: T('Dedos cortados de descascar, e a faca no avental.', 'Fingers nicked from peeling, and the knife in her apron.'),
    pulso: T('Rápido.', 'Fast.'),
  } },
  tasso: { nome: 'Tasso', papel: T('soldado da Terceira', 'soldier of the Third'), img: RETRATO('grisalho'), olhar: {
    testa: T('Suor grosso, e ele limpa com a manga antes de eu perguntar.', 'Thick sweat, and he wipes it with his sleeve before I ask.'),
    orelhas: T('Pergunto da água. As pontas das orelhas esquentam e ficam vermelhas. Mente.', 'I ask about the water. The tips of his ears heat and go red. He’s lying.'),
    boca: T('Molhada. Com a ração que ele recebe, não devia estar.', 'Wet. On the ration he gets, it shouldn’t be.'),
    pescoco: T('Suor, e sujeira na dobra.', 'Sweat, and dirt in the crease.'),
    maos: T('No punho fechado, moedas de cobre. Muitas, para um soldado.', 'In his closed fist, copper coins. Too many for a soldier.'),
    pulso: T('Disparado.', 'Racing.'),
  } },
  ansel: { nome: 'Ansel', papel: T('sentinela', 'sentry'), img: RETRATO('ansel'), olhar: {
    testa: T('Suor frio, mesmo de noite.', 'Cold sweat, even at night.'),
    orelhas: T('Pergunto onde ele estava. Ele não sabe. As orelhas continuam pálidas: não está mentindo.', 'I ask where he was. He doesn’t know. His ears stay pale: he isn’t lying.'),
    boca: T('Mordida até sangrar.', 'Bitten until it bled.'),
    pescoco: T('Arrepiado.', 'Gooseflesh.'),
    maos: T('Tremem. A direita aperta um pedaço de pão.', 'They shake. The right one clutches a piece of bread.'),
    pulso: T('Batendo tão alto que eu vejo no pescoço.', 'Beating so hard I can see it in his neck.'),
  } },
  lavadeira: { nome: T('a Nymae', 'the Nymae'), papel: T('aguadeira', 'water-carrier'), img: RETRATO('lavadeira'), nymae: true, olhar: {
    testa: T('Seca. Nymae não sua.', 'Dry. Nymae don’t sweat.'),
    orelhas: T('Em nadadeira, como as de todo Nymae. Na pergunta, colam na cabeça.', 'Finned, like every Nymae’s. At my question they flatten to her head.'),
    boca: T('Sal nos cantos.', 'Salt at the corners.'),
    pescoco: T('Escama fina, azul-cinza, descendo pela nuca.', 'Fine scales, blue-grey, running down her nape.'),
    maos: T('Membrana entre os dedos, rachada de seca.', 'Webbing between the fingers, cracked from dryness.'),
    pulso: T('Lento. Mais lento que o meu.', 'Slow. Slower than mine.'),
  } },
};
// quando o rosto é dela: o mesmo nome, outro corpo. As pistas que não são de gente.
const OLHAR_DELA = {
  testa: T('Seca. Num deserto onde até os cavalos suam, nem uma gota.', 'Dry. In a desert where even the horses sweat, not a drop.'),
  orelhas: T('Pergunto onde dormiu. A resposta vem certa, e as orelhas não mudam de cor.', 'I ask where they slept. The answer comes out right, and the ears don’t change colour.'),
  boca: T('No canto da boca, uma crosta branca. Sal. A boca está seca; não é sal de suor.', 'At the corner of the mouth, a white crust. Salt. The mouth is dry; it isn’t sweat salt.'),
  pescoco: T('Embaixo do queixo, onde a gola esconde, a pele brilha em placas finas. Escama.', 'Under the jaw, where the collar hides it, the skin shines in thin plates. Scale.'),
  maos: T('Uma moeda anda pelos nós dos dedos e some quando eu olho.', 'A coin walks across the knuckles and vanishes when I look.'),
  pulso: T('A manga desce até a mão, no calor. Puxo. A pele do pulso está repuxada e áspera, rachada nas dobras.', 'The sleeve comes down to the hand, in this heat. I pull it. The skin of the wrist is drawn tight and rough, cracked in the folds.'),
};
const PISTAS_FORTES = ['testa', 'boca', 'pescoco', 'pulso'];
const OLHAR_ROTULO = {
  testa: T('A testa', 'The brow'), orelhas: T('As orelhas', 'The ears'), boca: T('A boca', 'The mouth'),
  pescoco: T('O pescoço', 'The neck'), maos: T('As mãos', 'The hands'), pulso: T('O pulso', 'The wrist'),
};
const nomeDe = (id) => (SUSPEITOS[id] ? SUSPEITOS[id].nome : id);
// quem está na fila para ser lido em cada noite: quem dorme no lugar e um engano
const suspeitosDaNoite = (st, k) => {
  const quem = LUGARES[lugarDaNoite(st, k)].quem, m = st.mortos || [];
  const enganos = [['tasso'], ['ansel'], [lavNaColuna(st) ? 'lavadeira' : 'tasso']][k] || [];
  return [quem].concat(enganos).filter((x, i, a) => a.indexOf(x) === i && !m.includes(x));
};
// o que a Laura viu de cada um (vem do minijogo Ler o corpo)
const viu = (st, id) => ((st.leituras || {})[id] || []);
const pistasDela = (st) => viu(st, ELA()).filter((o) => PISTAS_FORTES.includes(o)).length;
const sabeOnde = (st) => pistasDela(st) >= 2;
// a moral, escondida: aparece nos soldados
const moral = (st) => 1 + (st.f.ladraoMorto ? 1 : 0) - 2 * (st.inocentes || []).length - (st.f.desmascarou === 'errado' ? 2 : 0) + (fugiu(st) ? 1 : 0);
const faixaMoral = (st) => { const m = moral(st); return m >= 2 ? 'alta' : m >= 0 ? 'media' : 'baixa'; };
const aguaSalva = (st) => fugiu(st) || !!st.f.guardouCerto;
// quantos voltam (de dois mil)
const sobreviventes = (st) => 38 + (rotaA(st) ? 31 : 0) + ({ alta: 12, media: 6, baixa: 0 }[faixaMoral(st)]) + (st.escolhas.vigia === 'oeste' ? 8 : 0) + (aguaSalva(st) ? 8 : 0);
const arqueiros = (st) => Math.round(sobreviventes(st) * 2.2);
const numPT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'];

window.LIVRO_UI = {
  pt: { parte: 'Parte', prox: 'Próxima', fim: 'Encerrar o capítulo', voltar: '← Voltar', ouvir: 'Ouvir', cena: '▶ Ver a cena', oque: 'O que Laura faz?', coracaoNao: 'O pulso não deixa.', decida: 'Decida', decidir: 'Decidir', escolheu: 'Você escolheu:', resp: 'Responder a', silencio: 'não responder', silencioR: 'Silêncio', momento: 'Momento de jogo', continuar: 'Continuar',
    mg: { ler: 'Ler o corpo', roda: 'Girar a roda', chao: 'Ouvir o chão', duelo: 'Ler a maça', erguer: 'Erguer a espada', maior: 'Ficar de pé', conta: 'Contar os vivos' },
    dica: { ler: 'Um suspeito por noite. Quatro olhares.', roda: 'Segure para girar. Solte quando quiser.', chao: 'Toque junto com as batidas.', duelo: 'Leia o ombro e a maça. Aguente. Derrube.', erguer: 'Segure.', maior: 'Fique de pé e chame as rajadas.', conta: 'Segure para andar entre eles.' },
    coverEye: 'As Quatro Vontades · Capítulo VIII', coverLede: 'Vinte anos depois do Torneio, a Lâmina de Redom leva os melhores ao deserto.', coverGo: 'Começar', coverRestart: 'Começar de novo', coverCont: 'Continuar', coverHint: 'Use fones. Leia no seu tempo.', capN: 'Capítulo VIII',
    fimCap: 'Fim do Capítulo VIII', ficou: 'O que ficou', suas: 'Suas escolhas', reler: 'Reler o capítulo', confirm: 'Recomeçar o capítulo? O progresso deste capítulo se perde.', mesmo: (n) => `${n}% escolheram o mesmo`,
    pontos: 'Pontos do capítulo', jornada: 'Pontos da jornada', posicao: (p, n) => `${p}º de ${n} leitores`, semCap1: 'Jogue os capítulos anteriores neste navegador para somar a jornada.',
    pts: { caca: 'A caça', duelo: 'O duelo', maior: 'O Maior', vivos: 'Os que voltaram', antes: 'Capítulos anteriores' } },
  en: { parte: 'Part', prox: 'Next', fim: 'Close the chapter', voltar: '← Back', ouvir: 'Listen', cena: '▶ Watch the scene', oque: 'What does Laura do?', coracaoNao: 'My pulse won’t let me.', decida: 'Decide', decidir: 'Decide', escolheu: 'You chose:', resp: 'Answer', silencio: 'say nothing', silencioR: 'Silence', momento: 'Moment of play', continuar: 'Continue',
    mg: { ler: 'Read the body', roda: 'Turn the wheel', chao: 'Listen to the ground', duelo: 'Read the mace', erguer: 'Raise the sword', maior: 'Stay on my feet', conta: 'Count the living' },
    dica: { ler: 'One suspect a night. Four looks.', roda: 'Hold to turn. Let go when you want.', chao: 'Tap along with the beats.', duelo: 'Read the shoulder and the mace. Hold. Bring him down.', erguer: 'Hold.', maior: 'Stay on your feet and call the volleys.', conta: 'Hold to walk among them.' },
    coverEye: 'The Four Wills · Chapter VIII', coverLede: 'Twenty years after the Tournament, Redom’s Blade takes the best to the Dry Mouth.', coverGo: 'Begin', coverRestart: 'Begin again', coverCont: 'Continue', coverHint: 'Use headphones. Read at your own pace.', capN: 'Chapter VIII',
    fimCap: 'End of Chapter VIII', ficou: 'What remained', suas: 'Your choices', reler: 'Read the chapter again', confirm: 'Restart the chapter? This chapter’s progress will be lost.', mesmo: (n) => `${n}% chose the same`,
    pontos: 'Chapter points', jornada: 'Journey points', posicao: (p, n) => `${p} of ${n} readers`, semCap1: 'Play the earlier chapters in this browser to add up the journey.',
    pts: { caca: 'The hunt', duelo: 'The duel', maior: 'The Biggest', vivos: 'Those who came back', antes: 'Earlier chapters' } },
};

window.LIVRO = {
  id: 'cap08',
  titulo: 'Laura',
  subtitulo: 'A Lâmina',
  subtituloEn: 'The Blade',
  tituloPag: 'Laura, a Lâmina · As Quatro Vontades',
  tituloPagEn: 'Laura, the Blade · The Four Wills',
  capa: IMG('capa'),
  proximo: { titulo: 'Capítulo IX · Aheryn', tituloEn: 'Chapter IX · Aheryn', url: '' },
  // a ordem das três noites: o lugar dela sempre aparece; os outros dois saem dos que sobram
  inicio: (st) => {
    st.bpm = 52; st.base = 52; st.mortos = []; st.inocentes = []; st.leituras = {}; st.lidos = [];
    const v = lugarVerdadeiro(), resto = Object.keys(LUGARES).filter((l) => l !== v).sort(() => Math.random() - .5).slice(0, 2);
    const k = Math.floor(Math.random() * 3); resto.splice(k, 0, v); st.noites = resto;
  },
  paginas: [

    // ===================================================== I · O PRATO CHEIO (a Capital)
    { id: 'parte-I', parte: 'I', zona: 'capital', fundo: { img: IMG('capa'), kb: 'in', dim: .62, clima: 'poeira' },
      cartao: { num: 'I', nome: T('O Prato Cheio', 'The Full Plate'), epigrafe: T('Redom enterra os seus onde caem.', 'Redom buries its own where they fall.'), fonte: T('Dito dos soldados', 'Soldiers’ saying') } },

    { id: 'a01', zona: 'quarto', fundo: { img: IMG('a01-prato'), kb: 'in', foco: '55% 45%', dim: .52, clima: 'velas' }, capitular: true, vozAuto: 'L01', vozAtraso: 600,
      texto: [
        T('O prato volta cheio.', 'The plate goes back full.'), // N
        T('Pão, uma coxa de galinha fria, três ameixas. Tobias pega a bandeja sem pressa. Faz vinte e seis anos que ele serve a minha mesa, e faz oitenta e um dias que leva a bandeja de volta como trouxe.', 'Bread, a cold chicken leg, three plums. Tobias takes the tray without hurrying. He has served my table for twenty-six years, and for eighty-one days he has carried the tray back the way he brought it.'), // N
        T('Ele fala para o pão:', 'He speaks to the bread:'), // N
        T('— A cozinha manda avisar que amanhã tem cordeiro, alteza.', '— The kitchen sends word there’s lamb tomorrow, Highness.'), // N
        T('— Amanhã eu como na estrada.', '— Tomorrow I eat on the road.'), // N
        T('Ele inclina a cabeça e sai. A porta fecha com o cuidado de sempre.', 'He bows his head and goes. The door closes with its usual care.'), // N
        T('A cadeira do quarto está virada para a janela. Está assim há vinte anos, e eu deixo.', 'The chair in my room faces the window. It has faced it for twenty years, and I leave it that way.'), // N
        T('Conto os dias desde a notícia. Oitenta e um. Conto outra vez, porque a primeira conta sempre dá um a mais. Oitenta e um.', 'I count the days since the news. Eighty-one. I count again, because the first count always comes out one too many. Eighty-one.'), // N
        T('Encosto os dedos no pescoço e conto o pulso. Cinquenta e dois.', 'I put my fingers to my neck and count my pulse. Fifty-two.'), // N
      ] },

    // Justine, só se houve o beijo do Cap. IV (é a Consorte)
    { id: 'a02', se: () => comJustine(), zona: 'capela', fundo: { img: IMG('a02-capela'), kb: 'in', foco: '50% 40%', dim: .5, clima: 'velas' },
      texto: [
        T('A capela da Juíza ainda tem vela acesa. Justine está no último banco, com um papel no colo e a pena entre os dentes. Ela vem aqui toda noite. Sozinha, porque eu não venho.', 'The Judge’s chapel still has a candle lit. Justine is in the last pew, a paper on her lap and the quill between her teeth. She comes here every night. Alone, because I don’t.'), // N
        T('Foi ela que escreveu a lei que deixa a Lâmina ir à guerra quando quiser. Amanhã a lei sai pelo portão sul.', 'She is the one who wrote the law that lets the Blade go to war whenever she likes. Tomorrow the law rides out the south gate.'), // N
        T('Sento ao lado dela. Ela tira a pena da boca e olha para o papel.', 'I sit beside her. She takes the quill from her mouth and looks at the paper.'), // N
        T('— Estou mudando uma vírgula.', '— I’m changing a comma.'), // N
        T('— Qual?', '— Which one?'), // N
        T('— A que vem depois de “quando quiser”. Antes dela eu devia ter escrito “e voltar”.', '— The one after “whenever she likes”. Before it I should have written “and come back”.'), // N
        T('Ela pega a minha mão e passa o polegar nos calos, um por um, como faz quando não quer falar mais.', 'She takes my hand and runs her thumb over the calluses, one by one, the way she does when she doesn’t want to talk any more.'), // N
        T('No altar, duas velas novas, lado a lado.', 'On the altar, two new candles, side by side.'), // N
        T('— Ele odiava vela.', '— He hated candles.'), // N
        T('— Odiava. — Ela guarda a pena. — Por isso eu acendo duas.', '— He did. — She puts the quill away. — That’s why I light two.'), // N
        T('Fico até a primeira apagar. Depois, até a segunda.', 'I stay until the first one goes out. Then until the second.'), // N
      ] },

    // a mãe: o primeiro disparo
    { id: 'a03', zona: 'aposentos', fundo: { img: IMG('a03-dolores'), kb: 'in', foco: '50% 45%', dim: .55, clima: 'velas' }, pico: { bpm: 108, ms: 9000 },
      texto: [
        T('Minha mãe não sai mais da cama. As cortinas ficam fechadas dia e noite, e a criada deixa uma vela acesa ao lado dela, de dia também.', 'My mother no longer leaves her bed. The curtains stay shut day and night, and the maid keeps a candle lit beside her, in the daytime too.'), // N
        T('Ela me ouve entrar e não abre os olhos.', 'She hears me come in and doesn’t open her eyes.'), // N
        T('— Senta, Laura.', '— Sit, Laura.'), // N
        T('Sento na beira da cama. Ela acha a minha mão sem procurar.', 'I sit on the edge of the bed. She finds my hand without looking for it.'), // N
        T('— Seu pai saiu por aquele portão catorze vezes. Voltou treze. Seu irmão saiu uma. Você saiu vinte e voltou vinte. Eu contei.', '— Your father rode out of that gate fourteen times. He came back thirteen. Your brother rode out once. You’ve ridden out twenty times and come back twenty. I counted.'), // N
        T('O polegar dela passa pelos meus calos e para no do meio.', 'Her thumb moves over my calluses and stops on the middle one.'), // N
        T('— Esta é a vinte e uma.', '— This is twenty-one.'), // N
        { continuar: true },
        T('O pulso sobe no meu pescoço. As minhas mãos se mexem dentro da dela, e ela sente, e não diz nada.', 'My pulse climbs in my neck. My hands move inside hers, and she feels it, and says nothing.'), // N
        se(() => mae4() === 'cinco', T('— No Torneio, você me disse que eram cinco mentiras, e não quatro. Nunca me contou qual era a quinta.', '— At the Tournament, you told me it was five lies, not four. You never told me which was the fifth.')), // N
        se(() => mae4() === 'cinco', T('— Não.', '— No.')), // N
        se(() => mae4() === 'cinco', T('— Então me conta quando voltar.', '— Then tell me when you come back.')), // N
      ],
      escolha: { id: 'dolores', pergunta: T('Minha mãe', 'My mother'), opcoes: [
        { id: 'volto', voz: 'L07a', aviso: T('Sua mãe vai lembrar disso.', 'Your mother will remember that.'), txt: T('— Eu volto, mãe.', '— I’ll come back, Mother.'),
          resultado: [T('— Isso você disse vinte vezes. — Ela fecha os dedos nos meus. — Vinte e uma, então.', '— You’ve said that twenty times. — She closes her fingers over mine. — Twenty-one, then.')] }, // N
        { id: 'naoPrometo', voz: 'L07b', aviso: T('Sua mãe vai lembrar disso.', 'Your mother will remember that.'), txt: T('— Não prometo.', '— I won’t promise.'),
          resultado: (st) => [promessa() === 'prometer'
            ? T('— Aos dezesseis você me prometeu e mentiu. Hoje não promete. — A boca dela quase sobe num canto. — Melhorou.', '— At sixteen you promised me and lied. Today you won’t promise. — One corner of her mouth almost lifts. — That’s better.')
            : promessa() === 'recusar'
              ? T('— Aos dezesseis você também não prometeu, e eu tranquei o arsenal. Você treinou com espada de pau. Eu contei as farpas na sua mão.', '— At sixteen you wouldn’t promise either, and I locked the armoury. You trained with a wooden sword. I counted the splinters in your hand.')
              : T('— Aos dezesseis você ficou calada. Hoje, pelo menos, diz.', '— At sixteen you said nothing. Today, at least, you say it.')] }, // N
        { id: 'mao', aviso: T('Sua mãe vai lembrar disso.', 'Your mother will remember that.'), txt: T('Ficar com a mão na dela até ela dormir.', 'Keep my hand in hers until she sleeps.'),
          resultado: [T('Fico. A respiração dela fica comprida. O polegar para no meio de um calo e não sai de lá.', 'I stay. Her breathing grows long. Her thumb stops in the middle of a callus and doesn’t leave it.')] }, // N
      ] } },

    // o comandante Aubert: a fuga. É aqui que ela decide quem fica.
    { id: 'a04', zona: 'interior', fundo: { img: IMG('a04-aubert'), kb: 'in', foco: '50% 40%', dim: .5 },
      texto: [
        T('Antes do sol, o comandante Aubert pede para entrar. Raspou a cabeça outra vez. O caderno de couro vem debaixo do braço, fechado.', 'Before sunrise, Commander Aubert asks to come in. He has shaved his head again. The leather notebook is under his arm, closed.'), // N
        T('— A hóspede da Orla não chegou à costa, General-Rainha.', '— The guest from the Shore never reached the coast, General-Queen.'), // N
        (st) => ({
          'criada-roubar': [T('— Os dois cavaleiros que a levavam voltaram de noite. Dizem que ela entrou no mato para se aliviar e não saiu. Numa estalagem da estrada, uma criada deu falta do vestido de reserva.', '— The two riders taking her came back in the night. They say she went into the scrub to relieve herself and never came out. At an inn on the road, a maid found her spare dress gone.')],
          'criada-seduzir': [T('— Os dois cavaleiros que a levavam voltaram de noite. Dizem que ela entrou no mato para se aliviar e não saiu. Numa estalagem da estrada, uma criada diz que deu o vestido de reserva a uma moça que pediu com jeito. Não lembra do rosto.', '— The two riders taking her came back in the night. They say she went into the scrub to relieve herself and never came out. At an inn on the road, a maid says she gave her spare dress to a girl who asked nicely. She can’t remember the face.')],
          'criada-matar': [T('— Os dois cavaleiros que a levavam voltaram de noite. Dizem que ela entrou no mato para se aliviar e não saiu. Numa estalagem da estrada, acharam a criada no poço do pátio.', '— The two riders taking her came back in the night. They say she went into the scrub to relieve herself and never came out. At an inn on the road, they found the maid in the yard well.')],
          'sombra-trocar': [T('— O homem que eu mandei atrás dela seguiu uma capa roxa até o porto. No porto, quem estava dentro da capa era outra.', '— The man I sent after her followed a purple cloak to the harbour. At the harbour, the one inside the cloak was someone else.')],
          'sombra-matar': [T('— O homem que eu mandei atrás dela foi achado num beco da estrada, sem a capa.', '— The man I sent after her was found in an alley off the road, without his cloak.')],
        }[fuga()] || []),
        T('— E a Orla?', '— And the Shore?'), // N
        (st) => (chefes() >= 3 ? T('— Três casas seguram a trégua. Nenhum navio saiu de Nove Mastros.', '— Three houses are holding the truce. No ship has left Nine Masts.')
          : chefes() === 2 ? T('— Duas casas seguram a trégua. Nenhum navio saiu de Nove Mastros.', '— Two houses are holding the truce. No ship has left Nine Masts.')
            : T('— Uma casa segura a trégua. Nenhum navio saiu de Nove Mastros. Ainda.', '— One house is holding the truce. No ship has left Nine Masts. Yet.')), // N
        T('Olho as orelhas dele. Da cor de sempre. Ele não sabe mais do que diz.', 'I look at his ears. Their usual colour. He doesn’t know more than he says.'), // N
        T('Os homens da Sentença juram que o mar se levantou contra eles. A mulher que estava naquele barco está solta, perto do mar, com uma trégua frouxa nas costas.', 'The men of the Sentence swear the sea rose against them. The woman who was on that boat is loose, near the sea, with a slack truce behind her.'), // N
        (st) => (comMarkus() ? T('— Markus fica. Com a Capital e com a costa.', '— Markus stays. With the Capital and the coast.') : T('— O marechal fica. Com a Capital e com a costa.', '— The marshal stays. With the Capital and the coast.')), // N
        T('Aubert abre o caderno, enfim, e escreve. Antes de sair, conta as velas da sala com os olhos, como faz sempre.', 'Aubert opens the notebook at last and writes. Before he leaves, he counts the candles in the room with his eyes, as he always does.'), // N
      ] },

    // Markus, na sala de armas, com a espada do Simon
    { id: 'a05', zona: 'interior', fundo: { img: IMG('a05-markus'), kb: 'in', foco: '50% 38%', dim: .5 },
      texto: [
        T('Markus anda dormindo na sala de armas. Quando entro, ele já está sentado no banco, de botas, com a espada do meu irmão atravessada nos joelhos.', 'Markus has been sleeping in the armoury. When I come in he is already sitting on the bench, boots on, my brother’s sword across his knees.'), // N
        (st) => (comMarkus() ? T('— Já sei, Laura. O Aubert passou por aqui primeiro. — Ele ri pelo nariz. — Você leva os melhores de Redom e me deixa vigiando uma mulher que já sumiu.', '— I know, Laura. Aubert came by here first. — He laughs through his nose. — You take Redom’s two thousand best and leave me watching a woman who’s already gone.')
          : T('— Já sei, General-Rainha. O Aubert passou por aqui primeiro. — Ele ri pelo nariz. — A senhora leva os melhores de Redom e me deixa vigiando uma mulher que já sumiu.', '— I know, General-Queen. Aubert came by here first. — He laughs through his nose. — You take Redom’s two thousand best and leave me watching a woman who’s already gone.')), // N
        T('— Deixo o melhor que eu tenho no lugar onde eu não vou estar.', '— I leave the best I have where I won’t be.'), // N
        T('Ele olha para a espada nos joelhos.', 'He looks down at the sword on his knees.'), // N
        () => (comMarkus() ? T('— Mandei selar o cinzento. — Ele passa o polegar no fio da espada. — Você ainda não escolheu o dia.', '— I had the grey saddled. — He runs his thumb along the edge of the sword. — You still haven’t picked the day.') : T('— Mandei selar o cinzento.', '— I had the grey saddled.')), // N
        se(() => comMarkus(), T('Faz vinte anos que ele pediu a revanche, numa tenda de curandeiro, e eu disse que o dia era meu.', 'Twenty years ago he asked for a rematch, in a healer’s tent, and I said the day was mine to choose.')), // N
        se(() => comMarkus(), T('— Na volta.', '— When I’m back.')), // N
        se(() => comMarkus(), T('— Sem chuva.', '— No rain.')), // N
      ],
      escolha: { id: 'espada', pergunta: T('A espada do meu irmão', 'My brother’s sword'), opcoes: [
        { id: 'levar', txt: T('Levar a espada.', 'Take the sword.'),
          resultado: [T('Markus me entrega pelo cabo, como devolvia a espada caída no Torneio. Prendo na sela do cinzento, do lado da minha.', 'Markus hands it to me hilt first, the way he gave back a dropped sword at the Tournament. I strap it to the grey’s saddle, beside mine.'),
            se(() => !comMarkus(), T('Na porta, ele agradece ao cavalariço pelo nome.', 'At the door, he thanks the groom by name.'))] }, // N
        { id: 'deixar', txt: T('Deixar a espada com Markus.', 'Leave the sword with Markus.'),
          resultado: [T('— Alguém tem que dormir perto da porta.', '— Someone has to sleep near the door.'), T('Ele põe a mão de volta em cima da lâmina e não tira mais.', 'He puts his hand back on the blade and keeps it there.')] }, // N
      ] } },

    // o templo do Cavaleiro: a primeira reza desde a notícia
    { id: 'a06', zona: 'templo', fundo: { img: IMG('a06-templo'), kb: 'in', foco: '50% 35%', dim: .5, clima: 'velas' },
      texto: [
        T('O templo do Cavaleiro abre antes da primeira hora para a guarda que sai. Hoje abre para mim.', 'The Knight’s temple opens before the first hour for the watch going out. Today it opens for me.'), // N
        T('Não entro aqui desde a notícia. O Cavaleiro de pedra continua olhando para a porta, de espada baixa. As velas são as mesmas, das mesmas viúvas.', 'I haven’t been in here since the news. The stone Knight still faces the door, sword lowered. The candles are the same ones, from the same widows.'), // N
        T('Ajoelho. Os joelhos estalam.', 'I kneel. My knees crack.'), // N
      ],
      escolha: { id: 'prece', pergunta: T('O que eu peço', 'What I ask for'), opcoes: [
        { id: 'coragem', txt: T('Coragem.', 'Courage.'),
          resultado: [T('Peço o que pedia aos dezesseis. É a única coisa que eu sei pedir.', 'I ask for what I asked for at sixteen. It is the only thing I know how to ask for.'),
            T('O templo fica quieto. Nenhum passo na porta. Mas o meu ombro esquerdo pesa, como pesa quando alguém encosta a mão, e o pulso desce no pescoço.', 'The temple is still. No footstep at the door. But my left shoulder grows heavy, the way it does when someone rests a hand there, and the pulse in my neck slows.'),
            T('Não me viro para ver.', 'I don’t turn to look.')] }, // N
        { id: 'grakh', txt: T('O Grakh grande.', 'The big Grakh.'),
          resultado: [T('Peço que ele esteja lá quando eu chegar.', 'I ask that he be there when I arrive.'),
            T('O Cavaleiro de pedra olha para a porta. Nada se mexe, nem a chama das velas.', 'The stone Knight faces the door. Nothing moves, not even the candle flames.')] }, // N
        { id: 'homens', txt: T('Os dois mil, de volta.', 'The two thousand, back.'),
          resultado: [T('Peço que voltem todos pelo mesmo portão.', 'I ask that they all come back through the same gate.'),
            T('Uma vela do altar apaga sozinha. O fio de fumaça sobe reto até o teto. Não sei se é sim.', 'A candle on the altar goes out by itself. The thread of smoke rises straight to the ceiling. I don’t know if it’s a yes.')] }, // N
        { id: 'nada', txt: T('Não pedir nada.', 'Ask for nothing.'),
          resultado: [T('Fico de joelhos até o sino da primeira hora. Não peço nada. O sino toca, e eu levanto.', 'I stay on my knees until the first-hour bell. I ask for nothing. The bell rings, and I get up.')] }, // N
      ] } },

    { id: 'a06b', zona: 'templo', fundo: { img: IMG('a06-laje'), kb: 'in', foco: '50% 55%', dim: .55 },
      texto: [
        T('Na saída, o padre da guarda me acompanha até a escada do térreo.', 'On the way out, the watch priest walks me to the stairs down to the ground floor.'), // N
        T('— A hóspede da Orla dormiu aqui embaixo, General-Rainha. Três noites. Varreram o quarto depois que ela foi.', '— The guest from the Shore slept down here, General-Queen. Three nights. They swept the room after she left.'), // N
        T('Desço dois degraus. O quarto é pequeno: uma esteira, uma bacia, uma janela alta. No chão, em volta de uma laje, a junta de cal é mais clara que as outras. Mais nova.', 'I go down two steps. The room is small: a mat, a basin, a high window. In the floor, around one flagstone, the lime joint is paler than the others. Newer.'), // N
        T('Subo. A coluna espera.', 'I go back up. The column is waiting.'), // N
      ] },

    // o portão sul: dois mil
    { id: 'a07', zona: 'portao', fundo: { img: IMG('a07-portao'), kb: 'out', foco: '50% 45%', dim: .45, clima: 'poeira' }, vozAuto: 'L02', vozAtraso: 600,
      texto: [
        T('O portão sul abre com o sol. Conto por companhia, como conto há vinte anos: vinte companhias de cem. Dois mil.', 'The south gate opens with the sun. I count by company, as I have for twenty years: twenty companies of a hundred. Two thousand.'), // N
        T('A cavalaria na frente. Depois a Terceira, a infantaria pesada do Lorde Varr, com o Varr a pé no meio dela, porque um Varr anda com os seus. Joseph monta com a mão esquerda na rédea. A direita treme de manhã; tremia já no Torneio.', 'The cavalry in front. Then the Third, Lord Varr’s heavy foot, with Varr walking in the middle of it, because a Varr marches with his own. Joseph rides with his left hand on the reins. His right shakes in the mornings; it already shook at the Tournament.'), // N
        T('O Ansel vem na última fila da cavalaria. Ele pediu para ficar na Capital. Eu mandei que viesse. Ele vai me mostrar onde foi.', 'Ansel rides in the last row of the cavalry. He asked to stay in the Capital. I ordered him to come. He is going to show me where it happened.'), // N
        T('Atrás da coluna vêm as carroças: os barris, os odres, a cozinha, a forja sobre rodas, os moços da estrebaria puxando os cavalos de reserva, as ajudantes do curandeiro sentadas em cima das lonas. Esses não entram na minha conta. Servo não se conta.', 'Behind the column come the wagons: the barrels, the waterskins, the kitchen, the forge on wheels, the stable boys leading the spare horses, the healer’s helpers sitting on the canvas. Those don’t go into my count. Servants aren’t counted.'), // N
        se(() => lavadeiraVeio(), T('No meio deles, uma Nymae com argola de cativa no tornozelo carrega dois baldes numa vara.', 'Among them, a Nymae with a captive’s ring on her ankle carries two buckets on a pole.')), // N
        T('Monto o cinzento. Antes de eu puxar a rédea, ele vira a cabeça para a estrada do sul.', 'I mount the grey. Before I pull the rein, he turns his head toward the south road.'), // N
      ] },

    // ===================================================== II · A ESTRADA
    { id: 'parte-II', parte: 'II', zona: 'estrada', fundo: { img: IMG('b03-borda'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'II', nome: T('A Estrada', 'The Road'), epigrafe: T('Exército conta lança. Deserto conta água.', 'An army counts spears. A desert counts water.'), fonte: T('Dito dos sargentos', 'Sergeants’ saying') } },

    { id: 'b01', zona: 'acampamento', fundo: { img: IMG('b01-panela'), kb: 'in', foco: '50% 50%', dim: .5, clima: 'velas' },
      texto: [
        T('Na primeira noite de estrada, a cozinha arma a panela grande no meio do acampamento, e os soldados fazem fila com a tigela na mão.', 'On the first night of the road, the kitchen sets up the big pot in the middle of the camp, and the soldiers line up with their bowls.'), // N
        T('Entro na fila. Na estrada eu como da panela dos soldados. Sempre foi assim.', 'I get in line. On the road I eat from the soldiers’ pot. It has always been that way.'), // N
        () => (disfarce() === 'nell' ? T('A moça da cozinha enche a minha tigela sem levantar os olhos.', 'The kitchen girl fills my bowl without raising her eyes.') : T('O cozinheiro enche a minha tigela até a borda, porque é a minha.', 'The cook fills my bowl to the brim, because it’s mine.')), // N
        T('Como em pé, olhando a fila andar. Um cabo da Terceira vê a minha tigela vazia e cutuca o do lado. O do lado cutuca o próximo.', 'I eat standing, watching the line move. A corporal of the Third sees my empty bowl and nudges the man beside him. That one nudges the next.'), // N
        T('Devolvo a tigela.', 'I hand the bowl back.'), // N
        T('Joseph senta perto do fogo com um odre de vinho e gira o odre na mão antes de cada gole.', 'Joseph sits by the fire with a wineskin and turns the skin in his hand before every swallow.'), // N
        T('— O último, alteza. — Ele ergue o odre para mim. — Quarenta anos atrás eu abri a linha dos Grakh no deserto. Quero acabar lá.', '— The last one, Highness. — He raises the skin to me. — Forty years ago I opened the Grakh line in the desert. I want to finish there.'), // N
        T('A direita dele treme no couro do odre. A esquerda segura o gargalo.', 'His right hand shakes on the leather of the skin. His left holds the neck.'), // N
      ] },

    // a lavadeira (só se a Madrinha a mandou para a coluna no Cap. VII)
    { id: 'b02', se: () => lavadeiraVeio(), zona: 'acampamento', fundo: { img: IMG('b02-lavadeira'), kb: 'in', foco: '50% 45%', dim: .5 },
      texto: [
        T('Na beira do acampamento, a Nymae enche os barris da cozinha com dois baldes pendurados numa vara. A argola de cativa aparece no tornozelo cada vez que ela se abaixa.', 'At the edge of the camp, the Nymae fills the kitchen barrels from two buckets slung on a pole. The captive’s ring shows on her ankle every time she bends.'), // N
        T('Pediu para carregar água, dizem. Uma Nymae carrega água melhor que qualquer um, dizem também.', 'She asked to carry water, they say. A Nymae carries water better than anyone, they say too.'), // N
        T('Faz três dias que a hóspede sumiu na estrada da costa. Esta não é ela. O rosto da hóspede eu vi de perto, numa cela, por uma tarde.', 'Three days ago the guest vanished on the coast road. This isn’t her. I saw the guest’s face up close, in a cell, for an afternoon.'), // N
      ],
      escolha: { id: 'lavadeira8', pergunta: T('A Nymae', 'The Nymae'), opcoes: [
        { id: 'deixar', txt: T('Deixar que carregue a água.', 'Let her carry the water.'), resultado: [T('Ela continua. Não olha para mim.', 'She goes on. She doesn’t look at me.')] }, // N
        { id: 'vigiar', txt: T('Mandar um soldado dormir perto dos barris.', 'Have a soldier sleep near the barrels.'), resultado: [T('Um soldado da Terceira estende a manta ao lado dos barris. A Nymae vê, e continua enchendo.', 'A soldier of the Third spreads his blanket beside the barrels. The Nymae sees it, and keeps filling.')] }, // N
        { id: 'devolver', txt: T('Mandá-la de volta para a Capital na carroça do correio.', 'Send her back to the Capital on the post wagon.'), resultado: [T('De manhã ela vai na carroça do correio, de costas para o deserto, com a vara atravessada no colo.', 'In the morning she goes on the post wagon, her back to the desert, the pole across her lap.')] }, // N
      ] } },

    { id: 'b03', zona: 'deserto', fundo: { img: IMG('b03-borda'), kb: 'out', foco: '50% 55%', dim: .45, clima: 'poeira' },
      texto: [
        T('No sexto dia a terra vira areia, e a estrada some embaixo dela. Não faz falta. É o caminho das campanhas, de ida e volta até as Goelas, com os poços marcados por pedra empilhada.', 'On the sixth day the earth turns to sand, and the road disappears beneath it. It doesn’t matter. This is the campaign route, twenty years of going and coming back to the Gullets, the wells marked with piled stones.'), // N
        T('Conto os odres na carroça da frente. Conto os barris. Mando o intendente contar comigo.', 'I count the waterskins on the lead wagon. I count the barrels. I make the quartermaster count with me.'), // N
        T('— Água para onze dias, Lâmina. As Goelas estão a cinco.', '— Water for eleven days, Blade. The Gullets are five away.'), // N
        T('— Com seis de folga.', '— With six to spare.'), // N
        T('— Com seis, Lâmina.', '— With six, Blade.'), // N
        T('Nunca usei a folga toda.', 'I have never used all of the margin.'), // N
      ] },

    // ===================================================== III · A BOCA SECA (a caça)
    { id: 'parte-III', parte: 'III', zona: 'deserto', fundo: { img: IMG('c-dia'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'III', nome: T('A Areia', 'The Sand'), epigrafe: T('No deserto, quem carrega a água carrega o exército.', 'In the desert, whoever carries the water carries the army.'), fonte: T('Dito dos intendentes', 'Quartermasters’ saying') } },

    ...[0, 1, 2].flatMap((k) => [noite(k), decide(k)]),

    // se ela já fugiu da corrente: as noites que sobram ficam quietas
    { id: 'cq', se: (st) => fugiu(st) && st.f.fugiuNoite < 2, zona: 'deserto-noite', fundo: { img: IMG('c-noite'), kb: 'in', dim: .55 },
      texto: [
        T('As noites seguintes passam sem nada. Os odres amanhecem duros de água, e os cochos, cheios.', 'The nights that follow pass with nothing. The waterskins are hard with water at dawn, and the troughs are full.'), // N
        T('O que quer que fosse, ficou para trás, na areia, sem água.', 'Whatever it was, it stayed behind, out in the sand, with no water.'), // N
      ] },

    // o servo que cai: ela vê e não entende
    { id: 'c9', se: (st) => !fugiu(st), zona: 'deserto', fundo: { img: IMG('c-cai'), kb: 'in', foco: '50% 55%', dim: .45, clima: 'poeira' },
      texto: [
        T('No décimo dia, perto das carroças, um servo cai no calor.', 'On the tenth day, near the wagons, a servant falls in the heat.'), // N
        () => ({ estrebaria: T('Um moço da estrebaria, de joelhos ao lado de um cavalo.', 'A stable boy, on his knees beside a horse.'), forja: T('Um ajudante de ferreiro, ao lado da forja sobre rodas.', 'A smith’s boy, beside the forge on wheels.'), feridos: T('Uma ajudante do curandeiro, com um balde vazio na mão.', 'A healer’s helper, an empty bucket in her hand.'), cozinha: T('Uma moça da cozinha, entre os sacos de sal.', 'A kitchen girl, among the salt sacks.') }[lugarVerdadeiro()]), // N
        T('Antes de alguém chegar, já está de pé, puxando a manga até cobrir o pulso.', 'Before anyone gets there, they are already up, pulling the sleeve down over the wrist.'), // N
        (st) => (sabeOnde(st) ? T('É ' + nomeDe(ELA()) + '. Anoto o nome.', 'It’s ' + nomeDe(ELA()) + '. I note the name.')
          : T('Anoto o lugar e a hora. O rosto, não: quando chego perto, estão todos iguais de poeira.', 'I note the place and the hour. Not the face: by the time I get there, they are all the same under the dust.')), // N
      ] },

    // ===================================================== IV · AS GOELAS
    { id: 'parte-IV', parte: 'IV', zona: 'goelas', fundo: { img: IMG('d01-goelas'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'IV', nome: T('As Goelas', 'The Gullets'), epigrafe: T('O posto das Goelas não tem muralha. Tem um poço e uma roda.', 'The Gullets post has no wall. It has a well and a wheel.'), fonte: T('Relatório ao Conselho de Redom', 'Report to the Council of Redom') } },

    { id: 'd01', zona: 'goelas', fundo: { img: IMG('d01-goelas'), kb: 'in', foco: '50% 50%', dim: .45, clima: 'poeira' },
      texto: [
        T('As Goelas aparecem no fim do décimo primeiro dia: a cerca de estacas, o muro velho dos Grakh em volta do poço mais fundo, a roda em cima do poço e o estandarte vermelho com a balança, que alguém lavou.', 'The Gullets come into sight at the end of the eleventh day: the stake fence, the Grakh’s old wall around the deepest well, the wheel over the well, and the red banner with the scales, which someone has washed.'), // N
        T('Dos cento e vinte homens do posto, sobraram trinta e um. Estão em fila na porta da cerca. O mais velho mal tem barba.', 'Of the hundred and twenty men of the post, thirty-one are left. They stand in line at the fence gate. The oldest barely has a beard.'), // N
        T('Os meus soldados bebem do poço até a barriga doer. Deixo.', 'My soldiers drink from the well until their bellies hurt. I let them.'), // N
        T('Meu pai morreu neste chão quando eu tinha quinze anos, num dia em que o sol sumiu. Os que voltaram contaram à minha mãe a última coisa que ele gritou. Eu estava atrás da porta.', 'My father died on this ground when I was fifteen, on a day the sun went out. The men who came back told my mother the last thing he shouted. I was behind the door.'), // N
        T('— Firmes! É só o escuro! Segurem a linha!', '— Steady! It’s only the dark! Hold the line!'), // N
        T('Meu irmão morreu aqui. A notícia levou oito dias até a Capital. Eu levei onze.', 'My brother died here. The news took eight days to reach the Capital. I took eleven.'), // N
      ] },

    { id: 'd02', zona: 'goelas-noite', fundo: { img: IMG('d02-noite'), kb: 'in', foco: '50% 50%', dim: .5 },
      texto: [
        (st) => (fugiu(st) ? T('Nas Goelas, as noites ficam como ficaram desde a corrente vazia: quietas.', 'At the Gullets, the nights stay as they have since the empty chain: quiet.')
          : T('Nas Goelas, as noites ficam quietas. Os odres amanhecem duros de água, os cochos, cheios, e os barris da cozinha têm gosto de barril.', 'At the Gullets, the nights go quiet. The waterskins are hard with water at dawn, the troughs are full, and the kitchen barrels taste of barrel.')), // N
        (st) => (fugiu(st) ? null : T('Aqui a água sobra. Seja o que for, não precisa mais tirar.', 'Here water is plentiful. Whatever it is, it doesn’t need to take any now.')), // N
      ] },

    // o Ansel mostra o chão (ou, se a Laura o matou, um soldado do posto que só ouviu contar)
    { id: 'd03', zona: 'goelas', fundo: { img: IMG('d03-chao'), kb: 'in', foco: '50% 55%', dim: .5 },
      texto: (st) => (anselVivo(st) ? [
        T('Ansel me leva até o meio do pátio, entre o poço e a cerca. Para num lugar onde a areia é igual à do resto.', 'Ansel leads me to the middle of the yard, between the well and the fence. He stops at a place where the sand is like the sand everywhere else.'),
        T('— Aqui, senhora. — Ele aponta um palmo à frente da bota. — Ele caiu aqui. O grande ajoelhou ali. Eu estava no cavalo, perto da porta.', '— Here, my lady. — He points a hand’s width in front of his boot. — He fell here. The big one knelt there. I was on my horse, by the gate.'),
        ...(rangido() === 'acabar' ? [
          T('— O grande desceu a maça uma vez. Ele estava tentando levantar.', '— The big one brought the mace down once. He was trying to get up.'),
        ] : [
          T('— O grande olhou para ele até ele parar. A mão dele foi para o peito. Bateu uma vez, com dois dedos.', '— The big one kept watching him until he stopped. His hand went to his chest. He tapped once, with two fingers.'),
          T('— Uma vez?', '— Once?'),
          T('— Uma vez, senhora. A outra não veio.', '— Once, my lady. The second never came.'),
          T('Dois dedos no peito, duas batidas: mais uma rodada. Era o nosso sinal no laranjal, quando ele tinha catorze anos e não sabia perder. Pediu mais uma rodada, e pediu pela metade.', 'Two fingers on the chest, two taps: one more round. It was our sign in the orange grove, when he was fourteen and didn’t know how to lose. He asked for one more round, and only got halfway through asking.'),
        ]),
        T('— Na noite antes, ele me deu metade do pão dele. Disse que o pão de amanhã era por conta dele.', '— The night before, he gave me half his bread. He said tomorrow’s bread was on him.'),
      ] : [
        T('Um soldado do posto me leva até o meio do pátio e para num lugar onde a areia é igual à do resto.', 'A soldier of the post leads me to the middle of the yard and stops at a place where the sand is like the sand everywhere else.'),
        T('— Contaram que foi aqui, senhora. Eu estava no estábulo, com a porta trancada. Quem viu foi o sentinela do pão.', '— They said it was here, my lady. I was in the stable, with the door barred. The one who saw it was the sentry with the bread.'),
        T('O sentinela do pão ficou na areia, faz quatro dias. Fui eu que mandei.', 'The sentry with the bread was left in the sand four days ago. I gave the order.'),
      ]) },

    { id: 'd04', zona: 'goelas', fundo: { img: IMG('d04-roda'), kb: 'in', foco: '50% 45%', dim: .45 },
      texto: [
        T('A roda do poço é de madeira de carroça, com uma corda grossa que desce até a água. Do lado, uma manivela gasta no meio, de tanta mão.', 'The well wheel is made of wagon timber, with a thick rope that runs down to the water. Beside it, a crank worn smooth in the middle from so many hands.'), // N
        T('Pego a manivela.', 'I take the crank.'), // N
      ],
      minijogo: 'roda',
      depois: (st) => {
        const v = (st.roda && st.roda.voltas) || 0;
        return [v >= 12 ? T('Giro até o balde bater na boca do poço, cheio. Solto a manivela. O balde desce outra vez até a água, e a roda range sozinha no caminho.', 'I turn until the bucket knocks against the lip of the well, full. I let go of the crank. The bucket drops back to the water, and the wheel creaks by itself on the way down.')
          : v >= 4 ? T('Os homens do posto param de falar enquanto eu giro. Quando solto, voltam a falar mais baixo.', 'The men of the post stop talking while I turn it. When I let go, they start again, quieter.')
            : T('Uma volta, duas. Solto. A roda para no meio do rangido.', 'One turn, two. I let go. The wheel stops in the middle of its creak.')];
      } },

    // o túmulo: o segundo disparo. A primeira vez que o nome sai em voz alta.
    { id: 'd05', zona: 'goelas', fundo: { img: IMG('d05-tumulo'), kb: 'in', foco: '50% 40%', dim: .5 }, pico: { bpm: 116, ms: 0 },
      texto: [
        T('Enterraram meu irmão em cima do muro velho dos Grakh, no lugar mais alto do posto, de onde se vê a roda. Uma pilha de pedras, e o estandarte dele enrolado no cabo, enterrado de pé.', 'They buried my brother on top of the Grakh’s old wall, at the highest point of the post, where you can see the wheel. A pile of stones, and his banner rolled on its staff, buried standing.'), // N
        T('Ajoelho ao lado das pedras.', 'I kneel beside the stones.'), // N
        { continuar: true, voz: 'L03' },
        T('— Simon.', '— Simon.'), // N
        (st) => (anselVivo(st) && rangido() !== 'acabar'
          ? T('Bato dois dedos no peito. Uma vez, como ele bateu. Depois a outra, a que não veio.', 'I tap two fingers on my chest. Once, the way he did. Then the second, the one that never came.')
          : T('Bato dois dedos no peito, duas vezes. Mais uma rodada.', 'I tap two fingers on my chest, twice. One more round.')), // N
        se((st) => st.escolhas.espada === 'levar', T('Finco a espada dele entre as pedras, de ponta para baixo, até o cabo ficar na altura do meu ombro.', 'I drive his sword in between the stones, point down, until the hilt stands level with my shoulder.')), // N
        se((st) => anselVivo(st), T('Atrás de mim, Ansel se ajoelha também e põe um pedaço de pão em cima das pedras.', 'Behind me, Ansel kneels too and sets a piece of bread on the stones.')), // N
        T('O pulso bate no pescoço, alto. As mãos não param no joelho. Fico até elas pararem.', 'My pulse beats high in my neck. My hands won’t keep still on my knee. I stay until they do.'), // N
      ] },

    // Joseph pede para ficar
    { id: 'd06', zona: 'goelas', fundo: { img: IMG('d06-joseph'), kb: 'in', foco: '50% 40%', dim: .5 },
      texto: [
        T('Joseph me espera perto da roda, de pé, com as duas mãos no cinto para elas não tremerem.', 'Joseph is waiting for me by the wheel, standing, both hands on his belt so they won’t shake.'), // N
        T('— Alteza. Me deixa aqui.', '— Highness. Leave me here.'), // N
        T('— Você quis uma última campanha.', '— You wanted one last campaign.'), // N
        (st) => ((st.noites || []).includes('cozinha')
          ? T('— Quis. Um posto também é campanha. Bebi do barril salgado, alteza. Não aguento mais dois dias de areia e uma luta no fim. Fico com os do posto, seguro a água e recebo quem voltar.', '— I did. A post is a campaign too. I drank from the salt barrel, Highness. I can’t take two more days of sand and a fight at the end. I stay with the post’s men, hold the water, and take in whoever comes back.')
          : T('— Quis. Um posto também é campanha. Tenho sessenta e um anos, alteza. Não aguento mais dois dias de areia e uma luta no fim. Fico com os do posto, seguro a água e recebo quem voltar.', '— I did. A post is a campaign too. I’m sixty-one, Highness. I can’t take two more days of sand and a fight at the end. I stay with the post’s men, hold the water, and take in whoever comes back.')), // N
        T('Ele gira o anel no dedo, como girava a taça no jantar, vinte anos atrás.', 'He turns the ring on his finger, the way he turned his cup at dinner twenty years ago.'), // N
        T('— Naquele tempo eu estava no seu caminho. Deixa eu sair dele num lugar que tem água.', '— Back then I was in your way. Let me step out of it somewhere with water.'), // N
      ],
      escolha: { id: 'joseph', pergunta: T('Joseph', 'Joseph'), opcoes: [
        { id: 'ficar', txt: T('Deixar Joseph no posto.', 'Leave Joseph at the post.'),
          resultado: [T('— Obrigado, alteza.', '— Thank you, Highness.'), T('Ele tira as mãos do cinto. A direita treme. Ele deixa tremer.', 'He takes his hands off his belt. The right one shakes. He lets it.')] }, // N
        { id: 'ir', aviso: T('Joseph vai lembrar disso.', 'Joseph will remember that.'), txt: T('Mandar Joseph seguir com a coluna.', 'Order Joseph on with the column.'),
          resultado: [T('— Às suas ordens, alteza.', '— At your command, Highness.'), T('Ele monta com a mão esquerda e não fala mais até o fim da tarde.', 'He mounts with his left hand and says nothing more until the end of the afternoon.')] }, // N
      ] } },

    { id: 'd07', zona: 'goelas', fundo: { img: IMG('d07-batedores'), kb: 'in', foco: '50% 50%', dim: .5 },
      texto: [
        T('Os batedores voltam no fim da tarde, com os cavalos espumando.', 'The scouts come back at the end of the afternoon, their horses lathered.'), // N
        T('— O Pira está no Último Gole, Lâmina. A dois dias daqui. Todos: os que lutam, os velhos, as crias. Enchendo odre.', '— The Pyre is at the Last Swallow, Blade. Two days from here. All of them: the fighters, the old ones, the young. Filling skins.'), // N
        T('Último Gole é como os nossos mapas chamam o último poço antes de o deserto acabar. Os batedores dizem que, do outro lado, quem chega de fora chama o mesmo poço de Primeiro Gole.', 'Last Swallow is what our maps call the last well before the desert ends. The scouts say that on the far side, those coming in from outside call the same well the First Swallow.'), // N
        T('Quem sai do deserto por ali bebe nele. É ali que eu corto.', 'Whoever leaves the desert that way drinks from it. That’s where I cut them off.'), // N
      ] },

    // ===================================================== V · O ÚLTIMO GOLE (a véspera)
    { id: 'parte-V', parte: 'V', zona: 'deserto-noite', fundo: { img: IMG('e01-fogos'), kb: 'in', dim: .62 },
      cartao: { num: 'V', nome: T('O Último Gole', 'The Last Swallow'), epigrafe: T('Quem chega chama de primeiro gole. Quem parte, de último. O balde é o mesmo.', 'Those arriving call it the first swallow. Those leaving, the last. It’s the same bucket.'), fonte: T('Dito dos batedores', 'Scouts’ saying') } },

    { id: 'e01', zona: 'deserto-noite', fundo: { img: IMG('e01-fogos'), kb: 'in', foco: '50% 55%', dim: .45 },
      texto: [
        T('Do alto da duna, no fim do segundo dia, o Último Gole: um vale raso de pedra com sete poços cavados na rocha, e só um brilhando.', 'From the top of the dune, at the end of the second day, the Last Swallow: a shallow stone valley with seven wells cut into the rock, and only one of them shining.'), // N
        T('Em volta do que brilha, os fogos do Pira.', 'Around the one that shines, the Pyre’s fires.'), // N
        T('Conto. Trinta e quatro fogos. Os da frente, perto da água, têm sombras grandes em volta: os que lutam. Os de trás, menores: os velhos e as crias.', 'I count. Thirty-four fires. The ones in front, near the water, have big shadows around them: the fighters. The ones behind, smaller: the old and the young.'), // N
        T('Trinta e quatro. Vinte anos atrás, contei trezentos.', 'Thirty-four. Twenty years ago, I counted three hundred.'), // N
        T('Os outros seis poços ficam entre a duna e a água, abertos no chão. Um soldado joga uma pedra no mais perto. Conto até ela bater. Chego a sete, e ela não bate.', 'The other six wells lie between the dune and the water, open in the ground. A soldier drops a stone into the nearest. I count until it hits. I reach seven, and it doesn’t.'), // N
      ] },

    { id: 'e02', zona: 'deserto-noite', fundo: { img: IMG('e02-chao'), kb: 'in', foco: '50% 55%', dim: .55 },
      texto: [
        T('De madrugada, o guarda do flanco do poente me acorda.', 'Before dawn, the guard on the western flank wakes me.'), // N
        T('— Lâmina. O chão.', '— Blade. The ground.'), // N
        T('Desço a duna com ele e encosto o ouvido na areia, como os batedores ensinam a ouvir cavalo longe.', 'I go down the dune with him and put my ear to the sand, the way scouts teach you to listen for distant horses.'), // N
      ],
      minijogo: 'chao',
      depois: (st) => (st.chao && st.chao.acertos >= 6
        ? [T('Três batidas e um silêncio. Três batidas e um silêncio. Cavalo não bate assim, nem homem a pé.', 'Three beats and a silence. Three beats and a silence. Horses don’t beat like that, nor men on foot.')]
        : [T('Alguma coisa bate, longe, do lado do poente. Perco o ritmo no vento.', 'Something is beating, far off, to the west. I lose the rhythm in the wind.')]) },

    { id: 'e02b', zona: 'deserto-noite', fundo: { img: IMG('e02-chao'), kb: 'in', foco: '50% 55%', dim: .55 },
      texto: [T('Levanto a cabeça da areia. O guarda espera a ordem.', 'I lift my head from the sand. The guard waits for the order.')], // N
      escolha: { id: 'vigia', pergunta: T('O poente', 'The west'), opcoes: [
        { id: 'oeste', txt: T('Dobrar a vigia no flanco do poente.', 'Double the watch on the western flank.'), resultado: [T('Cem homens da Terceira dormem de escudo no braço, virados para o poente.', 'A hundred men of the Third sleep with their shields on their arms, facing west.')] }, // N
        { id: 'batedores', txt: T('Mandar dois batedores ver o que é.', 'Send two scouts to see what it is.'), resultado: [T('Os dois saem a cavalo para o poente. Não voltam até o sol.', 'The two ride out to the west. They aren’t back by sunrise.')] }, // N
        { id: 'vento', txt: T('É o vento. Voltar a dormir.', 'It’s the wind. Go back to sleep.'), resultado: [T('Volto para a tenda. Durmo uma hora.', 'I go back to the tent. I sleep for an hour.')] }, // N
      ] } },

    { id: 'e03', zona: 'deserto-noite', fundo: { img: IMG('e03-varr'), kb: 'in', foco: '50% 40%', dim: .5, clima: 'velas' },
      texto: [
        T('O Varr me acha acordada perto dos cavalos e senta numa pedra sem pedir.', 'Varr finds me awake by the horses and sits on a rock without asking.'), // N
        T('— Amanhã, Lâmina.', '— Tomorrow, Blade.'), // N
        T('— Amanhã.', '— Tomorrow.'), // N
        T('— Meu pai tem uma estátua pequena num jardim que não recebe visita. Eu queria uma canção.', '— My father has a small statue in a garden nobody visits. I wanted a song.'), // N
        T('— Há vinte anos, na prova dos escribas, tinha um tal de Merrow na mesa do lado.', '— Twenty years ago, at the scribes’ trial, there was someone called Merrow at the next table.'), // N
        () => ({
          ajudar: [T('— Escreveu a resposta no canto da folha para eu copiar. — Ele bate no meu ombro com o punho. — Um Varr paga o que deve. Amanhã eu pago, Merrow.', '— He wrote the answer in the corner of the page for me to copy. — He thumps my shoulder with his fist. — A Varr pays what he owes. Tomorrow I pay, Merrow.')],
          errar: [T('— Me deu um número errado para copiar. Eu copiei. Até hoje não sei se foi de propósito.', '— He gave me a wrong number to copy. I copied it. To this day I don’t know if it was on purpose.'), T('— Foi.', '— It was.'), T('Ele ri alto, e os cavalos levantam a cabeça.', 'He laughs out loud, and the horses lift their heads.')],
          recusar: [T('— Balançou o elmo quando eu pedi a resposta. Errei sozinho. Aprendi sozinho. Amanhã eu acerto, Merrow.', '— He shook his helmet when I asked for the answer. I got it wrong on my own. I learned on my own. Tomorrow I get it right, Merrow.')],
        }[varr4()] || [T('— Um Varr paga o que deve, Lâmina. Amanhã eu pago.', '— A Varr pays what he owes, Blade. Tomorrow I pay.')]), // N
        T('Ele levanta, bate a areia da roupa e vai dormir com a Terceira, no chão, do jeito deles.', 'He gets up, beats the sand off his clothes and goes to sleep with the Third, on the ground, their way.'), // N
      ] },

    { id: 'e04', zona: 'tenda', fundo: { img: IMG('e04-tenda'), kb: 'in', foco: '50% 50%', dim: .5, clima: 'velas' },
      texto: [
        T('Não durmo. Na tenda, conto os homens pelas companhias, as companhias pelos sargentos, os sargentos pelo nome.', 'I don’t sleep. In the tent, I count the men by company, the companies by sergeant, the sergeants by name.'), // N
        (st) => (disfarce() === 'nell' && !fugiu(st) && !(st.mortos || []).includes('nell')
          ? T('Nell entra com uma tigela de ensopado frio e põe na mesa, ao lado do mapa. Sai sem eu pedir.', 'Nell comes in with a bowl of cold stew and sets it on the table beside the map. She leaves without my asking.')
          : T('Um moço da cozinha entra com uma tigela de ensopado frio e põe na mesa, ao lado do mapa.', 'A kitchen boy comes in with a bowl of cold stew and sets it on the table beside the map.')), // N
        T('Como tudo. Devolvo a tigela vazia ao guarda da porta.', 'I eat all of it. I hand the empty bowl to the guard at the door.'), // N
        T('Lá fora, a areia começa a clarear.', 'Outside, the sand begins to grow light.'), // N
      ] },

    // o amanhecer: apontar alguém na fila. Se ela já fugiu da corrente, sobe de dentro de um poço seco.
    { id: 'e05', se: (st) => !fugiu(st), zona: 'amanhecer', fundo: { img: IMG('e05-fila'), kb: 'in', foco: '50% 45%', dim: .45 },
      texto: [
        T('Antes da carga, mando a coluna formar na crista da duna, de frente para o vale. Os servos, na frente da coluna, numa fila só, de costas para o Pira.', 'Before the charge, I order the column to form up on the crest of the dune, facing the valley. The servants in front of the column, in a single line, their backs to the Pyre.'), // N
        (st) => T('Ando diante da fila. Os moços da estrebaria. O ferreiro e o ajudante. As moças da cozinha. As ajudantes do curandeiro.', 'I walk along the line. The stable boys. The smith and his boy. The kitchen girls. The healer’s helpers.') + (lavNaColuna(st) ? T(' A Nymae, no fim.', ' The Nymae, at the end.') : ''), // N
        T('O que tirou a nossa água está nesta fila, ou não está em lugar nenhum.', 'Whatever took our water is in this line, or it is nowhere.'), // N
        se((st) => sabeOnde(st), T('Sei onde olhar.', 'I know where to look.')), // N
      ],
      escolha: { id: 'desmascarar', pergunta: T('A fila', 'The line'), opcoes: (st) => opcoesFila(st) } },

    { id: 'e05f', se: (st) => fugiu(st), zona: 'amanhecer', fundo: { img: IMG('e05-fila'), kb: 'in', foco: '50% 45%', dim: .45 },
      texto: [
        T('Antes da carga, mando a coluna formar na crista da duna, de frente para o vale.', 'Before the charge, I order the column to form up on the crest of the dune, facing the valley.'), // N
        T('Lá embaixo, entre a duna e o Pira, uma coisa pequena sobe de dentro de um dos poços secos. Não está com a roupa que deixou na corrente: arrumou outra. Fica de pé na borda, de frente para nós, e abre as mãos.', 'Down below, between the dune and the Pyre, something small climbs out of one of the dry wells. It isn’t wearing the clothes it left in the chain: it must have stolen others. It stands on the rim, facing us, and opens its hands.'), // N
        T('Conheço o tamanho. Passei uma tarde na frente dele, numa cela da Ala Funda.', 'I know that size. I spent an afternoon in front of it, in a cell in the Deep Ward.'), // N
      ] },

    // ===================================================== VI · A BOCA BEBE (a batalha)
    { id: 'parte-VI', parte: 'VI', zona: 'batalha', fundo: { img: IMG('f-onda'), kb: 'in', dim: .62 },
      cartao: { num: 'VI', nome: T('O Dia Comido', 'The Eaten Day'), epigrafe: T('Dia ser comido, Maior nascer.', 'Day be eaten, Biggest be born.'), fonte: T('Dito dos velhos Grakh', 'Saying of the old Grakh') } },

    // ---------- rota A: desmascarada ao amanhecer
    { id: 'f01a', se: (st) => st.f.desmascarou === 'certo', zona: 'amanhecer', fundo: { img: IMG('f-rosto'), kb: 'in', foco: '50% 40%', dim: .45 },
      texto: [
        T('O rosto escorrega.', 'The face slips.'), // N
        T('Primeiro a pele do pescoço, em placas finas, azul-cinza. Depois as orelhas, que descolam da cabeça e abrem em nadadeira. O corpo encolhe dentro da roupa de servo até a manga cobrir a mão. Os dois soldados soltam os braços ao mesmo tempo.', 'First the skin of the neck, in thin blue-grey plates. Then the ears, which peel away from the head and open into fins. The body shrinks inside the servant’s clothes until the sleeve covers the hand. The two soldiers let go of the arms at the same moment.'), // N
        T('Conheço esse rosto. Passei uma tarde na frente dele, numa cela da Ala Funda.', 'I know this face. I spent an afternoon in front of it, in a cell in the Deep Ward.'), // N
        T('A hóspede olha para mim, depois para a coluna na crista, de uma ponta à outra. Conta, como eu contei no portão.', 'The guest looks at me, then at the column on the crest, from one end to the other. She counts, the way I counted at the gate.'), // N
        T('— Você trouxe os melhores, Laura.', '— You brought the best, Laura.'), // N
        T('Ela abre as mãos.', 'She opens her hands.'), // N
        T('— E a Boca Seca bebe todos.', '— And the Dry Mouth drinks them all.'), // N
      ] },

    { id: 'f02a', se: (st) => rotaA(st), zona: 'onda', fundo: { img: IMG('f-onda'), kb: 'in', foco: '50% 45%', dim: .4 }, sons: [{ s: SFX('onda-gigante'), ms: 400, v: .9 }],
      texto: [
        T('No vale, o poço que brilhava apaga.', 'In the valley, the well that was shining goes dark.'), // N
        T('A água sai dele de uma vez, em pé, mais alta que a duna, e vem pelo vale na direção das mãos dela, passando por cima dos poços secos.', 'The water comes out of it all at once, standing up, taller than the dune, and comes up the valley toward her hands, passing over the dry wells.'), // N
        T('— Escudos!', '— Shields!'), // N
        T('A Terceira fecha o muro.', 'The Third closes the wall.'), // N
        T('A onda bate na crista. Arranca a fila dos servos, os cavalos de reserva, a primeira fileira. A segunda segura de joelhos, com a água pela cintura.', 'The wave hits the crest. It tears away the line of servants, the spare horses, the first rank. The second holds on its knees, water to the waist.'), // N
        T('Quando volta, a água leva o que arrancou encosta abaixo, e os poços secos bebem.', 'When it goes back, the water carries what it tore away down the slope, and the dry wells drink.'), // N
        T('Ouço os gritos descendo. Somem antes do sete.', 'I hear the screams going down. They’re gone before seven.'), // N
      ] },

    // ---------- rota B: Redom ataca, e a água vem no meio da carga
    { id: 'f01b', se: (st) => !rotaA(st), zona: 'batalha', fundo: { img: IMG('f-carga'), kb: 'in', foco: '50% 50%', dim: .45 },
      texto: [
        T('Dou a ordem. A coluna desce a duna, a cavalaria pelos flancos e a Terceira pelo meio, entre os poços secos, na direção da água.', 'I give the order. The column goes down the dune, the cavalry on the flanks and the Third through the middle, between the dry wells, toward the water.'), // N
        T('Os Grakh formam na frente dos acampamentos. Poucos. Na frente deles, um mais alto que todos, com uma maça, parado, esperando a gente chegar.', 'The Grakh form up in front of their camps. Few. In front of them, one taller than all the rest, with a mace, standing still, waiting for us to come.'), // N
        T('O Grakh grande.', 'The big Grakh.'), // N
        T('Estamos a cem passos do poço quando a água dele se levanta.', 'We are a hundred paces from the well when its water stands up.'), // N
      ] },

    { id: 'f02b', se: (st) => !rotaA(st), zona: 'onda', fundo: { img: IMG('f-onda'), kb: 'in', foco: '50% 45%', dim: .4 }, sons: [{ s: SFX('onda-gigante'), p: 0, v: .9 }],
      texto: [
        T('A água sai do poço em pé, mais alta que a duna, e cai sobre a carga.', 'The water comes out of the well standing up, taller than the dune, and falls on the charge.'), // N
        T('Não tem escudo para isso. A onda passa por cima da Terceira, dos cavalos, de mim. Quando volta, arrasta os homens pelo chão do vale, rolando, até os poços secos, e os poços bebem.', 'There is no shield for this. The wave goes over the Third, over the horses, over me. When it goes back, it drags the men across the valley floor, rolling, into the dry wells, and the wells drink.'), // N
        T('Ouço os gritos descendo. Somem antes do sete.', 'I hear the screams going down. They’re gone before seven.'), // N
        T('Levanto da lama com a rédea do cinzento ainda enrolada no pulso. Ele também levanta.', 'I get up out of the mud with the grey’s rein still wound round my wrist. He gets up too.'), // N
        T('Quando a água acaba, o poço do Pira está seco. No fundo dele, de pé, uma coisa pequena de roupa de servo, com as mãos abertas.', 'When the water is done, the Pyre’s well is dry. At the bottom of it, standing, something small in servant’s clothes, with its hands open.'), // N
        T('Conheço o tamanho. Passei uma tarde na frente dele, numa cela da Ala Funda.', 'I know that size. I spent an afternoon in front of it, in a cell in the Deep Ward.'), // N
      ] },

    // ---------- as duas rotas seguem juntas
    { id: 'f03', zona: 'batalha', fundo: { img: IMG('f-bronze'), kb: 'in', foco: '50% 45%', dim: .45 }, sons: [{ s: 'assets/audio/tacet_passos.mp3', p: 0, v: .9 }],
      texto: [
        (st) => (rotaA(st) ? T('Depois da água, o compasso.', 'After the water, the beat.') : T('Com a água ainda escorrendo do cabelo, ouço o compasso.', 'With the water still running out of my hair, I hear the beat.')), // N
        (st) => (st.chao && st.chao.acertos >= 6 ? T('Três batidas e um silêncio. Ouvi de noite, com o ouvido na areia. Agora não preciso encostar.', 'Three beats and a silence. I heard it in the night, with my ear on the sand. Now I don’t need to lie down.')
          : T('Batidas. Três, um silêncio, e três.', 'Beats. Three, a silence, and three.')), // N
        T('Do lado do poente, na crista da duna seguinte, aparecem homens de bronze. Dez. Vinte. Mais. Andam no mesmo passo, sem pressa, e o compasso quebra: quatro batidas, sem silêncio.', 'To the west, on the crest of the next dune, men of bronze and stone appear. Ten. Twenty. More. They walk in the same step, unhurried, and the beat breaks: four beats, no silence.'), // N
        (st) => ({ oeste: T('A vigia dobrada do poente vira os escudos para eles antes de eu dar a ordem.', 'The doubled watch on the western flank turns its shields toward them before I give the order.'),
          batedores: T('Um cavalo de batedor desce a duna na frente deles, sem ninguém na sela.', 'A scout’s horse comes down the dune ahead of them, with no one in the saddle.'),
          vento: T('No flanco do poente, os homens ainda estão se levantando.', 'On the western flank, the men are still getting to their feet.') }[st.escolhas.vigia] || null), // N
        T('A água não derruba bronze. Eles atravessam o lamaçal do vale sem afundar. Um sargento enfia a lança no peito do primeiro. A lança entra, e o bronze continua andando.', 'Water doesn’t knock down bronze. They cross the mud of the valley without sinking. A sergeant drives his spear into the chest of the first. The spear goes in, and the bronze keeps walking.'), // N
      ] },

    { id: 'f04', zona: 'batalha', fundo: { img: IMG('f-pira'), kb: 'in', foco: '50% 50%', dim: .45 }, sons: [{ s: SFX('tambores-guerra'), p: 0, v: .8 }],
      texto: [
        (st) => (rotaA(st)
          ? [T('Lá embaixo, o Pira viu a água bater em nós e o bronze descer do poente. Os tambores começam.', 'Down below, the Pyre saw the water hit us and the bronze come down from the west. The drums begin.'),
            T('Os Grakh sobem a duna. Na frente deles, um mais alto que todos, com uma maça.', 'The Grakh climb the dune. In front of them, one taller than all the rest, with a mace.'),
            T('O Grakh grande.', 'The big Grakh.')]
          : [T('Os Grakh viram a água derrubar a nossa carga. Os tambores começam, e eles vêm, os poucos que são, dos acampamentos para dentro do vale, com o mais alto na frente.', 'The Grakh saw the water bring down our charge. The drums begin, and they come, the few of them there are, out of the camps and into the valley, with the tallest in front.')]), // N
        () => ((c6().aoLado || []).includes('ikk') ? T('Uma flecha de longe derruba o sargento ao meu lado. Lá atrás, em cima de uma pedra, uma Grakh de arco puxa a próxima.', 'An arrow from far off brings down the sergeant beside me. Back there, on top of a rock, a Grakh with a bow is drawing the next.') : null), // N
        () => ((c6().aoLado || []).includes('dorgh') ? T('Ao lado do grande, um Grakh mais velho, com um corte antigo no braço, bate com o porrete em tudo o que se mexe.', 'Beside the big one, an older Grakh with an old cut on his arm clubs everything that moves.') : null), // N
      ] },

    { id: 'f05', zona: 'batalha', fundo: { img: IMG('f-varr'), kb: 'in', foco: '50% 50%', dim: .45 },
      texto: [
        (st) => (rotaA(st) ? T('A hóspede luta no meio da Terceira, perto da crista, com uma adaga numa mão e, na outra, uma corda de água que estala e corta. Onde a corda estala, um homem cai.', 'The guest fights in the middle of the Third, near the crest, with a dagger in one hand and, in the other, a rope of water that cracks and cuts. Where the rope cracks, a man falls.')
          : T('No fundo do poço seco do Pira, a hóspede espera quem desce, com uma adaga numa mão e, na outra, uma corda de água que estala e corta. Onde a corda estala, um homem cai.', 'At the bottom of the Pyre’s dry well, the guest waits for whoever comes down, with a dagger in one hand and, in the other, a rope of water that cracks and cuts. Where the rope cracks, a man falls.')), // N
        T('A água da corda acaba. Ela puxa mais da lama, e vem menos. A Boca Seca bebeu a dela também.', 'The water in the rope runs out. She pulls more from the mud, and less comes. The Dry Mouth has drunk hers as well.'), // N
        T('O Varr chega com três homens da Terceira. O primeiro morre. O segundo morre. O Varr, não.', 'Varr reaches her with three men of the Third. The first dies. The second dies. Varr doesn’t.'), // N
        T('A espada dele entra embaixo do braço dela.', 'His sword goes in under her arm.'), // N
        T('O corpo não cai. Apaga. Uma luz que sai de dentro para fora, e na lama fica só a roupa de servo, vazia.', 'The body doesn’t fall. It goes out. A light leaving from the inside outward, and in the mud there is only the servant’s clothing, empty.'), // N
        T('O Varr ergue a espada e grita o próprio nome para um lado do vale, depois para o outro.', 'Varr raises his sword and shouts his own name to one side of the valley, then to the other.'), // N
        T('O compasso do bronze volta de quatro para três.', 'The bronze beat drops back from four to three.'), // N
      ] },

    { id: 'f06', zona: 'duelo', fundo: { img: IMG('f-kronk'), kb: 'in', foco: '50% 40%', dim: .45 },
      texto: [
        T('Não vejo mais a hóspede. Vejo o grande vindo na minha direção, e os meus homens saindo do caminho dele, porque quem não sai cai.', 'I can’t see the guest any more. I see the big one coming my way, and my men getting out of his path, because whoever doesn’t, falls.'), // N
        T('Desço do cinzento e dou um tapa na anca dele. Ele corre para trás da duna. A pé eu leio melhor.', 'I get down from the grey and slap his haunch. He runs for the back of the dune. On foot I read better.'), // N
        T('O Grakh é mais alto que qualquer Grakh que eu matei em vinte anos. A pele cinza, os dentes de baixo para fora da boca, um dente de bicho pendurado numa corda no pescoço. Novo.', 'He is taller than any Grakh I have killed in twenty years. Grey skin, lower teeth jutting out of his mouth, an animal’s tooth hanging from a cord at his neck. Young.'), // N
        T('Ele para a dez passos e olha para mim.', 'He stops ten paces away and looks at me.'), // N
      ],
      minijogo: 'duelo',
      depois: [
        T('Ele cai de joelhos. Depois, de lado. A maça escorrega da mão.', 'He falls to his knees. Then onto his side. The mace slides out of his hand.'), // N
        T('Atrás da coxa, o corte que eu abri despeja sangue na areia.', 'Behind his thigh, the cut I opened pours blood into the sand.'), // N
        T('Ele vira a cabeça para trás, para os acampamentos do Pira, e fica virado para lá. Não sei para quem.', 'He turns his head back toward the Pyre’s camps and keeps it turned that way. I don’t know who he’s looking for.'), // N
        T('No meu braço, o sangue desce até a mão. É meu. Faz vinte anos que eu não vejo o meu.', 'On my arm, blood runs down to my hand. It’s mine. It has been twenty years since I saw my own.'), // N
      ] },

    { id: 'f07', zona: 'duelo', fundo: { img: IMG('f-eclipse'), kb: 'in', foco: '50% 40%', dim: .45 },
      texto: [
        T('Paro em cima dele. Ele respira de boca aberta, com os dentes para fora.', 'I stand over him. He breathes through his open mouth, teeth bared.'), // N
        T('Ergo a espada.', 'I raise my sword.'), // N
      ],
      minijogo: 'erguer',
      depois: [
        T('O sol está sendo comido. Um pedaço preto entra pela borda dele e vai fechando, a luz fica rala, e as sombras na areia ganham borda de faca.', 'The sun is being eaten. A black piece comes in at its edge and keeps closing, the light thins, and the shadows on the sand take on a knife’s edge.'), // N
        T('Atrás de mim, Redom grita:', 'Behind me, Redom cries out:'), // N
        T('— As luzes! As luzes estão se apagando!', '— The lights! The lights are going out!'), // N
      ] },

    { id: 'f07b', zona: 'eclipse', fundo: { img: IMG('f-eclipse'), kb: 'in', foco: '50% 40%', dim: .55 },
      texto: [
        T('Me viro para eles com a espada no alto.', 'I turn toward them with my sword held high.'), // N
        { continuar: true, voz: 'L04' },
        T('— Firmes! É só o escuro! Segurem a linha!', '— Steady! It’s only the dark! Hold the line!'), // N
        T('As palavras são do meu pai. A linha fecha.', 'The words are my father’s. The line closes.'), // N
        T('Quando me viro de volta, o caído não está mais sozinho.', 'When I turn back, the fallen one is no longer alone.'), // N
      ] },

    // o Maior: o terceiro disparo
    { id: 'f08', zona: 'eclipse', fundo: { img: IMG('f-maior'), kb: 'in', foco: '50% 40%', dim: .5 }, pico: { bpm: 166, ms: 0 },
      texto: [
        T('Em pé, entre mim e o Grakh caído, no escuro do dia comido, tem um Grakh que eu nunca vi.', 'Standing between me and the fallen Grakh, in the dark of the eaten day, is a Grakh I have never seen.'), // N
        T('É maior que o outro. Maior que qualquer um. Um braço é mais grosso que o outro, e o osso do ombro ainda está subindo embaixo da pele, uma pele cinza, rachada como chão de poço seco.', 'He is bigger than the other. Bigger than any. One arm is thicker than the other, and the bone of the shoulder is still rising under the skin, grey skin, cracked like the floor of a dry well.'), // N
        T('Uma flecha da Terceira entra no peito dele. A carne fecha em volta da haste.', 'An arrow from the Third goes into his chest. The flesh closes round the shaft.'), // N
        T('Ele ri.', 'He laughs.'), // N
        { continuar: true, voz: 'L05' },
        T('A espada pesa. Aos dezesseis, pesava assim.', 'The sword is heavy. At sixteen, it was this heavy.'), // N
        T('O pulso bate no pescoço. Bate na garganta. Bate nos dentes.', 'My pulse beats in my neck. It beats in my throat. It beats in my teeth.'), // N
        T('Os Grakh param de lutar. Olham para ele, batem no peito e gritam uma palavra que eu conheço dos prisioneiros: Maior.', 'The Grakh stop fighting. They look at him, beat their chests and shout a word I know from prisoners: Biggest.'), // N
      ] },

    { id: 'f09', zona: 'eclipse', fundo: { img: IMG('f-maior'), kb: 'in', foco: '50% 40%', dim: .55 },
      texto: [
        (st) => (rotaA(st) ? T('Na crista, os arcos ainda são muitos.', 'On the crest, there are still many bows.') : T('Na crista, sobraram poucos arcos.', 'On the crest, few bows are left.')), // N
        T('— Arqueiros! Comigo!', '— Archers! On me!'), // N
        T('Ele vem.', 'He comes.'), // N
      ],
      minijogo: 'maior',
      depois: [
        se((st) => josephVeio(st), T('Na última troca, Joseph passa por mim a cavalo, com a esquerda na rédea e a espada na direita, tremendo, e abre uma linha entre o Maior e os arqueiros, como abriu nesta areia quarenta anos atrás. A linha dura o que precisa. Joseph, não.', 'In the last exchange, Joseph rides past me, left hand on the rein and sword in the right, shaking, and opens a line between the Biggest and the archers, the way he opened one in this sand forty years ago. The line lasts as long as it needs to. Joseph doesn’t.')), // N
        T('Na última rajada, ele cai de joelhos. Tem mais flecha que pele, e ainda ri.', 'At the last volley, he falls to his knees. There is more arrow than skin on him, and he is still laughing.'), // N
        T('O riso para. O corpo não cai. Apaga, como o dela: uma luz que sai de dentro para fora, e as flechas caem na areia, soltas, porque não tem mais nada segurando.', 'The laughter stops. The body doesn’t fall. It goes out, like hers: a light leaving from the inside outward, and the arrows drop into the sand, loose, because there is nothing left holding them.'), // N
        T('O sol volta pela borda.', 'The sun comes back at the edge.'), // N
      ] },

    { id: 'f10', zona: 'depois', fundo: { img: IMG('f-depois'), kb: 'out', foco: '50% 50%', dim: .45, clima: 'poeira' }, sons: [{ s: SFX('sol-volta'), p: 0, v: .7 }],
      texto: [
        T('Com o sol, o compasso se afasta. Os homens de bronze passam pela borda do vale, no mesmo passo, sem parar para os mortos, e somem do lado do poente.', 'With the sun, the beat moves away. The men of bronze pass along the edge of the valley, in the same step, not stopping for the dead, and disappear to the west.'), // N
        T('Vou até onde o grande caiu. Sangue, areia revirada e um rastro largo, de coisa arrastada, que vai na direção dos acampamentos do Pira. Ele não está.', 'I go to where the big one fell. Blood, churned sand, and a wide trail, something dragged, heading toward the Pyre’s camps. He isn’t there.'), // N
        T('Derrubei o Grakh grande. Ou derrubei um grande, e o grande era o outro.', 'I brought down the big Grakh. Or I brought down a big one, and the big one was the other.'), // N
        T('No chão, o meu sangue e o dele secam juntos.', 'On the ground, my blood and his are drying together.'), // N
      ] },

    { id: 'f11', zona: 'depois', fundo: { img: IMG('f-conta'), kb: 'in', foco: '50% 50%', dim: .5 },
      texto: [
        T('Os que conseguem levantar, levantam. Ando entre eles e encosto a mão em cada um.', 'Those who can get up, get up. I walk among them and put my hand on each one.'), // N
      ],
      minijogo: 'conta',
      depois: (st) => {
        const n = sobreviventes(st), pt = extenso(n, 'pt'), en = extenso(n, 'en');
        return [T(cap1(pt) + '. Conto outra vez. ' + cap1(pt) + '.', cap1(en) + '. I count again. ' + cap1(en) + '.'),
          T('O Varr, com a cabeça enfaixada num pedaço da própria capa, conta a morte da bruxa a quem quiser ouvir. Quando acaba, começa outra vez.', 'Varr, his head bound in a strip of his own cloak, tells the death of the witch to anyone who will listen. When he finishes, he starts again.')]; // N
      } },

    { id: 'f12', zona: 'goelas', fundo: { img: IMG('f-recuo'), kb: 'out', foco: '50% 50%', dim: .5 }, fim: true,
      texto: [
        T('Voltamos para as Goelas a pé. Os cavalos que sobraram carregam os que não andam.', 'We go back to the Gullets on foot. The horses that are left carry those who can’t walk.'), // N
        T('Do caminho, lembro do sol e da areia. Do resto, não.', 'Of the way back, I remember the sun and the sand. Nothing else.'), // N
        (st) => (josephVeio(st) ? T('Na porta da cerca, os trinta e um do posto contam os que entram.', 'At the fence gate, the thirty-one of the post count those who come in.')
          : T('Joseph está na porta da cerca, com as duas mãos no cinto. Conta os que entram. Chega ao último e fica esperando mais um, que não vem.', 'Joseph is at the fence gate, both hands on his belt. He counts those who come in. He reaches the last one and keeps waiting for one more, who doesn’t come.')), // N
        T('Alguém põe uma tigela na minha mão. Está cheia.', 'Someone puts a bowl in my hand. It’s full.'), // N
        { continuar: true, voz: 'L06' },
        T('Seguro a tigela. Na Capital, minha mãe vai contar vinte e uma.', 'I hold the bowl. In the Capital, my mother will count twenty-one.'), // N
      ] },

  ],

  // ---------------------------------------------------------------- o que este capítulo deixa para os próximos (IX e XI)
  estadoFinal: (st) => ({
    dolores: st.escolhas.dolores || null, prece: prece(st), espada: st.escolhas.espada || null, lavadeira: st.escolhas.lavadeira8 || null,
    noites: (st.noites || []).slice(), leituras: Object.assign({}, st.leituras), lidos: (st.lidoNoite || []).slice(),
    inocentes: (st.inocentes || []).slice(), mortos: (st.mortos || []).slice(), ladrao: !!st.f.ladraoMorto, moral: moral(st),
    fugiu: fugiu(st), desmascarou: fugiu(st) ? 'cedo' : (st.f.desmascarou || null), rota: rotaA(st) ? 'A' : 'B',
    joseph: josephVeio(st) ? 'morreu' : 'ficou', ansel: anselVivo(st), presagio: !!(st.chao && st.chao.acertos >= 6), vigia: st.escolhas.vigia || null,
    roda: (st.roda && st.roda.voltas) || 0, kronk: st.duelo || null, maior: st.maior || null,
    sobreviventes: sobreviventes(st), comeu: true, pontos: st.pontos || null, escolhas: st.escolhas,
  }),

  // ---------------------------------------------------------------- pontuação escondida (cap08)
  pontos: (st) => {
    const viuDela = pistasDela(st);
    const caca = Math.max(800, 1200 * viuDela + (fugiu(st) || st.f.desmascarou === 'certo' ? 6000 : 0) + (st.f.ladraoMorto ? 1500 : 0) + (st.f.guardouCerto ? 1500 : 0) - 2500 * (st.inocentes || []).length);
    const d = st.duelo || {};
    const duelo = Math.max(2000, Math.round(900 * (d.leituras || 0) + 1500 * (d.laterais || 0) + (d.rodeou ? 2500 : 0) - 600 * (d.marcas || 0) - 3000 * (d.recomecos || 0) + 4000));
    const m = st.maior || {};
    const maior = Math.max(1500, Math.round(5000 - 700 * (m.marcas || 0) - 500 * (m.deslizes || 0) + 600 * (m.respostas || 0)));
    const vivos = sobreviventes(st) * 120;
    return { total: caca + duelo + maior + vivos, partes: [['caca', caca], ['duelo', duelo], ['maior', maior], ['vivos', vivos]] };
  },

  // ---------------------------------------------------------------- tela final (o narrador, fora do roleplay)
  resumo: (st, lang) => {
    const pt = lang !== 'en', L = (a, b) => (pt ? a : b), n = sobreviventes(st);
    const nome = (id) => (id === 'lavadeira' ? L('A Nymae', 'The Nymae') : nomeDe(id));
    const frase = L(`Laura levou os melhores de Redom ao deserto. Voltaram ${extenso(n, 'pt')} de dois mil.`, `Laura took Redom’s best into the desert. ${cap1(extenso(n, 'en'))} of two thousand came back.`);
    const revela = { nome: L('O Maior', 'The Biggest'), linha: L('Os Grakh que sobraram disseram que o dia comido, enfim, deu o Maior.', 'The Grakh who were left said the eaten day had, at last, given them the Biggest.') };
    const notas = [];
    notas.push({ volto: L('Laura prometeu à mãe que voltava. Volta.', 'Laura promised her mother she would come back. She does.'), naoPrometo: L('Laura não prometeu nada à mãe.', 'Laura promised her mother nothing.'), mao: L('Laura ficou com a mão na da mãe até ela dormir.', 'Laura kept her hand in her mother’s until she slept.') }[st.escolhas.dolores] || '');
    notas.push({ coragem: L('No templo, Laura pediu coragem. O ombro pesou.', 'In the temple, Laura asked for courage. Her shoulder grew heavy.'), grakh: L('No templo, Laura pediu o Grakh das Goelas. Nada se mexeu.', 'In the temple, Laura asked for the Grakh of the Gullets. Nothing moved.'), homens: L('No templo, Laura pediu os dois mil de volta. Uma vela apagou.', 'In the temple, Laura asked for the two thousand back. A candle went out.'), nada: L('No templo, Laura não pediu nada.', 'In the temple, Laura asked for nothing.') }[prece(st)] || '');
    if (st.escolhas.espada === 'deixar') notas.push(L('A espada do irmão ficou com Markus, perto da porta.', 'Her brother’s sword stayed with Markus, near the door.'));
    if (st.escolhas.espada === 'levar') notas.push(L('A espada do irmão ficou fincada no túmulo dele, nas Goelas.', 'Her brother’s sword stands driven into his grave, at the Gullets.'));
    if (st.escolhas.lavadeira8 === 'devolver') notas.push(L('A Nymae voltou para a Capital na carroça do correio.', 'The Nymae went back to the Capital on the post wagon.'));
    if (st.f.ladraoMorto) notas.push(L('Tasso morreu pela Lei da Lâmina. Vendia a água dos outros.', 'Tasso died by the Law of the Blade. He was selling other men’s water.'));
    (st.inocentes || []).forEach((id) => notas.push(L(`${nome(id)} morreu pela Lei da Lâmina, e não tinha tirado água de ninguém.`, `${nome(id)} died by the Law of the Blade, and had taken no one’s water.`)));
    if (fugiu(st)) notas.push(L('A hóspede saiu de uma corrente deixando a roupa, e voltou de dentro de um poço seco.', 'The guest slipped a chain and left the clothes behind, and came back up out of a dry well.'));
    else notas.push({ certo: L('Laura apontou a hóspede na fila, e o rosto escorregou diante da coluna.', 'Laura pointed out the guest in the line, and the face slipped in front of the column.'), errado: L('Laura apontou a pessoa errada na fila.', 'Laura pointed at the wrong person in the line.'), ninguem: L('Laura mandou a carga sem apontar ninguém.', 'Laura sent the charge in without pointing at anyone.') }[st.f.desmascarou] || '');
    if (anselVivo(st)) notas.push(L('Ansel deixou um pão no túmulo do comandante.', 'Ansel left a piece of bread on the commander’s grave.'));
    notas.push(josephVeio(st) ? L('Joseph abriu uma linha diante do Maior. A linha durou o que precisava.', 'Joseph opened a line in front of the Biggest. The line lasted as long as it needed to.') : L('Joseph ficou com o posto das Goelas e contou os que voltaram.', 'Joseph kept the Gullets post and counted those who came back.'));
    notas.push({ oeste: L('A vigia dobrada do poente viu o bronze chegar.', 'The doubled western watch saw the bronze coming.'), batedores: L('Os dois batedores mandados ao poente não voltaram.', 'The two scouts sent west never came back.'), vento: L('Laura achou que era o vento.', 'Laura thought it was the wind.') }[st.escolhas.vigia] || '');
    notas.push(L('O Grakh da maça fez a Lâmina sangrar pela primeira vez em vinte anos.', 'The Grakh with the mace made the Blade bleed for the first time in twenty years.'));
    notas.push(L('Varr matou a hóspede e gritou o próprio nome. Vai querer uma canção.', 'Varr killed the guest and shouted his own name. He will want a song.'));
    const dz = (st.maior && st.maior.deslizes) || 0;
    if (dz) notas.push(dz === 1 ? L('Diante do Maior, a voz da Lâmina tremeu uma vez.', 'Before the Biggest, the Blade’s voice shook once.') : L(`Diante do Maior, a voz da Lâmina tremeu ${extenso(dz, 'pt')} vezes.`, `Before the Biggest, the Blade’s voice shook ${extenso(dz, 'en')} times.`));
    const linhas = [
      { id: 'dolores', opcao: st.escolhas.dolores, q: L('A mãe', 'Her mother'), a: { volto: L('“Eu volto, mãe.”', '“I’ll come back, Mother.”'), naoPrometo: L('“Não prometo.”', '“I won’t promise.”'), mao: L('A mão, até ela dormir', 'Her hand, until she slept') }[st.escolhas.dolores] || '—' },
      { id: 'prece', opcao: prece(st), q: L('O que pediu ao Cavaleiro', 'What she asked the Knight for'), a: { coragem: L('Coragem', 'Courage'), grakh: L('O Grakh das Goelas', 'The Grakh of the Gullets'), homens: L('Que todos voltassem', 'That they all come back'), nada: L('Nada', 'Nothing') }[prece(st)] || '—' },
      { id: 'espada', opcao: st.escolhas.espada, q: L('A espada do irmão', 'Her brother’s sword'), a: { levar: L('Levou', 'Took it'), deixar: L('Deixou com Markus', 'Left it with Markus') }[st.escolhas.espada] || '—' },
      { id: 'joseph', opcao: st.escolhas.joseph, q: 'Joseph', a: { ficar: L('Ficou nas Goelas', 'Stayed at the Gullets'), ir: L('Seguiu com a coluna', 'Went on with the column') }[st.escolhas.joseph] || '—' },
      { id: 'vigia', opcao: st.escolhas.vigia, q: L('O chão, de noite', 'The ground, at night'), a: { oeste: L('Dobrou a vigia', 'Doubled the watch'), batedores: L('Mandou batedores', 'Sent scouts'), vento: L('Era o vento', 'It was the wind') }[st.escolhas.vigia] || '—' },
    ];
    if (!fugiu(st)) linhas.push({ id: 'desmascarar', opcao: st.escolhas.desmascarar, q: L('A fila', 'The line'), a: st.f.desmascarou === 'ninguem' ? L('Não apontou ninguém', 'Pointed at no one') : st.escolhas.desmascarar ? (st.f.desmascarou === 'certo' ? L('Apontou a hóspede', 'Pointed out the guest') : L('Apontou a pessoa errada', 'Pointed at the wrong person')) : '—' });
    return { frase, revela, notas: notas.filter(Boolean), linhas };
  },
};

// ================================================================== as noites da caça
function noite(k) {
  const lug = (st) => LUGARES[lugarDaNoite(st, k)];
  const EVT = {
    estrebaria: [T('De manhã, os cochos da cavalaria estão secos, e o feno embaixo deles, molhado. Dois cavalos deitados não levantam mais.', 'In the morning, the cavalry troughs are dry, and the hay beneath them is wet. Two horses lying down don’t get up again.'),
      T('O intendente conta os barris da estrebaria. Falta a água de um dia.', 'The quartermaster counts the stable barrels. A day’s water is missing.')],
    cozinha: [T('De manhã, o barril do meio da cozinha tem gosto de mar. Meio acampamento bebe dele antes do primeiro cuspir.', 'In the morning, the middle barrel in the kitchen tastes of the sea. Half the camp drinks from it before the first man spits.'),
      T('Joseph bebeu antes de todos. Passa a manhã de joelhos atrás de uma carroça, e à tarde monta com as duas mãos tremendo.', 'Joseph drank before anyone. He spends the morning on his knees behind a wagon, and in the afternoon he rides with both hands shaking.')],
    feridos: [T('De manhã, os odres da tenda dos feridos estão murchos. Viro um. Seco por dentro, e nenhum furo na costura.', 'In the morning, the waterskins in the wounded tent hang limp. I turn one over. Dry inside, and not a hole in the seam.'),
      T('Um soldado da febre morre antes do meio-dia, a vinte passos da minha tenda, pedindo água.', 'A soldier with fever dies before noon, twenty paces from my tent, asking for water.')],
    forja: [T('De manhã, as tinas da forja estão vazias. O ferreiro mergulha uma ponta de lança em brasa no fundo seco, e ela sai mole.', 'In the morning, the forge tubs are empty. The smith plunges a red-hot spearhead into the dry bottom, and it comes out soft.'),
      T('Sem têmpera, a ponta que quebrar daqui até as Goelas fica quebrada.', 'Without quenching, any point that breaks between here and the Gullets stays broken.')],
  };
  const ESCONDE = { estrebaria: T('enfiado no feno', 'stuffed into the hay'), cozinha: T('entre os sacos de sal', 'among the salt sacks'), feridos: T('embaixo das lonas da tenda', 'under the tent canvas'), forja: T('atrás do fole da forja', 'behind the forge bellows') };
  const FAZ = { estrebaria: T('puxando um cavalo', 'leading a horse'), cozinha: T('mexendo a panela', 'stirring the pot'), feridos: T('levando um balde para a tenda', 'carrying a bucket to the tent'), forja: T('soprando o fole', 'working the bellows') };
  return {
    id: 'c' + k, se: (st) => !(fugiu(st) && st.f.fugiuNoite < k), zona: 'deserto-noite',
    fundo: (st) => ({ img: IMG(lug(st).img), kb: 'in', foco: '50% 50%', dim: .5 }),
    texto: (st) => {
      const l = lugarDaNoite(st, k), r = [];
      if (k === 0) r.push(T('Na primeira noite de areia, alguém mexe na nossa água.', 'On the first night in the sand, someone gets into our water.'));
      else if (st.escolhas['noite' + (k - 1)] === 'executar') r.push(T('Na noite seguinte, a água some outra vez.', 'The next night, the water goes again.'));
      else r.push(k === 1 ? T('Na segunda noite, a água some outra vez.', 'On the second night, the water goes again.') : T('Na terceira noite, outra vez.', 'On the third night, again.'));
      if (k > 0 && (st.inocentes || []).length) r.push(T('Os fogos perto do meu ficam calados. Os homens comem de costas para a minha tenda.', 'The fires near mine have gone quiet. The men eat with their backs to my tent.'));
      if (l === 'feridos' && alarme() >= 2) r.push(T('Dois guardas passaram a noite na porta dos feridos, como eu mando desde a Capital.', 'Two guards spent the night at the wounded men’s door, as I have ordered since the Capital.'));
      r.push(...EVT[l]);
      if (matouORosto() && l === lugarVerdadeiro()) {
        const n = nomeDe(LUGARES[l].quem);
        r.push(T('Na hora da ração, um soldado acha um corpo ' + ESCONDE[l] + ', enrolado num manto. Faz dias que morreu.', 'At ration time, a soldier finds a body ' + window.LIVRO_EN[ESCONDE[l]] + ', wrapped in a cloak. It has been dead for days.'),
          T('Tem o rosto de ' + n + '. ' + n + ' está vivo a dez passos, ' + FAZ[l] + '.', 'It has ' + n + '’s face. ' + n + ' is alive ten paces away, ' + window.LIVRO_EN[FAZ[l]] + '.'),
          T('Olho de um para o outro. É o mesmo rosto.', 'I look from one to the other. It is the same face.'));
      }
      if (k === 1 && intendenteViu()) r.push(T('Antes da ração, o intendente me procura sozinho.', 'Before the ration, the quartermaster comes to find me alone.'),
        T('— Na revista da Capital, Lâmina, um servo tinha a pele áspera embaixo do queixo. Passei a mão para ver se era sarna. Não era. Não lembro qual servo.', '— At the inspection in the Capital, Blade, one of the servants had rough skin under the jaw. I ran my hand over it to see if it was mange. It wasn’t. I don’t remember which servant.'));
      if (k === 0) r.push(T('No deserto, água vale mais que vinho. Alguém está vendendo.', 'In the desert, water is worth more than wine. Someone is selling it.'));
      if (k === 1) {
        r.push(T('Alguém tira a nossa água de propósito, uma noite por vez.', 'Someone is taking our water on purpose, one night at a time.'));
        if (confessou()) r.push(T('Na Ala Funda, a hóspede me disse que foi ela que levantou o mar contra a Sentença.', 'In the Deep Ward, the guest told me it was she who raised the sea against the Sentence.'));
        else if (semente()) r.push(T('Na Ala Funda, a hóspede me falou do deserto sem eu perguntar.', 'In the Deep Ward, the guest spoke to me of the desert without my asking.'));
        r.push(T('E faz nove dias que ela sumiu na estrada da costa. Penso nisso pela primeira vez aqui, com areia nos dentes.', 'And it is nine days since she vanished on the coast road. I think of it for the first time here, with sand in my teeth.'));
      }
      if (k === 2) {
        r.push(T('Três noites, três lugares. Um ladrão de água deixa rastro molhado. Este não deixa rastro.', 'Three nights, three places. A water thief leaves a wet trail. This one leaves none.'));
        if ((st.noites || []).slice(0, 3).includes('feridos')) r.push(T('E um odre bebido fica úmido por dentro. Aquele estava seco.', 'And a skin someone has drunk from stays damp inside. That one was dry.'));
        r.push(T('No livro de lendas da biblioteca, a Madrinha da Orla nunca tem o mesmo rosto duas vezes. Li aos catorze anos, do lado da página do dragão do norte.', 'In the book of legends in the library, the Godmother of the Shore never wears the same face twice. I read it at fourteen, beside the page on the dragon of the north.'));
      }
      r.push(T('Mando trazer quem dormiu perto.', 'I have whoever slept nearby brought to me.'));
      return r;
    },
    minijogo: 'ler', ler: { k },
    depois: (st) => {
      const q = (st.lidoNoite || [])[k];
      return [q === ELA() && viu(st, q).filter((o) => PISTAS_FORTES.includes(o)).length >= 2
        ? T('Mando de volta para o trabalho. Fico com o que vi, e o que vi não é de gente.', 'I send them back to work. I keep what I saw, and what I saw doesn’t belong to a person.')
        : T('Mando de volta para o trabalho. Fico com o que vi.', 'I send them back to work. I keep what I saw.')];
    },
  };
}

function decide(k) {
  const quem = (st) => (st.lidoNoite || [])[k];
  const nome = (st) => (quem(st) === 'lavadeira' ? T('a Nymae', 'the Nymae') : nomeDe(quem(st)));
  const lugarNome = (st) => LUGARES[lugarDaNoite(st, k)].nome;
  const enNome = (st) => window.LIVRO_EN[nome(st)] || nome(st);
  const MORTE = {
    wil: T('Os cavalos de reserva levantam a cabeça quando ele cai.', 'The spare horses lift their heads when he falls.'),
    bram: T('O ferreiro vira de costas e bate no ferro até o meio-dia.', 'The smith turns his back and hammers iron until noon.'),
    ilse: T('Na tenda, os feridos pedem água a outra pessoa.', 'In the tent, the wounded ask someone else for water.'),
    nell: T('Ao meio-dia, a fila da panela anda mais calada.', 'At noon, the line for the pot moves more quietly.'),
    ansel: T('Na mão fechada dele, o guarda acha um pedaço de pão.', 'In his closed hand, the guard finds a piece of bread.'),
    lavadeira: T('Antes, ela olha uma vez para a fila dos servos, e não para mim.', 'Before it, she looks once at the line of servants, and not at me.'),
  };
  return {
    id: 'c' + k + 'd', se: (st) => !(fugiu(st) && st.f.fugiuNoite < k), zona: 'deserto-noite',
    fundo: { img: IMG('c-noite'), kb: 'in', foco: '50% 50%', dim: .55 },
    texto: (st) => [T('A Lei da Lâmina é clara: em campanha, quem rouba água morre diante da coluna.', 'The Law of the Blade is clear: on campaign, whoever steals water dies in front of the column.'),
      T('O nome que eu tenho é ' + nome(st) + '.', 'The name I have is ' + enNome(st) + '.')],
    escolha: { id: 'noite' + k, pergunta: T('A lei', 'The law'), opcoes: [
      { id: 'executar', txt: (st) => T('Mandar executar ' + nome(st) + ' ao amanhecer, diante da coluna.', 'Have ' + enNome(st) + ' executed at dawn, in front of the column.'),
        efeito: (st) => {
          const q = quem(st); st.mortos = st.mortos || []; st.inocentes = st.inocentes || [];
          if (q === ELA()) { st.f.fugiu = true; st.f.fugiuNoite = k; }
          else if (q === 'tasso') { st.f.ladraoMorto = true; st.mortos.push('tasso'); }
          else { st.mortos.push(q); st.inocentes.push(q); }
        },
        resultado: (st) => {
          const q = quem(st), n = nome(st), en = enNome(st);
          if (q === ELA()) return [T('Até o amanhecer, ' + n + ' fica na carroça dos presos, com corrente no tornozelo e dois guardas.', 'Until dawn, ' + en + ' is kept in the prisoners’ wagon, a chain on the ankle and two guards.'),
            T('Antes do sol, um dos guardas acorda com o cabelo molhado e a corrente vazia. Na carroça sobra a roupa de ' + n + ', com uma crosta de sal nas dobras.', 'Before sunrise, one of the guards wakes with wet hair and an empty chain. In the wagon lie ' + en + '’s clothes, with a crust of salt in the folds.'),
            T('Gente não sai de corrente deixando a roupa.', 'People don’t slip a chain and leave their clothes behind.')];
          if (q === 'tasso') return [T('Tasso morre ao amanhecer. Nas coisas dele acham onze odres com a marca de outras companhias.', 'Tasso dies at dawn. Among his things they find eleven skins marked with other companies’ signs.'),
            T('A Terceira bate os escudos uma vez.', 'The Third strikes its shields once.')];
          return [T(cap1(n) + ' morre ao amanhecer.', cap1(en) + ' dies at dawn.'), MORTE[q]].filter(Boolean);
        } },
      { id: 'guardar', txt: (st) => T('Pôr dois guardas n' + lugarNome(st) + ' e esperar.', 'Put two guards on ' + window.LIVRO_EN[lugarNome(st)] + ' and wait.'),
        efeito: (st) => { if (lugarDaNoite(st, k) === lugarVerdadeiro()) st.f.guardouCerto = true; },
        resultado: (st) => (lugarDaNoite(st, k) === lugarVerdadeiro()
          ? [T('Dois guardas da Terceira dormem sentados ao lado d' + lugarNome(st) + '. A água de lá amanhece no lugar.', 'Two guards of the Third sleep sitting up beside ' + window.LIVRO_EN[lugarNome(st)] + '. The water there is still in place at dawn.')]
          : [T('Dois guardas da Terceira dormem sentados ao lado d' + lugarNome(st) + '.', 'Two guards of the Third sleep sitting up beside ' + window.LIVRO_EN[lugarNome(st)] + '.'),
            T('Perto do fogo, um sargento diz baixo que a Lâmina amoleceu. Deixo que ele pense que eu não ouvi.', 'By the fire, a sergeant says quietly that the Blade has gone soft. I let him think I didn’t hear.')]) },
    ] },
  };
}

// a fila do amanhecer: os quatro rostos possíveis que estão vivos, e os enganos que ela leu
function opcoesFila(st) {
  const m = st.mortos || [], ids = ['wil', 'bram', 'ilse', 'nell'].filter((x) => !m.includes(x));
  (st.lidoNoite || []).forEach((q) => { if (q && !ids.includes(q) && !m.includes(q) && (q !== 'lavadeira' || lavNaColuna(st))) ids.push(q); });
  const ops = ids.map((id) => ({ id,
    txt: () => (id === 'lavadeira' ? T('Apontar a Nymae.', 'Point at the Nymae.') : T('Apontar ' + nomeDe(id) + ', ' + SUSPEITOS[id].papel + '.', 'Point at ' + nomeDe(id) + ', ' + window.LIVRO_EN[SUSPEITOS[id].papel] + '.')),
    efeito: (s) => { if (id === ELA()) s.f.desmascarou = 'certo'; else { s.f.desmascarou = 'errado'; s.mortos.push(id); s.inocentes.push(id); } },
    resultado: () => {
      const n = id === 'lavadeira' ? T('a Nymae', 'the Nymae') : nomeDe(id), en = window.LIVRO_EN[n] || n;
      if (id === ELA()) return [T('Paro na frente de ' + n + ' e aponto.', 'I stop in front of ' + en + ' and point.'), T('Dois soldados pegam pelos braços. Não há resistência. O rosto sobe para mim.', 'Two soldiers take the arms. There is no struggle. The face comes up to look at me.')];
      return [T('Paro na frente de ' + n + ' e aponto.', 'I stop in front of ' + en + ' and point.'),
        T('A Terceira cumpre a lei ali mesmo, na frente da fila.', 'The Third carries out the law right there, in front of the line.'),
        T('Nada escorrega. Nada muda de cor. A fila não se mexe, e a coluna atrás de mim também não.', 'Nothing slips. Nothing changes colour. The line doesn’t move, and neither does the column behind me.')];
    } }));
  ops.push({ id: 'ninguem', txt: () => T('Não apontar ninguém e mandar a carga.', 'Point at no one and send in the charge.'), efeito: (s) => { s.f.desmascarou = 'ninguem'; },
    resultado: () => [T('Mando os servos para trás das carroças e a coluna para a carga.', 'I send the servants back behind the wagons and the column into the charge.')] });
  return ops;
}

// os números por extenso (a Laura conta em voz alta)
function extenso(n, lang) {
  if (lang === 'en') {
    const u = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const d = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    return n < 20 ? u[n] : d[Math.floor(n / 10)] + (n % 10 ? '-' + u[n % 10] : '');
  }
  const u = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const d = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  return n < 20 ? u[n] : d[Math.floor(n / 10)] + (n % 10 ? ' e ' + u[n % 10] : '');
}
function cap1(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// o que o motor e os minijogos leem do roteiro
window.LIVRO_DADOS = { suspeitosDaNoite, SUSPEITOS, ELA, OLHAR_DELA, OLHAR_ROTULO, RETRATO, sobreviventes, INTENDENTE: T('O intendente', 'The quartermaster') };
