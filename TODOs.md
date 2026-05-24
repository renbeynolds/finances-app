Based on an inspection of frontend/src/components/Retirement.tsx and frontend/src/components/Accounts/FutureValueChart.tsx, here is a comprehensive critique of the current financial models along with recommendations for improvement.

1. Deterministic vs. Stochastic Returns (Sequence of Returns Risk)
   Critique: Both models rely on a single, static expectedAnnualReturn (e.g., a straight 7% every year for decades). While useful for a basic benchmark, this ignores market volatility. In financial planning, the "sequence of returns risk" is critical: if a retiree experiences a market downturn in the first few years of retirement, the portfolio depletes much faster than a straight-line average would suggest, leading to a drastically higher risk of ruin. Improvement: Implement a Monte Carlo simulation. Instead of straight-line growth, run hundreds of randomized simulations based on historical market volatility (standard deviation) and expected mean returns. The output could show a "Probability of Success" (e.g., an 85% chance of the portfolio surviving to age 95) or a confidence band (10th, 50th, 90th percentiles).

2. Inflation & Purchasing Power
   Critique: The models currently calculate strictly in nominal dollars. The user inputs a fixed "Monthly Withdrawal" (e.g., $25,000), and the script subtracts that exact amount every year until age 100. However, due to inflation, $25,000 thirty years from now will have significantly less purchasing power than it does today. Improvement: Allow users to factor in an inflation rate (e.g., 2.5% to 3%).

Method A: Automatically increase the withdrawal amount every year by the inflation rate to maintain purchasing power.
Method B: Ask the user for a "Real Return Rate" (Nominal Return - Inflation) so that the chart's output is presented in today's purchasing power. 3. Tax Efficiency and Withdrawal Sequencing
Critique: In Retirement.tsx, when the user reaches retirement age, the model fulfills the withdrawal requirement by taking money proportionally across all investment accounts (a.balance -= annualWithdrawalCents \* (a.balance / yearTotal);). This is financially inefficient. Furthermore, it assumes $1 withdrawn equals $1 in the user's pocket. If an account is tax-deferred (like a Traditional 401k), the user must withdraw a larger gross amount to yield the desired net spendable cash after taxes. Improvement: Add an "Account Tax Type" flag (Taxable Brokerage, Pre-Tax/Traditional, Tax-Free/Roth). Implement withdrawal sequencing logic:

Deplete taxable accounts first (to allow tax-advantaged accounts to grow longer).
Deplete tax-deferred accounts next.
Deplete tax-free (Roth) accounts last. Include an estimated effective tax rate to calculate the required gross withdrawal for pre-tax accounts. 4. Cash Flow Timing (Intra-Year Compounding)
Critique: In both scripts, the math calculates the annual return on the starting balance, and then adds the contribution or subtracts the withdrawal at the end of the year.

typescript
// From FutureValueChart.tsx
balance = balance \* (1 + annualReturnRate) + annualContributionCents;
In reality, users contribute to and withdraw from their portfolios on a monthly or bi-weekly basis. Improvement: Adjust the compounding math to reflect monthly cash flows. Because contributions don't wait until December 31st to be invested, they should benefit from intra-year compounding. Conversely, monthly withdrawals will reduce the capital base earlier in the year, slightly reducing the total interest earned.

5. Missing External Income Sources
   Critique: The model assumes the portfolio must fund 100% of the user's retirement expenses. Improvement: Allow users to input fixed income streams such as Social Security, pensions, or rental income, including a start age for each. If a user needs $10,000/month but receives $3,000/month from Social Security starting at age 67, the portfolio only needs to cover the $7,000 gap, which drastically extends the life of the portfolio.

6. Static Asset Allocation (Glide Paths)
   Critique: The model assumes the expectedAnnualReturn will remain exactly the same from the user's current age until age 100. Improvement: Realistically, investors transition to more conservative portfolios (heavier in bonds) as they approach and enter retirement, which lowers their expected returns but also lowers volatility. Allow the model to automatically step down the expected return rate over time, simulating a Target Date Fund "glide path".

7. Code Bug: Negative Compounding
   Critique: In Retirement.tsx, if the portfolio runs out of money (yearTotal is less than annualWithdrawalCents), the model subtracts the full withdrawal anyway, sending account balances into the negative. In subsequent years, the script applies the expectedAnnualReturn to these negative balances (a.balance = a.balance \* (1 + a.expectedAnnualReturn)), simulating mounting margin debt. Improvement: Add a floor constraint. If yearTotal cannot support the withdrawal, the balances should bottom out at exactly 0 and stop compounding negatively.

8. Add "Tax Treatment" to Account Models
   You should add a property to the InvestmentAccount model to designate its tax status. There are three primary buckets:

Pre-Tax / Tax-Deferred (e.g., Traditional 401k, Traditional IRA)
Tax-Free (e.g., Roth IRA, Roth 401k)
Taxable (e.g., Standard Brokerage Account) 2. The Accumulation Phase (Tax Drag)
During the years leading up to retirement, taxes impact how fast these accounts grow.

Tax-Advantaged (Pre-Tax & Roth): These grow completely tax-free. If the expected return is 7%, the account grows at 7%.
Taxable Accounts: These suffer from "tax drag." Every year, dividends, interest, and realized capital gains are taxed, which reduces the effective compound growth rate. If the gross return is 7%, the net return might be 5.5% or 6% after taxes. Your model should ideally allow a lower expectedAnnualReturn for taxable accounts, or automatically apply an estimated annual "tax drag" percentage to them. 3. The Decumulation Phase (Gross vs. Net Withdrawals)
This is where the biggest changes to your Retirement.tsx logic need to happen. Right now, your model assumes a $1 withdrawal reduces the account by $1 and puts $1 in the user's pocket. If a user wants $25,000/month to spend (Net), the model needs to calculate the Gross withdrawal based on the account type:

Roth (Tax-Free): Withdrawing $25,000 net requires exactly a $25,000 gross withdrawal. $0 in taxes.
Pre-Tax (Ordinary Income): Every dollar withdrawn is taxed at standard income tax brackets. If their estimated effective tax rate in retirement is 20%, they must withdraw $31,250 gross to net $25,000 (25,000 / (1 - 0.20)). This depletes the account much faster than a Roth account!
Taxable (Capital Gains): Only the growth is taxed, and it's taxed at preferred Long-Term Capital Gains rates (usually 0%, 15%, or 20%). To accurately model this, the app would need to track the "cost basis" (the principal contributed) separately from the "unrealized gains." 4. Implementation: Withdrawal Sequencing Logic
Instead of draining all accounts proportionally (your current a.balance / yearTotal logic), a standard financial planning model uses sequential depletion to maximize tax efficiency. A common sequence is:

Drain Taxable Accounts First: This allows the tax-advantaged accounts to compound undisturbed for longer.
Drain Pre-Tax Accounts Second: Tap into the 401k/IRA funds and pay the ordinary income taxes.
Drain Roth Accounts Last: Because these grow completely tax-free, you want to leave them alone for as long as possible. They also make the best inheritance for heirs.
(Note: Advanced planners sometimes use a proportional strategy or fill up low tax brackets with pre-tax money and supplement with Roth money, but sequential depletion is the standard baseline model).

9. Required Minimum Distributions (RMDs)
   For highly accurate modeling, you must eventually account for RMDs. The IRS forces retirees to start taking withdrawals from Pre-Tax accounts at a certain age (currently 73-75, depending on birth year).

Even if the user's "Monthly Withdrawal" is covered by their Taxable or Roth accounts, the model must force a withdrawal from the Pre-Tax accounts based on IRS life expectancy tables.
This forced withdrawal generates taxable income, which can push the retiree into a higher tax bracket and even cause their Social Security benefits to be taxed at a higher rate.
Summary of Next Steps for the Code:
If you want to iteratively improve the model, start here:

Add an accountType (Taxable, Pre-Tax, Roth) dropdown to your table.
Add an estimatedRetirementTaxRate input to your Retirement.tsx settings (e.g., 15%).
Change the withdrawal logic to pull from Taxable first, then Pre-Tax, then Roth.
When pulling from Pre-Tax, divide the needed net withdrawal by (1 - estimatedRetirementTaxRate) to simulate paying the IRS.
