import { getDashboardData, getUserProfile } from "../actions";
import { DashboardClient } from "@/components/DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (data.error === "Unauthorized") {
    redirect("/login");
  }

  // data already contains: routines, journal, user, and the new real stats
  return (
    <DashboardClient 
      user={data.user} 
      routines={data.routines} 
      recentJournal={data.journal} 
      stats={data.stats}
    />
  );
}