export interface CreateAccountCMD {
  name: string;
  dateHeader: string;
  descriptionHeader: string;
  amountHeader: string;
  amountsType: 'negamtexp' | 'posamtexp' | 'septypecol';
  startingAmount: number;
  color: string;
}
