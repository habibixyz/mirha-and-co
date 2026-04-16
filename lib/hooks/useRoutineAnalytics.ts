"use client";

export function useRoutineAnalytics() {

  const trackQuizStart = () => {
    console.log("Quiz Started");
  };

  const trackQuizComplete = (answers: any) => {
    console.log("Quiz Completed:", answers);
  };

  const trackAffiliateClick = (data: {
    asin: string;
    step?: string;
    product?: string;
  }) => {
    console.log("Affiliate Click:", data);
  };

  return {
    trackQuizStart,
    trackQuizComplete,
    trackAffiliateClick,
  };
}