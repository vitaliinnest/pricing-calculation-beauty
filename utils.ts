export function roundNumber(num: number): number {
  return Math.round(num * 100) / 100;
}

export function roundEuro(num: number): number {
  return Math.ceil(num * 100) / 100;
}
