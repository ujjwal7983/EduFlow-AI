export const checkLoanEligibility = (score) => {
  let eligibility = "LOW";
  let maxLoan = 0;

  if (score >= 80) {
    eligibility = "HIGH";
    maxLoan = 4000000;
  } else if (score >= 60) {
    eligibility = "MEDIUM";
    maxLoan = 2500000;
  } else {
    eligibility = "LOW";
    maxLoan = 1000000;
  }

  return {
    eligibility,
    maxLoan,
  };
};