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
    regrasM: [['O turno dele', '↑ Escudo ou ↓ Passo lateral. Ele não avisa duas vezes do mesmo jeito'], ['Seu turno', 'chamar a rajada, ou respirar'], ['O pulso', 'alto, a ordem sai tremida e atrasa'], ['As flechas', 'cada rajada leva o que sobrou dos arqueiros']],
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
  },
  en: {
    tK: 'The Grakh with the mace', sK: 'Read, hold, bring him down', tM: 'The Biggest', sM: 'Stay on your feet. Call the volleys.',
    regrasK: [['Your turn', 'pick a strike and tap when the ring closes on him'], ['His turn', '↑ Shield holds. ↓ Sidestep, at the last instant, carries him past the point'], ['The shoulder draws back', 'the blow comes fast: shield'], ['The mace rises and stays', 'the heavy blow: sidestep when it comes down, not before, not after'], ['Three marks', 'and the exchange starts over']],
    regrasM: [['His turn', '↑ Shield or ↓ Sidestep. He never warns the same way twice'], ['Your turn', 'call the volley, or breathe'], ['Your pulse', 'high, the order comes out shaky and late'], ['The arrows', 'each volley carries what’s left of the archers']],
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
// Laura: poses paradas (provisórias: as do Laus do Cap. IV, até chegarem os sprites da Laura aos 36). ax = o eixo do corpo; base = o pé.
const LA = {
  guarda: { src: S + 'laura/guarda.webp', ax: 181.2, base: 675 }, escudo: { src: S + 'laura/escudo.webp', ax: 275.7, base: 601 },
  lateral: { src: S + 'laura/lateral.webp', ax: 282.6, base: 570 }, golpe: { src: S + 'laura/golpe.webp', ax: 328.1, base: 548 },
  atingido: { src: S + 'laura/atingido.webp', ax: 348.9, base: 592 }, respirar: { src: S + 'laura/respirar.webp', ax: 206.1, base: 634 },
  cansado: { src: S + 'laura/cansado.webp', ax: 259.6, base: 583 }, impacto: { src: S + 'laura/impacto.webp', ax: 174.6, base: 617 },
};
const load = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });

function start(root, opts) {
  const lang = opts.lang === 'en' ? 'en' : 'pt', t = TX[lang], A = opts.A, maior = opts.modo === 'maior';
  return new Promise(async (resolve) => {
    root.innerHTML = `
      <div class="d8">
        <canvas class="d8-cv" width="1280" height="720"></canvas>
        <div class="d8-hud">
          <div class="d8-ele"><b>${maior ? t.tM : t.tK}</b><i class="d8-bar"><em></em></i></div>
          <div class="d8-eu"><span class="d8-bpm"><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8 3 4 6.8 4c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3C21 4 23.1 8 21.6 11.6 19.5 16.4 12 21 12 21z"/></svg><b>52</b></span><span class="d8-marcas">${t.marcas} <i></i><i></i><i></i></span></div>
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
    const kimg = {}; await Promise.all(Object.entries(KR).map(async ([k, a]) => { kimg[k] = await load(a.src); }));
    const limg = {}; await Promise.all(Object.entries(LA).map(async ([k, a]) => { limg[k] = await load(a.src); }));

    // ------------------------------------------------------------ estado
    const R = { leituras: 0, laterais: 0, marcas: 0, recomecos: 0, rodeou: false, golpesRecebidos: 0, deslizes: 0, respostas: 0, quedas: 0, t0: performance.now() };
    let bpm = opts.bpm || 52, base = opts.bpm || 52;
    const HPMAX = maior ? (opts.rajadas || 4) : 120;
    let hp = HPMAX, fase = 1, marcas = 0, hpFase = HPMAX, revelado = null, rodeando = false, ombroUsado = 0, fimPronto = false, acabou = false;
    let poseL = 'guarda', poseLt = 0, kAnim = { nome: 'guarda', f: 0, t: 0 }, ring = null, shake = 0, flash = 0, rajadaFx = 0, escuro = maior ? .45 : 0;
    const janelaK = () => clamp(1.65 - (bpm - 52) / 95, .45, 1.65);

    // ------------------------------------------------------------ som
    const sfx = (n, v = .7, r) => A && A.sfx && A.sfx(n, v, r);
    let batT = 0;
    const batidas = (dt) => { batT -= dt; if (batT <= 0) { batT = 60 / bpm; if (A && A.on && bpm >= 66) A.batida(clamp((bpm - 60) / 100, 0, 1)); } };

    // ------------------------------------------------------------ texto
    const linha = (s, cls = '') => { log.insertAdjacentHTML('beforeend', `<p class="${cls}">${s}</p>`); while (log.children.length > 4) log.firstElementChild.remove(); };
    const popTxt = (s, cls = '') => { pop.innerHTML = `<span class="${cls}">${s}</span>`; pop.classList.remove('on'); void pop.offsetWidth; pop.classList.add('on'); };
    const espera = (ms) => new Promise((r) => setTimeout(r, BOT() ? Math.min(ms, 30) : ms));
    const hud = () => {
      $('.d8-bar em').style.width = (100 * hp / HPMAX) + '%';
      $('.d8-bpm b').textContent = Math.round(bpm);
      root.querySelectorAll('.d8-marcas i').forEach((el, k) => el.classList.toggle('on', k < marcas));
      root.classList.toggle('d8-alto', bpm >= 110);
    };

    // ------------------------------------------------------------ desenho
    const W = 1280, H = 720, CHAO = 588, LX = 450, KX = 840;
    const KH = maior ? 580 : 440, LH = 330;
    const kFrame = (nome, f) => {
      const a = KR[nome], im = kimg[nome]; if (!im) return null;
      const cols = Math.ceil(Math.sqrt(a.frames)), rows = Math.ceil(a.frames / cols), fw = im.width / cols, fh = im.height / rows;
      const k = clamp(Math.floor(f), 0, a.frames - 1);
      return { im, sx: (k % cols) * fw, sy: Math.floor(k / cols) * fh, fw, fh };
    };
    const desenha = () => {
      cx.save(); cx.clearRect(0, 0, W, H);
      if (shake > 0) cx.translate(rnd(-1, 1) * shake * 14, rnd(-1, 1) * shake * 9);
      if (bg) { const s = Math.max(W / bg.width, H / bg.height); cx.drawImage(bg, (W - bg.width * s) / 2, (H - bg.height * s) / 2, bg.width * s, bg.height * s); }
      cx.fillStyle = `rgba(10,6,4,${.25 + escuro})`; cx.fillRect(0, 0, W, H);
      const gr = cx.createLinearGradient(0, CHAO - 80, 0, H); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.55)'); cx.fillStyle = gr; cx.fillRect(0, CHAO - 80, W, H);
      // sombras
      cx.fillStyle = 'rgba(0,0,0,.35)'; cx.beginPath(); cx.ellipse(LX + (poseL === 'lateral' ? -60 : 0), CHAO + 4, 70, 12, 0, 0, 6.283); cx.fill();
      cx.beginPath(); cx.ellipse(KX, CHAO + 6, maior ? 150 : 110, 16, 0, 0, 6.283); cx.fill();
      // o inimigo (virado para a esquerda)
      const fr = kFrame(kAnim.nome, kAnim.f);
      if (fr) {
        const s = KH / fr.fh;
        cx.save(); cx.translate(KX, CHAO); cx.scale(-1, 1);
        if (maior) { cx.filter = 'grayscale(.9) contrast(1.25) brightness(.78)'; cx.transform(1, 0, -.06, 1, 0, 0); }
        else cx.filter = 'saturate(.8)';
        cx.drawImage(fr.im, fr.sx, fr.sy, fr.fw, fr.fh, -fr.fw * s / 2, -fr.fh * s + 6, fr.fw * s, fr.fh * s);
        cx.restore();
      } else { cx.fillStyle = '#4a4540'; cx.fillRect(KX - 70, CHAO - KH * .8, 140, KH * .8); }
      // a Laura
      const L = LA[poseL] || LA.guarda, li = limg[poseL] || limg.guarda;
      if (li) { const s = LH / 640, dx = poseL === 'lateral' ? -60 : 0; cx.drawImage(li, LX + dx - L.ax * s, CHAO - L.base * s, li.width * s, li.height * s); }
      else { cx.fillStyle = '#c9b48a'; cx.fillRect(LX - 30, CHAO - LH, 60, LH); }
      // o anel
      if (ring) {
        const p = clamp((performance.now() - ring.t0) / ring.dur, 0, 1.25), r = ring.r1 + (ring.r0 - ring.r1) * (1 - Math.min(1, p));
        const alvoX = ring.sobre === 'ele' ? KX : LX, alvoY = CHAO - (ring.sobre === 'ele' ? KH * .55 : LH * .55);
        cx.lineWidth = 3; cx.strokeStyle = 'rgba(240,220,190,.55)'; cx.beginPath(); cx.arc(alvoX, alvoY, ring.r1, 0, 6.283); cx.stroke();
        cx.lineWidth = 5; cx.strokeStyle = ring.sobre === 'ele' ? 'rgba(242,220,192,.95)' : 'rgba(200,70,58,.95)'; cx.beginPath(); cx.arc(alvoX, alvoY, Math.max(4, r), 0, 6.283); cx.stroke();
      }
      if (rajadaFx > 0) {
        cx.strokeStyle = `rgba(220,210,190,${rajadaFx * .8})`; cx.lineWidth = 2;
        for (let i = 0; i < 70; i++) { const x = KX - 200 + Math.random() * 400, y = Math.random() * (CHAO - 60); cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + 26, y + 60); cx.stroke(); }
      }
      if (flash > 0) { cx.fillStyle = `rgba(150,10,8,${flash * .45})`; cx.fillRect(0, 0, W, H); }
      cx.restore();
    };
    let last = performance.now();
    const loop = (now) => {
      if (acabou) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const a = KR[kAnim.nome];
      if (kAnim.play) { kAnim.f += dt * (kAnim.fps || a.fps || 26); if (kAnim.ate != null && kAnim.f >= kAnim.ate) { kAnim.f = kAnim.ate; kAnim.play = false; if (kAnim.fim) { const f = kAnim.fim; kAnim.fim = null; f(); } } else if (kAnim.f >= a.frames) { if (a.loop) kAnim.f = 0; else { kAnim.f = a.frames - 1; kAnim.play = false; if (kAnim.fim) { const f = kAnim.fim; kAnim.fim = null; f(); } } } }
      if (poseLt > 0) { poseLt -= dt; if (poseLt <= 0) poseL = bpm >= 120 ? 'cansado' : 'guarda'; }
      shake = Math.max(0, shake - dt * 2.2); flash = Math.max(0, flash - dt * 1.4); rajadaFx = Math.max(0, rajadaFx - dt * .9);
      bpm += (base - bpm) * dt * .04; batidas(dt); hud(); desenha(); requestAnimationFrame(loop);
    };
    const anima = (nome, o = {}) => new Promise((res) => { kAnim = { nome, f: o.de || 0, play: true, ate: o.ate, fps: o.fps, fim: res }; if (!o.ate && KR[nome].loop) res(); });
    const guarda = () => { kAnim = { nome: 'guarda', f: 0, play: true }; };
    const pose = (p, dur = .7) => { poseL = p; poseLt = dur; };

    // ------------------------------------------------------------ entrada: o anel
    // espera um toque (Espaço ou botão). Devolve o erro em segundos (negativo = cedo), ou null se não houve toque.
    let ouvinte = null;
    const anel = (sobre, dur, botoes) => new Promise((res) => {
      ring = { sobre, t0: performance.now(), dur: dur * 1000, r0: 170, r1: 44 };
      menu.innerHTML = botoes.map((b) => `<button class="d8-b ${b.cls || ''}" data-k="${b.k}">${b.rot}</button>`).join('');
      let feito = false;
      const fecha = (k) => { if (feito) return; feito = true; const err = (performance.now() - ring.t0) / 1000 - dur; ring = null; menu.innerHTML = ''; ouvinte = null; res({ k, err }); };
      menu.querySelectorAll('.d8-b').forEach((b) => b.onpointerdown = (e) => { e.preventDefault(); fecha(b.dataset.k); });
      ouvinte = (k) => { if (botoes.some((b) => b.k === k)) fecha(k); };
      setTimeout(() => { if (!feito) { feito = true; ring = null; menu.innerHTML = ''; ouvinte = null; res({ k: null, err: null }); } }, (dur + .45) * 1000);
      if (BOT()) setTimeout(() => fecha(botoes[window.__JOGO_BOT_LADO === 'escudo' ? 0 : botoes.length - 1].k), dur * 1000 * .98);
    });
    const onKey = (e) => {
      if (!ouvinte && !menuOuvinte) return;
      const mapa = { ' ': 'agora', ArrowUp: 'escudo', ArrowDown: 'lateral' };
      if (ouvinte && mapa[e.key]) { e.preventDefault(); ouvinte(mapa[e.key]); return; }
      if (menuOuvinte && /^[1-5]$/.test(e.key)) { e.preventDefault(); menuOuvinte(+e.key - 1); }
    };
    let menuOuvinte = null;
    addEventListener('keydown', onKey);

    // ------------------------------------------------------------ o menu dela
    const escolhe = (ops) => new Promise((res) => {
      menu.innerHTML = `<p class="d8-q">${t.pergunta}</p>` + ops.map((o, k) => `<button class="d8-op ${o.cls || ''}" data-k="${o.k}"><span class="k">${k + 1}</span><b>${o.nome}</b><small>${o.desc}</small></button>`).join('');
      const fim = (k) => { menuOuvinte = null; menu.innerHTML = ''; res(k); };
      menu.querySelectorAll('.d8-op').forEach((b) => b.onclick = () => fim(b.dataset.k));
      menuOuvinte = (i) => { const o = ops[i]; if (o) fim(o.k); };
      if (BOT()) setTimeout(() => fim((ops.find((o) => o.k === 'chamar' || o.k === 'tremido') || ops.find((o) => o.k === (fimPronto ? 'rodear' : 'estocada')) || ops[0]).k), 20);
    });

    const julga = (err, jan) => (err == null ? 'nada' : Math.abs(err) <= jan * .45 ? 'perfeito' : Math.abs(err) <= jan ? 'bom' : err < 0 ? 'cedo' : 'tarde');

    // ------------------------------------------------------------ KRONK
    const turnoDela = async () => {
      const ops = [
        { k: 'estocada', nome: t.golpes.estocada[0], desc: t.golpes.estocada[1] },
        { k: 'corte', nome: t.golpes.corte[0], desc: t.golpes.corte[1] },
        { k: 'finta', nome: t.golpes.finta[0], desc: t.golpes.finta[1] },
        { k: 'respirar', nome: t.golpes.respirar[0], desc: t.golpes.respirar[1] },
      ];
      if (fase === 3) ops.push({ k: 'rodear', nome: t.golpes.rodear[0], desc: t.golpes.rodear[1], cls: 'risco' });
      const k = await escolhe(ops);
      if (k === 'respirar') { bpm = Math.max(base, bpm - 14); hp = Math.min(hpFase, hp + 4); pose('respirar', 1.2); linha(t.respirou); await espera(900); return null; }
      if (k === 'finta') { revelado = Math.random() < (fase === 3 ? .7 : .45) ? 'pesado' : 'golpe'; R.leituras++; pose('golpe', .4); linha(t.tell.mordeu[revelado], 'ler'); await espera(900); return null; }
      if (k === 'rodear') { rodeando = true; R.rodeou = true; linha(t.rodear, 'ler'); await espera(900); return null; }
      const corte = k === 'corte', dur = corte ? 1.25 : .95, jan = (corte ? .085 : .1) * janelaK();
      if (corte) bpm += 3;
      const r = await anel('ele', dur, [{ k: 'agora', rot: t.agora, cls: 'agora' }]);
      const j = julga(r.err, jan);
      if (j === 'perfeito' || j === 'bom') {
        const dano = (corte ? (j === 'perfeito' ? 15 : 10) : (j === 'perfeito' ? 9 : 6));
        pose('golpe', .6); sfx('corte', .7); hp = Math.max(fase === 3 ? 6 : 1, hp - dano); flash = 0; shake = .25;
        popTxt(j === 'perfeito' ? t.rot.perfeito : t.rot.bom,'bom'); anima('apanha').then(guarda);
        linha(t.acertos[Math.floor(Math.random() * t.acertos.length)]);
      } else { pose('golpe', .5); sfx('golpe-ar', .6); popTxt(j === 'nada' ? t.rot.tarde : t.rot[j] || t.rot.defende,'mal'); anima('esquiva').then(guarda); linha(t.erro); }
      await espera(800);
      return null;
    };

    const turnoDele = async () => {
      let tipo = revelado || (Math.random() < (fase === 3 ? .55 : fase === 2 ? .45 : .38) ? 'pesado' : 'golpe');
      if (rodeando) tipo = 'pesado';
      const lido = !!revelado; revelado = null;
      const rapido = fase >= 2 || rodeando;
      if (tipo === 'golpe') {
        linha(t.tell.golpe, 'tell');
        const dur = (fase === 1 ? .95 : fase === 2 ? .78 : .82) * (lido ? 1.15 : 1);
        kAnim = { nome: 'golpe', f: 0, play: true, ate: KR.golpe.impacto, fps: KR.golpe.impacto / dur };
        const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }]);
        kAnim = { nome: 'golpe', f: KR.golpe.impacto, play: true, fps: 30, fim: guarda };
        const jan = (r.k === 'lateral' ? .07 : .15) * janelaK() * (lido ? 1.3 : 1), j = julga(r.err, jan);
        if ((j === 'perfeito' || j === 'bom') && r.k === 'escudo') { pose('escudo', .7); sfx('escudo-impacto-1', .8); popTxt(t.rot.segurou,'bom'); linha(t.segurou); bpm += 2; R.respostas++; }
        else if (j === 'perfeito' && r.k === 'lateral') { pose('lateral', .7); sfx('golpe-ar', .6); popTxt(t.rot.passou,'bom'); linha(t.passou); R.respostas++; }
        else await marca(j);
      } else {
        linha(rapido ? t.tell.pesadoRapido : t.tell.pesado, 'tell');
        await anima('pesado', { ate: KR.pesado.segura, fps: 22 });
        const segura = rodeando ? rnd(.15, .35) : rapido ? rnd(.35, .8) : rnd(.7, 1.4);
        // segurar a maça no alto: tocar agora é cedo
        const cedo = await new Promise((res) => {
          menu.innerHTML = `<button class="d8-b" data-k="escudo">↑ ${t.escudo}</button><button class="d8-b" data-k="lateral">↓ ${t.lateral}</button>`;
          let ok = false; const fim = (v) => { if (ok) return; ok = true; ouvinte = null; menu.innerHTML = ''; res(v); };
          menu.querySelectorAll('.d8-b').forEach((b) => b.onpointerdown = (e) => { e.preventDefault(); fim(b.dataset.k); });
          ouvinte = (k) => fim(k);
          setTimeout(() => fim(null), (BOT() ? .02 : segura) * 1000);
        });
        if (cedo) { popTxt(t.rot.cedo,'mal'); linha(t.cedoPesado, 'mal'); kAnim = { nome: 'pesado', f: KR.pesado.segura, play: true, fps: 40, fim: guarda }; await espera(250); await marca('cedo'); await fimRodeio(); return; }
        linha(t.tell.desce, 'tell');
        const dur = (fase === 1 ? .62 : .5) * (lido ? 1.2 : 1);
        kAnim = { nome: 'pesado', f: KR.pesado.segura, play: true, ate: KR.pesado.impacto, fps: (KR.pesado.impacto - KR.pesado.segura) / dur };
        const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }]);
        kAnim = { nome: 'pesado', f: KR.pesado.impacto, play: true, fps: 30, fim: guarda };
        const jan = (r.k === 'lateral' ? .09 : .14) * janelaK() * (lido ? 1.3 : 1), j = julga(r.err, jan);
        if ((j === 'perfeito' || j === 'bom') && r.k === 'lateral') {
          pose('lateral', .9); sfx('golpe-ar', .7); popTxt(t.rot.contra,'bom'); linha(t.contra); R.laterais++; R.leituras++; R.respostas++;
          await espera(650);
          if (fimPronto) { await fim(); return; }
          const dano = rodeando ? 24 : 14;
          pose('golpe', .7); sfx('corte', .8); hp = Math.max(fase === 3 ? 6 : 1, hp - dano); shake = .35; anima('apanha').then(guarda); linha(t.contraGolpe);
        } else if ((j === 'perfeito' || j === 'bom') && r.k === 'escudo') { pose('escudo', .8); sfx('escudo-impacto-2', .9); shake = .3; popTxt(t.rot.segurou,'meio'); linha(t.segurouPesado); bpm += 7; R.respostas++; }
        else await marca(j);
      }
      await fimRodeio();
    };
    const fimRodeio = async () => { if (rodeando) { rodeando = false; } };
    const marca = async (j) => {
      marcas++; R.marcas++; R.golpesRecebidos++; pose('atingido', .9); sfx('escudo-impacto-2', .9); shake = .6; flash = .6; bpm += 9;
      popTxt(j === 'cedo' ? t.rot.cedo : j === 'tarde' || j === 'nada' ? t.rot.tarde : t.rot.marca,'mal');
      linha(t.marca[Math.min(marcas - 1, 2)], 'mal');
      await espera(700);
      if (marcas >= 3) { marcas = 0; R.recomecos++; hp = hpFase; linha(t.reset); await espera(1100); }
    };
    const cena = async (linhas, ms = 1500) => { menu.innerHTML = ''; for (const l of linhas) { linha(l, 'cena'); await espera(ms); } };
    const fim = async () => {
      pose('golpe', 2); sfx('corte', .9); flash = .3; shake = .7;
      await cena(t.fim, 1700);
      await anima('cai', { fps: 18 });
      fecha();
    };

    const kronk = async () => {
      linha(t.intro); await espera(1200);
      while (!acabou) {
        await turnoDela(); if (acabou) return;
        if (fase === 1 && hp <= 78) {
          fase = 2; hpFase = hp; marcas = 0;
          kAnim = { nome: 'pesado', f: 0, play: true, fps: 30 };
          await cena(t.fase2.slice(0, 2), 1400); pose('atingido', 1.5); flash = 1; shake = 1; sfx('escudo-impacto-2', 1);
          base = 78; bpm = Math.max(bpm, 82); R.golpesRecebidos++; guarda();
          await cena(t.fase2.slice(2), 1500);
        } else if (fase === 2 && hp <= 34) {
          fase = 3; hpFase = hp; marcas = 0; await cena(t.fase3, 1500);
        }
        if (fase === 3 && hp <= 14 && !fimPronto) { fimPronto = true; linha(t.fimPronto, 'ler'); }
        await turnoDele(); if (acabou) return;
      }
    };

    // ------------------------------------------------------------ O MAIOR
    const maiorLuta = async () => {
      linha(t.introM); await espera(1300);
      let atrasada = false;
      while (!acabou) {
        // o turno dele: às vezes avisa errado
        const tipo = Math.random() < .5 ? 'pesado' : 'golpe', confuso = Math.random() < .3;
        linha(confuso ? t.tellM.confuso : t.tellM[tipo], 'tell');
        const dur = rnd(.62, .95);
        kAnim = tipo === 'pesado' ? { nome: 'pesado', f: 0, play: true, ate: KR.pesado.impacto, fps: KR.pesado.impacto / dur } : { nome: 'golpe', f: 0, play: true, ate: KR.golpe.impacto, fps: KR.golpe.impacto / dur };
        const r = await anel('eu', dur, [{ k: 'escudo', rot: '↑ ' + t.escudo }, { k: 'lateral', rot: '↓ ' + t.lateral }]);
        kAnim = { nome: tipo, f: kAnim.f, play: true, fps: 30, fim: guarda };
        const certo = tipo === 'pesado' ? 'lateral' : 'escudo', jan = (r.k === certo ? .15 : .08) * janelaK(), j = julga(r.err, jan);
        if (j === 'perfeito' || j === 'bom') { pose(r.k === 'lateral' ? 'lateral' : 'escudo', .7); sfx('escudo-impacto-1', .8); popTxt(t.rot.segurou,'bom'); R.respostas++; bpm += 2; }
        else {
          marcas++; R.marcas++; pose('atingido', .9); sfx('escudo-impacto-2', 1); shake = .7; flash = .6; bpm += 7; popTxt(t.rot.marca,'mal');
          if (marcas >= 3) { marcas = 0; R.quedas++; linha(t.quedaM, 'mal'); await espera(900); }
        }
        // a mão no ombro
        if (bpm >= 150 && ombroUsado < (opts.ombro ? 1 : 0) + (opts.coragem ? 1 : 0)) {
          ombroUsado++; await espera(500);
          linha(ombroUsado === 1 && opts.ombro ? t.ombro : t.coragem, 'ler'); bpm -= opts.ombro && opts.coragem ? 30 : 22; pose('respirar', 1.2); await espera(1400);
        }
        if (atrasada) { atrasada = false; await rajada(); if (acabou) return; continue; }
        await espera(500);
        // o turno dela
        const tremida = bpm >= 130;
        const k = await escolhe([tremida ? { k: 'tremido', nome: t.golpes.tremido[0], desc: t.golpes.tremido[1], cls: 'tremida' } : { k: 'chamar', nome: t.golpes.chamar[0], desc: t.golpes.chamar[1] }, { k: 'respirar', nome: t.golpes.respirarM[0], desc: t.golpes.respirarM[1] }]);
        if (k === 'respirar') { bpm = Math.max(base, bpm - 12); pose('respirar', 1.1); linha(t.respirouM); await espera(800); continue; }
        if (k === 'tremido') { R.deslizes++; linha(t.chamouTremido, 'mal'); atrasada = true; await espera(700); continue; }
        await rajada();
      }
    };
    const rajada = async () => {
      sfx('virotes', .9); rajadaFx = 1; await espera(500); sfx('virote-impacto', .9); hp--; shake = .4;
      kAnim = { nome: 'apanha', f: 0, play: true, fim: guarda };
      linha(t.chamou); await espera(1100);
      if (hp <= 0) { await cena([t.fimM], 1600); await anima('cai', { fps: 16 }); fecha(); }
    };

    const fecha = () => {
      if (acabou) return; acabou = true; removeEventListener('keydown', onKey);
      R.tempo = Math.round((performance.now() - R.t0) / 1000); delete R.t0; R.bpmFinal = Math.round(bpm); R.bpm = R.bpmFinal;
      setTimeout(() => resolve(R), BOT() ? 10 : 900);
    };

    requestAnimationFrame(loop);
    const go = () => { $('.d8-regras').remove(); (maior ? maiorLuta : kronk)(); };
    $('.d8-go').onclick = go;
    if (BOT()) setTimeout(go, 10);
  });
}

window.DUELO8 = { start };
})();
