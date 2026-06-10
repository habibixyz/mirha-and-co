"use client";

import { track } from "@vercel/analytics";

export function useRoutineAnalytics() {

 const trackQuizStart = () => {
 console.log("Quiz Started");
 try {
 track("Quiz Started");
 } catch (err) {
 console.error("Vercel Analytics track failed:", err);
 }
 };

 const trackQuizComplete = (answers: any) => {
 console.log("Quiz Completed:", answers);
 try {
 track("Quiz Completed", {
 skinType: answers.skinType || "unknown",
 mainConcern: answers.mainConcern || "unknown",
 budget: answers.budget || "unknown",
 });
 } catch (err) {
 console.error("Vercel Analytics track failed:", err);
 }
 };

 const trackAffiliateClick = (data: {
 asin: string;
 step?: string;
 product?: string;
 }) => {
 console.log("Affiliate Click:", data);
 try {
 track("Affiliate Click", {
 asin: data.asin,
 step: data.step || "unknown",
 product: data.product || "unknown",
 });
 } catch (err) {
 console.error("Vercel Analytics track failed:", err);
 }
 };

 return {
 trackQuizStart,
 trackQuizComplete,
 trackAffiliateClick,
 };
}