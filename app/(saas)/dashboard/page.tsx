import { getDashboardData } from "../actions";
import { DashboardClient } from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const data = await getDashboardData();
  
  if (data.error === "Unauthorized") {
    redirect("/login");
  }

  return <DashboardClient user={data.user} routines={data.routines} recentJournal={data.journal} />;
}
