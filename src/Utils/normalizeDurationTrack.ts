export function normalizeDurationTrack(duration: number): string {
  const minutes = String(Math.trunc(duration / 1000 / 60));
  let seconds = String(Math.trunc((duration / 1000) % 60));

  if (Number(seconds) < 10) {
    seconds = '0' + seconds
  } 

  return `${minutes}:${seconds}`;
}