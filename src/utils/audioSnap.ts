/**
 * Synthesizes a crisp, realistic chocolate "snap" sound using the Web Audio API.
 * Uses a filtered noise burst paired with a short mechanical thud to mimic the
 * acoustic break of tempered 72% dark chocolate.
 */
export function playChocolateSnapSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    // Do not attempt to resume if suspended by browser autoplay policy
    if (ctx.state === 'suspended') {
      return;
    }

    const now = ctx.currentTime;

    // 1. Noise burst for the crisp, dry fracture crack
    const bufferSize = ctx.sampleRate * 0.12; // 120ms
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.Q.setValueAtTime(2.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // 2. Low-frequency thud for the solid bar density
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    // Trigger sound
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.12);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // Graceful fallback if audio is blocked or unsupported
  }
}
