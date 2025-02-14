<script lang="ts">
  import { page } from "$app/state";
  import { ZoneTypes } from "$lib/constants";
  import type { ProcessingResult } from "$lib/types/report.types";
  import { getRiskAssessmentFromRiskScore } from "$lib/utils/risk-assessment-utils";
  import AlertAccordion from "$lib/components/report/AlertAccordion.svelte";

  let { accountGuid }: { accountGuid: string } = $props();

  let processingResult = $derived(
    page?.data?.IAResponse?.processingResult as ProcessingResult
  );
  let productProcessingResult = $derived(
    processingResult?.productProcessingResult
  );
  let accountData = $derived.by(() => {
    return processingResult?.productProcessingResult?.accounts.find(
      (item) => item.accountGuid === accountGuid
    );
  });

  const RISK_CONFIG = {
    Acceptable: {
      title: "Acceptable Risk:",
      description:
        "Profile appears acceptable. Risk metrics are within acceptable range, but always verify details before making lending decisions.",
      style: ZoneTypes.ACCEPTABLE,
    },
    High: {
      title: "High Risk:",
      description:
        "This account falls outside the acceptable risk range. We do not recommend lending this account without thorough reassessment.",
      style: ZoneTypes.HIGH,
    },
    Moderate: {
      title: "Moderate Risk:",
      description:
        "Risk metrics indicate the need for further evaluation. Exercise caution and review thoroughly before making lending decisions.",
      style: ZoneTypes.MODERATE,
    },
  };
  let showOnboardingResponse = $derived.by(() => {
    const showOnboarding =
      page?.data?.user?.panelConfig?.UsePostOnboardingService ?? true;
    return productProcessingResult?.posResponse && showOnboarding;
  });
  // Compute thresholds
  let threshold1 = $derived.by(() => {
    return showOnboardingResponse
      ? processingResult?.extOptions?.postOnboardingThreshold?.threshold1
      : processingResult?.extOptions?.riskZoneScore?.threshold1;
  });

  let threshold2 = $derived.by(() => {
    return showOnboardingResponse
      ? processingResult?.extOptions?.postOnboardingThreshold?.threshold2
      : processingResult?.extOptions?.riskZoneScore?.threshold2;
  });

  // Get risk score
  let riskScore = $derived.by(() => {
    return showOnboardingResponse
      ? productProcessingResult?.posResponse?.riskScore
      : accountData?.riskAnalysis?.riskScore;
  });

  // Get assessment reasons
  let assessmentReasons = $derived.by(() => {
    const reasons = showOnboardingResponse
      ? productProcessingResult?.posResponse?.alerts
      : accountData?.assessmentReasons;

    return reasons
      ? (Object.values(reasons).flat() as string[])
      : ([] as string[]);
  });

  // Get risk assessment
  let riskAssessment = $derived.by(() => {
    return getRiskAssessmentFromRiskScore(riskScore, threshold1, threshold2);
  });

  // Get current risk config
  let currentRiskConfig = $derived.by(() => {
    return RISK_CONFIG[riskAssessment as keyof typeof RISK_CONFIG];
  });
</script>

<AlertAccordion
  title={currentRiskConfig.title}
  description={currentRiskConfig.description}
  {assessmentReasons}
  enableDropdown={assessmentReasons.length > 0}
  style={currentRiskConfig.style}
/>
