import { getDashboardData } from "../../actions";
import { RoutinesClient } from "./RoutinesClient";
import { redirect } from "next/navigation";

export default async function RoutinesPage() {
  const data = await getDashboardData();
  
  if (data.error === "Unauthorized") {
    redirect("/login");
  }

  return <RoutinesClient initialRoutines={data.routines} />;
}
