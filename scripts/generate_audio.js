const fs = require('fs');
const path = require('path');

const sampleRate = 44100;

function createWavHeader(numSamples, numChannels = 1) {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = numSamples * numChannels * 2;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // audioFormat (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bitsPerSample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

function writeWavFile(filepath, samples) {
  const numSamples = samples.length;
  const header = createWavHeader(numSamples, 1);
  const data = Buffer.alloc(numSamples * 2);

  for (let i = 0; i < numSamples; i++) {
    // Clamp to -1 to 1
    const s = Math.max(-1, Math.min(1, samples[i]));
    const int16 = s < 0 ? s * 0x8000 : s * 0x7FFF;
    data.writeInt16LE(Math.floor(int16), i * 2);
  }

  fs.writeFileSync(filepath, Buffer.concat([header, data]));
  console.log(`Generated: ${filepath} (${(numSamples / sampleRate).toFixed(2)}s)`);
}

const outDir = path.join(__dirname, '../public/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Keystroke: Sharp click with low body (0.05s)
{
  const duration = 0.06;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 90);
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 300);
    const tone = Math.sin(2 * Math.PI * 180 * t) * env * 0.5;
    samples[i] = (click * 0.6 + tone * 0.4);
  }
  writeWavFile(path.join(outDir, 'keystroke.wav'), samples);
}

// 2. Sub-bass Drone: Atmospheric cinematic rumble (8.0s)
{
  const duration = 8.0;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const fadeIn = Math.min(1, t / 1.5);
    const fadeOut = Math.min(1, (duration - t) / 1.5);
    const amp = fadeIn * fadeOut * 0.35;
    const sub = Math.sin(2 * Math.PI * 45 * t);
    const sub2 = Math.sin(2 * Math.PI * 55 * t) * 0.4;
    const sub3 = Math.sin(2 * Math.PI * 90 * t + Math.sin(t * 2)) * 0.2;
    samples[i] = (sub + sub2 + sub3) * amp;
  }
  writeWavFile(path.join(outDir, 'drone.wav'), samples);
}

// 3. Cinematic Impact: Deep sub boom (1.8s)
{
  const duration = 1.8;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 3.5);
    const freq = 120 * Math.exp(-t * 12) + 40;
    const sub = Math.sin(2 * Math.PI * freq * t);
    const punch = (Math.random() * 2 - 1) * Math.exp(-t * 60) * 0.3;
    samples[i] = (sub * 0.8 + punch) * env * 0.7;
  }
  writeWavFile(path.join(outDir, 'impact.wav'), samples);
}

// 4. Whoosh / Riser: Dynamic sweep (1.2s)
{
  const duration = 1.2;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;
    const env = Math.sin(progress * Math.PI);
    const noise = (Math.random() * 2 - 1);
    const freq = 100 + 800 * (progress * progress);
    const sweep = Math.sin(2 * Math.PI * freq * t);
    samples[i] = (noise * 0.35 + sweep * 0.65) * env * 0.45;
  }
  writeWavFile(path.join(outDir, 'whoosh.wav'), samples);
}

// 5. Score Tick: Digital crisp tick for counter (0.04s)
{
  const duration = 0.04;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 150);
    const click = Math.sin(2 * Math.PI * 1800 * t) * env;
    samples[i] = click * 0.4;
  }
  writeWavFile(path.join(outDir, 'tick.wav'), samples);
}

// 6. Success Chime: Sparkling modern chord (1.5s)
{
  const duration = 1.5;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let val = 0;
    freqs.forEach((f, idx) => {
      const delay = idx * 0.06;
      if (t > delay) {
        const localT = t - delay;
        const env = Math.exp(-localT * 3.5);
        val += Math.sin(2 * Math.PI * f * localT) * env * 0.25;
      }
    });
    samples[i] = val * 0.6;
  }
  writeWavFile(path.join(outDir, 'chime.wav'), samples);
}

// 7. Glitch / Shutter click (0.08s)
{
  const duration = 0.08;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 80);
    const snap = Math.sin(2 * Math.PI * 800 * (1 - t * 10) * t) * env;
    samples[i] = snap * 0.5;
  }
  writeWavFile(path.join(outDir, 'click.wav'), samples);
}

console.log('All procedural launch film sound cues generated successfully.');
