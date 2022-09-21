export const roundUpToNearestN = (num: number, nearest: number): number => {
  return Math.ceil(num / nearest) * nearest;
};
