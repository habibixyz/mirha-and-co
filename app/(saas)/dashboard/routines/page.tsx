import { getSession } from "@/lib/auth";
import { getRoutines } from "../../actions";
import { RoutinesClient } from "./RoutinesClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RoutinesPage() {
  const [session, routines] = await Promise.all([
    getSession(),
    getRoutines()
  ]);

  if (!session || !session.user) {
    redirect("/login");
  }

  return <RoutinesClient initialRoutines={Array.isArray(routines) ? routines : []} />;
}
