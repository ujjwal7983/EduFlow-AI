export const calculateProfileScore = (profile) => {
  let score = 0;

  // CGPA (max 30)
  if (profile.cgpa >= 9) score += 30;
  else if (profile.cgpa >= 8) score += 25;
  else if (profile.cgpa >= 7) score += 20;
  else score += 10;

  // Experience (max 20)
  if (profile.experienceYears >= 2) score += 20;
  else if (profile.experienceYears >= 1) score += 15;
  else score += 5;

  // Target Country (max 20)
  if (["USA", "UK", "Canada"].includes(profile.targetCountry)) {
    score += 20;
  } else {
    score += 10;
  }

  // Collateral (max 20)
  if (profile.hasCollateral) score += 20;

  // Budget awareness (max 10)
  if (profile.budget && profile.budget > 1000000) score += 10;

  return score; // out of 100
};