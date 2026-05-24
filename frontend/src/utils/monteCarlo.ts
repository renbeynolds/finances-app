/**
 * Generates a normally distributed random number using the Box-Muller transform.
 * 
 * @param mean The expected value (e.g., 0.07 for 7%)
 * @param stdDev The standard deviation (e.g., 0.15 for 15%)
 * @returns A randomly generated number from the normal distribution
 */
export function generateNormalRandom(mean: number, stdDev: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

export type AccountState = {
  balance: number;
  annualContribution: number;
  expectedAnnualReturn: number;
  annualVolatility?: number; // e.g., 0.15 for 15%
};

export type SimulationResult = {
  year: number;
  balances: number[]; // the total balance for each iteration in this year
};

/**
 * Runs a Monte Carlo simulation for portfolio growth and decumulation.
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
  iterations: number = 1000
): SimulationResult[] {
  const years = Math.max(0, 100 - currentAge);
  const results: SimulationResult[] = [];
  
  // Initialize results array for each year
  for (let y = 0; y <= years; y++) {
    results.push({ year: currentAge + y, balances: new Array(iterations).fill(0) });
  }

  for (let i = 0; i < iterations; i++) {
    // Clone initial account states for this iteration
    let currentAccounts = accounts.map(a => ({ ...a }));
    
    for (let y = 0; y <= years; y++) {
      let yearTotal = 0;
      const age = currentAge + y;

      for (const a of currentAccounts) {
        // Generate a random return based on account's expected return and volatility
        // Default volatility to 15% (0.15) if not provided
        const volatility = a.annualVolatility ?? 0.15;
        const randomReturn = generateNormalRandom(a.expectedAnnualReturn, volatility);
        
        a.balance = a.balance * (1 + randomReturn);
        
        if (age < retirementAge) {
          a.balance += a.annualContribution;
        }
        
        yearTotal += a.balance;
      }
      
      // Apply withdrawal logic with floor constraint (preventing negative compounding bug)
      if (age >= retirementAge) {
        if (yearTotal > 0) {
          if (yearTotal >= annualWithdrawalCents) {
             for (const a of currentAccounts) {
               a.balance -= annualWithdrawalCents * (a.balance / yearTotal);
             }
             yearTotal -= annualWithdrawalCents;
          } else {
             // If we can't support full withdrawal, drain all accounts to zero
             for (const a of currentAccounts) {
               a.balance = 0;
             }
             yearTotal = 0;
          }
        } else {
          yearTotal = 0;
        }
      }
      
      results[y].balances[i] = Math.max(0, Math.round(yearTotal));
    }
  }

  return results;
}
