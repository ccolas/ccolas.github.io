// Recorded instruments from VSCO 2 Community Edition (CC0), softened offline.
// Attack marks the measured energy peak used to align each sound with the ball.
export const SOUND_OPTIONS = [
  { id: 'wood', name: 'Muted wood', description: 'A low recorded marimba note, softened and allowed to resonate.', file: '/audio/emdr/wood.wav', attack: 0.19 },
] as const;
export type SoundId = typeof SOUND_OPTIONS[number]['id'];

// Follow the estimated output clock, including the browser's playback latency.
export function outputClock(context: AudioContext, performanceTime: number): number {
  const stamp = context.getOutputTimestamp?.();
  if (stamp?.contextTime && stamp.performanceTime) {
    return Math.min(context.currentTime, stamp.contextTime + (performanceTime - stamp.performanceTime) / 1000);
  }
  return context.currentTime - (context.baseLatency || 0) - (context.outputLatency || 0);
}
