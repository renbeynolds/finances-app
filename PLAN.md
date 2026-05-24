# Implementation Plan: Monte Carlo Simulation for Investment Growth

This document outlines the steps to implement a stochastic (Monte Carlo) simulation to address the "Sequence of Returns Risk" mentioned in `TODOs.md` Item #1.

## 1. Data Model & Database Updates

To perform a Monte Carlo simulation, we need both a mean return and a measure of volatility (standard deviation). Currently, `InvestmentAccount` only has `ExpectedAnnualReturn`.
- **Database Entity:** Add `AnnualVolatility float64` to `entities.InvestmentAccount` (default to e.g., 0.15 representing 15% standard deviation).
- **Migration:** Create `00012_add_volatility_to_investment_accounts.sql` to add `annual_volatility DECIMAL`.
- **DTOs & Services:** Update backend DTOs (`CreateInvestmentAccountRequest`, `UpdateInvestmentAccountRequest`, `InvestmentAccountResponse`) to pass `AnnualVolatility`.
- **Frontend Types:** Add `annualVolatility: number` to the frontend `InvestmentAccount` type and API requests.

## 2. Frontend UI Updates for Volatility Input

- **InvestmentAccountForm.tsx:** Add a `NumberInput` for "Expected Annual Volatility (%)". 
- **Retirement.tsx (Table):** Add a column for Volatility next to the Expected Return column, using a custom editable cell (`VolatilityCell`) similar to `ReturnRateCell` so it can be updated directly from the retirement planner.

## 3. Understanding the Mathematics

To build a Monte Carlo simulation for market returns, we rely on the concept of a **Normal Distribution** (a "bell curve"). Market returns generally follow a bell curve over long periods.

**What is Standard Deviation (Volatility)?**
Standard deviation is a statistical measure of how dispersed the returns are from the average (the mean). 
- If an account has an `ExpectedAnnualReturn` of 7% (mean) and an `AnnualVolatility` of 15% (standard deviation):
  - **1 Standard Deviation (68% of the time):** The return for any given year will likely fall between **-8%** (7 - 15) and **+22%** (7 + 15).
  - **2 Standard Deviations (95% of the time):** The return will likely fall between **-23%** (7 - 30) and **+37%** (7 + 30).
  - **3 Standard Deviations (99.7% of the time):** The return will fall between **-38%** and **+52%**.

A 15% volatility is typical for an all-stock portfolio (like an S&P 500 index fund). A bond-heavy portfolio might only have a 5% volatility, meaning its returns will tightly cluster around its mean without huge swings.

By generating random numbers that conform to this bell curve, our simulation mimics the wild, unpredictable swings of the stock market, ensuring our portfolio can survive a "bad sequence" of returns (like a -23% crash right after retiring).

## 4. Mathematical Utility Functions

Create a new utility file (e.g., `frontend/src/utils/monteCarlo.ts`) to handle the statistical calculations securely on the client side without blocking the main thread (or consider a Web Worker if simulating 10,000+ paths, though 1,000 iterations for 60 years usually computes quickly in modern JS).
- **Normal Distribution Generator:** Implement the **Box-Muller transform** to generate random numbers following a normal distribution based on the provided mean (`expectedAnnualReturn`) and standard deviation (`annualVolatility`).
- **Simulation Engine:** 
  - Input parameters: `accountsState`, `currentAge`, `retirementAge`, `annualWithdrawal`, `iterations` (e.g., 1000).
  - Loop through iterations, and for each iteration, loop through years. In each year, apply a randomly generated return rate to each account based on its individual volatility and expected return.
  - Track the end-of-year total balance across all accounts for each iteration.

## 5. Aggregating Percentiles & Probability of Success

After running the iterations, process the output arrays to extract meaningful metrics for the chart:
- **Percentile Calculation:** For each year, sort the $N$ simulated balances. Extract the 10th, 50th (Median), and 90th percentiles to represent the "Worst Case", "Expected", and "Best Case" scenarios.
- **Probability of Success:** Calculate what percentage of the iterations had a final balance > $0 at a target end age (e.g., age 95).

## 6. Chart Visualization

Update the visualization components (`FutureValueChart.tsx` and `Retirement.tsx`).
- **Toggle Control:** Add a Switch/SegmentedControl to let the user toggle between "Deterministic (Straight Line)" and "Monte Carlo (Stochastic)".
- **Chart Modifications:** 
  - Modify `AmountOverTimeChart` (or create a dedicated `MonteCarloChart`) to support rendering multiple lines (10th, 50th, 90th percentiles) with custom styling (e.g., dashed lines for 10th/90th, solid for 50th).
  - Alternatively, if the charting library supports it, render an "Area" between the 10th and 90th percentiles to visually represent the confidence band.
- **Summary Metrics:** Display the "Probability of Success" as a prominent, color-coded metric above the chart (e.g., green for >85%, yellow for 70-85%, red for <70%).
