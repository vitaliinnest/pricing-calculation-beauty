export function roundNumber(num: number, discard?: boolean): number {
  if (discard) {
    return num;
  }
  return Math.round(num * 100) / 100;
}
