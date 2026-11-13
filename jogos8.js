/* ==========================================================================
   Capítulo VIII · os momentos de jogo menores
   ler    — Ler o corpo (a caça, Parte III): um suspeito por noite, quatro olhares em seis lugares
   roda   — Girar a roda do poço (Parte IV): segurar para girar; o rangido que o Simon conhecia
   chao   — Ouvir o chão (Parte V): tocar junto com três batidas e um silêncio, no meio do vento
   erguer — Erguer a espada (Parte VI): segurar; o sol é comido antes de a espada chegar lá
   conta  — Contar os vivos (Parte VI): segurar para andar entre eles; contar duas vezes
   API: window.JOGOS8.<nome>(root, opts) → Promise<resultado>
   ========================================================================== */
(() => {
'use strict';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const BOT = () => !!window.__JOGO_BOT;
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const load = (src) => new Promise((res) => { if (!src) return res(null); const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
const L = (o, pt, en) => (o.lang === 'en' ? en : pt);
const sfx = (o, n, v = .7, reserva) => o.A && o.A.sfx && o.A.sfx(n, v, reserva);

// segurar: ponteiro em qualquer lugar do palco, ou Espaço
function segurar(el, onChange) {
  let on = false;
  const set = (v) => { if (v !== on) { on = v; onChange(v); } };
  const down = (e) => { if (e.target.closest('button')) return; e.preventDefault(); set(true); };
  const up = () => set(false);
  const kd = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); set(true); } };
  const ku = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); set(false); } };
  el.addEventListener('pointerdown', down); addEventListener('pointerup', up); addEventListener('pointercancel', up); addEventListener('keydown', kd); addEventListener('keyup', ku);
  return { get on() { return on; }, set, solta() { el.removeEventListener('pointerdown', down); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); removeEventListener('keydown', kd); removeEventListener('keyup', ku); } };
}
function palco(root, cls, titulo, dica) {
  root.innerHTML = `<div class="j8-palco ${cls}"><canvas width="1280" height="720"></canvas><div class="j8-top"><b>${esc(titulo)}</b><span class="j8-dica">${esc(dica)}</span></div><div class="j8-num"></div><div class="j8-linha"></div><div class="j8-pe"></div></div>`;
  const p = root.querySelector('.j8-palco');
  return { p, cv: p.querySelector('canvas'), cx: p.querySelector('canvas').getContext('2d'), num: p.querySelector('.j8-num'), linha: p.querySelector('.j8-linha'), pe: p.querySelector('.j8-pe') };
}
const fundo = (cx, img, dim = .5) => {
  cx.fillStyle = '#0d0907'; cx.fillRect(0, 0, 1280, 720);
  if (img) { const s = Math.max(1280 / img.width, 720 / img.height); cx.drawImage(img, (1280 - img.width * s) / 2, (720 - img.height * s) / 2, img.width * s, img.height * s); }
  cx.fillStyle = `rgba(8,5,3,${dim})`; cx.fillRect(0, 0, 1280, 720);
};
const fala = (el, s) => { el.innerHTML = `<p>${esc(s)}</p>`; el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); };

/* ------------------------------------------------------------------ LER O CORPO */
function ler(root, o) {
  return new Promise((resolve) => {
    const lista = o.lista || [], rot = o.rotulos || {};
    const LUG = ['testa', 'orelhas', 'boca', 'pescoco', 'maos', 'pulso'];
    const POS = { testa: [50, 18], orelhas: [24, 33], boca: [50, 44], pescoco: [50, 60], maos: [27, 86], pulso: [73, 86] };
    const MAX = 4;
    root.innerHTML = `<div class="j8-ler">
      <div class="j8-ler-bg" style="${o.fundo ? `background-image:url('${esc(o.fundo)}')` : ''}"></div>
      <div class="j8-ler-in">
        <p class="eyebrow">${L(o, 'Mando trazer quem dormiu perto', 'I have whoever slept nearby brought to me')}</p>
        <h2>${L(o, 'Quem eu olho de perto?', 'Whom do I look at closely?')}</h2>
        <div class="j8-sus">${lista.map((s, k) => `<button class="j8-card" data-k="${k}"><span class="j8-foto" style="background-image:url('${esc(s.img)}')"></span><b>${esc(s.nome)}</b><small>${esc(s.papel)}</small></button>`).join('')}</div>
        <p class="j8-nota">${L(o, 'Um por noite. Quatro olhares. O corpo fala antes da boca.', 'One a night. Four looks. The body speaks before the mouth.')}</p>
      </div></div>`;
    const abre = (s) => {
      const vistos = [];
      root.innerHTML = `<div class="j8-ler j8-perto">
        <div class="j8-ler-bg" style="${o.fundo ? `background-image:url('${esc(o.fundo)}')` : ''}"></div>
        <div class="j8-ler-duo">
          <div class="j8-retrato"><span class="j8-foto" style="background-image:url('${esc(s.img)}')"></span>
            ${LUG.map((k) => `<button class="j8-ponto" data-k="${k}" style="left:${POS[k][0]}%;top:${POS[k][1]}%"><i></i><span>${esc(rot[k] || k)}</span></button>`).join('')}
          </div>
          <div class="j8-ler-lado">
            <p class="eyebrow">${esc(s.papel)}</p><h2>${esc(s.nome)}</h2>
            <p class="j8-olhares">${L(o, 'Olhares', 'Looks')} <b>${MAX}</b></p>
            <div class="j8-visto"></div>
            <button class="cta j8-pronto" hidden>${L(o, 'Mandar de volta', 'Send them back')}</button>
          </div>
        </div></div>`;
      const visto = root.querySelector('.j8-visto'), cont = root.querySelector('.j8-olhares b'), pronto = root.querySelector('.j8-pronto');
      const olha = (k, b) => {
        if (vistos.length >= MAX || vistos.includes(k)) return;
        vistos.push(k); b.classList.add('visto'); b.disabled = true;
        o.A && o.A.tone && o.A.tone(330, .25, 'sine', .03);
        visto.insertAdjacentHTML('beforeend', `<p><b>${esc(rot[k] || k)}.</b> ${esc(s.olhar[k] || '')}</p>`);
        cont.textContent = MAX - vistos.length;
        if (vistos.length >= MAX) { root.querySelectorAll('.j8-ponto:not(.visto)').forEach((x) => { x.disabled = true; x.classList.add('apagado'); }); pronto.hidden = false; pronto.focus(); }
      };
      root.querySelectorAll('.j8-ponto').forEach((b) => b.onclick = () => olha(b.dataset.k, b));
      pronto.onclick = () => resolve({ quem: s.id, olhares: vistos.slice() });
      if (BOT()) { const pref = window.__JOGO_BOT_OLHAR || ['testa', 'boca', 'pescoco', 'pulso']; pref.forEach((k) => olha(k, root.querySelector(`.j8-ponto[data-k="${k}"]`))); setTimeout(() => pronto.click(), 10); }
    };
    root.querySelectorAll('.j8-card').forEach((b) => b.onclick = () => abre(lista[+b.dataset.k]));
    if (BOT()) { const want = window.__JOGO_BOT_QUEM; const s = (want && lista.find((x) => x.id === want)) || lista[0]; setTimeout(() => abre(s), 10); }
  });
}

/* ------------------------------------------------------------------ A RODA DO POÇO */
function roda(root, o) {
  return new Promise(async (resolve) => {
    const S = palco(root, 'j8-roda', L(o, 'A roda do poço', 'The well wheel'), L(o, 'Segure para girar. Solte quando quiser.', 'Hold to turn. Let go when you want.'));
    const img = await load(o.img), CHEIO = 12;
    let ang = 0, vel = 0, voltas = 0, meia = 0, parado = 0, comecou = false, fim = false, last = performance.now();
    const h = segurar(S.p, () => {});
    const range = () => sfx(o, 'rangido-roda', .55, () => { o.A && o.A.tone && (o.A.tone(180, .45, 'sawtooth', .025, 0, .7), o.A.hiss(.4, 900, 4, .03)); });
    const desenha = () => {
      const cx = S.cx; fundo(cx, img, .55);
      const X = 640, Y = 300, R = 150;
      // corda e balde
      const prof = clamp(1 - voltas / CHEIO - (ang % (Math.PI * 2)) / (Math.PI * 2) / CHEIO, 0, 1);
      cx.strokeStyle = '#8a6f4d'; cx.lineWidth = 5; cx.beginPath(); cx.moveTo(X + R * .25, Y); cx.lineTo(X + R * .25, 470 + prof * 220); cx.stroke();
      cx.fillStyle = 'rgba(0,0,0,.6)'; cx.fillRect(470, 470, 340, 260);
      cx.fillStyle = '#5a4430'; cx.fillRect(X + R * .25 - 26, 470 + prof * 220, 52, 44);
      if (voltas >= CHEIO) { cx.fillStyle = 'rgba(120,160,190,.7)'; cx.fillRect(X + R * .25 - 22, 470 + prof * 220 + 4, 44, 8); }
      // a boca do poço
      cx.fillStyle = '#3b2f25'; cx.fillRect(450, 450, 380, 24);
      // a roda
      cx.save(); cx.translate(X, Y); cx.rotate(ang);
      cx.strokeStyle = '#6e5538'; cx.lineWidth = 16; cx.beginPath(); cx.arc(0, 0, R, 0, Math.PI * 2); cx.stroke();
      cx.lineWidth = 9; for (let k = 0; k < 8; k++) { cx.beginPath(); cx.moveTo(0, 0); cx.lineTo(Math.cos(k * Math.PI / 4) * R, Math.sin(k * Math.PI / 4) * R); cx.stroke(); }
      cx.fillStyle = '#4a3a28'; cx.beginPath(); cx.arc(0, 0, 18, 0, Math.PI * 2); cx.fill();
      // a manivela
      cx.strokeStyle = '#3d2f20'; cx.lineWidth = 12; cx.beginPath(); cx.moveTo(0, 0); cx.lineTo(R * .55, 0); cx.stroke();
      cx.fillStyle = h.on ? '#b38b57' : '#8b6b43'; cx.beginPath(); cx.arc(R * .55, 0, 15, 0, Math.PI * 2); cx.fill();
      cx.restore();
      // os postes
      cx.fillStyle = '#4a3a28'; cx.fillRect(X - R - 30, Y - 20, 22, 470 - Y + 20); cx.fillRect(X + R + 8, Y - 20, 22, 470 - Y + 20);
    };
    const loop = (now) => {
      if (fim) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const quer = h.on || (BOT() && voltas < 5);
      if (quer) comecou = true;
      vel += ((quer ? 5.4 : 0) - vel) * dt * (quer ? 1.6 : 3.2);
      const antes = ang; ang += vel * dt;
      const m = Math.floor(ang / Math.PI); if (m > meia) { meia = m; range(); }
      voltas = Math.floor(ang / (Math.PI * 2));
      S.num.textContent = voltas > 0 ? String(voltas) : '';
      if (voltas >= CHEIO) { S.linha.innerHTML = `<p>${L(o, 'O balde bate na boca do poço, cheio.', 'The bucket knocks against the lip of the well, full.')}</p>`; return acaba(1200); }
      if (comecou && vel < .25 && !quer) { parado += dt; if (parado > (BOT() ? .05 : 2.2)) return acaba(200); } else parado = 0;
      desenha(); requestAnimationFrame(loop);
    };
    const acaba = (ms) => { fim = true; h.solta(); desenha(); setTimeout(() => resolve({ voltas }), BOT() ? 10 : ms); };
    requestAnimationFrame(loop);
  });
}

/* ------------------------------------------------------------------ OUVIR O CHÃO */
function chao(root, o) {
  return new Promise(async (resolve) => {
    const S = palco(root, 'j8-chao', L(o, 'O ouvido na areia', 'An ear to the sand'), L(o, 'Toque junto com as batidas.', 'Tap along with the beats.'));
    const img = await load(o.img);
    const A = o.A, T0 = performance.now() + 1800;
    const PASSO = .62, CICLO = 4, CICLOS = 5;            // três batidas e um silêncio; o primeiro ciclo só se ouve
    const batidas = []; for (let c = 0; c < CICLOS; c++) for (let b = 0; b < 3; b++) batidas.push({ t: (c * CICLO + b) * PASSO, c, ok: false, vale: c > 0 });
    const fimT = CICLOS * CICLO * PASSO + 1;
    let acertos = 0, erros = 0, prox = 0, fim = false, ondas = [], toques = [], rajadas = [];
    for (let k = 0; k < 4; k++) rajadas.push({ t: 1.4 + k * 2.6 + Math.random() * 1.2, d: .8 + Math.random() * .7 });
    const tum = (forte) => { if (!A || !A.ctx) return; A.tone(46, .32, 'sine', forte ? .32 : .2, 0, .6); A.hiss(.22, 110, .8, forte ? .12 : .07, 0, 'lowpass'); };
    const vento = (d) => { A && A.hiss && A.hiss(d, 700 + Math.random() * 500, .5, .06); };
    const agora = () => (performance.now() - T0) / 1000 * (BOT() ? 4 : 1);
    const toca = (e) => {
      if (fim) return; if (e && e.target && e.target.closest && e.target.closest('button')) return;
      const t = agora(); toques.push({ t, x: 640 + (Math.random() - .5) * 60 });
      let melhor = null; batidas.forEach((b) => { if (!b.ok && b.vale && Math.abs(b.t - t) < .17 && (!melhor || Math.abs(b.t - t) < Math.abs(melhor.t - t))) melhor = b; });
      if (melhor) { melhor.ok = true; acertos++; S.p.classList.add('j8-ok'); setTimeout(() => S.p.classList.remove('j8-ok'), 140); }
      else { erros++; }
    };
    S.p.addEventListener('pointerdown', toca);
    const kd = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toca(); } };
    addEventListener('keydown', kd);
    const desenha = (t) => {
      const cx = S.cx; fundo(cx, img, .74);
      // a areia de perto: grãos que tremem com a batida
      const g = cx.createRadialGradient(640, 420, 40, 640, 420, 520); g.addColorStop(0, 'rgba(120,96,70,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g; cx.fillRect(0, 0, 1280, 720);
      let tremor = 0; batidas.forEach((b) => { const d = t - b.t; if (d >= 0 && d < .3) tremor = Math.max(tremor, 1 - d / .3); });
      cx.fillStyle = 'rgba(214,186,140,.55)';
      for (let k = 0; k < 220; k++) { const a = k * 2.399, r = 30 + (k % 37) * 13; const x = 640 + Math.cos(a) * r, y = 420 + Math.sin(a) * r * .45; cx.fillRect(x + (Math.random() - .5) * tremor * 5, y + (Math.random() - .5) * tremor * 3, 2, 2); }
      ondas = ondas.filter((w) => t - w < 1.1);
      ondas.forEach((w) => { const d = t - w; cx.strokeStyle = `rgba(230,205,160,${.35 * (1 - d / 1.1)})`; cx.lineWidth = 2; cx.beginPath(); cx.ellipse(640, 420, 60 + d * 380, (60 + d * 380) * .4, 0, 0, Math.PI * 2); cx.stroke(); });
      toques = toques.filter((x) => t - x.t < .5);
      toques.forEach((x) => { cx.fillStyle = `rgba(242,228,200,${.5 * (1 - (t - x.t) / .5)})`; cx.beginPath(); cx.arc(x.x, 420, 14, 0, Math.PI * 2); cx.fill(); });
      // o vento: um véu que passa
      rajadas.forEach((r) => { const d = t - r.t; if (d > 0 && d < r.d) { cx.fillStyle = `rgba(190,170,140,${.14 * Math.sin(Math.PI * d / r.d)})`; cx.fillRect(0, 0, 1280, 720); } });
    };
    const loop = () => {
      if (fim) return;
      const t = agora();
      while (prox < batidas.length && t >= batidas[prox].t) { const b = batidas[prox]; const abafa = rajadas.some((r) => b.t > r.t && b.t < r.t + r.d); tum(!abafa); ondas.push(b.t); if (BOT() && b.vale && Math.random() < .9) setTimeout(toca, 5); prox++; }
      rajadas.forEach((r) => { if (!r.soou && t >= r.t) { r.soou = true; vento(r.d); } });
      S.linha.innerHTML = t < 0 ? `<p>${L(o, 'Encosto o ouvido na areia.', 'I put my ear to the sand.')}</p>` : t < CICLO * PASSO ? `<p>${L(o, 'Escuto.', 'I listen.')}</p>` : '';
      desenha(t);
      if (t > fimT) { fim = true; removeEventListener('keydown', kd); setTimeout(() => resolve({ acertos, erros }), BOT() ? 10 : 400); return; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
}

/* ------------------------------------------------------------------ ERGUER A ESPADA */
function erguer(root, o) {
  return new Promise(async (resolve) => {
    const S = palco(root, 'j8-erguer', L(o, 'Erguer a espada', 'Raise the sword'), L(o, 'Segure.', 'Hold.'));
    const img = await load(o.img);
    const DUR = 9;                                   // o sol não espera a espada
    let alt = 0, maxAlt = 0, t0 = null, fim = false, last = performance.now(), batT = 0;
    const h = segurar(S.p, (v) => { if (v && t0 == null) t0 = performance.now(); });
    const desenha = (p) => {
      const cx = S.cx; fundo(cx, img, .35 + p * .55);
      // o sol, e o pedaço preto que entra pela borda (a lua só aparece onde cobre o sol)
      const sx = 980, sy = 150, sr = 62, mx = sx + sr * 2.05 * (1 - p), my = sy - 8 * (1 - p);
      if (p > .9) { const g = cx.createRadialGradient(sx, sy, sr, sx, sy, sr * 2.4); g.addColorStop(0, `rgba(255,240,215,${(p - .9) * 6})`); g.addColorStop(1, 'rgba(255,240,215,0)'); cx.fillStyle = g; cx.beginPath(); cx.arc(sx, sy, sr * 2.4, 0, Math.PI * 2); cx.fill(); }
      cx.save(); cx.beginPath(); cx.arc(sx, sy, sr, 0, Math.PI * 2); cx.clip();
      cx.fillStyle = `rgba(255,236,190,${.95 - p * .2})`; cx.fillRect(sx - sr, sy - sr, sr * 2, sr * 2);
      cx.fillStyle = '#070505'; cx.beginPath(); cx.arc(mx, my, sr * 1.02, 0, Math.PI * 2); cx.fill();
      cx.restore();
      // a espada: a lâmina sobe de baixo, com a guarda e o punho na mão que não se vê
      const ponta = 720 - (180 + alt * 430), guarda = Math.min(700, ponta + 400);
      cx.save(); cx.translate(600, 0);
      const brilho = .9 - p * .55;
      cx.fillStyle = `rgba(196,194,188,${brilho})`;
      cx.beginPath(); cx.moveTo(0, ponta); cx.lineTo(13, ponta + 40); cx.lineTo(11, guarda); cx.lineTo(-11, guarda); cx.lineTo(-13, ponta + 40); cx.closePath(); cx.fill();
      cx.strokeStyle = `rgba(255,252,240,${brilho * .6})`; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(0, ponta + 8); cx.lineTo(0, guarda - 4); cx.stroke();
      cx.fillStyle = '#2f241a'; cx.fillRect(-58, guarda, 116, 12);
      cx.fillStyle = '#4a3726'; cx.fillRect(-9, guarda + 12, 18, 74);
      cx.restore();
      // as sombras ganham borda
      cx.fillStyle = `rgba(0,0,0,${p * .5})`; cx.fillRect(0, 600, 1280, 120);
    };
    const loop = (now) => {
      if (fim) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const quer = h.on || BOT();
      if (quer && t0 == null) t0 = now;
      alt = clamp(alt + (quer ? dt * .14 : -dt * .2), 0, 1); maxAlt = Math.max(maxAlt, alt);
      const p = t0 == null ? 0 : clamp((now - t0) / 1000 / (BOT() ? .2 : DUR), 0, 1);
      batT -= dt; if (batT <= 0 && o.A && o.A.batida) { batT = 60 / (88 + p * 70); o.A.batida(.4 + p * .5); }
      S.linha.innerHTML = t0 == null ? `<p>${L(o, 'Ele respira de boca aberta.', 'He breathes through his open mouth.')}</p>` : p > .55 ? `<p>${L(o, 'A luz fica rala.', 'The light thins.')}</p>` : '';
      desenha(p);
      if (p >= 1) { fim = true; h.solta(); setTimeout(() => resolve({ altura: Math.round(maxAlt * 100) }), BOT() ? 10 : 1100); return; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
}

/* ------------------------------------------------------------------ CONTAR OS VIVOS */
function conta(root, o) {
  return new Promise(async (resolve) => {
    const S = palco(root, 'j8-conta', L(o, 'Os vivos', 'The living'), L(o, 'Segure para andar entre eles.', 'Hold to walk among them.'));
    const img = await load(o.img), total = Math.max(1, o.total || 1);
    const rostos = await Promise.all((o.rostos || []).map(async (r) => ({ nome: r.nome, im: await load(r.img) })));
    const marcas = rostos.map((_, k) => Math.round(total * (k + 1) / (rostos.length + 1)));
    let n = 0, f = 0, volta = 1, fim = false, last = performance.now(), mostra = null, pausa = 0;
    const h = segurar(S.p, () => {});
    const gente = []; for (let k = 0; k < 14; k++) gente.push({ x: 120 + k * 92, h: 170 + Math.random() * 50, ferido: Math.random() < .3, faixa: Math.random() < .3, tipoia: Math.random() < .2 });
    const desenha = () => {
      const cx = S.cx; fundo(cx, img, .55);
      gente.forEach((g) => {
        const x = ((g.x - f * 92) % 1300 + 1300) % 1300 - 10, b = 642, h = g.h;
        cx.save(); cx.translate(x, b); if (g.ferido) cx.rotate(-.12);
        cx.fillStyle = 'rgba(12,9,7,.92)';
        cx.fillRect(-15, -h * .45, 12, h * .45); cx.fillRect(3, -h * .45, 12, h * .45);              // pernas
        cx.beginPath(); cx.moveTo(-24, -h * .8); cx.quadraticCurveTo(0, -h * .86, 24, -h * .8); cx.lineTo(18, -h * .43); cx.lineTo(-18, -h * .43); cx.closePath(); cx.fill();   // tronco e ombros
        cx.fillRect(-30, -h * .79, 8, h * .34); if (!g.tipoia) cx.fillRect(22, -h * .79, 8, h * .34); // braços
        cx.beginPath(); cx.arc(0, -h * .9, 13, 0, Math.PI * 2); cx.fill();                               // cabeça
        if (g.faixa) { cx.fillStyle = 'rgba(214,200,176,.55)'; cx.fillRect(-13, -h * .93, 26, 6); }
        if (g.tipoia) { cx.fillStyle = 'rgba(214,200,176,.45)'; cx.beginPath(); cx.moveTo(-20, -h * .8); cx.lineTo(24, -h * .62); cx.lineTo(18, -h * .56); cx.lineTo(-22, -h * .74); cx.fill(); }
        cx.restore();
      });
      cx.fillStyle = 'rgba(0,0,0,.35)'; cx.fillRect(0, 640, 1280, 80);
      if (mostra) {
        const r = mostra.r, a = clamp(mostra.t < .3 ? mostra.t / .3 : mostra.t > 1.5 ? (1.8 - mostra.t) / .3 : 1, 0, 1);
        cx.globalAlpha = a;
        if (r.im) { cx.save(); cx.beginPath(); cx.arc(640, 300, 110, 0, Math.PI * 2); cx.clip(); const s = 220 / Math.min(r.im.width, r.im.height); cx.drawImage(r.im, 640 - r.im.width * s / 2, 300 - r.im.height * s / 2, r.im.width * s, r.im.height * s); cx.restore(); }
        else { cx.fillStyle = 'rgba(60,46,34,.9)'; cx.beginPath(); cx.arc(640, 300, 110, 0, Math.PI * 2); cx.fill(); }
        cx.strokeStyle = 'rgba(232,214,182,.7)'; cx.lineWidth = 2; cx.beginPath(); cx.arc(640, 300, 112, 0, Math.PI * 2); cx.stroke();
        cx.fillStyle = '#efe2c8'; cx.font = '28px "Cormorant Garamond", Georgia, serif'; cx.textAlign = 'center'; cx.fillText(r.nome, 640, 450);
        cx.globalAlpha = 1;
      }
    };
    const loop = (now) => {
      if (fim) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (pausa > 0) { pausa -= dt; if (mostra) mostra.t += dt; desenha(); return requestAnimationFrame(loop); }
      if (mostra) { mostra.t += dt; if (mostra.t > 1.8) mostra = null; }
      const quer = h.on || BOT();
      const vel = (volta === 1 ? 2.2 : 4.5) * (BOT() ? 40 : 1);
      if (quer && !mostra) {
        f += dt * vel;
        const novo = Math.min(total, Math.floor(f));
        if (novo > n) {
          n = novo; o.A && o.A.tone && o.A.tone(volta === 1 ? 220 : 196, .12, 'sine', .025);
          if (volta === 1) { const k = marcas.indexOf(n); if (k >= 0) { mostra = { r: rostos[k], t: 0 }; } }
        }
      }
      S.num.textContent = n ? String(n) : '';
      if (n >= total && !mostra) {
        if (volta === 1) { volta = 2; n = 0; f = 0; pausa = BOT() ? .01 : 1.6; S.linha.innerHTML = `<p>${L(o, 'Conto outra vez.', 'I count again.')}</p>`; }
        else { fim = true; h.solta(); desenha(); setTimeout(() => resolve({ total }), BOT() ? 10 : 1400); return; }
      } else if (volta === 1 && !n) S.linha.innerHTML = `<p>${L(o, 'Encosto a mão em cada um.', 'I put my hand on each one.')}</p>`;
      else if (volta === 1) S.linha.innerHTML = '';
      desenha(); requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
}

window.JOGOS8 = { ler, roda, chao, erguer, conta };
})();
