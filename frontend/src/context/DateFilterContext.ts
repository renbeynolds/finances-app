import { createContext } from 'react';

export const DateFilterContext = createContext<[Date | null, Date | null]>([
  null,
  null,
]);

export const SetDateFilterContext = createContext<
  React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>
>(() => [null, null]);
