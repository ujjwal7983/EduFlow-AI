export const generateTimeline = (monthsToTarget) => {
  const timeline = [];

  timeline.push("Research universities and courses");

  if (monthsToTarget > 10) {
    timeline.push("Prepare for IELTS/GRE");
  }

  if (monthsToTarget > 8) {
    timeline.push("Shortlist universities");
  }

  if (monthsToTarget > 6) {
    timeline.push("Prepare SOP and LOR");
  }

  if (monthsToTarget > 4) {
    timeline.push("Apply to universities");
  }

  if (monthsToTarget > 2) {
    timeline.push("Apply for education loan");
  }

  timeline.push("Visa process and final preparations");

  return timeline;
};