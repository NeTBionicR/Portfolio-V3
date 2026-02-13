let ctx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return ctx;
}

/**
 * Plays a short, soft "thunk" similar to iPhone lock / screen-off sound.
 */
export function playLockClickSound(): void {
  try {
    const audioContext = getContext();
    const now = audioContext.currentTime;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);

    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore if AudioContext not allowed (e.g. before user gesture)
  }
}
