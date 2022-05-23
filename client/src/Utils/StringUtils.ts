export const capitalized = (input: string): string => {
  const words = input.split(' ');
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};
