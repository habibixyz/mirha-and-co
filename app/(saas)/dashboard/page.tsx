import { getDashboardData } from "../actions";
import { DashboardClient } from "@/components/DashboardClient";
import { DashboardReadingList } from "@/components/DashboardReadingList";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (data.error === "Unauthorized" || !data.user) {
    redirect("/login");
  }

  // Parse skin concern + type from the user's saved skin profile
  let mainConcern: string | undefined;
  let skinType: string | undefined;

  if (data.user?.skinProfile) {
    try {
      const profile = JSON.parse(data.user.skinProfile);
      mainConcern = profile.mainConcern || profile.concern;
      skinType = profile.skinType || profile.skin_type;
    } catch {
      // skinProfile may not exist yet for new users — that's fine
    }
  }

  return (
    <>
      <DashboardClient
        user={data.user}
        routines={data.routines}
        recentJournal={data.journal}
        stats={data.stats}
      />
      <DashboardReadingList
        skinType={skinType}
        mainConcern={mainConcern}
        userName={data.user?.name}
      />
    </>
  );
}
