export type AccountType = "TAXABLE" | "ROTH" | "PRE_TAX";

export type InvestmentAccount = {
  id: number;
  name: string;
  balance: number;
  updatedAt: string;
  includeInRetirement: boolean;
  annualContribution: number;
  expectedAnnualReturn: number;
  annualVolatility: number;
  accountType: AccountType;
};
