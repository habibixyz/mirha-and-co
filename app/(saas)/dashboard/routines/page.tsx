import { getDashboardData } from "../../actions";
import { RoutinesClient } from "./RoutinesClient";
import { redirect } from "next/navigation";

export default async function RoutinesPage() {
  const data = await getDashboardData();

  if (data.error === "Unauthorized") {
    redirect("/login");
  }
  const routines = Array.isArray(data?.routines) ? data.routines : [];

  return <RoutinesClient initialRoutines={routines} />;
}
