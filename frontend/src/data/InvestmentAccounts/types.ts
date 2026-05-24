export type InvestmentAccount = {
  id: number;
  name: string;
  balance: number;
  updatedAt: string;
  includeInRetirement: boolean;
  annualContribution: number;
  expectedAnnualReturn: number;
  accountType: string;
};
