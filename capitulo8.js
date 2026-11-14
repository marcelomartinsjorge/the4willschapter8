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
   o Grakh grande, a Nymae) · nada de cheiro · o Gup não aparece.
   Estado lido dos capítulos anteriores: window.AQV_ANTES (aqv_estado).
   ========================================================================== */
window.LIVRO_EN = window.LIVRO_EN || {};
const T = (pt, en) => { if (en != null) window.LIVRO_EN[pt] = en; return pt; };
const se = (cond, t) => ({ se: cond, t });
const IMG = (n) => 'assets/images/' + n + '.jpg';
const FD = (n, foco, clima) => Object.assign({ img: IMG(n), kb: 'in', foco: foco || '50% 45%', dim: .5 }, clima ? { clima: clima } : {});
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
const RABO_MAE = () => (comJustine() ? T('— É uma bênção e uma maldição, esse amor de mãe. Talvez você nunca descubra.', '— It’s a blessing and a curse, a mother’s love. Maybe you’ll never find out.')
  : comMarkus() ? T('— É uma bênção e uma maldição, esse amor de mãe. Ainda rezo para você dar filhos ao Markus.', '— It’s a blessing and a curse, a mother’s love. I still pray you’ll give Markus children.') : null);
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
const sabeNome = () => !!((c7().interrogatorio || {}).nome); // no Cap. VII ela disse à Laura que na Orla a chamam de Madrinha
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
const sobreviventes = (st) => 26 + (rotaA(st) ? 14 : 0) + ({ alta: 8, media: 4, baixa: 0 }[faixaMoral(st)]) + (st.escolhas.vigia === 'oeste' ? 6 : 0) + (aguaSalva(st) ? 6 : 0);
const arqueiros = (st) => Math.round(sobreviventes(st) * 2.2);
const numPT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'];

// o quarto da Nymae, embaixo do templo (minijogo O quarto dela)
const SALA = {
  intro: T('O quarto está como a varredura deixou.', 'The room is as the sweep left it.'),
  rot: { esteira: T('O catre', 'The cot'), bacia: T('A bacia', 'The basin'), janela: T('A janela', 'The window'), laje: T('A laje', 'The flagstone') },
  txt: {
    esteira: T('O cobertor está dobrado do jeito que deixaram, e o travesseiro não tem marca de cabeça. Três noites aqui, e a palha do colchão nem amassou.', 'The blanket is folded the way they left it, and the pillow has no mark of a head. Three nights here, and the straw of the mattress isn’t even flattened.'),
    bacia: T('Seca. No fundo, uma crosta branca. Passo o dedo e levo à língua: sal.', 'Dry. At the bottom, a white crust. I run a finger through it and touch it to my tongue: salt.'),
    janela: T('Alta demais para alcançar sem banco, e dá para o muro cego da casa ao lado, a um braço de distância. Daqui não se vê a Capital, e a Capital não vê esta janela.', 'Too high to reach without a stool, and it faces the blind wall of the house next door, an arm’s length away. You can’t see the Capital from here, and the Capital can’t see this window.'),
    laje: T('A junta de cal em volta dela é mais clara que as outras. Mais nova. Piso em cima, e a laje balança como uma tampa.', 'The lime joint around it is paler than the others. Newer. I step on it, and the flagstone rocks like a lid.'),
  },
  levantar: T('Levantar a laje', 'Lift the flagstone'),
  cisterna: T('Enfio a ponta da espada na junta e levanto. Embaixo, degraus de pedra molhada descem para o escuro. A cisterna do templo. Na parede do fundo, a água escorre por uma boca de pedra baixa, larga o bastante para alguém de joelhos, e o cheiro que vem de lá não é de água limpa.', 'I work my sword point into the joint and lift. Beneath it, wet stone steps go down into the dark. The temple cistern. In the far wall, the water drains through a low stone mouth, wide enough for someone on their knees, and the smell coming out of it is not clean water.'),
  subir: T('Subir', 'Go back up'),
};

window.LIVRO_UI = {
  pt: { parte: 'Parte', prox: 'Próxima', fim: 'Encerrar o capítulo', voltar: '← Voltar', ouvir: 'Ouvir', cena: '▶ Ver a cena', pular: 'Pular ›', oque: 'O que Laura faz?', coracaoNao: 'O pulso não deixa.', decida: 'Decida', decidir: 'Decidir', escolheu: 'Você escolheu:', resp: 'Responder a', silencio: 'não responder', silencioR: 'Silêncio', momento: 'Momento de jogo', continuar: 'Continuar',
    mg: { ler: 'Ler o corpo', sala: 'O quarto dela', roda: 'Girar a roda', chao: 'Ouvir o chão', duelo: 'Ler a maça', erguer: 'Erguer a espada', maior: 'Ficar de pé', conta: 'Contar os vivos' },
    dica: { ler: 'Seis olhares, para quem você quiser.', sala: 'Toque no que quiser olhar.', roda: 'Segure para girar. Solte quando quiser.', chao: 'Toque junto com as batidas.', duelo: 'Leia o ombro e a maça. Aguente. Derrube.', erguer: 'Segure.', maior: 'Fique de pé e chame as rajadas.', conta: 'Segure para andar entre eles.' },
    coverEye: 'As Quatro Vontades · Capítulo VIII', coverLede: 'Vinte anos depois do Torneio, a Lâmina de Redom leva os melhores ao deserto.', coverGo: 'Começar', coverRestart: 'Começar de novo', coverCont: 'Continuar', coverHint: 'Use fones. Leia no seu tempo.', capN: 'Capítulo VIII',
    fimCap: 'Fim do Capítulo VIII', ficou: 'O que ficou', suas: 'Suas escolhas', reler: 'Reler o capítulo', confirm: 'Recomeçar o capítulo? O progresso deste capítulo se perde.', mesmo: (n) => `${n}% escolheram o mesmo`,
    pontos: 'Pontos do capítulo', jornada: 'Pontos da jornada', posicao: (p, n) => `${p}º de ${n} leitores`, semCap1: 'Jogue os capítulos anteriores neste navegador para somar a jornada.',
    pts: { caca: 'A caça', duelo: 'O duelo', maior: 'O Maior', vivos: 'Os que voltaram', antes: 'Capítulos anteriores' } },
  en: { parte: 'Part', prox: 'Next', fim: 'Close the chapter', voltar: '← Back', ouvir: 'Listen', cena: '▶ Watch the scene', pular: 'Skip ›', oque: 'What does Laura do?', coracaoNao: 'My pulse won’t let me.', decida: 'Decide', decidir: 'Decide', escolheu: 'You chose:', resp: 'Answer', silencio: 'say nothing', silencioR: 'Silence', momento: 'Moment of play', continuar: 'Continue',
    mg: { ler: 'Read the body', sala: 'Her room', roda: 'Turn the wheel', chao: 'Listen to the ground', duelo: 'Read the mace', erguer: 'Raise the sword', maior: 'Stay on my feet', conta: 'Count the living' },
    dica: { ler: 'Six looks, on whoever you choose.', sala: 'Tap whatever you want to look at.', roda: 'Hold to turn. Let go when you want.', chao: 'Tap along with the beats.', duelo: 'Read the shoulder and the mace. Hold. Bring him down.', erguer: 'Hold.', maior: 'Stay on your feet and call the volleys.', conta: 'Hold to walk among them.' },
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

    { id: 'a01', vozes: [{ voz: 'L21', em: ['Amanhã eu como na estrada', 'Tomorrow I eat on the road'] }], zona: 'quarto', fundo: { img: IMG('a01-prato'), kb: 'in', foco: '55% 45%', dim: .52, clima: 'velas' }, capitular: true, vozAuto: 'L01', vozAtraso: 600,
      texto: [
        T('O prato volta cheio.', 'The plate goes back full.'), // N
        T('Pão, uma coxa de galinha fria, três ameixas. Tobias pega a bandeja sem pressa. Faz vinte e seis anos que ele serve a minha mesa, e faz oitenta e um dias que leva a bandeja de volta como trouxe.', 'Bread, a cold chicken leg, three plums. Tobias takes the tray without hurrying. He has served my table for twenty-six years, and for eighty-one days he has carried the tray back the way he brought it.'), // N
        T('Ele fala para o pão:', 'He speaks to the bread:'), // N
        T('— A cozinha manda avisar que amanhã tem cordeiro, alteza.', '— The kitchen sends word there’s lamb tomorrow, Highness.'), // N
        T('— Amanhã eu como na estrada.', '— Tomorrow I eat on the road.'), // N
        T('Ele inclina a cabeça e sai. A porta fecha com o cuidado de sempre.', 'He bows his head and goes. The door closes with its usual care.'), // N
        T('A cadeira do quarto está virada para a janela. Nunca a tirei dali: é o único canto onde consigo sentar tranquila.', 'The chair in my room faces the window. I have never moved it: it is the only corner where I can sit at ease.'), // N
        T('Desde a notícia da morte do Simon, não sinto fome. Sede, sim. A Juíza me perdoe, mas é sede de vingança.', 'Since the news of Simon’s death, I haven’t felt hungry. Thirsty, yes. The Judge forgive me, but it is a thirst for revenge.'), // N
        T('Sento na cadeira e olho a Capital Branca lá embaixo. Linda, organizada, limpa. Encosto os dedos no pescoço e conto o pulso. Cinquenta e dois.', 'I sit in the chair and look down at the White Capital. Beautiful, orderly, clean. I put my fingers to my neck and count my pulse. Fifty-two.'), // N
      ] },

    // Justine, só se houve o beijo do Cap. IV (é a Consorte)
    { id: 'a02', se: () => comJustine(), zona: 'capela', fundo: { img: IMG('a02-capela'), kb: 'in', foco: '60% 45%', dim: .5, clima: 'velas' }, sons: [{ voz: 'L13', p: 4 }],
      texto: [
        T('A capela da Juíza ainda tem vela acesa. Justine está no último banco, com um papel no colo e a pena entre os dentes. Ela vem aqui toda noite. Sozinha, porque eu não venho desde o Simon.', 'The Judge’s chapel still has a candle lit. Justine is in the last pew, a paper on her lap and the quill between her teeth. She comes here every night. Alone, because I haven’t come since Simon.'), // N
        T('Ela escreve poemas para mim desde o nosso primeiro beijo. Os poemas fizeram dela uma escritora famosa em Redom. Talvez a mais famosa.', 'She has written poems for me since our first kiss. The poems made her a famous writer in Redom. Maybe the most famous.'), // N
        T('Sento ao lado dela. Ela tira a pena da boca e olha para o papel, depois para mim.', 'I sit beside her. She takes the quill from her mouth and looks at the paper, then at me.'), // N
        T('— Veio fazer as pazes com a sua fé, Laura?', '— Did you come to make peace with your faith, Laura?'), // N
        T('— Vim te ver.', '— I came to see you.'), // N
        T('— Não estou escrevendo sobre você desta vez. — Ela franze a testa. Só franze assim quando está irritada.', '— I’m not writing about you this time. — She frowns. She only frowns like that when she’s angry.'), // N
      ],
    },

    { id: 'a02a', se: () => comJustine(), vozes: [{ voz: 'L37', em: ['Eu volto logo. Prometo', 'I’ll be back soon. I promise'] }], zona: 'capela', fundo: FD('a02-lado', '50% 40%', 'velas'),
      texto: [
        T('— Eu volto logo. Prometo.', '— I’ll be back soon. I promise.'), // N
        T('Ela pega a minha mão e passa o polegar nos calos, um por um, como faz quando vai me dizer uma coisa difícil.', 'She takes my hand and runs her thumb over the calluses, one by one, the way she does when she is about to tell me something hard.'), // N
        T('— Tenho saudade de você, sabia?', '— I miss you, you know?'), // N
        T('— Você sabe por que eu estive longe. — Aperto a mão dela sem querer.', '— You know why I’ve been distant. — I squeeze her hand without meaning to.'), // N
        T('— Você ama mais a mim ou ao seu título? Lâmina… General-Rainha?', '— Do you love me more, or your title? Blade… General-Queen?'), // N
      ],
      escolha: { id: 'justine', pergunta: T('Justine', 'Justine'), opcoes: [
        { id: 'voce', voz: 'L08a', aviso: T('Justine vai lembrar disso.', 'Justine will remember that.'), txt: T('— Você, Justine. Te amo desde sempre, e você sabe.', '— You, Justine. I’ve loved you forever, and you know it.'),
          resultado: [T('— Então, quando voltar, promete que vai sossegar?', '— Then, when you’re back, promise you’ll settle down?')] }, // N
        { id: 'nada', voz: 'L08b', aviso: T('Justine vai lembrar disso.', 'Justine will remember that.'), txt: T('— Uma coisa não tem nada a ver com a outra.', '— One thing has nothing to do with the other.'),
          resultado: [T('— É claro que tem. Não posso viver assim, Laura, amando uma pessoa que passa mais tempo no deserto e no mar do que comigo. Quando voltar, promete que vai sossegar?', '— Of course it does. I can’t live like this, Laura, loving someone who spends more time in the desert and at sea than with me. When you’re back, promise you’ll settle down?')] }, // N
        { id: 'dever', voz: 'L08c', fundo: FD('a02-saida', '55% 45%', 'velas'), aviso: T('Justine vai lembrar disso.', 'Justine will remember that.'), txt: T('— O meu dever com Redom vem em primeiro lugar. Sempre.', '— My duty to Redom comes first. Always.'),
          resultado: [T('— Ótimo. Obrigada por esclarecer as coisas. Boa viagem, Lâmina.', '— Fine. Thank you for making things clear. Safe travels, Blade.'), T('Ela levanta de uma vez e sai da capela sem olhar para trás.', 'She gets up all at once and walks out of the chapel without looking back.')] }, // N
      ] } },

    { id: 'a02b', se: (st) => comJustine() && ['voce', 'nada'].includes(st.escolhas.justine), zona: 'capela', fundo: FD('a02-lado', '50% 40%', 'velas'),
      texto: [T('Ela espera, com a pena parada na mão.', 'She waits, the quill still in her hand.')], // N
      escolha: { id: 'sossegar', pergunta: T('Sossegar', 'Settle down'), opcoes: [
        { id: 'prometo', voz: [{ voz: 'L09a', ms: 900 }, { voz: 'L26', em: ['Sempre te amei, minha Justine', 'I’ve always loved you, my Justine'] }], fundo: FD('a02-beijo', '45% 40%', 'velas'), aviso: T('Justine vai lembrar disso.', 'Justine will remember that.'), txt: T('— Prometo.', '— I promise.'),
          resultado: [T('Ela fecha as mãos em volta das minhas e me beija, longo.', 'She closes her hands around mine and kisses me, long.'),
            T('— Eu te amo, Laura.', '— I love you, Laura.'), T('— Sempre te amei, minha Justine.', '— I’ve always loved you, my Justine.')] }, // N
        { id: 'naoPrometo', voz: 'L09b', fundo: FD('a02-saida', '55% 45%', 'velas'), aviso: T('Justine vai lembrar disso.', 'Justine will remember that.'), txt: T('— Não prometo.', '— I won’t promise.'),
          resultado: [T('— Ótimo. Obrigada por esclarecer as coisas. Boa viagem, Lâmina.', '— Fine. Thank you for making things clear. Safe travels, Blade.'), T('Ela levanta de uma vez e sai da capela. A porta bate atrás dela, e as velas tremem.', 'She gets up all at once and walks out of the chapel. The door bangs behind her, and the candles shiver.')] }, // N
      ] } },

    { id: 'a02c', se: (st) => comJustine() && st.escolhas.sossegar === 'prometo', zona: 'capela', fundo: FD('a02-porta', '62% 50%', 'velas'),
      texto: [T('Levanto e vou para a porta. O peito aperta por deixar a Justine outra vez. Quero olhar para ela mais uma vez antes de ir. Saio sem me virar.', 'I get up and go to the door. It tightens my chest to leave Justine again. I want to look at her one more time before I go. I leave without turning round.')] }, // N

    // a mãe: o primeiro disparo
    { id: 'a03', vozes: [{ voz: 'L22', em: ['vigésima primeira vez', 'twenty-first time'] }], zona: 'aposentos', fundo: { img: IMG('a03-dolores'), kb: 'in', foco: '55% 50%', dim: .55, clima: 'velas' }, pico: { bpm: 108, ms: 9000 },
      texto: [
        T('Minha mãe não sai mais da cama. As cortinas ficam fechadas dia e noite, e a criada deixa uma vela acesa ao lado dela, de dia também.', 'My mother no longer leaves her bed. The curtains stay shut day and night, and the maid keeps a candle lit beside her, in the daytime too.'), // N
        T('Ela me ouve entrar e não abre os olhos.', 'She hears me come in and doesn’t open her eyes.'), // N
        T('— Senta, Laura.', '— Sit, Laura.'), // N
        T('Sento na beira da cama. Ela acha a minha mão sem procurar.', 'I sit on the edge of the bed. She finds my hand without looking for it.'), // N
        T('— Seu pai saiu por aquele portão catorze vezes. Voltou treze. Seu irmão saiu uma. Você saiu vinte e voltou vinte…', '— Your father rode out of that gate fourteen times. He came back thirteen. Your brother rode out once. You’ve ridden out twenty times and come back twenty…'), // N
        T('O polegar dela passa pelos meus calos e para no do meio.', 'Her thumb moves over my calluses and stops on the middle one.'), // N
        T('— Esta é a vigésima primeira vez.', '— This is the twenty-first time.'), // N
        { continuar: true },
        T('O pulso sobe no meu pescoço. As minhas mãos se mexem dentro da dela, e ela sente, e não diz nada.', 'My pulse climbs in my neck. My hands move inside hers, and she feels it, and says nothing.'), // N
        T('— Ainda lembro de você menina. Frágil. — Ela quase sorri. — Talvez frágil você nunca tenha sido. Eu te imaginava Mãe-Rainha, como eu. Você foi muito mais do que eu sabia imaginar.', '— I still remember you as a girl. Fragile. — She almost smiles. — Maybe you were never fragile. I pictured you as Mother-Queen, like me. You became far more than I knew how to imagine.'), // N
        T('Ela tosse, e a tosse dói nela. Continua mesmo assim:', 'She coughs, and the cough hurts her. She goes on anyway:'), // N
        T('— Se você não voltar, vou amaldiçoar aquele Torneio até o último dos poucos dias que me restam. Você sabe disso, não sabe?', '— If you don’t come back, I’ll curse that Tournament until the last of the few days I have left. You know that, don’t you?'), // N
      ],
      escolha: { id: 'dolores', pergunta: T('Minha mãe', 'My mother'), opcoes: [
        { id: 'volto', fundo: FD('a03-maos', '62% 40%', 'velas'), voz: 'L07a', aviso: T('Sua mãe vai lembrar disso.', 'Your mother will remember that.'), txt: T('— Não se preocupe, mãe. Estou levando os nossos melhores soldados. Eu volto.', '— Don’t worry, Mother. I’m taking our best soldiers. I’ll come back.'),
          resultado: () => [T('— Vou me preocupar sempre, Laura. Sou sua mãe.', '— I’ll always worry, Laura. I’m your mother.'), RABO_MAE()].filter(Boolean) }, // N
        { id: 'simon', fundo: FD('a03-maos', '62% 40%', 'velas'), voz: 'L07b', aviso: T('Sua mãe vai lembrar disso.', 'Your mother will remember that.'), txt: T('— Estou fazendo isso pelo Simon, mãe. Sobraram poucos Grakh. Vai ser mais massacre que batalha.', '— I’m doing this for Simon, Mother. There are few Grakh left. It will be more slaughter than battle.'),
          resultado: () => [T('— O Simon era seu irmão, mas também era meu filho. — Os dedos dela apertam os meus. — Vou me preocupar sempre, Laura. Sou sua mãe.', '— Simon was your brother, but he was my son too. — Her fingers tighten on mine. — I’ll always worry, Laura. I’m your mother.'), RABO_MAE()].filter(Boolean) }, // N
        { id: 'torneio', fundo: FD('a03-maos', '62% 40%', 'velas'), voz: 'L07c', aviso: T('Sua mãe vai lembrar disso.', 'Your mother will remember that.'), txt: T('— O Torneio foi o melhor dia da minha vida, mãe. Nada vai mudar isso.', '— The Tournament was the best day of my life, Mother. Nothing will change that.'),
          resultado: [T('— Então não faça o melhor dia da sua vida virar o pior da sua mãe, filha.', '— Then don’t make the best day of your life the worst of your mother’s, daughter.')] }, // N
      ] } },

    { id: 'a03b', zona: 'aposentos', fundo: FD('a03-corredor', '55% 45%', 'velas'),
      texto: [
        T('— Tenho que ir, mãe. Fique bem.', '— I have to go, Mother. Be well.'), // N
        T('— Reze ao Cavaleiro para me dar forças, filha. E coma alguma coisa antes de ir, pela sua mãe. — Ela me solta devagar. — Te amo.', '— Pray to the Knight to give me strength, daughter. And eat something before you go, for your mother. — She lets go of me slowly. — I love you.'), // N
      ],
      escolha: { id: 'promessaMae', pergunta: T('O que eu prometo', 'What I promise'), opcoes: [
        { id: 'comer', voz: 'L10a', txt: T('— Prometo que vou comer. Também te amo.', '— I promise I’ll eat. I love you too.'),
          resultado: [T('Beijo a mão dela e saio. No corredor, o cheiro de pão sobe da cozinha pela escada, e o estômago responde, coisa que não fazia desde a notícia.', 'I kiss her hand and leave. In the corridor, the smell of bread comes up the stairs from the kitchen, and my stomach answers, something it hasn’t done since the news.')] }, // N
        { id: 'rezar', voz: 'L10b', txt: T('— Prometo que vou rezar por você. Também te amo.', '— I promise I’ll pray for you. I love you too.'),
          resultado: [T('Beijo a mão dela e saio. Antes da coluna, passo no templo do Cavaleiro.', 'I kiss her hand and leave. Before the column, I’ll stop at the Knight’s temple.')] }, // N
      ] } },

    // o comandante Aubert: a fuga. É aqui que ela decide quem fica.
    { id: 'a04', vozes: [{ voz: 'L36a', em: ['Markus fica.', 'Markus stays.'] }, { voz: 'L36b', em: ['O marechal fica.', 'The marshal stays.'] }], zona: 'interior', fundo: { img: IMG('a04-aubert'), kb: 'in', foco: '50% 40%', dim: .5 },
      texto: [
        T('Antes do sol, o comandante Aubert pede para entrar. O caderno de couro vem debaixo do braço, fechado.', 'Before sunrise, Commander Aubert asks to come in. The leather notebook is under his arm, closed.'), // N
        T('— A Nymae da Orla não chegou à costa, General-Rainha.', '— The Nymae from the Shore never reached the coast, General-Queen.'), // N
        T('— O que aconteceu?', '— What happened?'), // N
        () => (fuga().indexOf('sombra') === 0
          ? T('— O homem que eu mandei atrás dela perdeu a moça de vista no porto. Vasculharam o porto de ponta a ponta, pediram reforço e… nada. Sumiu. — Ele fala olhando para o chão.', '— The man I sent after her lost sight of her at the harbour. They searched the whole harbour, called for more men and… nothing. She vanished. — He says it looking at the floor.')
          : T('— Os cavaleiros que a levavam perderam a moça de vista na estrada. Vasculharam a estrada de ponta a ponta, pediram reforço e… nada. Sumiu. — Ele fala olhando para o chão.', '— The riders taking her lost sight of her on the road. They searched the whole road, called for more men and… nothing. She vanished. — He says it looking at the floor.')), // N
        () => ({
          'criada-roubar': T('— Numa estalagem do caminho, uma criada deu falta do vestido de reserva.', '— At an inn along the way, a maid found her spare dress gone.'),
          'criada-seduzir': T('— Numa estalagem do caminho, uma criada diz que deu o vestido de reserva a uma moça que pediu com jeito. Não lembra do rosto.', '— At an inn along the way, a maid says she gave her spare dress to a girl who asked nicely. She can’t remember the face.'),
          'criada-matar': T('— Numa estalagem do caminho, acharam a criada no poço do pátio.', '— At an inn along the way, they found the maid in the yard well.'),
          'sombra-matar': T('— O homem que eu mandei atrás dela apareceu depois, num beco da estrada. Morto, e sem a capa.', '— The man I sent after her turned up later, in an alley off the road. Dead, and without his cloak.'),
        }[fuga()] || null), // N
        T('— E a Orla?', '— And the Shore?'), // N
        () => (chefes() >= 3 ? T('— As três maiores casas seguram a trégua. Nenhum navio saiu de Nove Mastros. Nenhum relato de pirataria.', '— The three biggest houses are holding the truce. No ship has left Nine Masts. No reports of piracy.')
          : chefes() === 2 ? T('— Duas casas seguram a trégua. Nenhum navio saiu de Nove Mastros. Nenhum relato de pirataria.', '— Two houses are holding the truce. No ship has left Nine Masts. No reports of piracy.')
            : T('— Uma casa segura a trégua. Nenhum navio saiu de Nove Mastros. Ainda.', '— One house is holding the truce. No ship has left Nine Masts. Yet.')), // N
        T('Reparo nos olhos dele, ainda baixos. Ele não sabe mais o que dizer.', 'I watch his eyes, still lowered. He doesn’t know what else to say.'), // N
        T('Os homens da Sentença juram que o mar se levantou contra eles. A mulher que estava naquele barco está solta, perto do mar, com uma trégua frouxa nas costas. Não gosto do que sinto.', 'The men of the Sentence swear the sea rose against them. The woman who was on that boat is loose, near the sea, with a slack truce behind her. I don’t like what I feel.'), // N
        () => (comMarkus() ? T('— Markus fica. Com a Capital e com a costa.', '— Markus stays. With the Capital and the coast.') : T('— O marechal fica. Com a Capital e com a costa.', '— The marshal stays. With the Capital and the coast.')), // N
        T('Aubert abre o caderno, enfim, e escreve. Antes de sair, inclina a cabeça na minha direção.', 'Aubert opens the notebook at last and writes. Before he leaves, he bows his head toward me.'), // N
      ] },

    // Markus, na sala de armas, com a espada do Simon
    { id: 'a05', vozes: [{ voz: 'L23', em: ['Deixo o melhor que eu tenho', 'I leave the best I have'] }, { voz: 'L24', em: ['Na volta. Prometo.', 'When I’m back. I promise.'] }], zona: 'interior', fundo: { img: IMG('a05-markus'), kb: 'in', foco: '62% 45%', dim: .5 },
      texto: [
        T('Markus anda dormindo na sala de armas. Quando entro, ele já está sentado no banco, de botas, com a espada do meu irmão atravessada nos joelhos.', 'Markus has been sleeping in the armoury. When I come in he is already sitting on the bench, boots on, my brother’s sword across his knees.'), // N
        () => (comMarkus() ? T('— Já sei, meu amor. O Aubert passou por aqui primeiro. — Ele ri pelo nariz. — Você leva os melhores de Redom e me deixa vigiando uma Nymae que já sumiu.', '— I know, my love. Aubert came by here first. — He laughs through his nose. — You take Redom’s best and leave me watching a Nymae who’s already gone.')
          : T('— Já sei, Laura. O Aubert passou por aqui primeiro. — Ele ri pelo nariz. — Você leva os melhores de Redom e me deixa vigiando uma Nymae que já sumiu.', '— I know, Laura. Aubert came by here first. — He laughs through his nose. — You take Redom’s best and leave me watching a Nymae who’s already gone.')), // N
        T('— Deixo o melhor que eu tenho no lugar onde eu não vou estar.', '— I leave the best I have where I won’t be.'), // N
        T('Ele olha para a espada nos joelhos.', 'He looks down at the sword on his knees.'), // N
        () => (comMarkus() ? T('— Mandei selar o cinzento. — Ele passa o polegar no fio da espada. — E você ainda não escolheu o dia.', '— I had the grey saddled. — He runs his thumb along the edge of the sword. — And you still haven’t picked the day.') : T('— Mandei selar o cinzento.', '— I had the grey saddled.')), // N
        se(() => comMarkus(), T('Faz vinte anos que ele pediu a revanche, numa tenda de curandeiro, e eu disse que o dia quem escolhia era eu.', 'Twenty years ago he asked for a rematch, in a healer’s tent, and I said I would be the one to choose the day.')), // N
        se(() => comMarkus(), T('— Na volta. Prometo. Mas você não tem chance. — Sorrio de canto para ele.', '— When I’m back. I promise. But you don’t stand a chance. — I give him a half smile.')), // N
        se(() => comMarkus(), T('— Sem chuva e sem plateia. O povo de Redom não pode ver o mero Consorte derrotar a lendária Lâmina, não é? — Ele me devolve o sorriso, aquele que me faz sentir amada.', '— No rain and no crowd. The people of Redom can’t watch the mere Consort beat the legendary Blade, can they? — He gives me back the smile, the one that makes me feel loved.')), // N
        T('— Reforjei a espada do Simon. Está impecável. — Ele ergue a lâmina contra a luz da janela. — Não seria justiça do Cavaleiro os assassinos dele caírem pela espada dele?', '— I had Simon’s sword reforged. It’s flawless. — He lifts the blade to the light from the window. — Wouldn’t it be the Knight’s justice, his killers falling to his own sword?'), // N
      ],
      escolha: { id: 'espada', pergunta: T('A espada do meu irmão', 'My brother’s sword'), opcoes: [
        { id: 'levar', voz: [{ voz: 'L25', em: ['Fique com o Cavaleiro', 'Stay with the Knight'] }], fundo: FD('a05-levar', '55% 40%'), txt: T('Levar a espada.', 'Take the sword.'),
          resultado: () => [T('Markus me entrega a espada pelo cabo. Prendo na cintura, no lugar da minha.', 'Markus hands me the sword hilt first. I belt it on, in place of my own.'),
            comMarkus() ? T('— Fique com o Cavaleiro, Markus. Eu te amo.', '— Stay with the Knight, Markus. I love you.') : null,
            comMarkus() ? T('— Eu também. — Ele não solta o cabo logo. — Volta com ela suja.', '— So do I. — He doesn’t let go of the hilt right away. — Bring it back dirty.') : null].filter(Boolean) }, // N
        { id: 'deixar', voz: [{ voz: 'L25', em: ['Fique com o Cavaleiro', 'Stay with the Knight'] }], fundo: FD('a05-deixar', '45% 40%'), txt: T('Deixar a espada com Markus. — Use-a para proteger Redom.', 'Leave the sword with Markus. — Use it to protect Redom.'),
          resultado: () => [T('Ele põe a mão de volta em cima da lâmina.', 'He puts his hand back on the blade.'),
            T('— Alguém tem que dormir perto da porta.', '— Someone has to sleep near the door.'),
            comMarkus() ? T('— Fique com o Cavaleiro, Markus. Eu te amo.', '— Stay with the Knight, Markus. I love you.') : null,
            comMarkus() ? T('— Eu também.', '— So do I.') : null].filter(Boolean) }, // N
      ] } },

    // o templo do Cavaleiro: a primeira reza desde a notícia
    { id: 'a06', zona: 'templo', fundo: { img: IMG('a06-templo'), kb: 'in', foco: '50% 35%', dim: .5, clima: 'velas' },
      texto: [
        T('O templo do Cavaleiro abre antes da primeira hora para a guarda que sai. Hoje abre só para mim.', 'The Knight’s temple opens before the first hour for the watch going out. Today it opens only for me.'), // N
        T('Não entro aqui desde a notícia. O Cavaleiro de pedra continua olhando para a porta, de espada baixa. As velas são as mesmas, das mesmas viúvas.', 'I haven’t been in here since the news. The stone Knight still faces the door, sword lowered. The candles are the same ones, from the same widows.'), // N
        T('Ajoelho e fecho os olhos.', 'I kneel and close my eyes.'), // N
      ],
      escolha: { id: 'prece', pergunta: T('O que eu peço', 'What I ask for'), opcoes: [
        { id: 'mae', txt: T('Força para a minha mãe.', 'Strength for my mother.'),
          resultado: [T('Peço que ela aguente até eu voltar. Que a vela do quarto dela ainda esteja acesa quando eu subir a escada.', 'I ask that she hold on until I’m back. That the candle in her room still be lit when I climb the stairs.'),
            T('Uma vela do altar estala, e a chama sobe mais alta que as outras. Fica alta até eu levantar.', 'A candle on the altar crackles, and its flame rises higher than the others. It stays high until I get up.')] }, // N
        { id: 'grakh', txt: T('Encontrar e matar o Grakh grande.', 'To find the big Grakh and kill him.'),
          resultado: [T('Peço que ele esteja lá quando eu chegar. E que seja a minha mão.', 'I ask that he be there when I arrive. And that it be my hand.'),
            T('O Cavaleiro de pedra olha para a porta. Nada se mexe, nem a chama das velas.', 'The stone Knight faces the door. Nothing moves, not even the candle flames.')] }, // N
        { id: 'perdao', txt: T('Perdão por ter abandonado a fé desde a morte do Simon.', 'Forgiveness for abandoning my faith since Simon died.'),
          resultado: [T('Peço perdão pelos dias em que passei pela porta e não entrei.', 'I ask forgiveness for the days I walked past the door and didn’t come in.'),
            T('O templo fica quieto. Nenhum passo na porta. Mas o meu ombro esquerdo pesa, como pesa quando alguém encosta a mão, e o pulso desce no pescoço.', 'The temple is still. No footstep at the door. But my left shoulder grows heavy, the way it does when someone rests a hand there, and the pulse in my neck slows.'),
            T('Não me viro para ver.', 'I don’t turn to look.')] }, // N
      ] } },

    { id: 'a06b', zona: 'templo', fundo: { img: IMG('a06-laje'), kb: 'in', foco: '50% 55%', dim: .55 },
      texto: [
        T('Na saída, o padre da guarda me acompanha até a escada do térreo.', 'On the way out, the watch priest walks me to the stairs down to the ground floor.'), // N
        T('— A Nymae da Orla dormiu aqui embaixo, General-Rainha. Três noites. Varreram o quarto depois que ela foi.', '— The Nymae from the Shore slept down here, General-Queen. Three nights. They swept the room after she left.'), // N
        T('Desço os degraus. O quarto é pequeno: um catre, uma bacia, uma janela alta.', 'I go down the steps. The room is small: a cot, a basin, a high window.'), // N
      ],
      minijogo: 'sala',
      depois: (st) => (st.sala && st.sala.cisterna
        ? [T('Isso dá nos esgotos da Capital. Merda.', 'This leads into the Capital’s sewers. Shit.'),
          T('Mando um soldado levar a notícia ao Markus: que desça aqui com dois homens e siga a água até onde ela sair.', 'I send a soldier with word for Markus: he is to come down here with two men and follow the water to wherever it comes out.'),
          T('Subo. A coluna espera.', 'I go back up. The column is waiting.')]
        : [T('Subo. A coluna espera.', 'I go back up. The column is waiting.')]) },

    // o portão sul: dois mil
    { id: 'a07', zona: 'portao', fundo: { img: IMG('a07-portao'), kb: 'out', foco: '50% 45%', dim: .45, clima: 'poeira' }, vozAuto: 'L02', vozAtraso: 600,
      texto: [
        T('O portão sul abre com o sol. Conto por companhia, como conto há vinte anos: vinte companhias de cem. Dois mil.', 'The south gate opens with the sun. I count by company, as I have for twenty years: twenty companies of a hundred. Two thousand.'), // N
        T('A cavalaria na frente. Depois a Terceira, a infantaria pesada do Lorde Varr, com o Varr a pé no meio dela, porque um Varr anda com os seus. Joseph monta com a mão esquerda na rédea. A direita treme de manhã; tremia já no Torneio.', 'The cavalry in front. Then the Third, Lord Varr’s heavy foot, with Varr walking in the middle of it, because a Varr marches with his own. Joseph rides with his left hand on the reins. His right shakes in the mornings; it already shook at the Tournament.'), // N
        T('O Ansel vem na última fila da cavalaria. Era sentinela nas Goelas, e viu o meu irmão cair. Pediu para ficar na Capital. Eu mandei que viesse. Ele vai me mostrar o lugar.', 'Ansel rides in the last row of the cavalry. He was a sentry at the Gullets, and he saw my brother fall. He asked to stay in the Capital. I ordered him to come. He is going to show me the place.'), // N
        T('Atrás da coluna vêm as carroças: os barris, os odres, a cozinha, a forja sobre rodas, os moços da estrebaria puxando os cavalos de reserva, as ajudantes do curandeiro sentadas em cima das lonas. Esses não entram na minha conta. Servo não se conta.', 'Behind the column come the wagons: the barrels, the waterskins, the kitchen, the forge on wheels, the stable boys leading the spare horses, the healer’s helpers sitting on the canvas. Those don’t go into my count. Servants aren’t counted.'), // N
        se(() => lavadeiraVeio(), T('No meio deles, uma Nymae com argola de cativa no tornozelo carrega dois baldes numa vara.', 'Among them, a Nymae with a captive’s ring on her ankle carries two buckets on a pole.')), // N
        T('Monto o cinzento. Antes de eu puxar a rédea, ele vira a cabeça para a estrada do sul.', 'I mount the grey. Before I pull the rein, he turns his head toward the south road.'), // N
      ] },

    // ===================================================== II · A ESTRADA
    { id: 'parte-II', parte: 'II', zona: 'estrada', fundo: { img: IMG('b03-borda'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'II', nome: T('A Estrada', 'The Road'), epigrafe: T('Antes do deserto, o exército conta as espadas. No deserto, conta as gotas de água.', 'Before the desert, an army counts its swords. In the desert, it counts drops of water.'), fonte: T('Kassian D’Orrose, General-Rei', 'Kassian D’Orrose, General-King') } },

    { id: 'b01', zona: 'acampamento', fundo: { img: IMG('b01-panela'), kb: 'in', foco: '55% 45%', dim: .5, clima: 'velas' },
      texto: [
        T('Na primeira noite de estrada, a cozinha arma a panela grande no meio do acampamento, e os soldados fazem fila com a tigela na mão.', 'On the first night of the road, the kitchen sets up the big pot in the middle of the camp, and the soldiers line up with their bowls.'), // N
        T('Entro na fila. Na estrada eu como da panela dos soldados. Sempre foi assim, mas a comida nunca teve esse gosto.', 'I get in line. On the road I eat from the soldiers’ pot. It has always been that way, but the food has never tasted like this.'), // N
        se((st) => st.escolhas.promessaMae === 'comer', T('Prometi à minha mãe.', 'I promised my mother.')), // N
        () => (disfarce() === 'nell' ? T('A moça da cozinha enche a minha tigela sem levantar os olhos.', 'The kitchen girl fills my bowl without raising her eyes.') : T('O cozinheiro enche a minha tigela até a borda, porque é a minha.', 'The cook fills my bowl to the brim, because it’s mine.')), // N
        T('Como em pé, olhando a fila andar. Um cabo da Terceira vê a minha tigela vazia e cutuca o do lado. O do lado cutuca o próximo.', 'I eat standing, watching the line move. A corporal of the Third sees my empty bowl and nudges the man beside him. That one nudges the next.'), // N
        T('Volto para a fila. Na terceira tigela, prometo a mim mesma que é a última.', 'I get back in line. At the third bowl, I promise myself it’s the last.'), // N
        T('Joseph senta perto do fogo com um odre de vinho e gira o odre na mão antes de cada gole.', 'Joseph sits by the fire with a wineskin and turns the skin in his hand before every swallow.'), // N
        T('— A última campanha, alteza. — Ele ergue o odre para mim. — Quarenta anos atrás eu abri a linha dos Grakh no deserto. Quero acabar lá.', '— The last campaign, Highness. — He raises the skin to me. — Forty years ago I opened the Grakh line in the desert. I want to finish there.'), // N
        T('A direita dele treme no couro do odre. A esquerda segura o gargalo. Os homens dele olham para mim.', 'His right hand shakes on the leather of the skin. His left holds the neck. His men look at me.'), // N
      ],
      escolha: { id: 'vinho', pergunta: T('O odre do Joseph', 'Joseph’s wineskin'), opcoes: [
        { id: 'prometer', voz: 'L11a', fundo: FD('b01-brinde', '45% 40%', 'velas'), aviso: T('Joseph vai lembrar disso.', 'Joseph will remember that.'), txt: T('— Na volta do deserto, eu bebo com você.', '— When we’re back from the desert, I’ll drink with you.'),
          resultado: [T('— Se sobrar até lá! — Ele ri, e a roda de soldados ri junto. O fogo fica mais barulhento.', '— If there’s any left by then! — He laughs, and the ring of soldiers laughs with him. The fire gets louder.')] }, // N
        { id: 'recriminar', voz: 'L11b', fundo: FD('b01-recusa', '45% 40%', 'velas'), aviso: T('Joseph vai lembrar disso.', 'Joseph will remember that.'), txt: T('— Nada de beber até cumprirmos a missão, Joseph.', '— No drinking until the mission is done, Joseph.'),
          resultado: [T('— Bah! Sempre fizemos isso, Laura.', '— Bah! We’ve always done this, Laura.')] }, // N
        { id: 'ignorar', fundo: FD('b01-sozinho', '82% 45%', 'velas'), txt: T('Não responder.', 'Say nothing.'),
          resultado: [T('Deixo o odre no ar. Ele bebe sozinho, e os homens voltam a falar entre eles.', 'I leave the skin hanging in the air. He drinks alone, and his men go back to talking among themselves.')] }, // N
      ] } },

    { id: 'b01b', se: (st) => st.escolhas.vinho === 'recriminar', zona: 'acampamento', fundo: FD('b01-recusa', '45% 40%', 'velas'),
      texto: [T('A roda para de rir e espera a minha resposta.', 'The ring stops laughing and waits for my answer.')], // N
      escolha: { id: 'ordem', pergunta: T('Joseph', 'Joseph'), opcoes: [
        { id: 'ordem', voz: 'L11c', aviso: T('Joseph vai lembrar disso.', 'Joseph will remember that.'), txt: T('— Estou falando sério, Joseph. É uma ordem.', '— I mean it, Joseph. That’s an order.'),
          resultado: [T('— Certo… General-Rainha.', '— Very well… General-Queen.'), T('Ele vira o odre de boca para baixo e despeja o vinho na areia. Os soldados se olham, calados.', 'He turns the skin upside down and pours the wine into the sand. The soldiers look at one another, silent.')] }, // N
        { id: 'deixar', txt: T('Deixar o Joseph com o vinho dele.', 'Leave Joseph to his wine.'),
          resultado: [T('Ele bebe. A roda volta a falar, mais baixo.', 'He drinks. The ring starts talking again, quieter.')] }, // N
      ] } },

    // a lavadeira (só se a Madrinha a mandou para a coluna no Cap. VII)
    { id: 'b02', se: () => lavadeiraVeio(), zona: 'acampamento', fundo: { img: IMG('b02-lavadeira'), kb: 'in', foco: '60% 40%', dim: .5 },
      texto: [
        T('Na beira do acampamento, a Nymae enche os barris da cozinha com dois baldes pendurados numa vara. A argola de cativa aparece no tornozelo cada vez que ela se abaixa.', 'At the edge of the camp, the Nymae fills the kitchen barrels from two buckets slung on a pole. The captive’s ring shows on her ankle every time she bends.'), // N
        T('Pediu para carregar água, dizem. Uma Nymae carrega água melhor que qualquer um, dizem também. Não vejo sentido: para carregar balde, basta braço forte. E uma Nymae a caminho do deserto… é suicídio.', 'She asked to carry water, they say. A Nymae carries water better than anyone, they say too. I don’t see the sense in it: carrying a bucket takes nothing but a strong arm. And a Nymae on her way into the desert… that’s suicide.'), // N
        T('A líder da Orla sumiu faz três dias, mas esta não é ela. O rosto da prisioneira eu vi de perto, numa cela, por uma tarde.', 'The Shore’s leader vanished three days ago, but this isn’t her. I saw the prisoner’s face up close, in a cell, for an afternoon.'), // N
      ],
      escolha: { id: 'lavadeira8', pergunta: T('A Nymae', 'The Nymae'), opcoes: [
        { id: 'deixar', txt: T('Deixar que ela trabalhe normalmente.', 'Let her work as usual.'), resultado: [T('Ela continua enchendo. Não me olha.', 'She goes on filling. She doesn’t look at me.')] }, // N
        { id: 'vigiar', txt: T('Mandar um soldado vigiá-la de perto.', 'Have a soldier keep a close watch on her.'), resultado: [T('Um soldado da Terceira estende a manta ao lado dos barris. A Nymae vê, e continua enchendo.', 'A soldier of the Third spreads his blanket beside the barrels. The Nymae sees it, and keeps filling.')] }, // N
        { id: 'devolver', txt: T('Mandá-la de volta para a Capital na carroça do correio.', 'Send her back to the Capital on the post wagon.'), resultado: [T('De manhã ela vai na carroça do correio, de costas para o deserto, com a vara atravessada no colo.', 'In the morning she goes on the post wagon, her back to the desert, the pole across her lap.')] }, // N
      ] } },

    { id: 'b03', vozes: [{ voz: 'L35', em: ['Com seis de folga', 'With six to spare'] }], zona: 'deserto', fundo: { img: IMG('b03-laura'), kb: 'in', foco: '74% 35%', dim: .4, clima: 'poeira' },
      texto: [
        T('No sexto dia a terra vira areia, e a estrada some embaixo dela. Não faz falta. É o caminho das campanhas, de ida e volta até as Goelas, com os poços marcados por pedra empilhada.', 'On the sixth day the earth turns to sand, and the road disappears beneath it. It doesn’t matter. This is the campaign route, there and back to the Gullets, the wells marked with piled stones.'), // N
        T('Confiro os odres e os barris da carroça da frente com o intendente.', 'I check the waterskins and barrels on the lead wagon with the quartermaster.'), // N
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
        () => ({ estrebaria: T('Um moço da estrebaria, de joelhos ao lado de um cavalo.', 'A stable boy, on his knees beside a horse.'), forja: T('Um ajudante de ferreiro, ao lado da forja sobre rodas.', 'A smith’s boy, beside the forge on wheels.'), feridos: T('Uma ajudante do curandeiro, com um balde vazio na mão.', 'A healer’s helper, an empty bucket in her hand.'), cozinha: T('Uma das ajudantes da cozinha, entre os sacos de sal.', 'One of the kitchen helpers, among the salt sacks.') }[lugarVerdadeiro()]), // N
        T('Antes de alguém chegar, já está de pé, puxando a manga até cobrir o pulso.', 'Before anyone gets there, they are already up, pulling the sleeve down over the wrist.'), // N
        (st) => (sabeOnde(st) ? T('É ' + nomeDe(ELA()) + '. Anoto o nome.', 'It’s ' + nomeDe(ELA()) + '. I note the name.')
          : T('Anoto o lugar e a hora. O rosto, não: quando chego perto, estão todos iguais de poeira.', 'I note the place and the hour. Not the face: by the time I get there, they are all the same under the dust.')), // N
      ] },

    // ===================================================== IV · AS GOELAS
    { id: 'parte-IV', parte: 'IV', zona: 'goelas', fundo: { img: IMG('d01-goelas'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'IV', nome: T('As Goelas', 'The Gullets'), epigrafe: T('O posto das Goelas não tem muralha. Tem um poço e uma roda.', 'The Gullets post has no wall. It has a well and a wheel.'), fonte: T('Relatório ao Conselho de Redom', 'Report to the Council of Redom') } },

    { id: 'd01', zona: 'goelas', fundo: { img: IMG('d01-goelas'), kb: 'in', foco: '50% 50%', dim: .45, clima: 'poeira' }, sons: [{ s: SFX('rangido-roda'), ms: 1800, v: .45 }],
      texto: [
        T('As Goelas aparecem no fim do décimo primeiro dia: a cerca de estacas, o muro velho dos Grakh em volta do poço mais fundo, a roda em cima do poço e o estandarte vermelho com a balança, que alguém lavou.', 'The Gullets appear at the end of the eleventh day: the stake fence, the Grakh’s old wall around the deepest well, the wheel above the well and the red banner with the scales, which someone has washed.'), // N
        T('Dos cento e vinte homens do posto, sobraram trinta e um. Estão em fila na porta da cerca. O mais velho mal tem barba.', 'Of the hundred and twenty men of the post, thirty-one are left. They are lined up at the fence gate. The oldest barely has a beard.'), // N
        T('Os meus soldados bebem do poço até a barriga doer. Deixo.', 'My soldiers drink from the well until their bellies hurt. I let them.'), // N
        T('Bebo também. A outra sede continua.', 'I drink too. The other thirst stays.'), // N
        T('Meu pai morreu neste chão quando eu tinha quinze anos, num dia de eclipse. Os que voltaram contaram à mãe a última coisa que ele gritou. Eu estava atrás da porta.', 'My father died on this ground when I was fifteen, on the day of an eclipse. The men who came back told my mother the last thing he shouted. I was behind the door.'), // N
        T('— Firmes! É só o escuro! Segurem a linha!', '— Steady! It’s only the dark! Hold the line!'), // N
        T('Meu irmão morreu aqui também. A notícia levou oito dias até a Capital. Eu levei oitenta e um para sair de lá, e onze para chegar aqui. Parece que tudo aconteceu na mesma semana.', 'My brother died here too. The news took eight days to reach the Capital. It took me eighty-one to leave, and eleven to get here. It feels as if it all happened in the same week.'), // N
      ] },

    { id: 'd02', zona: 'goelas-noite', fundo: { img: IMG('d02-noite'), kb: 'in', foco: '50% 50%', dim: .5 },
      texto: [
        (st) => (fugiu(st) ? T('Nas Goelas, as noites ficam como ficaram desde a corrente vazia: quietas.', 'At the Gullets, the nights stay as they have since the empty chain: quiet.')
          : T('Nas Goelas, as noites ficam quietas. Os odres amanhecem duros de água, os cochos, cheios, e os barris da cozinha têm gosto de barril.', 'At the Gullets, the nights go quiet. The waterskins are hard with water at dawn, the troughs are full, and the kitchen barrels taste of barrel.')), // N
        (st) => (fugiu(st) ? null : T('Aqui a água sobra. Seja o que for, não precisa mais tirar.', 'Here water is plentiful. Whatever it is, it doesn’t need to take any now.')), // N
      ] },

    // o Ansel mostra o chão (ou, se a Laura o matou, um soldado do posto que só ouviu contar)
    { id: 'd03', vozes: [{ voz: 'L34', em: ['— Uma vez?', '— Once?'] }], zona: 'goelas', fundo: { img: IMG('d03-chao'), kb: 'in', foco: '60% 55%', dim: .5 },
      texto: (st) => (anselVivo(st) ? [
        T('Ansel me leva até o meio do pátio, entre o poço e a cerca. Para num lugar onde a areia é igual à do resto.', 'Ansel leads me to the middle of the yard, between the well and the fence. He stops at a place where the sand is like the sand everywhere else.'),
        T('— Aqui, senhora. — Ele aponta um palmo à frente da bota. — Ele caiu aqui. O grande ajoelhou ali. Eu estava no cavalo, perto da porta.', '— Here, my lady. — He points a hand’s width in front of his boot. — He fell here. The big one knelt there. I was on my horse, by the gate.'),
        ...(rangido() === 'acabar' ? [
          T('— O comandante ainda tentava levantar. A mão dele foi para o peito, com dois dedos, e o grande desceu a maça antes de ele bater.', '— The commander was still trying to get up. His hand went to his chest, two fingers, and the big one brought the mace down before he could tap.'),
          T('Duas batidas com dois dedos: mais uma rodada. Era o nosso sinal no laranjal, quando ele tinha catorze anos e não sabia perder. Nem isso deixaram ele pedir.', 'Two fingers on the chest, two taps: one more round. It was our sign in the orange grove, when he was fourteen and didn’t know how to lose. They didn’t even let him ask for that.'),
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
        T('Pego a manivela. Foi para montar esta roda que o Simon veio às Goelas.', 'I take the crank. It was to build this wheel that Simon came to the Gullets.'), // N
      ],
      minijogo: 'roda',
      depois: (st) => [
        T('Os homens do posto param de falar enquanto eu giro. Ou não param, e é o mundo em volta de mim que fica em silêncio.', 'The men of the post stop talking while I turn it. Or they don’t, and it’s the world around me that goes quiet.'), // N
        T('Lembro do Simon pequeno. Das noites no laranjal. Do homem forte que ele virou, como a mãe previu quando ele começou a comer feito gente grande.', 'I remember Simon small. The nights in the orange grove. The strong man he became, the way my mother said he would when he started eating like a grown man.'), // N
        ((st.roda && st.roda.voltas) || 0) >= 12 ? T('O balde bate na boca do poço, cheio.', 'The bucket knocks against the lip of the well, full.') : null, // N
        T('Quando solto, os meus olhos estão molhados. A última vez que quase chorei foi antes do Torneio Real, quando eu ainda não sabia o meu destino.', 'When I let go, my eyes are wet. The last time I nearly cried was before the Royal Tournament, when I still didn’t know my fate.'), // N
        T('Chorar na frente dos meus homens, dos melhores, seria trair a Juíza e o Cavaleiro. Me recomponho.', 'Crying in front of my men, the best of them, would be betraying the Judge and the Knight. I pull myself together.'), // N
      ].filter(Boolean) },

    // o túmulo: o segundo disparo. A primeira vez que o nome sai em voz alta.
    { id: 'd05', vozes: [{ voz: 'L27', em: ['Ela volta suja, irmão', 'It’s coming back dirty, brother'] }], zona: 'goelas', fundo: { img: IMG('d05-tumulo'), kb: 'in', foco: '50% 40%', dim: .5 }, pico: { bpm: 116, ms: 0 },
      texto: [
        T('Enterraram meu irmão em cima do muro velho dos Grakh, no lugar mais alto do posto, de onde se vê a roda. Uma pilha de pedras e o estandarte dele no alto do cabo, enterrado de pé. O vento já rasgou a ponta.', 'They buried my brother on top of the Grakh’s old wall, at the highest point of the post, where you can see the wheel. A pile of stones and his banner high on its staff, buried standing. The wind has already torn its edge.'), // N
        T('Ajoelho ao lado das pedras.', 'I kneel beside the stones.'), // N
        { continuar: true, voz: 'L03' },
        T('— Simon.', '— Simon.'), // N
        (st) => (anselVivo(st) && rangido() !== 'acabar'
          ? T('Bato dois dedos no peito. Uma vez, como ele bateu. Depois a outra, a que não veio.', 'I tap two fingers on my chest. Once, the way he did. Then the second, the one that never came.')
          : T('Bato dois dedos no peito, duas vezes. Mais uma rodada.', 'I tap two fingers on my chest, twice. One more round.')), // N
        se((st) => st.escolhas.espada === 'levar', T('Tiro a espada dele da cintura e encosto o cabo nas pedras. — Ela volta suja, irmão.', 'I draw his sword from my belt and rest the hilt against the stones. — It’s coming back dirty, brother.')), // N
        se((st) => anselVivo(st), T('Atrás de mim, Ansel se ajoelha também e põe um pedaço de pão em cima das pedras.', 'Behind me, Ansel kneels too and sets a piece of bread on the stones.')), // N
        T('O pulso bate no pescoço, alto. As mãos não param no joelho. Fico até elas pararem.', 'My pulse beats high in my neck. My hands won’t keep still on my knee. I stay until they do.'), // N
        T('Quando levanto, vejo lá embaixo, no pé do muro, outro túmulo. Mais velho.', 'When I stand, I see another grave down below, at the foot of the wall. Older.'), // N
      ],
      escolha: { id: 'pai', pergunta: T('O pé do muro', 'The foot of the wall'), opcoes: [
        { id: 'visitar', txt: T('Descer até o túmulo do meu pai.', 'Go down to my father’s grave.'), resultado: [T('Desço pelo lado de dentro do muro, devagar, pelas pedras soltas.', 'I climb down the inside of the wall, carefully, over the loose stones.')] }, // N
        { id: 'voltar', txt: T('Voltar para o posto.', 'Go back to the post.'), resultado: [T('Desço pelo outro lado. Meu pai esperou vinte e um anos. Espera mais um pouco.', 'I climb down the other side. My father has waited twenty-one years. He can wait a little longer.')] }, // N
      ] } },

    // o pai, se ela desce: Kassian, o General-Rei, que ela conheceu de costas
    { id: 'd05b', se: (st) => st.escolhas.pai === 'visitar', vozes: [{ voz: 'L28', em: ['O Simon está lá em cima', 'Simon is up there'] }], zona: 'goelas', fundo: { img: IMG('d05-pai'), kb: 'in', foco: '55% 50%', dim: .5 }, sons: [{ s: SFX('vento-ferro'), p: 5, v: .5 }],
      texto: [
        T('As pedras perderam a cor, e do estandarte sobrou só a ponta de ferro do cabo. Numa pedra lisa, alguém riscou um nome com a ponta de uma faca: Kassian.', 'The stones have lost their colour, and nothing is left of the banner but the iron tip of its staff. On a smooth stone, someone has scratched a name with a knife point: Kassian.'), // N
        T('Redom enterra os seus guerreiros onde caem. Meu pai caiu aqui.', 'Redom buries its warriors where they fall. My father fell here.'), // N
        T('Quando eu era menina, ele era as costas de um cavalo saindo pelo portão sul. Quando voltava, jantava com os generais, e eu jantava no quarto. Sei mais dele pelos relatórios do que pela voz.', 'When I was a girl, he was the back of a horse riding out of the south gate. When he came home, he dined with his generals, and I dined in my room. I know more of him from reports than from his voice.'), // N
        T('Fico de pé na frente das pedras. Não sei o que se diz a um pai assim.', 'I stand in front of the stones. I don’t know what you say to a father like that.'), // N
        T('— O Simon está lá em cima, pai. Do lado de onde se vê a roda.', '— Simon is up there, Father. On the side where you can see the wheel.'), // N
        T('O vento passa pela ponta de ferro do estandarte e assobia fino. Fico até o vento parar.', 'The wind passes over the iron tip of the banner and whistles thin. I stay until the wind stops.'), // N
      ] },

    // Joseph pede para ficar
    { id: 'd06', vozes: [{ voz: 'L32', em: ['Você quis uma última campanha', 'You wanted one last campaign'] }], zona: 'goelas', fundo: { img: IMG('d06-joseph'), kb: 'in', foco: '65% 40%', dim: .5 },
      texto: [
        T('Joseph me espera perto da roda, de pé, com as duas mãos no cinto para elas não tremerem.', 'Joseph is waiting for me by the wheel, standing, both hands on his belt so they won’t shake.'), // N
        T('— Alteza. Me deixa aqui.', '— Highness. Leave me here.'), // N
        T('— Você quis uma última campanha.', '— You wanted one last campaign.'), // N
        (st) => ((st.noites || []).includes('cozinha')
          ? T('— Quis. Um posto também é campanha. Bebi do barril salgado, alteza. Não aguento mais dias de areia e uma luta no fim. Fico com os do posto, seguro a água e recebo quem voltar.', '— I did. A post is a campaign too. I drank from the salt barrel, Highness. I can’t take more days of sand and a fight at the end. I stay with the post’s men, hold the water, and take in whoever comes back.')
          : T('— Quis. Um posto também é campanha. Tenho sessenta e um anos, alteza. Não aguento mais dias de areia e uma luta no fim. Fico com os do posto, seguro a água e recebo quem voltar.', '— I did. A post is a campaign too. I’m sixty-one, Highness. I can’t take more days of sand and a fight at the end. I stay with the post’s men, hold the water, and take in whoever comes back.')), // N
        T('Ele gira o anel no dedo e espera a minha resposta.', 'He turns the ring on his finger and waits for my answer.'), // N
      ],
      escolha: { id: 'joseph', pergunta: T('Joseph', 'Joseph'), opcoes: [
        { id: 'ficar', voz: [{ voz: 'L33', em: ['E guarda o vinho, Joseph', 'And keep the wine, Joseph'] }], fundo: FD('d06-ficar', '72% 40%'), txt: T('Deixar Joseph no posto.', 'Leave Joseph at the post.'),
          resultado: (st) => [T('— Obrigado, alteza.', '— Thank you, Highness.'), T('Ele tira as mãos do cinto. A direita treme. Ele deixa tremer.', 'He takes his hands off his belt. The right one shakes. He lets it.'),
            st.escolhas.vinho === 'prometer' ? T('— E guarda o vinho, Joseph. Na volta, eu bebo com você.', '— And keep the wine, Joseph. When I’m back, I’ll drink with you.') : null].filter(Boolean) }, // N
        { id: 'ir', fundo: FD('d06-ir', '75% 40%'), aviso: T('Joseph vai lembrar disso.', 'Joseph will remember that.'), txt: T('Mandar Joseph seguir com a coluna.', 'Order Joseph on with the column.'),
          resultado: [T('— Às suas ordens, alteza.', '— At your command, Highness.'), T('Ele monta com a mão esquerda e não fala mais até o fim da tarde.', 'He mounts with his left hand and says nothing more until the end of the afternoon.')] }, // N
      ] } },

    { id: 'd07', zona: 'goelas', fundo: { img: IMG('d07-batedores'), kb: 'in', foco: '72% 50%', dim: .5 }, sons: [{ s: SFX('corneta-redom'), p: 4, v: .8 }],
      texto: [
        T('Os batedores voltam no fim da tarde, com os cavalos espumando.', 'The scouts come back at the end of the afternoon, their horses lathered.'), // N
        T('— O Pira está no Último Gole, Lâmina. A três dias daqui, se formos rápidos. Todos: os que lutam, os velhos, as crias. Enchendo odre.', '— The Pyre is at the Last Swallow, Blade. Three days from here, if we’re quick. All of them: the fighters, the old ones, the young. Filling skins.'), // N
        T('Último Gole é como os nossos mapas chamam o último poço antes da rocha negra. Dali em diante, a areia acaba, a água também, e o chão sobe, duro e vulcânico, até os picos onde dorme Azrahekt, o Sol Faminto, nos livros de lendas.', 'Last Swallow is what our maps call the last well before the black rock. From there on, the sand ends, and so does the water, and the ground climbs, hard and volcanic, to the peaks where Azrahekt, the Hungry Sun, sleeps in the books of legend.'), // N
        T('Nem os Grakh vivem lá. Pararam no poço para encher os odres e cuidar dos feridos. Depois, vão virar para algum lado, e eu perco o rastro.', 'Not even the Grakh live there. They have stopped at the well to fill their skins and tend their wounded. After that, they’ll turn some way or other, and I’ll lose the trail.'), // N
        T('Mando soar a corneta. Vamos marchar o mais depressa que pudermos.', 'I have the horn sounded. We march as fast as we can.'), // N
      ] },

    // ===================================================== V · O ÚLTIMO GOLE (a véspera)
    { id: 'parte-V', parte: 'V', zona: 'deserto-noite', fundo: { img: IMG('e01-fogos'), kb: 'in', dim: .62 },
      cartao: { num: 'V', nome: T('O Último Gole', 'The Last Swallow'), epigrafe: T('A última chance de beber água para quem segue adiante. E ela tem gosto de ovo podre.', 'The last chance to drink water for anyone going on. And it tastes of rotten eggs.'), fonte: T('Teodric Vane, explorador de Redom', 'Teodric Vane, explorer of Redom') } },

    { id: 'e01', zona: 'deserto-noite', fundo: { img: IMG('e01-fogos'), kb: 'in', foco: '50% 55%', dim: .45 }, sons: [{ s: SFX('pedra-poco'), p: 5, v: .7 }],
      texto: [
        T('Do alto da duna, no fim do terceiro dia, o Último Gole: um vale raso de pedra com sete poços cavados na rocha, e só um brilhando.', 'From the top of the dune, at the end of the third day, the Last Swallow: a shallow stone valley with seven wells cut into the rock, and only one of them shining.'), // N
        T('Em volta do que brilha, os fogos do Pira.', 'Around the one that shines, the Pyre’s fires.'), // N
        T('Conto de longe. Se a vista não me engana, são trinta e quatro fogos. O Varr, do meu lado, conta trinta e sete. Não faz diferença.', 'I count from afar. If my eyes don’t fail me, there are thirty-four fires. Varr, beside me, counts thirty-seven. It makes no difference.'), // N
        T('Os da frente, perto da água, têm sombras grandes em volta: os que lutam. Os de trás, menores: os velhos e as crias.', 'The ones in front, near the water, have big shadows around them: the fighters. The ones behind, smaller: the old and the young.'), // N
        T('Trinta e quatro, ou trinta e sete. Vinte anos atrás, nas Goelas, contei mais de trezentos.', 'Thirty-four, or thirty-seven. Twenty years ago, at the Gullets, I counted more than three hundred.'), // N
        T('Os outros seis poços ficam entre a duna e a água, abertos no chão. Um soldado joga uma pedra no mais perto. Ela cai, cai, e não bate em nada.', 'The other six wells lie between the dune and the water, open in the ground. A soldier drops a stone into the nearest. It falls, and falls, and hits nothing.'), // N
      ] },

    { id: 'e02', zona: 'deserto-noite', fundo: { img: IMG('e02-chao'), kb: 'in', foco: '72% 55%', dim: .55 },
      texto: [
        T('De madrugada, o guarda do flanco do poente me acorda.', 'Before dawn, the guard on the western flank wakes me.'), // N
        T('— Lâmina. O chão.', '— Blade. The ground.'), // N
        T('Desço a duna com ele e encosto o ouvido na areia, como os batedores ensinam a ouvir cavalo longe.', 'I go down the dune with him and put my ear to the sand, the way scouts teach you to listen for distant horses.'), // N
      ],
      minijogo: 'chao',
      depois: (st) => (st.chao && st.chao.acertos >= 6
        ? [T('Três batidas e um silêncio. Três batidas e um silêncio. Cavalo não bate assim, nem homem a pé.', 'Three beats and a silence. Three beats and a silence. Horses don’t beat like that, nor men on foot.')]
        : [T('Alguma coisa bate, longe, do lado do poente. Perco o ritmo no vento.', 'Something is beating, far off, to the west. I lose the rhythm in the wind.')]) },

    { id: 'e02b', zona: 'deserto-noite', fundo: { img: IMG('e02-chao'), kb: 'in', foco: '72% 55%', dim: .55 },
      texto: [T('Levanto a cabeça da areia. O guarda espera a ordem.', 'I lift my head from the sand. The guard waits for the order.')], // N
      escolha: { id: 'vigia', pergunta: T('O poente', 'The west'), opcoes: [
        { id: 'oeste', txt: T('Dobrar a vigia no flanco do poente.', 'Double the watch on the western flank.'), resultado: [T('Cem homens da Terceira dormem de escudo no braço, virados para o poente.', 'A hundred men of the Third sleep with their shields on their arms, facing west.')] }, // N
        { id: 'batedores', txt: T('Mandar dois batedores ver o que é.', 'Send two scouts to see what it is.'), resultado: [T('Os dois saem a cavalo para o poente. Não voltam até o sol.', 'The two ride out to the west. They aren’t back by sunrise.')] }, // N
        { id: 'vento', txt: T('É o vento. Voltar a dormir.', 'It’s the wind. Go back to sleep.'), resultado: [T('Volto para a tenda. Durmo uma hora.', 'I go back to the tent. I sleep for an hour.')] }, // N
      ] } },

    { id: 'e03', vozes: [{ voz: 'L38', em: ['— Amanhã.', '— Tomorrow.'] }], zona: 'deserto-noite', fundo: { img: IMG('e03-varr'), kb: 'in', foco: '50% 40%', dim: .5, clima: 'velas' },
      texto: [
        T('O Varr me acha acordada perto dos cavalos e põe a mão no meu ombro, como faz com os soldados dele.', 'Varr finds me awake by the horses and puts his hand on my shoulder, the way he does with his own soldiers.'), // N
        T('— Amanhã, Lâmina.', '— Tomorrow, Blade.'), // N
        T('— Amanhã.', '— Tomorrow.'), // N
        T('— Meu pai tem uma estátua pequena num jardim que não recebe visita. Eu queria uma canção.', '— My father has a small statue in a garden nobody visits. I wanted a song.'), // N
        se(() => varr4() === 'ajudar', T('— Há vinte anos, na prova dos escribas, tinha um tal de Merrow na mesa do lado.', '— Twenty years ago, at the scribes’ trial, there was someone called Merrow at the next table.')), // N
        se(() => varr4() === 'ajudar', T('— Escreveu a resposta no canto da folha para eu copiar. Um Varr paga o que deve. — Ele aperta o meu ombro. — Amanhã eu pago, Laus da Casa Merrow.', '— He wrote the answer in the corner of the page for me to copy. A Varr pays what he owes. — He squeezes my shoulder. — Tomorrow I pay, Laus of House Merrow.')), // N
      ],
      escolha: { id: 'varr8', pergunta: T('O Varr', 'Varr'), opcoes: [
        { id: 'cancao', voz: 'L12a', fundo: FD('e03-cancao', '50% 40%', 'velas'), txt: T('— Você vai ter a sua canção, e eu vou ter a minha vingança.', '— You’ll have your song, and I’ll have my revenge.'),
          resultado: [T('— Então amanhã cada um busca o seu. — Ele ri baixo, para não acordar os cavalos.', '— Then tomorrow we each go get ours. — He laughs low, so as not to wake the horses.')] }, // N
        { id: 'dois-mil', voz: 'L12b', fundo: FD('e03-mao-solta', '60% 40%', 'velas'), txt: T('— Não existe canção para dois mil homens, Varr.', '— There’s no song for two thousand men, Varr.'),
          resultado: [T('— Para dois mil, não. — Ele tira a mão do meu ombro. — Para um Varr, cabe.', '— Not for two thousand. — He takes his hand off my shoulder. — For one Varr, there’s room.')] }, // N
        { id: 'foco', voz: 'L12c', fundo: FD('e03-mao-solta', '60% 40%', 'velas'), txt: T('— Concentre-se na batalha.', '— Keep your mind on the battle.'),
          resultado: [T('— Sim, Lâmina.', '— Yes, Blade.'), T('Ele bate no peito uma vez, com o punho fechado.', 'He strikes his chest once, with a closed fist.')] }, // N
      ] } },

    { id: 'e03b', zona: 'deserto-noite', fundo: FD('e03b-terceira', '65% 55%', 'velas'),
      texto: [T('Ele levanta, bate a areia da roupa e vai dormir com a Terceira, no chão, do jeito deles.', 'He gets up, beats the sand off his clothes and goes to sleep with the Third, on the ground, their way.')] }, // N

    { id: 'e04', vozes: [{ voz: 'L29', em: ['Amanhã eu vejo a cara', 'Tomorrow I see the face'] }], zona: 'tenda', fundo: { img: IMG('e04-tenda'), kb: 'in', foco: '50% 50%', dim: .5, clima: 'velas' },
      texto: [
        T('Não durmo. Na tenda, passo o dedo no mapa, da duna ao poço, do poço aos acampamentos, até o caminho ficar gravado.', 'I don’t sleep. In the tent, I run my finger over the map, from the dune to the well, from the well to the camps, until the way is burned in.'), // N
        (st) => (disfarce() === 'nell' && !fugiu(st) && !(st.mortos || []).includes('nell')
          ? T('Nell entra com uma tigela de ensopado frio e põe na mesa, ao lado do mapa. Sai sem eu pedir.', 'Nell comes in with a bowl of cold stew and sets it on the table beside the map. She leaves without my asking.')
          : T('Um moço da cozinha entra com uma tigela de ensopado frio e põe na mesa, ao lado do mapa.', 'A kitchen boy comes in with a bowl of cold stew and sets it on the table beside the map.')), // N
        T('Como tudo. Devolvo a tigela vazia ao guarda da porta.', 'I eat all of it. I hand the empty bowl to the guard at the door.'), // N
        T('Amanhã eu vejo a cara de quem matou o Simon.', 'Tomorrow I see the face of whoever killed Simon.'), // N
        T('Lá fora, a areia começa a clarear.', 'Outside, the sand begins to grow light.'), // N
      ] },

    // o amanhecer: apontar alguém na fila. Se ela já fugiu da corrente, sobe de dentro de um poço seco.
    { id: 'e05', se: (st) => !fugiu(st), vozes: [{ voz: 'L30', em: ['Sei onde olhar', 'I know where to look'] }], zona: 'amanhecer', fundo: { img: IMG('e05-fila'), kb: 'in', foco: '55% 45%', dim: .45 },
      texto: [
        T('Antes da carga, mando a coluna formar na crista da duna, de frente para o vale. Os servos, na frente da coluna, numa fila só, de costas para o Pira.', 'Before the charge, I order the column to form up on the crest of the dune, facing the valley. The servants in front of the column, in a single line, their backs to the Pyre.'), // N
        (st) => T('Ando diante da fila. Os moços da estrebaria. O ferreiro e o ajudante. As moças da cozinha. As ajudantes do curandeiro.', 'I walk along the line. The stable boys. The smith and his boy. The kitchen girls. The healer’s helpers.') + (lavNaColuna(st) ? T(' A Nymae, no fim.', ' The Nymae, at the end.') : ''), // N
        T('O que tirou a nossa água está nesta fila, ou não está em lugar nenhum.', 'Whatever took our water is in this line, or it is nowhere.'), // N
        se((st) => sabeOnde(st), T('Sei onde olhar.', 'I know where to look.')), // N
      ],
      escolha: { id: 'desmascarar', pergunta: T('A fila', 'The line'), opcoes: (st) => opcoesFila(st) } },

    { id: 'e05f', se: (st) => fugiu(st), zona: 'amanhecer', fundo: { img: IMG('e05-fila'), kb: 'in', foco: '55% 45%', dim: .45 },
      texto: [
        T('Antes da carga, mando a coluna formar na crista da duna, de frente para o vale.', 'Before the charge, I order the column to form up on the crest of the dune, facing the valley.'), // N
        T('Lá embaixo, entre a duna e o Pira, uma coisa pequena sobe de dentro de um dos poços secos. Não está com a roupa que deixou na corrente: arrumou outra. Fica de pé na borda, de frente para nós, e abre as mãos.', 'Down below, between the dune and the Pyre, something small climbs out of one of the dry wells. It isn’t wearing the clothes it left in the chain: it found others. It stands on the rim, facing us, and opens its hands.'), // N
        (st) => (sabeNome() ? T('É ela. A Madrinha. Interroguei a desgraçada por uma tarde inteira, embaixo da tocha da Ala Funda.', 'It’s her. The Godmother. I questioned the wretch for a whole afternoon, under the torch in the Deep Ward.')
          : T('É ela. Interroguei a desgraçada por uma tarde, embaixo da tocha da Ala Funda.', 'It’s her. I questioned the wretch for an afternoon, under the torch in the Deep Ward.')), // N
      ] },

    // ===================================================== VI · O DIA COMIDO (a batalha)
    { id: 'parte-VI', parte: 'VI', zona: 'batalha', fundo: { img: IMG('f-onda'), kb: 'in', dim: .62 }, sons: [{ s: SFX('tambores-guerra'), ms: 600, v: .5 }],
      cartao: { num: 'VI', nome: T('O Dia Comido', 'The Eaten Day'), epigrafe: T('Dia ser comido, Maior nascer.', 'Day be eaten, Biggest be born.'), fonte: T('Dito dos velhos Grakh', 'Saying of the old Grakh') } },

    // ---------- rota A: desmascarada ao amanhecer
    { id: 'f01a', se: (st) => st.f.desmascarou === 'certo', zona: 'amanhecer', fundo: { img: IMG('f-rosto'), kb: 'in', foco: '48% 35%', dim: .45 }, cenaAuto: 'assets/video/f-rosto.mp4', cena: 'assets/video/f-rosto.mp4',
      texto: [
        T('O rosto escorrega.', 'The face slips.'), // N
        T('Primeiro a pele do pescoço, em placas finas, azul-cinza. Depois as orelhas, que descolam da cabeça e abrem em nadadeira. O corpo encolhe dentro da roupa de servo até a manga cobrir a mão. Os dois soldados soltam os braços ao mesmo tempo.', 'First the skin of the neck, in thin blue-grey plates. Then the ears, which peel away from the head and open into fins. The body shrinks inside the servant’s clothes until the sleeve covers the hand. The two soldiers let go of the arms at the same moment.'), // N
        (st) => (sabeNome() ? T('A Madrinha. Conheço esse rosto de uma tarde inteira na Ala Funda.', 'The Godmother. I know this face from a whole afternoon in the Deep Ward.')
          : T('Conheço esse rosto de uma tarde inteira na Ala Funda.', 'I know this face from a whole afternoon in the Deep Ward.')), // N
        T('Ela olha para mim, depois para a coluna na crista, de uma ponta à outra, devagar, como eu olhei no portão sul.', 'She looks at me, then at the column on the crest, from one end to the other, slowly, the way I looked at it at the south gate.'), // N
        T('— Você trouxe os melhores, Laura.', '— You brought the best, Laura.'), // N
        { continuar: true, s: SFX('agua-sobe'), fx: [{ fx: 'tremor', ms: 300, dur: 1600, forca: .6 }] },
        T('Ela abre as mãos.', 'She opens her hands.'), // N
        T('— E a Boca Seca bebe todos.', '— And the Dry Mouth drinks them all.'), // N
      ] },

    { id: 'f02a', se: (st) => rotaA(st), zona: 'onda', fundo: { img: IMG('f-onda'), kb: 'in', foco: '78% 45%', dim: .4 },
      sons: [{ s: SFX('onda-gigante'), ms: 400, v: 1 }, { fx: 'tremor', ms: 900, dur: 2400, forca: 1.4 }, { voz: 'L14', p: 2 }, { fx: 'agua', p: 4, dur: 2600 }, { s: SFX('gritos-longe'), p: 6, v: .6 }],
      texto: [
        T('No vale, o poço que brilhava apaga.', 'In the valley, the well that was shining goes dark.'), // N
        T('A água sai dele de uma vez, em pé, mais alta que a duna, e vem pelo vale na direção das mãos dela, passando por cima dos poços secos.', 'The water comes out of it all at once, standing up, taller than the dune, and comes up the valley toward her hands, passing over the dry wells.'), // N
        T('— Escudos! E matem ela! Antes de qualquer outra coisa, matem ela!', '— Shields! And kill her! Before anything else, kill her!'), // N
        T('A Terceira fecha o muro.', 'The Third closes the wall.'), // N
        T('A onda bate na crista. Arranca a fila dos servos, os cavalos de reserva, a primeira fileira. A segunda segura de joelhos, com a água pela cintura.', 'The wave hits the crest. It tears away the line of servants, the spare horses, the first rank. The second holds on its knees, water to the waist.'), // N
        T('Quando volta, a água leva o que arrancou encosta abaixo, e os poços secos bebem.', 'When it goes back, the water carries what it tore away down the slope, and the dry wells drink.'), // N
        T('Ouço os gritos descendo para dentro da pedra, até sumirem.', 'I hear the screams going down into the stone, until they’re gone.'), // N
      ] },

    // ---------- rota B: Redom ataca, e a água vem no meio da carga
    { id: 'f01b', se: (st) => !rotaA(st), zona: 'batalha', fundo: { img: IMG('f-carga'), video: 'assets/video/f-carga.mp4', kb: 'in', foco: '72% 40%', dim: .45 },
      sons: [{ s: SFX('corneta-redom'), ms: 300, v: .9 }, { s: SFX('carga-cavalaria'), ms: 1200, v: .9 }, { fx: 'tremor', ms: 1400, dur: 3000, forca: .5 }, { voz: (st) => (st.escolhas.pai === 'visitar' ? 'L17b' : 'L17a'), p: 3 }],
      texto: [
        T('Dou a ordem. A coluna desce a duna, a cavalaria pelos flancos e a Terceira pelo meio, entre os poços secos, na direção da água.', 'I give the order. The column goes down the dune, the cavalry on the flanks and the Third through the middle, between the dry wells, toward the water.'), // N
        T('Os Grakh formam na frente dos acampamentos. Poucos. Na frente deles, um mais alto que todos, com uma maça, parado, esperando a gente chegar.', 'The Grakh form up in front of their camps. Few. In front of them, one taller than all the rest, with a mace, standing still, waiting for us to come.'), // N
        T('O Grakh grande. Não só mais alto: mais musculoso também. O tipo de desvantagem que nunca foi desvantagem para mim.', 'The big Grakh. Not just taller: more muscled too. The kind of disadvantage that has never been a disadvantage for me.'), // N
        (st) => (st.escolhas.pai === 'visitar' ? T('É por você, Simon. E por você, pai.', 'This is for you, Simon. And for you, Father.') : T('É por você, Simon.', 'This is for you, Simon.')), // N
        T('Estamos a cem passos do poço quando a água dele se levanta.', 'We are a hundred paces from the well when its water stands up.'), // N
      ] },

    { id: 'f02b', se: (st) => !rotaA(st), zona: 'onda', fundo: { img: IMG('f-onda'), kb: 'in', foco: '78% 45%', dim: .4 },
      sons: [{ s: SFX('onda-gigante'), p: 0, v: 1 }, { fx: 'agua', p: 1, dur: 2600 }, { fx: 'tremor', p: 1, dur: 2400, forca: 1.5 }, { s: SFX('gritos-longe'), p: 2, v: .6 }],
      texto: [
        T('A água sai do poço em pé, mais alta que a duna, e cai sobre a carga.', 'The water comes out of the well standing up, taller than the dune, and falls on the charge.'), // N
        T('Não tem escudo para isso. A onda passa por cima da Terceira, dos cavalos, de mim. Quando volta, arrasta os homens pelo chão do vale, rolando, até os poços secos, e os poços bebem.', 'There is no shield for this. The wave goes over the Third, over the horses, over me. When it goes back, it drags the men across the valley floor, rolling, into the dry wells, and the wells drink.'), // N
        T('Ouço os gritos descendo para dentro da pedra, até sumirem.', 'I hear the screams going down into the stone, until they’re gone.'), // N
        T('Levanto da lama com a rédea do cinzento ainda enrolada no pulso. Ele também levanta.', 'I get up out of the mud with the grey’s rein still wound round my wrist. He gets up too.'), // N
        T('Quando a água acaba, o poço do Pira está seco. No fundo dele, de pé, uma coisa pequena de roupa de servo, com as mãos abertas.', 'When the water is done, the Pyre’s well is dry. At the bottom of it, standing, something small in servant’s clothes, with its hands open.'), // N
        (st) => (sabeNome() ? T('É ela. A Madrinha. A mesma cara que passou uma tarde me encarando por trás das grades.', 'It’s her. The Godmother. The same face that spent an afternoon staring at me through the bars.')
          : T('É ela. A mesma cara que passou uma tarde me encarando por trás das grades.', 'It’s her. The same face that spent an afternoon staring at me through the bars.')), // N
        T('Ela puxa a água de volta da lama para outra enxurrada. Dou a ordem para matá-la antes de qualquer outra coisa.', 'She pulls the water back out of the mud for another flood. I give the order to kill her before anything else.'), // N
      ] },

    // ---------- as duas rotas seguem juntas: o bronze
    { id: 'f03', zona: 'batalha', fundo: { img: IMG('f-bronze'), video: 'assets/video/f-bronze.mp4', kb: 'in', foco: '50% 45%', dim: .45 },
      sons: [{ s: 'assets/audio/tacet_passos.mp3', p: 1, v: 1 }, { fx: 'bronze', p: 2, dur: 3200 }, { voz: 'L15', p: -1 }],
      texto: [
        (st) => (rotaA(st) ? T('Depois da água, atordoada, ouço o compasso.', 'After the water, dazed, I hear the beat.') : T('Com a água ainda escorrendo do cabelo, atordoada, ouço o compasso.', 'With the water still running out of my hair, dazed, I hear the beat.')), // N
        (st) => (st.chao && st.chao.acertos >= 6 ? T('Três batidas e um silêncio. Ouvi de noite, com o ouvido na areia. Agora não preciso encostar.', 'Three beats and a silence. I heard it in the night, with my ear on the sand. Now I don’t need to lie down.')
          : T('Batidas. Três, um silêncio, e três.', 'Beats. Three, a silence, and three.')), // N
        T('Do lado do poente, na crista da duna seguinte, aparecem homens de bronze. Dez. Vinte. Cem? Mais. Andam no mesmo passo, sem pressa, e o compasso quebra: quatro batidas, sem silêncio.', 'To the west, on the crest of the next dune, men of bronze appear. Ten. Twenty. A hundred? More. They walk in the same step, unhurried, and the beat breaks: four beats, no silence.'), // N
        (st) => ({ oeste: T('A vigia dobrada do poente vira os escudos para eles antes de eu dar a ordem.', 'The doubled watch on the western flank turns its shields toward them before I give the order.'),
          batedores: T('Um cavalo de batedor desce a duna na frente deles, sem ninguém na sela.', 'A scout’s horse comes down the dune ahead of them, with no one in the saddle.'),
          vento: T('No flanco do poente, os homens ainda estão se levantando.', 'On the western flank, the men are still getting to their feet.') }[st.escolhas.vigia] || null), // N
        T('Eles atravessam o lamaçal do vale sem afundar. Um sargento enfia a lança no peito do primeiro. A lança entra, e o bronze continua andando.', 'They cross the mud of the valley without sinking. A sergeant drives his spear into the chest of the first. The spear goes in, and the bronze keeps walking.'), // N
        T('Que merda está acontecendo?!', 'What the hell is happening?!'), // N
      ] },

    { id: 'f04', zona: 'batalha', fundo: { img: IMG('f-pira'), kb: 'in', foco: '65% 40%', dim: .45 }, sons: [{ s: SFX('tambores-guerra'), p: 0, v: .9 }, { s: SFX('grakh-grito'), p: 1, v: .8 }, { voz: (st) => (!rotaA(st) ? null : st.escolhas.pai === 'visitar' ? 'L17b' : 'L17a'), p: 2 }],
      texto: [
        (st) => (rotaA(st)
          ? [T('Lá embaixo, o Pira viu a água bater em nós e o bronze descer do poente. Os Grakh sobem a duna. Na frente deles, um mais alto que todos, com uma maça.', 'Down below, the Pyre saw the water hit us and the bronze come down from the west. The Grakh climb the dune. In front of them, one taller than all the rest, with a mace.'),
            T('O líder deles. Não só mais alto: mais musculoso também. O tipo de desvantagem que nunca foi desvantagem para mim.', 'Their leader. Not just taller: more muscled too. The kind of disadvantage that has never been a disadvantage for me.'),
            st.escolhas.pai === 'visitar' ? T('É por você, Simon. E por você, pai.', 'This is for you, Simon. And for you, Father.') : T('É por você, Simon.', 'This is for you, Simon.')]
          : [T('Os Grakh viram a água derrubar a nossa carga. Eles vêm, os poucos que são, dos acampamentos para dentro do vale, com o mais alto na frente.', 'The Grakh saw the water bring down our charge. They come, the few of them there are, out of the camps and into the valley, with the tallest in front.')]), // N
        () => ((c6().aoLado || []).includes('ikk') ? T('Uma flecha de longe derruba o sargento ao meu lado. Lá atrás, em cima de uma pedra, uma Grakh de arco puxa a próxima.', 'An arrow from far off brings down the sergeant beside me. Back there, on top of a rock, a Grakh with a bow is drawing the next.') : null), // N
        () => ((c6().aoLado || []).includes('dorgh') ? T('Ao lado do grande, um Grakh mais velho, com um corte antigo no braço, bate com o porrete em tudo o que se mexe.', 'Beside the big one, an older Grakh with an old cut on his arm clubs everything that moves.') : null), // N
      ] },

    // a batalha de três lados: o bronze, os Grakh e a água dela, tudo ao mesmo tempo
    { id: 'f03b', zona: 'batalha', fundo: { img: IMG('f-linha'), kb: 'in', foco: '50% 45%', dim: .45 },
      sons: [{ s: SFX('bronze-impacto'), p: 0, v: .9 }, { fx: 'tremor', p: 0, dur: 700, forca: .8 }, { voz: 'L16', p: 1 }, { s: SFX('martelo-pedra'), p: 2, v: .9 }, { fx: 'tremor', p: 2, dur: 500, forca: .6 }, { s: SFX('tambores-guerra'), p: 4, v: .9 }, { s: SFX('chicote-agua'), p: 6, v: .8 }],
      texto: [
        T('O bronze bate na linha da Terceira como uma porta fechando. A lança entra e não sai. O escudo segura um golpe, e o segundo afunda o escudo para dentro do braço de quem segura.', 'The bronze hits the Third’s line like a door slamming. The spear goes in and won’t come out. A shield holds one blow, and the second drives the shield into the arm holding it.'), // N
        T('— Nas juntas! Martelos nas juntas!', '— The joints! Hammers on the joints!'), // N
        T('Um sargento acerta o martelo de guerra no joelho de um deles. A junta de pedra estoura em pó, e o bronze ajoelha, e continua golpeando de joelhos até três homens arrancarem o braço dele do ombro.', 'A sergeant swings his war hammer into the knee of one of them. The stone joint bursts into dust, and the bronze goes down on one knee, and keeps striking from its knees until three men tear its arm from the shoulder.'), // N
        T('Eles não gritam, não recuam, não param pelos que caem. O de trás pisa no caído, no mesmo compasso.', 'They don’t scream, they don’t fall back, they don’t stop for the fallen. The one behind steps on the fallen one, in the same beat.'), // N
        T('Do lado da água, os tambores do Pira. Os Grakh entram pelos buracos que o bronze abre na nossa linha, de maça, e tudo o que é de Redom e está de costas, morre.', 'From the side of the water, the Pyre’s drums. The Grakh come in through the holes the bronze tears in our line, with maces, and everything of Redom that has its back turned dies.'), // N
        (st) => (sabeNome() ? T('E no meio de tudo, sempre que o barulho afrouxa, ouço o estalo da água da Madrinha.', 'And in the middle of it all, whenever the noise slackens, I hear the crack of the Godmother’s water.')
          : T('E no meio de tudo, sempre que o barulho afrouxa, ouço o estalo da água dela.', 'And in the middle of it all, whenever the noise slackens, I hear the crack of her water.')), // N
      ] },

    // a conjuradora: o Varr
    { id: 'f05', zona: 'batalha', fundo: { img: IMG('f-varr'), kb: 'in', foco: '80% 35%', dim: .45 },
      sons: [{ s: SFX('chicote-agua'), p: 0, v: .9 }, { fx: 'clarao', p: 0, dur: 400 }, { s: SFX('chicote-agua'), p: 1, v: .9 }, { s: SFX('golpe'), p: 4, v: .9 }, { s: SFX('golpe'), p: 6, v: 1 }, { fx: 'tremor', p: 6, dur: 600, forca: .9 }, { s: SFX('varr-grito'), p: 7, v: .8 }],
      texto: [
        (st) => {
          const quem = sabeNome() ? ['a Madrinha', 'the Godmother'] : ['a Nymae conjuradora', 'the Nymae conjurer'];
          return rotaA(st) ? T('Perto da crista, ' + quem[0] + ' luta com uma adaga numa mão e, na outra, uma corda de água do tamanho de um chicote de carroça, que estala e corta. Onde o chicote estala, são dez homens a menos.', 'Near the crest, ' + quem[1] + ' fights with a dagger in one hand and, in the other, a rope of water as long as a wagon whip, that cracks and cuts. Wherever the whip cracks, ten men are gone.')
            : T('No fundo do poço seco do Pira, ' + quem[0] + ' espera quem desce, com uma adaga numa mão e, na outra, uma corda de água do tamanho de um chicote de carroça, que estala e corta. Onde o chicote estala, são dez homens a menos.', 'At the bottom of the Pyre’s dry well, ' + quem[1] + ' waits for whoever comes down, with a dagger in one hand and, in the other, a rope of water as long as a wagon whip, that cracks and cuts. Wherever the whip cracks, ten men are gone.');
        }, // N
        T('Só não somos mais porque metade da coluna está de frente para o bronze, e de costas para ela.', 'The only reason it isn’t more is that half the column is facing the bronze, with its back to her.'), // N
        T('Depois de umas dez chicotadas, a água acaba. Ela puxa mais da lama, e vem menos. A Boca Seca bebeu a dela também.', 'After some ten lashes, the water runs out. She pulls more from the mud, and less comes. The Dry Mouth has drunk hers as well.'), // N
        T('O Varr chega com seis homens da Terceira. O primeiro morre. O segundo some na lama, e a lama fecha em cima dele. O Varr, não.', 'Varr reaches her with six men of the Third. The first dies. The second goes into the mud, and the mud closes over him. Varr doesn’t.'), // N
        T('A espada dele entra embaixo do braço dela, entre as costelas. Um soldado ergue o machado para o pescoço dela, e ela enfia a adaga na garganta dele primeiro.', 'His sword goes in under her arm, between the ribs. A soldier raises his axe for her neck, and she puts the dagger in his throat first.'), // N
        T('Aberta, sangrando, ela ainda desvia de dois golpes, como uma dançarina, e corta os homens de Redom como papel.', 'Opened, bleeding, she still slips two blows, like a dancer, and cuts Redom’s men like paper.'), // N
        T('O Varr arranca a espada, ergue acima da cabeça e desce com toda a raiva que tem, de cima para baixo. Dessa vez, ela cai.', 'Varr wrenches his sword free, raises it over his head and brings it down with all the rage he has, top to bottom. This time, she falls.'), // N
        T('O Varr ergue a espada e grita o próprio nome para um lado do vale, depois para o outro.', 'Varr raises his sword and shouts his own name to one side of the valley, then to the other.'), // N
      ] },

    { id: 'f06', zona: 'duelo', fundo: { img: IMG('f-kronk'), kb: 'in', foco: '52% 40%', dim: .45 }, sons: [{ s: SFX('passos-pesados'), p: 0, v: .9 }, { fx: 'tremor', p: 3, dur: 500, forca: .4 }, { s: SFX('espada-desembainha'), p: 5, v: .9 }],
      texto: [
        T('Não vejo mais a conjuradora. Vejo o grande vindo na minha direção, e os meus homens saindo do caminho dele, porque quem não sai cai. E porque eles sabem que eu quero ele.', 'I can’t see the conjurer any more. I see the big one coming my way, and my men getting out of his path, because whoever doesn’t, falls. And because they know I want him.'), // N
        T('Desço do cinzento e dou um tapa na anca dele. Ele corre para trás da duna. A pé eu leio melhor.', 'I get down from the grey and slap his haunch. He runs for the back of the dune. On foot I read better.'), // N
        T('O Grakh é mais alto que qualquer Grakh que eu matei em vinte anos. A pele cinza, os dentes de baixo para fora da boca, um dente de bicho pendurado numa corda no pescoço. Nos olhos dele, reconheço o que sinto por dentro: vontade de matar.', 'He is taller than any Grakh I have killed in twenty years. Grey skin, lower teeth jutting out of his mouth, an animal’s tooth hanging from a cord at his neck. In his eyes I recognise what I feel inside: the will to kill.'), // N
        T('Ele para a dez passos e olha para mim.', 'He stops ten paces away and looks at me.'), // N
        (st) => (anselVivo(st) ? T('É o grande do Ansel. Não preciso perguntar.', 'It’s Ansel’s big one. I don’t need to ask.') : T('É ele. Não preciso perguntar.', 'It’s him. I don’t need to ask.')), // N
        (st) => (st.escolhas.espada === 'levar' ? T('Desembainho a espada do Simon.', 'I draw Simon’s sword.') : T('Desembainho a espada.', 'I draw my sword.')), // N
      ],
      minijogo: 'duelo',
      sonsDepois: [{ s: SFX('corpo-cai'), p: 0, v: 1 }, { fx: 'tremor', p: 0, dur: 900, forca: 1.2 }, { fx: 'sangue', p: 3, dur: 3000 }, { voz: 'L19', p: 4 }],
      depois: [
        T('Ele finalmente cai de joelhos. Depois, de lado. A maça escorrega da mão.', 'He finally falls to his knees. Then onto his side. The mace slides out of his hand.'), // N
        T('Atrás da coxa, o corte que eu abri despeja sangue na areia.', 'Behind his thigh, the cut I opened pours blood into the sand.'), // N
        T('Ele vira a cabeça para trás, para os acampamentos do Pira, e fica virado para lá. Não sei para quem.', 'He turns his head back toward the Pyre’s camps and keeps it turned that way. I don’t know who he’s looking for.'), // N
        T('No meu braço, o sangue desce até a mão. É meu. Faz vinte anos que eu não vejo o meu. Sinto mais sangue escorrendo por dentro da armadura, das placas que a maça amassou.', 'On my arm, blood runs down to my hand. It’s mine. It has been twenty years since I saw my own. I feel more blood running inside my armour, under the plates the mace dented.'), // N
        T('Odeio mentir, mais ainda para mim mesma: quase fui derrotada. Mas venci.', 'I hate lying, to myself most of all: I was nearly beaten. But I won.'), // N
        T('É um alívio que eu não sentia desde o combate contra o Joseph, no Torneio Real.', 'It is a relief I haven’t felt since my fight against Joseph, at the Royal Tournament.'), // N
      ] },

    { id: 'f07', zona: 'duelo', fundo: { img: IMG('f-eclipse'), kb: 'in', foco: '50% 40%', dim: .45 }, sons: [{ voz: 'L20', p: 1 }],
      texto: [
        T('Paro em cima dele. Ele respira de boca aberta, com os dentes para fora.', 'I stand over him. He breathes through his open mouth, teeth bared.'), // N
        T('Foi um excelente adversário. Mas agora os Grakh acabam. Mais ninguém da minha família, mais ninguém de Redom, morre na mão desses selvagens, na areia deste deserto.', 'He was an excellent opponent. But now the Grakh end. No one else of my family, no one else of Redom, dies at the hands of these savages, in the sand of this desert.'), // N
        T('Ergo a espada, ainda olhando para ele.', 'I raise the sword, still looking at him.'), // N
      ],
      minijogo: 'erguer',
      sonsDepois: [{ fx: 'eclipse', p: 0 }, { s: SFX('eclipse-total'), p: 0, v: .9 }, { s: SFX('gritos-redom'), p: 3, v: .8 }],
      depois: [
        T('O chão escurece, como se um dragão passasse por cima de nós, mas a sombra não passa.', 'The ground darkens, as if a dragon were passing over us, but the shadow doesn’t pass.'), // N
        T('Olho para cima. Um pedaço preto entra pela borda do sol e vai fechando, e a luz fica rala. Eclipse.', 'I look up. A black piece comes in at the sun’s edge and keeps closing, and the light thins. An eclipse.'), // N
        T('Atrás de mim, Redom grita:', 'Behind me, Redom cries out:'), // N
        T('— Eclipse! Eclipse!', '— Eclipse! Eclipse!'), // N
      ] },

    { id: 'f07b', zona: 'eclipse', escuro: true, sons: [{ s: SFX('linha-fecha'), em: ['A linha fecha', 'The line closes'], v: .85 }], fundo: { img: IMG('f-eclipse-luta'), kb: 'in', foco: '50% 40%', dim: .55 },
      texto: [
        T('Me viro para eles com a espada no alto.', 'I turn toward them with my sword held high.'), // N
        { continuar: true, voz: 'L04', fx: [{ fx: 'clarao', ms: 200, dur: 500 }] },
        T('— Firmes! É só o escuro! Segurem a linha!', '— Steady! It’s only the dark! Hold the line!'), // N
        T('As palavras são do meu pai. A linha fecha.', 'The words are my father’s. The line closes.'), // N
        T('Quando me viro de volta, o caído não está mais sozinho.', 'When I turn back, the fallen one is no longer alone.'), // N
      ] },

    // o Maior: o terceiro disparo
    { id: 'f08', zona: 'eclipse', escuro: true, fundo: { img: IMG('f-maior'), video: 'assets/video/f-maior.mp4', som: true, kb: 'in', foco: '55% 40%', dim: .5 }, pico: { bpm: 166, ms: 0 },
      sons: [{ fx: 'tremor', p: 0, dur: 1600, forca: 1.3 }],
      texto: [
        T('Em pé, entre mim e o Grakh caído, no escuro do dia que virou noite, tem um Grakh que eu nunca vi. Uma aberração.', 'Standing between me and the fallen Grakh, in the dark of the day turned to night, is a Grakh I have never seen. An abomination.'), // N
        T('É maior que o outro. Muito maior. Maior que qualquer um. Um braço é mais grosso que o outro, e o osso do ombro ainda está subindo embaixo da pele, uma pele cinza, rachada, com músculos onde nenhum Grakh tem músculo.', 'He is bigger than the other. Much bigger. Bigger than any. One arm is thicker than the other, and the bone of the shoulder is still rising under the skin, grey skin, cracked, with muscle where no Grakh has muscle.'), // N
        T('Uma flecha da Terceira entra no peito dele. Ele nem parece notar. Os olhos dele estão em mim.', 'An arrow from the Third goes into his chest. He doesn’t even seem to notice. He looks at me.'), // N
        T('Ele ri.', 'He laughs.'), // N
        { continuar: true, voz: 'L05', s: SFX('coracao-rapido'), v: .9 },
        T('A espada pesa. Aos dezesseis, pesava assim.', 'The sword is heavy. At sixteen, it was this heavy.'), // N
        T('O pulso bate no pescoço. Bate na garganta. Bate nos dentes.', 'My pulse beats in my neck. It beats in my throat. It beats in my teeth.'), // N
        T('Os Grakh param de lutar. Olham para ele, batem no peito e gritam uma palavra que eu conheço dos prisioneiros: o Maior.', 'The Grakh stop fighting. They look at him, beat their chests and shout a word I know from prisoners: the Biggest.'), // N
      ] },

    { id: 'f09', zona: 'eclipse', escuro: true, fundo: { img: IMG('f-maior'), video: 'assets/video/f-maior.mp4', kb: 'in', foco: '55% 40%', dim: .55 }, sons: [{ voz: 'L18', p: 1 }],
      texto: [
        (st) => (rotaA(st) ? T('Na crista, os arcos ainda são muitos.', 'On the crest, there are still many bows.') : T('Na crista, sobraram poucos arcos.', 'On the crest, few bows are left.')), // N
        T('— Arqueiros! Comigo!', '— Archers! On me!'), // N
        T('Ele vem.', 'He comes.'), // N
      ],
      minijogo: 'maior',
      sonsDepois: [{ s: SFX('virotes'), p: 1, v: 1 }, { fx: 'tremor', p: 2, dur: 1200, forca: 1 }, { s: SFX('luz-apaga'), p: 4, v: .9 }, { fx: 'sol', p: 6, dur: 3600 }, { s: SFX('sol-volta'), p: 6, v: .8 }],
      depois: [
        se((st) => josephVeio(st), T('Na última troca, Joseph passa por mim a cavalo, com a esquerda na rédea e a espada na direita, e abre uma linha entre o Maior e os arqueiros. A linha dura o que precisa. Joseph, não: o Maior fecha a mão nele, uma mão que é garra, e parte Joseph ao meio, junto com o cavalo.', 'In the last exchange, Joseph rides past me, left hand on the rein and sword in the right, and opens a line between the Biggest and the archers. The line lasts as long as it needs to. Joseph doesn’t: the Biggest closes his hand on him, a hand that is a claw, and tears Joseph in two, horse and all.')), // N
        T('Os homens continuam atirando. Na última rajada, ele cai de joelhos. Tem mais flecha que pele, centenas de hastes enfiadas no corpo, e ele ainda ri, e tenta levantar. Essa cena eu não esqueço.', 'The men keep shooting. At the last volley, he falls to his knees. There is more arrow than skin on him, hundreds of shafts driven into his body, and he is still laughing, and trying to get up. That sight I will never forget.'), // N
        T('Então o riso para. O corpo vai caindo aos poucos, como se ainda estivesse decidindo se cede.', 'Then the laughter stops. The body goes down little by little, as if it were still deciding whether to give.'), // N
        T('Chego perto para ter certeza de que não respira. Lá dentro dele, uma luz fraca brilha de dentro para fora, e a carne vai se desfazendo em volta dela, devagar, quase sem dar para ver.', 'I go close to make sure he isn’t breathing. Inside him, a faint light shines from within, outward, and the flesh comes apart around it, slowly, almost too slowly to see.'), // N
        T('Essa besta não era do nosso mundo.', 'That beast was not of our world.'), // N
        T('O sol volta pela borda.', 'The sun comes back at the edge.'), // N
      ] },

    // depois: o vale. Ninguém fugiu, de lado nenhum.
    { id: 'f10', vozes: [{ voz: 'L31', em: ['Derrubei o líder deles', 'I brought down their leader'] }], zona: 'depois', fundo: { img: IMG('f-depois'), kb: 'out', foco: '50% 50%', dim: .45, clima: 'poeira' }, sons: [{ s: SFX('bronze-arrasta'), p: 0, v: .8 }, { s: SFX('martelo-pedra'), p: 1, v: .8 }, { s: SFX('vento-campo'), p: 2, v: .6 }],
      texto: [
        T('Com o sol, o vale aparece.', 'With the sun, the valley appears.'), // N
        T('O último homem de bronze ainda anda, com uma perna só, se arrastando pelo braço que sobrou, no mesmo compasso. Três da Terceira desmontam ele no chão, a martelo. Depois disso, o compasso para.', 'The last man of bronze is still walking, on one leg, dragging itself by the arm it has left, in the same beat. Three men of the Third take it apart on the ground, with hammers. After that, the beat stops.'), // N
        T('Nenhum deles recuou. Nenhum Grakh, também.', 'Not one of them fell back. Not one Grakh, either.'), // N
        T('Bronze espatifado de uma ponta à outra do vale, e entre o bronze, os nossos e os deles, uns por cima dos outros. Quase dois mil dos nossos.', 'Shattered bronze from one end of the valley to the other, and among the bronze, ours and theirs, one on top of the other. Nearly two thousand of ours.'), // N
        (st) => (rotaA(st) ? T('Perto da crista, na lama, o corpo dela ainda está lá, com a cabeça aberta. Por dentro brilha a mesma luz fraca do Maior, e a carne vai se desfazendo em volta, como cinza que o vento leva aos poucos.', 'Near the crest, in the mud, her body is still there, its head split open. Inside it shines the same faint light as the Biggest, and the flesh comes apart around it, like ash the wind carries off a little at a time.')
          : T('No fundo do poço seco, o corpo dela ainda está lá, com a cabeça aberta. Por dentro brilha a mesma luz fraca do Maior, e a carne vai se desfazendo em volta, como cinza que o vento leva aos poucos.', 'At the bottom of the dry well, her body is still there, its head split open. Inside it shines the same faint light as the Biggest, and the flesh comes apart around it, like ash the wind carries off a little at a time.')), // N
        T('Vou até onde o grande caiu. Está deitado do mesmo jeito, virado para os acampamentos, no meio de uma poça que já não aumenta. Ninguém perde tanto sangue e levanta.', 'I go to where the big one fell. He is lying the same way, turned toward the camps, in the middle of a pool that has stopped spreading. Nobody loses that much blood and gets up.'), // N
        T('Derrubei o líder deles. Ou derrubei um grande, e o grande era o outro.', 'I brought down their leader. Or I brought down a big one, and the big one was the other.'), // N
        T('No chão, o meu sangue e o dele secam juntos.', 'On the ground, my blood and his are drying together.'), // N
      ] },

    { id: 'f11', zona: 'depois', fundo: { img: IMG('f-conta'), kb: 'in', foco: '55% 40%', dim: .5 },
      texto: [
        T('Os que conseguem levantar, levantam. Ando entre eles e encosto a mão em cada um.', 'Those who can get up, get up. I walk among them and put my hand on each one.'), // N
      ],
      minijogo: 'conta',
      depois: (st) => {
        const n = sobreviventes(st), pt = extenso(n, 'pt'), en = extenso(n, 'en');
        return [T(cap1(pt) + '. De dois mil.', cap1(en) + '. Out of two thousand.'),
          T('O Varr, com a cabeça enfaixada num pedaço da própria capa, conta a morte da bruxa a quem quiser ouvir. Quando acaba, começa outra vez. Ninguém ri.', 'Varr, his head bound in a strip of his own cloak, tells the death of the witch to anyone who will listen. When he finishes, he starts again. Nobody laughs.')]; // N
      } },

    { id: 'f12', zona: 'goelas', fundo: { img: IMG('f-recuo'), kb: 'out', foco: '50% 50%', dim: .5 },
      texto: [
        T('Voltamos para as Goelas a pé. Os cavalos que sobraram carregam os que não andam. Do caminho, só lembro do sol e da areia.', 'We go back to the Gullets on foot. The horses that are left carry those who can’t walk. Of the way, I only remember the sun and the sand.'), // N
      ] },

    { id: 'f13', zona: 'goelas', fundo: (st) => (josephVeio(st) ? FD('f13-posto', '75% 45%') : FD('f13-joseph', '50% 45%')), fim: true,
      texto: [
        (st) => (josephVeio(st) ? T('Na porta da cerca, os trinta e um do posto esperam os que voltam.', 'At the fence gate, the thirty-one of the post wait for those who come back.')
          : T('Joseph está na porta da cerca, com as duas mãos no cinto. Olha cada um que entra. Quando passa o último, ele continua esperando mais um, que não vem.', 'Joseph is at the fence gate, both hands on his belt. He looks at each man who comes in. When the last one has passed, he keeps waiting for one more, who doesn’t come.')), // N
        (st) => (josephVeio(st) ? T('Alguém põe uma tigela na minha mão. Está cheia.', 'Someone puts a bowl in my hand. It’s full.')
          : T('Ele vem até mim e põe uma tigela na minha mão, sem dizer nada. Está cheia.', 'He comes to me and puts a bowl in my hand without a word. It’s full.')), // N
        { continuar: true, voz: 'L06' },
        T('Seguro a tigela. Na Capital, minha mãe vai contar vinte e uma.', 'I hold the bowl. In the Capital, my mother will count twenty-one.'), // N
      ] },

  ],

  // ---------------------------------------------------------------- o que este capítulo deixa para os próximos (IX e XI)
  estadoFinal: (st) => ({
    dolores: st.escolhas.dolores || null, prece: prece(st), espada: st.escolhas.espada || null, lavadeira: st.escolhas.lavadeira8 || null,
    noites: (st.noites || []).slice(), leituras: Object.assign({}, st.leituras), lidos: Array.from(new Set(todosLidos(st))), laje: !!(st.sala && st.sala.cisterna), vinho: st.escolhas.ordem === 'ordem' ? 'derramou' : st.escolhas.vinho || null, promessaMae: st.escolhas.promessaMae || null, justine: st.escolhas.sossegar === 'prometo' ? 'prometeu' : (st.escolhas.justine ? 'brigou' : null), varr8: st.escolhas.varr8 || null, pai: st.escolhas.pai || null,
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
    notas.push({ volto: L('Laura prometeu à mãe que voltava. Volta.', 'Laura promised her mother she would come back. She does.'), simon: L('Laura disse à mãe que ia pelo Simon.', 'Laura told her mother she was going for Simon.'), torneio: L('Laura disse à mãe que não se arrepende do Torneio.', 'Laura told her mother she does not regret the Tournament.') }[st.escolhas.dolores] || '');
    notas.push({ comer: L('Laura prometeu à mãe que ia comer. Na estrada, comeu.', 'Laura promised her mother she would eat. On the road, she did.'), rezar: L('Laura prometeu à mãe que ia rezar por ela.', 'Laura promised her mother she would pray for her.') }[st.escolhas.promessaMae] || '');
    notas.push({ mae: L('No templo, Laura pediu força para a mãe. Uma vela subiu mais alta.', 'In the temple, Laura asked strength for her mother. One candle burned higher.'), grakh: L('No templo, Laura pediu o Grakh das Goelas. Nada se mexeu.', 'In the temple, Laura asked for the Grakh of the Gullets. Nothing moved.'), perdao: L('No templo, Laura pediu perdão. O ombro pesou.', 'In the temple, Laura asked forgiveness. Her shoulder grew heavy.') }[prece(st)] || '');
    if (comJustine()) notas.push(st.escolhas.sossegar === 'prometo' ? L('Laura prometeu à Justine que, na volta, ia sossegar.', 'Laura promised Justine that, once back, she would settle down.') : L('Justine saiu da capela sem olhar para trás.', 'Justine walked out of the chapel without looking back.'));
    if (st.sala && st.sala.cisterna) notas.push(L('Laura achou a laje solta no quarto da Nymae e mandou Markus seguir a água.', 'Laura found the loose flagstone in the Nymae’s room and sent Markus to follow the water.'));
    if (st.escolhas.ordem === 'ordem') notas.push(L('Joseph derramou o vinho na areia por ordem da Lâmina.', 'Joseph poured his wine into the sand on the Blade’s orders.'));
    else if (st.escolhas.vinho === 'prometer') notas.push(L('Laura prometeu beber com Joseph na volta do deserto.', 'Laura promised to drink with Joseph when they came back from the desert.'));
    if (st.escolhas.espada === 'deixar') notas.push(L('A espada do irmão ficou com Markus, perto da porta.', 'Her brother’s sword stayed with Markus, near the door.'));
    if (st.escolhas.espada === 'levar') notas.push(L('A espada reforjada do Simon abriu a coxa do Grakh da maça.', 'Simon’s reforged sword opened the thigh of the Grakh with the mace.'));
    if (st.escolhas.pai === 'visitar') notas.push(L('Laura desceu até o túmulo do pai e contou a ele onde o Simon está.', 'Laura went down to her father’s grave and told him where Simon lies.'));
    if (st.escolhas.lavadeira8 === 'devolver') notas.push(L('A Nymae voltou para a Capital na carroça do correio.', 'The Nymae went back to the Capital on the post wagon.'));
    if (st.f.ladraoMorto) notas.push(L('Tasso morreu pela Lei da Lâmina. Vendia a água dos outros.', 'Tasso died by the Law of the Blade. He was selling other men’s water.'));
    (st.inocentes || []).forEach((id) => notas.push(L(`${nome(id)} morreu pela Lei da Lâmina, e não tinha tirado água de ninguém.`, `${nome(id)} died by the Law of the Blade, and had taken no one’s water.`)));
    if (fugiu(st)) notas.push(L('A Nymae saiu de uma corrente deixando a roupa, e voltou de dentro de um poço seco.', 'The Nymae slipped a chain and left the clothes behind, and came back up out of a dry well.'));
    else notas.push({ certo: L('Laura apontou a Nymae na fila, e o rosto escorregou diante da coluna.', 'Laura pointed out the Nymae in the line, and the face slipped in front of the column.'), errado: L('Laura apontou a pessoa errada na fila.', 'Laura pointed at the wrong person in the line.'), ninguem: L('Laura mandou a carga sem apontar ninguém.', 'Laura sent the charge in without pointing at anyone.') }[st.f.desmascarou] || '');
    if (anselVivo(st)) notas.push(L('Ansel deixou um pão no túmulo do comandante.', 'Ansel left a piece of bread on the commander’s grave.'));
    notas.push(josephVeio(st) ? L('Joseph abriu uma linha diante do Maior. A linha durou o que precisava.', 'Joseph opened a line in front of the Biggest. The line lasted as long as it needed to.') : L('Joseph ficou com o posto das Goelas e contou os que voltaram.', 'Joseph kept the Gullets post and counted those who came back.'));
    notas.push({ oeste: L('A vigia dobrada do poente viu o bronze chegar.', 'The doubled western watch saw the bronze coming.'), batedores: L('Os dois batedores mandados ao poente não voltaram.', 'The two scouts sent west never came back.'), vento: L('Laura achou que era o vento.', 'Laura thought it was the wind.') }[st.escolhas.vigia] || '');
    notas.push(L('O Grakh da maça fez a Lâmina sangrar pela primeira vez em vinte anos.', 'The Grakh with the mace made the Blade bleed for the first time in twenty years.'));
    notas.push(L('Varr matou a Nymae e gritou o próprio nome. Vai querer uma canção.', 'Varr killed the Nymae and shouted his own name. He will want a song.'));
    const dz = (st.maior && st.maior.deslizes) || 0;
    if (dz) notas.push(dz === 1 ? L('Diante do Maior, a voz da Lâmina tremeu uma vez.', 'Before the Biggest, the Blade’s voice shook once.') : L(`Diante do Maior, a voz da Lâmina tremeu ${extenso(dz, 'pt')} vezes.`, `Before the Biggest, the Blade’s voice shook ${extenso(dz, 'en')} times.`));
    const linhas = [
      { id: 'dolores', opcao: st.escolhas.dolores, q: L('A mãe', 'Her mother'), a: { volto: L('“Eu volto.”', '“I’ll come back.”'), simon: L('“Pelo Simon.”', '“For Simon.”'), torneio: L('“O Torneio.”', '“The Tournament.”') }[st.escolhas.dolores] || '—' },
      { id: 'prece', opcao: prece(st), q: L('O que pediu ao Cavaleiro', 'What she asked the Knight for'), a: { mae: L('Força para a mãe', 'Strength for her mother'), grakh: L('O Grakh das Goelas', 'The Grakh of the Gullets'), perdao: L('Perdão', 'Forgiveness') }[prece(st)] || '—' },
      { id: 'espada', opcao: st.escolhas.espada, q: L('A espada do irmão', 'Her brother’s sword'), a: { levar: L('Levou', 'Took it'), deixar: L('Deixou com Markus', 'Left it with Markus') }[st.escolhas.espada] || '—' },
      { id: 'joseph', opcao: st.escolhas.joseph, q: 'Joseph', a: { ficar: L('Ficou nas Goelas', 'Stayed at the Gullets'), ir: L('Seguiu com a coluna', 'Went on with the column') }[st.escolhas.joseph] || '—' },
      { id: 'vigia', opcao: st.escolhas.vigia, q: L('O chão, de noite', 'The ground, at night'), a: { oeste: L('Dobrou a vigia', 'Doubled the watch'), batedores: L('Mandou batedores', 'Sent scouts'), vento: L('Era o vento', 'It was the wind') }[st.escolhas.vigia] || '—' },
    ];
    if (!fugiu(st)) linhas.push({ id: 'desmascarar', opcao: st.escolhas.desmascarar, q: L('A fila', 'The line'), a: st.f.desmascarou === 'ninguem' ? L('Não apontou ninguém', 'Pointed at no one') : st.escolhas.desmascarar ? (st.f.desmascarou === 'certo' ? L('Apontou a Nymae', 'Pointed out the Nymae') : L('Apontou a pessoa errada', 'Pointed at the wrong person')) : '—' });
    return { frase, revela, notas: notas.filter(Boolean), linhas };
  },
};

// ================================================================== as noites da caça
// quem vem para a frente da Laura em cada noite, e como ela apresenta cada um (ela pergunta o nome: servo não se conta)
const APRESENTA = {
  wil: [T('Wil, o moço da estrebaria, que dorme no feno', 'Wil, the stable boy, who sleeps in the hay')],
  nell: [T('Nell, que serve a panela da cozinha', 'Nell, who serves from the kitchen pot')],
  ilse: [T('Ilse, a ajudante do curandeiro, que passou a noite com os feridos', 'Ilse, the healer’s helper, who spent the night with the wounded')],
  bram: [T('Bram, o ajudante do ferreiro, que dorme do lado do fole', 'Bram, the smith’s boy, who sleeps beside the bellows')],
  tasso: [T('Tasso, um soldado da Terceira que estava de guarda ali perto', 'Tasso, a soldier of the Third who was on guard nearby')],
  ansel: [T('Ansel, o sentinela, que fazia a ronda daquele lado', 'Ansel, the sentry, who was walking the rounds on that side')],
  lavadeira: [T('a Nymae aguadeira, que enche os barris toda noite', 'the Nymae water-carrier, who fills the barrels every night')],
};
const listaPT = (xs) => (xs.length < 2 ? xs.join('') : xs.slice(0, -1).join('; ') + (xs.length > 2 ? '; e ' : ', e ') + xs[xs.length - 1]);
const listaEN = (xs) => (xs.length < 2 ? xs.join('') : xs.slice(0, -1).join('; ') + (xs.length > 2 ? '; and ' : ', and ') + xs[xs.length - 1]);
const nomeCom = (id) => (id === 'lavadeira' ? T('a Nymae', 'the Nymae') : nomeDe(id));
const enDe = (s) => window.LIVRO_EN[s] || s;
const lidosNaNoite = (st, k) => ((st.lidoNoite || [])[k] || []);
const todosLidos = (st) => [].concat(...(st.lidoNoite || []).map((x) => x || []));

function noite(k) {
  const lug = (st) => LUGARES[lugarDaNoite(st, k)];
  const EVT = {
    estrebaria: [T('De manhã, os cochos da cavalaria estão secos, e o feno embaixo deles, molhado. Dois cavalos deitados não levantam mais.', 'In the morning, the cavalry troughs are dry, and the hay beneath them is wet. Two horses lying down don’t get up again.'),
      T('O intendente confere os barris da estrebaria. Falta a água de um dia.', 'The quartermaster checks the stable barrels. A day’s water is missing.')],
    cozinha: [T('De manhã, o barril do meio da cozinha tem gosto de mar. Meio acampamento bebe dele antes do primeiro cuspir.', 'In the morning, the middle barrel in the kitchen tastes of the sea. Half the camp drinks from it before the first man spits.'),
      (st) => (st.escolhas.ordem === 'ordem'
        ? T('Joseph, sem vinho desde a primeira noite, bebeu antes de todos. Passa a manhã de joelhos atrás de uma carroça, e à tarde monta com as mãos tremendo.', 'Joseph, without wine since the first night, drank before anyone. He spends the morning on his knees behind a wagon, and in the afternoon he rides with his hands shaking.')
        : T('Joseph bebeu antes de todos. Passa a manhã de joelhos atrás de uma carroça, e à tarde monta com as mãos tremendo.', 'Joseph drank before anyone. He spends the morning on his knees behind a wagon, and in the afternoon he rides with his hands shaking.'))],
    feridos: [T('De manhã, os odres da tenda dos feridos estão murchos. Viro um. Seco por dentro, e nenhum furo na costura.', 'In the morning, the waterskins in the wounded tent hang limp. I turn one over. Dry inside, and not a hole in the seam.'),
      T('Um soldado da febre morre antes do meio-dia, a vinte passos da minha tenda, pedindo água.', 'A soldier with fever dies before noon, twenty paces from my tent, asking for water.')],
    forja: [T('De manhã, as tinas da forja estão vazias. O ferreiro mergulha uma ponta de lança em brasa no fundo seco, e ela sai mole.', 'In the morning, the forge tubs are empty. The smith plunges a red-hot spearhead into the dry bottom, and it comes out soft.'),
      T('Sem têmpera, a ponta que quebrar daqui até as Goelas fica quebrada.', 'Without quenching, any point that breaks between here and the Gullets stays broken.')],
  };
  const PERGUNTA = {
    estrebaria: T('— Quem esvaziou os cochos?', '— Who emptied the troughs?'),
    cozinha: T('— Como a água do barril ficou salgada?', '— How did the barrel water turn salty?'),
    feridos: T('— Quem secou os odres dos feridos?', '— Who dried out the wounded men’s skins?'),
    forja: T('— Quem esvaziou as tinas?', '— Who emptied the tubs?'),
  };
  const ESCONDE = { estrebaria: T('enfiado no feno', 'stuffed into the hay'), cozinha: T('entre os sacos de sal', 'among the salt sacks'), feridos: T('embaixo das lonas da tenda', 'under the tent canvas'), forja: T('atrás do fole da forja', 'behind the forge bellows') };
  const FAZ = { estrebaria: T('puxando um cavalo', 'leading a horse'), cozinha: T('mexendo a panela', 'stirring the pot'), feridos: T('levando um balde para a tenda', 'carrying a bucket to the tent'), forja: T('soprando o fole', 'working the bellows') };
  return {
    id: 'c' + k, se: (st) => !(fugiu(st) && st.f.fugiuNoite < k), zona: 'deserto-noite',
    vozes: [{ voz: 'L39', em: ['Hoje, pergunto', 'Today, I ask'] }, { voz: 'L40a', em: ['Quem esvaziou os cochos', 'Who emptied the troughs'] }, { voz: 'L40b', em: ['Como a água do barril ficou salgada', 'How did the barrel water turn salty'] }, { voz: 'L40c', em: ['Quem secou os odres dos feridos', 'Who dried out the wounded'] }, { voz: 'L40d', em: ['Quem esvaziou as tinas', 'Who emptied the tubs'] }],
    fundo: (st) => ({ img: IMG(lug(st).img), kb: 'in', foco: '50% 50%', dim: .5 }),
    texto: (st) => {
      const l = lugarDaNoite(st, k), r = [];
      if (k === 0) r.push(T('Na primeira noite de areia, alguém mexe na nossa água.', 'On the first night in the sand, someone gets into our water.'));
      else if (String(st.escolhas['noite' + (k - 1)] || '').indexOf('x-') === 0) r.push(T('Na noite seguinte, a água some outra vez.', 'The next night, the water goes again.'));
      else r.push(k === 1 ? T('Na segunda noite, a água some outra vez.', 'On the second night, the water goes again.') : T('Na terceira noite, outra vez.', 'On the third night, again.'));
      if (k > 0 && (st.inocentes || []).length) r.push(T('Os fogos perto do meu ficam calados. Os homens comem de costas para a minha tenda.', 'The fires near mine have gone quiet. The men eat with their backs to my tent.'));
      if (l === 'feridos' && alarme() >= 2) r.push(T('Dois guardas passaram a noite na porta dos feridos, como eu mando desde a Capital.', 'Two guards spent the night at the wounded men’s door, as I have ordered since the Capital.'));
      EVT[l].forEach((x) => r.push(typeof x === 'function' ? x(st) : x));
      if (matouORosto() && l === lugarVerdadeiro()) {
        const n = nomeDe(LUGARES[l].quem);
        r.push(T('Na hora da ração, um soldado acha um corpo ' + ESCONDE[l] + ', enrolado num manto. Faz dias que morreu.', 'At ration time, a soldier finds a body ' + enDe(ESCONDE[l]) + ', wrapped in a cloak. It has been dead for days.'),
          T('Tem o rosto de um servo da coluna. O mesmo servo está vivo a dez passos, ' + FAZ[l] + '.', 'It has the face of one of the column’s servants. The same servant is alive ten paces away, ' + enDe(FAZ[l]) + '.'),
          T('Olho de um para o outro. É o mesmo rosto.', 'I look from one to the other. It is the same face.'));
      }
      if (k === 1 && intendenteViu()) r.push(T('Antes da ração, o intendente me procura sozinho.', 'Before the ration, the quartermaster comes to find me alone.'),
        T('— Na revista da Capital, Lâmina, um servo tinha a pele áspera embaixo do queixo. Passei a mão para ver se era sarna. Não era. Não lembro qual servo.', '— At the inspection in the Capital, Blade, one of the servants had rough skin under the jaw. I ran my hand over it to see if it was mange. It wasn’t. I don’t remember which servant.'));
      if (k === 0) r.push(T('No deserto, água vale mais que ouro. Isso não é descuido.', 'In the desert, water is worth more than gold. This is no accident.'));
      if (k === 1) {
        r.push(T('Alguém tira a nossa água de propósito, uma noite por vez.', 'Someone is taking our water on purpose, one night at a time.'));
        const ela = sabeNome() ? ['a Madrinha', 'the Godmother'] : ['a Nymae', 'the Nymae'];
        if (confessou()) r.push(T('Na cela, ' + ela[0] + ' me disse que foi ela que levantou o mar contra a Sentença.', 'In the cell, ' + ela[1] + ' told me it was she who raised the sea against the Sentence.'));
        else if (semente()) r.push(T('Atrás das grades, ' + ela[0] + ' me falou do deserto sem eu perguntar.', 'Behind the bars, ' + ela[1] + ' spoke to me of the desert without my asking.'));
        r.push(T('E faz nove dias que ela sumiu na estrada da costa. Penso nisso, e o coração bate mais forte. Tenho areia nos dentes.', 'And it is nine days since she vanished on the coast road. I think of it, and my heart beats harder. There is sand in my teeth.'));
      }
      if (k === 2) {
        r.push(T('Três noites, três lugares. Um ladrão de água deixa rastro molhado. Este não deixa rastro.', 'Three nights, three places. A water thief leaves a wet trail. This one leaves none.'));
        if ((st.noites || []).slice(0, 3).includes('feridos')) r.push(T('E um odre bebido fica úmido por dentro. Aquele estava seco.', 'And a skin someone has drunk from stays damp inside. That one was dry.'));
        if (sabeNome()) r.push(T('Na cela, ela me disse que na Orla a chamam de Madrinha. Achei que era conversa para marinheiro.', 'In the cell, she told me that on the Shore they call her the Godmother. I took it for sailors’ talk.'));
        r.push(T('No livro de lendas da biblioteca, a Madrinha da Orla nunca tem o mesmo rosto duas vezes. Li aos catorze anos. Na página seguinte vinha o dragão do norte.', 'In the book of legends in the library, the Godmother of the Shore never wears the same face twice. I read it at fourteen. The next page was the dragon of the north.'));
      }
      r.push(T('Mando trazer todos os que dormiram perto d' + lug(st).nome + '.', 'I have everyone who slept near ' + enDe(lug(st).nome) + ' brought to me.'));
      if (k === 0) r.push(T('Servo não se conta, e eu nunca soube o nome de nenhum. Hoje, pergunto.', 'Servants aren’t counted, and I have never known any of their names. Today, I ask.'));
      const ids = suspeitosDaNoite(st, k);
      const pt = ids.map((id) => APRESENTA[id][0]), en = pt.map(enDe);
      r.push(T((ids.length > 1 ? 'São ' : 'É ') + listaPT(pt) + '.', (ids.length > 1 ? 'They are ' : 'It is ') + listaEN(en) + '.'));
      r.push(T('Pergunto, dura:', 'I ask, hard:'), PERGUNTA[l]);
      r.push(ids.length > 1 ? T('Eles me olham, indignados, sem resposta.', 'They look at me, indignant, with no answer.') : T('Não vem resposta.', 'No answer comes.'));
      r.push(k === 0 ? T('Eu vou entender o que aconteceu. Olho um de cada vez, de perto.', 'I am going to understand what happened. I look at each of them, up close.') : T('Olho um de cada vez, de perto.', 'I look at each of them, up close.'));
      return r;
    },
    minijogo: 'ler', ler: { k },
    depois: (st) => [k === 1 ? T('Observo um a um e não digo nada. Mando todos de volta para o trabalho.', 'I watch them one by one and say nothing. I send them all back to work.')
      : T('Mando todos de volta para o trabalho.', 'I send them all back to work.')],
  };
}

// o que ficou de cada um que ela olhou, na voz dela
function impressao(st, id) {
  const v = viu(st, id), fortes = v.filter((o) => PISTAS_FORTES.includes(o)).length, n = nomeCom(id), en = enDe(n);
  if (!v.length) return id === 'lavadeira' ? T('Da Nymae, não cheguei a olhar de perto.', 'I never got a close look at the Nymae.') : T('De ' + n + ', não cheguei a olhar de perto.', 'I never got a close look at ' + en + '.');
  if (id === ELA()) return fortes >= 2 ? T('Em ' + n + ', o que eu vi não é de gente.', 'In ' + en + ', what I saw doesn’t belong to a person.')
    : fortes === 1 ? T('Em ' + n + ', uma coisa não bate, e eu não sei dizer o quê.', 'In ' + en + ', something doesn’t fit, and I can’t say what.')
      : T('Em ' + n + ', só vi o cansaço de todo mundo.', 'In ' + en + ', I only saw the same tiredness as everyone.');
  if (id === 'tasso') return v.some((o) => ['orelhas', 'boca', 'maos'].includes(o)) ? T('Tasso mentiu sobre a água, e a boca dele não tem sede.', 'Tasso lied about the water, and his mouth isn’t thirsty.') : T('Em Tasso, só vi suor e medo.', 'In Tasso, I only saw sweat and fear.');
  if (id === 'lavadeira') return T('A Nymae é seca e tem sal na boca, como toda Nymae que já vi.', 'The Nymae is dry and has salt on her mouth, like every Nymae I have ever seen.');
  return T('Em ' + n + ', só vi cansaço e medo de mim.', 'In ' + en + ', I only saw tiredness, and fear of me.');
}

function decide(k) {
  const lugarNome = (st) => LUGARES[lugarDaNoite(st, k)].nome;
  const MORTE = {
    wil: T('Os cavalos de reserva levantam a cabeça quando ele cai.', 'The spare horses lift their heads when he falls.'),
    bram: T('O ferreiro vira de costas e bate no ferro até o meio-dia.', 'The smith turns his back and hammers iron until noon.'),
    ilse: T('Na tenda, os feridos pedem água a outra pessoa.', 'In the tent, the wounded ask someone else for water.'),
    nell: T('Na hora da ração, a fila da panela anda mais calada.', 'At ration time, the line for the pot moves more quietly.'),
    ansel: T('Na mão fechada dele, o guarda acha um pedaço de pão.', 'In his closed hand, the guard finds a piece of bread.'),
    lavadeira: T('Antes, ela olha uma vez para a fila dos servos, e não para mim.', 'Before it, she looks once at the line of servants, and not at me.'),
  };
  return {
    id: 'c' + k + 'd', se: (st) => !(fugiu(st) && st.f.fugiuNoite < k), zona: 'deserto-noite',
    fundo: { img: IMG('c-noite'), kb: 'in', foco: '50% 50%', dim: .55 },
    texto: (st) => [T('A Lei da Lâmina é clara: em campanha, quem rouba água morre diante da coluna.', 'The Law of the Blade is clear: on campaign, whoever steals water dies in front of the column.'),
      ...suspeitosDaNoite(st, k).map((id) => impressao(st, id)),
      T('Não tenho prova. Tenho o que vi.', 'I have no proof. I have what I saw.')],
    escolha: { id: 'noite' + k, pergunta: T('A lei', 'The law'), opcoes: (st) => [
      ...suspeitosDaNoite(st, k).map((q) => ({ id: 'x-' + q,
        aviso: T('A coluna vai lembrar disso.', 'The column will remember that.'),
        txt: () => (q === 'lavadeira' ? T('Mandar executar a Nymae ao amanhecer.', 'Have the Nymae executed at dawn.')
          : T('Mandar executar ' + nomeDe(q) + ', ' + SUSPEITOS[q].papel + ', ao amanhecer.', 'Have ' + nomeDe(q) + ', the ' + enDe(SUSPEITOS[q].papel) + ', executed at dawn.')),
        efeito: (s) => {
          s.mortos = s.mortos || []; s.inocentes = s.inocentes || [];
          if (q === ELA()) { s.f.fugiu = true; s.f.fugiuNoite = k; }
          else if (q === 'tasso') { s.f.ladraoMorto = true; s.mortos.push('tasso'); }
          else { s.mortos.push(q); s.inocentes.push(q); }
        },
        resultado: () => {
          const n = nomeCom(q), en = enDe(n);
          if (q === ELA()) return [T('Até o amanhecer, ' + n + ' fica na carroça dos presos, com corrente no tornozelo e dois guardas.', 'Until dawn, ' + en + ' is kept in the prisoners’ wagon, a chain on the ankle and two guards.'),
            T('Antes do sol, um dos guardas acorda com o cabelo molhado e a corrente vazia. Na carroça sobra a roupa de ' + n + ', com uma crosta de sal nas dobras.', 'Before sunrise, one of the guards wakes with wet hair and an empty chain. In the wagon lie ' + en + '’s clothes, with a crust of salt in the folds.'),
            T('Gente não sai de corrente deixando a roupa.', 'People don’t slip a chain and leave their clothes behind.')];
          if (q === 'tasso') return [T('Tasso morre ao amanhecer. Nas coisas dele acham onze odres com a marca de outras companhias.', 'Tasso dies at dawn. Among his things they find eleven skins marked with other companies’ signs.'),
            T('A Terceira bate os escudos uma vez.', 'The Third strikes its shields once.')];
          return [T(cap1(n) + ' morre ao amanhecer.', cap1(en) + ' dies at dawn.'), MORTE[q]].filter(Boolean);
        } })),
      { id: 'guardar', txt: T('Pôr dois guardas n' + lugarNome(st) + ' e esperar.', 'Put two guards on ' + enDe(lugarNome(st)) + ' and wait.'),
        efeito: (s) => { if (lugarDaNoite(s, k) === lugarVerdadeiro()) s.f.guardouCerto = true; },
        resultado: (s) => (lugarDaNoite(s, k) === lugarVerdadeiro()
          ? [T('Dois guardas da Terceira dormem sentados ao lado d' + lugarNome(s) + '. A água de lá amanhece no lugar.', 'Two guards of the Third sleep sitting up beside ' + enDe(lugarNome(s)) + '. The water there is still in place at dawn.')]
          : [T('Dois guardas da Terceira dormem sentados ao lado d' + lugarNome(s) + '.', 'Two guards of the Third sleep sitting up beside ' + enDe(lugarNome(s)) + '.'),
            T('Perto do fogo, um sargento diz baixo que a Lâmina amoleceu. Deixo que ele pense que eu não ouvi.', 'By the fire, a sergeant says quietly that the Blade has gone soft. I let him think I didn’t hear.')]) },
    ] },
  };
}

// a fila do amanhecer: os quatro rostos possíveis que estão vivos, e os enganos que ela leu
function opcoesFila(st) {
  const m = st.mortos || [], ids = ['wil', 'bram', 'ilse', 'nell'].filter((x) => !m.includes(x));
  todosLidos(st).forEach((q) => { if (q && !ids.includes(q) && !m.includes(q) && (q !== 'lavadeira' || lavNaColuna(st))) ids.push(q); });
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
window.LIVRO_DADOS = { SALA, suspeitosDaNoite, SUSPEITOS, ELA, OLHAR_DELA, OLHAR_ROTULO, RETRATO, sobreviventes, INTENDENTE: T('O intendente', 'The quartermaster') };
