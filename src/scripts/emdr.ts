import { outputClock, SOUND_OPTIONS, type SoundId } from './emdr-audio';

// A single Web Audio clock drives both the dot and the stereo endpoint tones.
const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const input = (id: string) => el<HTMLInputElement>(id);
const start = el<HTMLButtonElement>('start');
const stop = el<HTMLButtonElement>('stop');
const feedback = el('feedback');
const ball = el('ball');
const rail = el('drawer-rail');
const panel = el('settings-panel');
const toggle = el<HTMLButtonElement>('settings-toggle');
let pinned = false;
function showSettings(open: boolean) {
  rail.classList.toggle('open', open);
  panel.inert = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close settings' : 'Open settings');
}
function explain(message: string) {
  feedback.textContent = message;
  pinned = true;
  showSettings(true);
}
let closeTimer: ReturnType<typeof setTimeout> | undefined;
function cancelClose() { clearTimeout(closeTimer); }
function closeSettings() {
  cancelClose();
  pinned = false;
  showSettings(false);
}
rail.addEventListener('pointerenter', event => {
  if (event.pointerType !== 'mouse') return;
  cancelClose();
  showSettings(true);
});
rail.addEventListener('pointerleave', event => {
  if (event.pointerType !== 'mouse' || pinned) return;
  cancelClose();
  closeTimer = setTimeout(() => { if (!pinned) showSettings(false); }, 180);
});
panel.addEventListener('pointerdown', () => { cancelClose(); pinned = true; });
toggle.addEventListener('click', () => {
  cancelClose();
  pinned = !pinned;
  showSettings(pinned);
});
el('settings-close').addEventListener('click', () => { toggle.focus(); closeSettings(); });
toggle.addEventListener('focus', () => { cancelClose(); showSettings(true); });
document.addEventListener('pointerdown', event => {
  if (!rail.contains(event.target as Node)) closeSettings();
});
document.addEventListener('focusin', event => {
  if (!rail.contains(event.target as Node)) closeSettings();
});
const duration = input('duration');
document.querySelectorAll<HTMLButtonElement>('[data-duration]').forEach(button => {
  button.addEventListener('click', () => {
    duration.value = button.dataset.duration!;
    document.querySelectorAll<HTMLButtonElement>('[data-duration]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    if (elapsed > 0) {
      feedback.textContent = 'Restart uses the selected length. Resume continues the paused set.';
      render();
    } else halt('Session length updated. Start when comfortable.', true);
  });
});
let context: AudioContext | undefined;
let running = false;
let starting = false;
let elapsed = 0;
let activeDuration = Number(duration.value);
let origin = 0;
let nextTone = 0;
let frame = 0;
let scheduler: ReturnType<typeof setInterval> | undefined;
let generation = 0;
const voices = new Map<AudioBufferSourceNode, GainNode>();
const selectedSound: SoundId = 'wood';
const pulseBuffers = new Map<SoundId, AudioBuffer>();
const sampleLoads = new Map<SoundId, Promise<AudioBuffer>>();
const soundDefinition = () => SOUND_OPTIONS.find(sound => sound.id === selectedSound)!;
async function loadSound(id: SoundId) {
  if (pulseBuffers.has(id)) return;
  let pending = sampleLoads.get(id);
  if (!pending) {
    const audioContext = context!;
    const file = SOUND_OPTIONS.find(sound => sound.id === id)!.file;
    pending = fetch(file).then(response => {
      if (!response.ok) throw new Error('Sound could not load');
      return response.arrayBuffer();
    }).then(bytes => audioContext.decodeAudioData(bytes));
    sampleLoads.set(id, pending);
  }
  try { pulseBuffers.set(id, await pending); }
  finally { sampleLoads.delete(id); }
}
const rate = () => Number(input('speed').value);
const limit = () => running || starting || elapsed > 0 ? activeDuration : Number(duration.value);
const now = () => context?.currentTime ?? performance.now() / 1000;
const playbackNow = () => context && input('audio').checked ? outputClock(context, performance.now()) : now();
const position = () => elapsed + (running ? Math.max(0, playbackNow() - origin) : 0);

function pulse(side: number, when: number) {
  if (!context || Number(input('volume').value) === 0) return;
  const pulseBuffer = pulseBuffers.get(selectedSound);
  if (!pulseBuffer) return;
  const source = context.createBufferSource();
  source.buffer = pulseBuffer;
  const gain = context.createGain();
  gain.gain.value = Number(input('volume').value) / 100 * 0.45;
  const pan = context.createStereoPanner();
  pan.pan.value = side;
  source.connect(gain).connect(pan).connect(context.destination);
  voices.set(source, gain);
  source.onended = () => { voices.delete(source); source.disconnect(); gain.disconnect(); pan.disconnect(); };
  source.start(when);
}
function silence() {
  for (const [voice, gain] of voices) {
    try {
      const stopTime = context!.currentTime;
      gain.gain.setTargetAtTime(0, stopTime, 0.006);
      voice.stop(stopTime + 0.03);
    } catch {}
  }
  voices.clear();
}
async function prepareAudio() {
  if (!context || context.state === 'closed') {
    context = new AudioContext({ latencyHint: 'interactive' });
    pulseBuffers.clear();
    sampleLoads.clear();
  }
  // Called directly by Test/Run, so Chrome receives the user gesture.
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      context.resume(),
      new Promise<never>((_, reject) => { timeout = setTimeout(() => reject(new Error('Audio activation timed out')), 2500); })
    ]);
  } finally { clearTimeout(timeout); }
  if (context.state !== 'running') throw new Error('Audio is unavailable');
  await loadSound(selectedSound);
  el('audio-status').textContent = Number(input('volume').value) === 0 ? 'Tone volume is at zero. Raise it to hear sound.' : 'Browser audio enabled. If silent, check “No sound?” below.';
}
function render() {
  const seconds = position();
  const remaining = Math.max(0, Math.ceil(limit() - seconds));
  el('remaining').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')} remaining`;
  // Start on the left; cosine gives a gentle turn at each endpoint.
  const offset = (running || elapsed > 0) ? -Math.cos(seconds * rate() * 2 * Math.PI) : 0;
  // Leave the collapsed settings handle plus a small gap clear on both sides.
  const edgeInset = toggle.offsetWidth + 16;
  const travel = Math.max(0, el('track').clientWidth - ball.offsetWidth - edgeInset * 2) * Number(input('width').value) / 100;
  const path = document.querySelector<HTMLElement>('.line')!;
  path.style.width = `${travel + ball.offsetWidth}px`;
  path.hidden = !input('visual').checked;
  ball.style.left = `calc(50% + ${offset * travel / 2}px)`;
  ball.style.visibility = input('visual').checked ? 'visible' : 'hidden';
}
function controls() {
  document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('.settings input, .settings select').forEach(control => { control.disabled = running || starting; });
  ['test-left', 'test-right', 'default-speed', 'default-width', 'preview-sound'].forEach(id => { el<HTMLButtonElement>(id).disabled = running || starting; });
  stop.disabled = !running && !starting && elapsed === 0;
  stop.hidden = !running && !starting && elapsed === 0;
  const paused = !running && !starting && elapsed > 0;
  el('duration-choice').hidden = running || starting;
  duration.disabled = running || starting;
  document.querySelectorAll<HTMLButtonElement>('[data-duration]').forEach(button => { button.disabled = running || starting; });
  el('remaining').hidden = !paused;
  stop.textContent = paused ? 'Restart' : 'Stop';
  stop.setAttribute('aria-label', paused ? 'Restart from the beginning' : 'Stop and reset');
  start.textContent = starting ? 'Preparing…' : running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Run';
  start.disabled = starting;
  el('stage-hint').textContent = input('visual').checked ? 'Sit comfortably. Let your eyes follow the ball.' : 'Sit comfortably. Notice the alternating tones.';
}
function halt(message: string, reset = false) {
  generation++;
  elapsed = position();
  running = false;
  starting = false;
  cancelAnimationFrame(frame);
  clearInterval(scheduler);
  silence();
  if (reset) elapsed = 0;
  render();
  controls();
  feedback.textContent = message;
}
function finish() {
  halt('Set complete. Feel your feet, look around the room, and check how you feel. Continue only when you choose.', true);
}
function schedule() {
  if (!running) return;
  if (position() >= limit()) { finish(); return; }
  if (!input('audio').checked || !context) return;
  // Schedule on the processing clock, including the pre-roll before time zero.
  const seconds = elapsed + context.currentTime - origin;
  const interval = 1 / (2 * rate());
  // Skip missed beats instead of playing a burst after a stalled browser.
  nextTone = Math.max(nextTone, Math.ceil((seconds + soundDefinition().attack - 0.01) / interval));
  while (nextTone * interval < Math.min(seconds + soundDefinition().attack + 0.12, limit())) {
    // Begin the soft attack early so its fullest point coincides with the edge.
    pulse(nextTone % 2 === 0 ? -1 : 1, Math.max(context.currentTime, origin + nextTone * interval - elapsed - soundDefinition().attack));
    nextTone++;
  }
}
function animate() {
  if (!running) return;
  render();
  if (position() >= limit()) { finish(); return; }
  frame = requestAnimationFrame(animate);
}
start.addEventListener('click', async () => {
  if (running) { halt('Paused. Resume when comfortable, or end the set.'); return; }
  if (!input('visual').checked && !input('audio').checked) input('visual').checked = true;
  if (elapsed === 0) activeDuration = Number(duration.value);
  const request = ++generation;
  starting = true;
  controls();
  try {
    if (input('audio').checked) await prepareAudio();
    if (request !== generation || document.hidden) { if (request === generation) halt('Paused because the page is hidden.'); return; }
    silence();
    origin = now() + (input('audio').checked ? soundDefinition().attack + 0.12 : 0.05);
    nextTone = Math.ceil(elapsed * 2 * rate());
    running = true;
    starting = false;
    pinned = false;
    showSettings(false);
    controls();
    feedback.textContent = 'You can pause or stop whenever you need.';
    scheduler = setInterval(schedule, 25);
    schedule();
    animate();
  } catch {
    halt('Sound could not start. Check your browser’s audio permissions, or turn off alternating sound to use the dot.');
    explain(feedback.textContent!);
  }
});
stop.addEventListener('click', () => {
  const restart = !running && !starting && elapsed > 0;
  halt('Set ended. Look around, feel your feet, and take a moment before continuing.', true);
  if (restart) start.click();
});
async function previewSound() {
  const request = ++generation;
  try {
    await prepareAudio();
    if (request !== generation || running || starting || document.hidden) return;
    silence();
    pulse(-1, context!.currentTime + 0.03);
    pulse(1, context!.currentTime + 1.2);
    el('audio-status').textContent = `Previewing ${SOUND_OPTIONS.find(sound => sound.id === selectedSound)!.name}: left, then right.`;
  } catch { el('audio-status').textContent = 'Audio could not start. Check “No sound?” below.'; }
}
el('preview-sound').addEventListener('click', () => { void previewSound(); });
for (const [id, side] of [['test-left', -1], ['test-right', 1]] as const) {
  el(id).addEventListener('click', async () => {
    const request = ++generation;
    try {
      await prepareAudio();
      if (request !== generation || running || starting || document.hidden) return;
      silence();
      pulse(side, context!.currentTime + 0.03);
      pulse(side, context!.currentTime + 1.2);
      feedback.textContent = `Playing two tones on the ${side === -1 ? 'left' : 'right'}. You should hear them only in that ear.`;
    } catch {
      feedback.textContent = 'Audio could not be enabled. Check “No sound?” below or try this URL in a regular Chrome tab.';
      el('audio-status').textContent = 'Browser audio is blocked or unavailable.';
    }
  });
}
['speed', 'width', 'volume', 'visual', 'audio'].forEach(id => {
  el(id).addEventListener('input', () => {
    if (id !== 'volume') halt('Settings updated. Start a new set when comfortable.', true);
    if ((id === 'visual' || id === 'audio') && !input('visual').checked && !input('audio').checked) input(id).checked = true;
    el('speed-value').textContent = `${rate().toFixed(2)} cycles/s`;
    el('pace-detail').textContent = `${(1 / rate()).toFixed(2).replace(/0+$/, '').replace(/\.$/, '')} seconds for left → right → left.`;
    el('width-value').textContent = `${input('width').value}%`;
    el('volume-value').textContent = `${input('volume').value}%`;
    render();
  });
});
for (const [id, value] of [['speed', '0.5'], ['width', '100']] as const) {
  el(`default-${id}`).addEventListener('click', () => {
    input(id).value = value;
    input(id).dispatchEvent(new Event('input', { bubbles: true }));
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) halt('Paused because you left the page. Resume when ready.');
});
window.addEventListener('pagehide', () => halt('Set stopped.', true));
document.addEventListener('keydown', event => {
  if (event.code === 'Escape') { closeSettings(); halt('Set ended. Take a moment to notice your surroundings.', true); }
  if (event.code === 'Space' && !event.repeat && !['INPUT', 'SELECT', 'BUTTON', 'SUMMARY', 'A', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
    event.preventDefault();
    start.click();
  }
});
el('fullscreen').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { feedback.textContent = 'Full screen is unavailable in this browser. You can use the tool in this view.'; }
});
document.addEventListener('fullscreenchange', () => { el('fullscreen').textContent = document.fullscreenElement ? 'Exit full screen ↙' : 'Full screen ↗'; });
window.addEventListener('resize', render);
render();
controls();
