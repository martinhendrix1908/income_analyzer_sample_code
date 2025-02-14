export const getRiskAssessmentFromRiskScore = (
  riskScore: number | undefined,
  upperThreshold: number | undefined,
  lowerThreshold: number | undefined
) => {
  if (!riskScore || !lowerThreshold || !upperThreshold) return "High";
  if (riskScore) {
    if (
      riskScore >=
      upperThreshold // threshold1
    ) {
      return "Acceptable";
    }
    if (
      riskScore <=
      lowerThreshold // threshold2
    ) {
      return "High";
    }
    return "Moderate";
  } else {
    return "High";
  }
};