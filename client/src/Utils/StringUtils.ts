import moment from 'moment';

export const capitalized = (input: string): string => {
  const words = input.split(' ');
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
};

export const formatMonthString = (input: string): string =>
  moment(input).format('MMM YYYY');

export const formatDayString = (input: string): string =>
  moment(input).format('MMM, DD YYYY');
