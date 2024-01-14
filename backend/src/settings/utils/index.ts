export * from './security';
export * from './date';
export * from './fakerData';
export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
