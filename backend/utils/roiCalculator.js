export const calculateROI = ({
  tuitionFee,
  livingCost,
  expectedSalary,
}) => {
  const totalInvestment = tuitionFee + livingCost;

  // yearly savings assume (40% save)
  const yearlySavings = expectedSalary * 0.4;

  const breakEvenYears =
    yearlySavings > 0 ? totalInvestment / yearlySavings : null;

  return {
    totalInvestment,
    yearlySavings,
    breakEvenYears: breakEvenYears
      ? breakEvenYears.toFixed(1)
      : "Not feasible",
  };
};