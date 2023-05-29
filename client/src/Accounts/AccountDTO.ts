export interface AccountDTO {
  id: number;
  name: string;
  dateHeader: string;
  descriptionHeader: string;
  amountHeader: string;
  startingAmount: number;
  balance: number;
  amountsType: 'negamtexp' | 'posamtexp' | 'septypecol';
  color: string;
}
