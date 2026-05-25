import { AccountType } from "../data/InvestmentAccounts/types";

/**
 * Generates a normally distributed random number using the Box-Muller transform.
 *
 * @param mean The expected value (e.g., 0.07 for 7%)
 * @param stdDev The standard deviation (e.g., 0.15 for 15%)
 * @returns A randomly generated number from the normal distribution
 */
export function generateNormalRandom(mean: number, stdDev: number): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

export type AccountState = {
  balance: number;
  annualContribution: number;
  expectedAnnualReturn: number;
  annualVolatility?: number; // e.g., 0.15 for 15%
  accountType: AccountType;
};

export type SimulationResult = {
  year: number;
  // Outer array: one entry per account. Inner array: one balance per iteration.
  accountBalances: number[][];
};

const withdrawalOrder: AccountType[] = ["TAXABLE", "PRE_TAX", "ROTH"];

/**
 * Runs a Monte Carlo simulation for portfolio growth and decumulation,
 * tracking each account's balance independently. During retirement, accounts
 * are drawn down sequentially in the order they are provided — the first
 * account is fully drained before withdrawals begin from the next.
 *
 * @param accounts The initial state of the investment accounts
 * @param currentAge The user's current age
 * @param retirementAge The user's target retirement age
 * @param annualWithdrawalCents The annual withdrawal amount during retirement (in cents)
 * @param iterations The number of simulation paths to run (default 1000)
 */
export function runMonteCarloSimulation(
  accounts: AccountState[],
  currentAge: number,
  retirementAge: number,
  annualWithdrawalCents: number,
  iterations: number = 1000,
): SimulationResult[] {

  // Sort accounts by prefered withdrawl order
  const sortedAccounts = accounts.sort((a, b) => {
      const typePriority = withdrawalOrder.indexOf(a.accountType) - withdrawalOrder.indexOf(b.accountType);
      if (typePriority !== 0) return typePriority;
      return a.balance - b.balance;
    });

  const years = Math.max(0, 100 - currentAge);
  const results: SimulationResult[] = [];

  for (let y = 0; y <= years; y++) {
    results.push({
      year: currentAge + y,
      // One inner array per account, each pre-filled with `iterations` zeros
      accountBalances: accounts.map(() => new Array(iterations).fill(0)),
    });
  }

  for (let i = 0; i < iterations; i++) {
    let currentAccounts = sortedAccounts.map((a) => ({ ...a }))

    for (let y = 0; y <= years; y++) {
      const age = currentAge + y;

      // --- Growth & contribution phase ---
      for (const a of currentAccounts) {
        const volatility = a.annualVolatility ?? 0.15;
        const randomReturn = generateNormalRandom(
          a.expectedAnnualReturn,
          volatility,
        );
        a.balance = a.balance * (1 + randomReturn);
        if (age < retirementAge) {
          a.balance += a.annualContribution;
        }
      }

      // --- Withdrawal phase (sequential across accounts, by type then balance) ---
      if (age >= retirementAge) {
        let remainingWithdrawal = annualWithdrawalCents;

        for (const a of currentAccounts) {
          if (remainingWithdrawal <= 0) break;

          if (a.balance >= remainingWithdrawal) {
            a.balance -= remainingWithdrawal;
            remainingWithdrawal = 0;
          } else {
            remainingWithdrawal -= a.balance;
            a.balance = 0;
          }
        }
      }

      // --- Record each account's balance for this iteration ---
      for (let a = 0; a < currentAccounts.length; a++) {
        results[y].accountBalances[a][i] = Math.max(
          0,
          Math.round(currentAccounts[a].balance),
        );
      }
    }
  }

  return results;
}
