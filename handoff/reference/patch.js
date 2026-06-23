/* ============================================================
   patch — reskinned in the tsu design system
   Vanilla JS. URL is the preset. The panel is the art.
   ============================================================ */

const PARAMS = {
  // ─── OSCILLATOR ─────────────────────────────────────────
  osc_overtone:        { label: 'Overtone',     group: 'Oscillator', type: 'knob',   default: 0,   x: 29,   y: 22, desc: 'Sub-oscillator level. Adds low-end weight or a 5th interval harmonic.' },
  osc_overtone_switch: { label: 'Sub › Fifth',  group: 'Oscillator', type: 'knob',   default: 0,   x: 29.1, y: 11, desc: 'Sub-oscillator pitch mode. 0 = off, 0.5 = sub octave, 1 = fifth above.' },
  osc_saw:             { label: 'Sawtooth',     group: 'Oscillator', type: 'knob',   default: 1,   x: 36.3, y: 22, desc: 'Sawtooth wave level. The brightest, richest wave — leads and basses.' },
  osc_ultrasaw:        { label: 'Ultrasaw',     group: 'Oscillator', type: 'knob',   default: 0,   x: 36.4, y: 11, desc: 'Phase-shifted saw layers — a detuned unison. Higher = thicker, fatter.' },
  osc_square:          { label: 'Square',       group: 'Oscillator', type: 'knob',   default: 0,   x: 43.8, y: 22, desc: 'Square wave level. Hollow and beefy, classic for chords and leads.' },
  osc_pulse_width:     { label: 'Pulse Width',  group: 'Oscillator', type: 'knob',   default: 0,   x: 43.8, y: 11, desc: 'Width of the square wave. Center is a pure square; extremes go nasal.' },
  osc_triangle:        { label: 'Triangle',     group: 'Oscillator', type: 'knob',   default: 0,   x: 51.2, y: 22, desc: 'Triangle wave level. Soft and flute-like, lowest harmonic content.' },
  osc_metalizer:       { label: 'Metalizer',    group: 'Oscillator', type: 'knob',   default: 0,   x: 51.1, y: 11, desc: 'Folds the triangle into metallic harmonics. Higher = more aggressive.' },

  // ─── FILTER ─────────────────────────────────────────────
  filter_cutoff:       { label: 'Cutoff',       group: 'Filter', type: 'knob',   default: 0.5, x: 58.5, y: 11, desc: 'Filter cutoff frequency. The most important tone-shaping knob.' },
  filter_resonance:    { label: 'Resonance',    group: 'Filter', type: 'knob',   default: 0,   x: 66,   y: 11, desc: 'Emphasis at the cutoff. Above ~0.9 the filter self-oscillates.' },
  filter_mode:         { label: 'Filter Mode',  group: 'Filter', type: 'switch', options: ['LP','BP','HP'], default: 'LP', x: 58.2, y: 25.1, desc: 'Steiner-Parker mode. LP warm, BP nasal, HP bright.' },
  filter_env_amt:      { label: 'Env Amount',   group: 'Filter', type: 'knob',   default: 0.5, x: 65.8, y: 22, desc: 'How much the ADSR envelope opens the filter over time.' },
  filter_kbd_tracking: { label: 'KBD Tracking', group: 'Filter', type: 'knob',   default: 0,   x: 73.2, y: 22, desc: 'How much keyboard pitch raises the filter cutoff.' },
  brute_factor:        { label: 'Brute Factor', group: 'Filter', type: 'knob',   default: 0,   x: 73.4, y: 11, desc: 'Internal feedback distortion. Above ~0.65: wild, unstable feedback.' },

  // ─── ENVELOPE ───────────────────────────────────────────
  env_amt:             { label: 'Env Amount',   group: 'Envelope', type: 'knob',   default: 0, x: 51.2, y: 37,   desc: 'Envelope modulation depth to the VCA.' },
  env_vca_switch:      { label: 'VCA',          group: 'Envelope', type: 'switch', options: ['ENV','GATE'], default: 'ENV', x: 51.1, y: 48.6, desc: 'Volume mode. Env = shaped by ADSR. Gate = full volume, organ-like.' },
  env_attack:          { label: 'Attack',       group: 'Envelope', type: 'slider', default: 0, x: 58.3, y: 43,   desc: 'Time to reach full volume after a key press.' },
  env_decay:           { label: 'Decay',        group: 'Envelope', type: 'slider', default: 0, x: 63.1, y: 43,   desc: 'Time to fall from peak to sustain level.' },
  env_sustain:         { label: 'Sustain',      group: 'Envelope', type: 'slider', default: 0, x: 68,   y: 43,   desc: 'Volume held while the key is pressed.' },
  env_release:         { label: 'Release',      group: 'Envelope', type: 'slider', default: 0, x: 72.8, y: 43,   desc: 'Time for the sound to fade out after key release.' },

  // ─── LFO ────────────────────────────────────────────────
  lfo_amount:          { label: 'LFO Amount',   group: 'LFO', type: 'knob',   default: 0, x: 36.3, y: 37,   desc: 'LFO modulation depth applied to the destination.' },
  lfo_rate:            { label: 'LFO Rate',     group: 'LFO', type: 'knob',   default: 0, x: 43.7, y: 37,   desc: 'LFO speed. Low = slow sweep, high = approaching audio-rate.' },
  lfo_wave:            { label: 'LFO Wave',     group: 'LFO', type: 'switch', options: ['SQR','SAW','SIN'], default: 'SIN', x: 36.6, y: 48.3, desc: 'LFO waveform shape.' },
  lfo_sync:            { label: 'LFO Sync',     group: 'LFO', type: 'switch', options: ['FREE','ARP'], default: 'FREE', x: 43.8, y: 48.4, desc: 'LFO clock source. Free runs alone; Arp syncs to tempo.' },

  // ─── CONTROLS ───────────────────────────────────────────
  glide:               { label: 'Glide',        group: 'Controls', type: 'knob',   default: 0, x: 29,   y: 37,   desc: 'Portamento time between notes.' },
  mod_wheel_dest:      { label: 'Mod Wheel',    group: 'Controls', type: 'switch', options: ['LFO','CUT'], default: 'LFO', x: 29.3, y: 48.1, desc: 'Mod wheel destination. Cutoff sweeps the filter; LFO adds vibrato.' },

  // ─── MOD MATRIX ─────────────────────────────────────────
  mod_env_out:   { label: 'Env Out',  group: 'Mod Matrix', type: 'jack', direction: 'out', default: null, x: 79.7, y: 10,   desc: 'Envelope CV output. Drag to a destination jack to patch.' },
  mod_lfo_out:   { label: 'LFO Out',  group: 'Mod Matrix', type: 'jack', direction: 'out', default: null, x: 79.8, y: 14.8, desc: 'LFO CV output. Drag to a destination jack to patch.' },
  mod_metal_in:  { label: 'Metal',    group: 'Mod Matrix', type: 'jack', direction: 'in',  default: null, x: 83.1, y: 9.9,  desc: 'Metalizer modulation input.' },
  mod_pitch_in:  { label: 'Pitch',    group: 'Mod Matrix', type: 'jack', direction: 'in',  default: null, x: 83.1, y: 14.8, desc: 'Oscillator pitch modulation input.' },
  mod_saw_in:    { label: 'Saw',      group: 'Mod Matrix', type: 'jack', direction: 'in',  default: null, x: 86.4, y: 9.9,  desc: 'Ultrasaw modulation input.' },
  mod_filter_in: { label: 'Filter',   group: 'Mod Matrix', type: 'jack', direction: 'in',  default: null, x: 86.5, y: 14.8, desc: 'Filter cutoff modulation input.' },
  mod_sub_in:    { label: 'Sub',      group: 'Mod Matrix', type: 'jack', direction: 'in',  default: null, x: 89.7, y: 10,   desc: 'Sub oscillator modulation input.' },
  mod_pwm_in:    { label: 'PWM',      group: 'Mod Matrix', type: 'jack', direction: 'in',  default: null, x: 89.8, y: 14.8, desc: 'Pulse width modulation input.' },
};

const GROUP_ORDER = ['Oscillator', 'Filter', 'Envelope', 'LFO', 'Controls', 'Mod Matrix'];

// ── state ───────────────────────────────────────────────
let values = {};
let undoStack = [];
let presetName = 'init patch';

function defaults() {
  const v = {};
  for (const [k, p] of Object.entries(PARAMS)) {
    if (p.type === 'switch') v[k] = p.options.indexOf(p.default) / (p.options.length - 1);
    else if (p.type === 'jack') v[k] = p.direction === 'out' ? [] : null;
    else v[k] = p.default;
  }
  return v;
}

// ── URL codec ───────────────────────────────────────────
function encodeState() {
  const knobs = [];
  const jacks = [];
  for (const [k, p] of Object.entries(PARAMS)) {
    if (p.type === 'jack') {
      if (p.direction === 'out' && Array.isArray(values[k]) && values[k].length)
        values[k].forEach(t => jacks.push(`${k}>${t}`));
    } else {
      knobs.push(Math.round((values[k] ?? 0) * 1000));
    }
  }
  const params = new URLSearchParams();
  params.set('k', knobs.join('.'));
  if (jacks.length) params.set('j', jacks.join('~'));
  if (presetName && presetName !== 'init patch') params.set('n', presetName);
  return params.toString();
}

function decodeState(qs) {
  try {
    const params = new URLSearchParams(qs);
    const v = defaults();
    const kArr = (params.get('k') || '').split('.').filter(Boolean).map(Number);
    let i = 0;
    for (const [k, p] of Object.entries(PARAMS)) {
      if (p.type === 'jack') continue;
      if (i < kArr.length) v[k] = Math.max(0, Math.min(1, kArr[i] / 1000));
      i++;
    }
    const jStr = params.get('j');
    if (jStr) jStr.split('~').forEach(pair => {
      const [src, dst] = pair.split('>');
      if (PARAMS[src] && PARAMS[dst]) { v[src] = [...(v[src] || []), dst]; v[dst] = src; }
    });
    if (params.get('n')) presetName = params.get('n');
    values = v;
    return true;
  } catch (e) { values = defaults(); return false; }
}

// ── helpers ─────────────────────────────────────────────
function isModified(k) {
  const p = PARAMS[k], val = values[k];
  if (p.type === 'jack') return Array.isArray(val) ? val.length > 0 : val !== null;
  if (p.type === 'switch') { const d = p.options.indexOf(p.default) / (p.options.length - 1); return Math.abs(val - d) > 0.001; }
  return Math.abs(val - p.default) > 0.001;
}
function displayValue(k) {
  const p = PARAMS[k], val = values[k];
  if (p.type === 'jack') {
    if (p.direction === 'out' && Array.isArray(val) && val.length) return val.map(t => PARAMS[t]?.label || t).join(', ');
    if (p.direction === 'in' && typeof val === 'string') return PARAMS[val]?.label || val;
    return '—';
  }
  if (p.type === 'switch') return p.options[Math.round(val * (p.options.length - 1))];
  return `${Math.round(val * 100)}%`;
}
function clamp01(n) { return Math.max(0, Math.min(1, n)); }

// ── render: panel controls ──────────────────────────────
function renderPanel() {
  const layer = document.getElementById('overlay');
  layer.innerHTML = '';
  for (const [k, p] of Object.entries(PARAMS)) {
    if (p.type === 'jack') continue;
    const el = document.createElement('div');
    el.className = 'ctl';
    el.style.left = p.x + '%';
    el.style.top = p.y + '%';
    el.dataset.key = k;
    el.title = '';
    if (p.type === 'knob') el.appendChild(makeKnob(k));
    else if (p.type === 'switch') el.appendChild(makeSwitch(k));
    else if (p.type === 'slider') el.appendChild(makeSlider(k));
    el.appendChild(makeTip(p));
    layer.appendChild(el);
  }
  renderJacks();
}

function makeTip(p) {
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.innerHTML = `<span class="tip-label">${p.label}</span>${p.desc}`;
  return tip;
}

function makeKnob(k) {
  const wrap = document.createElement('div');
  wrap.className = 'knob';
  wrap.tabIndex = 0;
  wrap.setAttribute('role', 'slider');
  wrap.setAttribute('aria-label', PARAMS[k].label);
  const ind = document.createElement('div'); ind.className = 'knob-ind';
  const read = document.createElement('div'); read.className = 'knob-read';
  wrap.appendChild(ind); wrap.appendChild(read);
  const paint = () => { ind.style.transform = `translateX(-50%) rotate(${-135 + values[k] * 270}deg)`; read.textContent = `${Math.round(values[k] * 100)}%`; };
  paint();
  wrap._paint = paint;

  let startY, startVal, dragging = false;
  const move = (e) => {
    if (!dragging) { if (Math.abs(e.clientY - startY) < 3) return; dragging = true; wrap.classList.add('dragging'); }
    values[k] = clamp01(startVal - (e.clientY - startY) / 150);
    paint(); syncSidebar(k);
  };
  const up = (e) => {
    window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
    if (dragging) { wrap.classList.remove('dragging'); commit(); }
    dragging = false;
  };
  wrap.addEventListener('pointerdown', (e) => {
    e.preventDefault(); wrap.focus();
    startY = e.clientY; startVal = values[k];
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
  wrap.addEventListener('keydown', (e) => {
    let s = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') s = e.shiftKey ? 0.05 : 0.01;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') s = e.shiftKey ? -0.05 : -0.01;
    else if (e.key === 'Home') { values[k] = 1; e.preventDefault(); paint(); syncSidebar(k); commit(); return; }
    else if (e.key === 'End') { values[k] = 0; e.preventDefault(); paint(); syncSidebar(k); commit(); return; }
    else return;
    e.preventDefault(); values[k] = clamp01(values[k] + s); paint(); syncSidebar(k); commit();
  });
  return wrap;
}

function makeSwitch(k) {
  const p = PARAMS[k];
  const wrap = document.createElement('div');
  wrap.className = 'sw'; wrap.tabIndex = 0; wrap.setAttribute('role', 'button');
  const nub = document.createElement('div'); nub.className = 'sw-nub';
  wrap.appendChild(nub);
  const paint = () => {
    const idx = Math.round(values[k] * (p.options.length - 1));
    const pad = 14, range = 100 - 24 - pad * 2;
    nub.style.top = (pad + (p.options.length > 1 ? idx / (p.options.length - 1) : 0) * range) + '%';
    wrap.setAttribute('aria-label', `${p.label}: ${p.options[idx]}`);
  };
  paint(); wrap._paint = paint;
  const cycle = () => { const idx = Math.round(values[k] * (p.options.length - 1)); values[k] = ((idx + 1) % p.options.length) / (p.options.length - 1); paint(); syncSidebar(k); commit(); };
  wrap.addEventListener('click', cycle);
  wrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cycle(); } });
  return wrap;
}

function makeSlider(k) {
  const wrap = document.createElement('div');
  wrap.className = 'sld'; wrap.tabIndex = 0; wrap.setAttribute('role', 'slider');
  wrap.setAttribute('aria-label', PARAMS[k].label);
  const fill = document.createElement('div'); fill.className = 'sld-fill';
  const handle = document.createElement('div'); handle.className = 'sld-handle';
  const read = document.createElement('div'); read.className = 'knob-read';
  wrap.appendChild(fill); wrap.appendChild(handle); wrap.appendChild(read);
  const paint = () => { const pct = values[k] * 100; handle.style.bottom = pct + '%'; fill.style.height = pct + '%'; read.textContent = `${Math.round(values[k] * 100)}%`; };
  paint(); wrap._paint = paint;

  let dragging = false;
  const apply = (e) => { const r = wrap.getBoundingClientRect(); values[k] = clamp01(1 - (e.clientY - r.top) / r.height); paint(); syncSidebar(k); };
  const move = (e) => { if (!dragging) { dragging = true; wrap.classList.add('dragging'); } apply(e); };
  const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); if (dragging) { wrap.classList.remove('dragging'); commit(); } dragging = false; };
  wrap.addEventListener('pointerdown', (e) => { e.preventDefault(); wrap.focus(); apply(e); dragging = true; wrap.classList.add('dragging'); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); });
  wrap.addEventListener('keydown', (e) => {
    let s = 0;
    if (e.key === 'ArrowUp') s = e.shiftKey ? 0.05 : 0.01;
    else if (e.key === 'ArrowDown') s = e.shiftKey ? -0.05 : -0.01;
    else return;
    e.preventDefault(); values[k] = clamp01(values[k] + s); paint(); syncSidebar(k); commit();
  });
  return wrap;
}

// ── jacks + patch cables ────────────────────────────────
function renderJacks() {
  const layer = document.getElementById('jacklayer');
  layer.innerHTML = '<svg class="cables" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>';
  for (const [k, p] of Object.entries(PARAMS)) {
    if (p.type !== 'jack') continue;
    const j = document.createElement('div');
    j.className = 'jack jack--' + p.direction;
    j.style.left = p.x + '%'; j.style.top = p.y + '%';
    j.dataset.jack = k;
    j.title = '';
    const tip = makeTip(p); tip.classList.add('tip-jack');
    j.appendChild(tip);
    j.addEventListener('pointerdown', jackDown);
    layer.appendChild(j);
  }
  drawCables();
}

function jackConnected(k) {
  const p = PARAMS[k];
  if (p.direction === 'out') return Array.isArray(values[k]) && values[k].length > 0;
  return values[k] != null;
}

function drawCables(preview) {
  const svg = document.querySelector('.cables');
  if (!svg) return;
  let paths = '';
  const cablePath = (a, b) => { const dx = Math.abs(b.x - a.x) * 0.45; return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`; };
  for (const [k, p] of Object.entries(PARAMS)) {
    if (p.type !== 'jack' || p.direction !== 'out' || !Array.isArray(values[k])) continue;
    values[k].forEach(t => { const tp = PARAMS[t]; if (tp) paths += `<path d="${cablePath(p, tp)}" class="cable"/>`; });
  }
  if (preview) paths += `<path d="${cablePath(preview.from, preview.to)}" class="cable cable--preview"/>`;
  svg.innerHTML = paths;
  document.querySelectorAll('.jack').forEach(j => j.classList.toggle('connected', jackConnected(j.dataset.jack)));
}

let dragJack = null;
function jackDown(e) {
  const el = e.currentTarget; const key = el.dataset.jack; const p = PARAMS[key];
  if (p.direction === 'in') {
    if (values[key]) { const src = values[key]; values[src] = (values[src] || []).filter(x => x !== key); if (!values[src].length) values[src] = []; values[key] = null; drawCables(); commit(); }
    return;
  }
  if (Array.isArray(values[key]) && values[key].length) { values[key].forEach(t => values[t] = null); values[key] = []; drawCables(); commit(); return; }
  e.preventDefault();
  dragJack = { key, from: { x: p.x, y: p.y } };
  const cont = document.getElementById('panelInner');
  const move = (ev) => { const r = cont.getBoundingClientRect(); drawCables({ from: dragJack.from, to: { x: (ev.clientX - r.left) / r.width * 100, y: (ev.clientY - r.top) / r.height * 100 } }); };
  const up = (ev) => {
    window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
    const target = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.jack');
    if (target) { const tk = target.dataset.jack; const tp = PARAMS[tk]; if (tp && tp.direction === 'in' && values[tk] == null) { values[key] = [...(values[key] || []), tk]; values[tk] = key; commit(); } }
    dragJack = null; drawCables();
  };
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
}

// ── sidebar ─────────────────────────────────────────────
function renderSidebar() {
  const side = document.getElementById('sidebarInner');
  const groups = {};
  for (const [k, p] of Object.entries(PARAMS)) (groups[p.group] = groups[p.group] || []).push(k);
  let html = '';
  for (const g of GROUP_ORDER) {
    if (!groups[g]) continue;
    html += `<div class="pgroup"><div class="pgroup-h"><span>${g}</span><span class="pgroup-c">${groups[g].length}</span></div>`;
    for (const k of groups[g]) html += `<div class="prow" data-row="${k}"><span class="prow-l">${PARAMS[k].label}</span><span class="prow-v">${displayValue(k)}</span></div>`;
    html += '</div>';
  }
  side.innerHTML = html;
  document.querySelectorAll('.prow').forEach(r => r.classList.toggle('mod', isModified(r.dataset.row)));
}
function syncSidebar(k) {
  const row = document.querySelector(`.prow[data-row="${k}"]`);
  if (row) { row.querySelector('.prow-v').textContent = displayValue(k); row.classList.toggle('mod', isModified(k)); }
}

// ── undo / reset / share / commit ───────────────────────
function commit() {
  undoStack.push(JSON.stringify(values));
  if (undoStack.length > 60) undoStack.shift();
  document.getElementById('undoBtn').disabled = undoStack.length === 0;
  writeUrl();
}
function snapshot() { return JSON.stringify(values); }
function undo() {
  if (!undoStack.length) return;
  values = JSON.parse(undoStack.pop());
  document.getElementById('undoBtn').disabled = undoStack.length === 0;
  repaintAll(); writeUrl();
}
function reset() {
  if (!window.confirm('Reset all parameters to default?')) return;
  undoStack.push(snapshot()); values = defaults(); repaintAll(); writeUrl();
  document.getElementById('undoBtn').disabled = undoStack.length === 0;
}
function repaintAll() {
  document.querySelectorAll('.ctl').forEach(c => { const w = c.querySelector('.knob,.sw,.sld'); if (w && w._paint) w._paint(); });
  drawCables(); renderSidebar();
}
function writeUrl() {
  const qs = encodeState();
  history.replaceState(null, '', `#/editor?${qs}`);
  const u = document.getElementById('shareUrl'); if (u) u.value = location.href;
}

async function share() {
  const btn = document.getElementById('shareBtn');
  try { await navigator.clipboard.writeText(location.href); } catch (e) { /* noop */ }
  const old = btn.textContent; btn.textContent = 'copied ✓'; btn.classList.add('ok');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('ok'); }, 1400);
}

// ── routing ─────────────────────────────────────────────
function showEditor() {
  document.getElementById('landing').hidden = true;
  document.getElementById('editor').hidden = false;
  document.getElementById('presetInput').value = presetName;
  renderPanel(); renderSidebar(); writeUrl();
}
function showLanding() {
  document.getElementById('editor').hidden = true;
  document.getElementById('landing').hidden = false;
  history.replaceState(null, '', '#/');
}
function route() {
  const h = location.hash || '#/';
  if (h.startsWith('#/editor')) {
    const qs = h.includes('?') ? h.split('?')[1] : '';
    const ok = decodeState(qs);
    document.getElementById('decodeErr').hidden = ok || !qs;
    showEditor();
  } else {
    values = defaults(); showLanding();
  }
}

// ── boot ────────────────────────────────────────────────
function boot() {
  values = defaults();
  document.getElementById('undoBtn').addEventListener('click', undo);
  document.getElementById('resetBtn').addEventListener('click', reset);
  document.getElementById('shareBtn').addEventListener('click', share);
  document.getElementById('navHome').addEventListener('click', (e) => { e.preventDefault(); presetName = 'init patch'; location.hash = '#/'; });
  document.querySelectorAll('[data-open-editor]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); presetName = 'init patch'; values = defaults(); undoStack = []; location.hash = '#/editor'; }));
  const pin = document.getElementById('presetInput');
  pin.addEventListener('input', () => { presetName = pin.value || 'init patch'; writeUrl(); });

  // theme + accent (tsu brand motifs)
  const ACCENTS = ['oklch(0.55 0.13 255)', 'oklch(0.6 0.14 145)', 'oklch(0.62 0.15 35)', 'oklch(0.58 0.12 310)'];
  let ai = 0;
  document.getElementById('accentBtn').addEventListener('click', () => { ai = (ai + 1) % ACCENTS.length; document.documentElement.style.setProperty('--primary', ACCENTS[ai]); });
  document.getElementById('themeBtn').addEventListener('click', () => { document.documentElement.classList.toggle('dark'); });

  window.addEventListener('hashchange', route);
  route();
}
document.addEventListener('DOMContentLoaded', boot);
