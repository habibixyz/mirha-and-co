import { getDashboardData, getUserProfile } from "../actions";
import { DashboardClient } from "@/components/DashboardClient";
import { DashboardReadingList } from "@/components/DashboardReadingList";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [data, userProfile] = await Promise.all([
    getDashboardData(),
    getUserProfile(),
  ]);

  if (data.error === "Unauthorized") {
    redirect("/login");
  }

  // Parse skin concern + type from the user's saved skin profile
  let mainConcern: string | undefined;
  let skinType: string | undefined;

  if (userProfile?.skinProfile) {
    try {
      const profile = JSON.parse(userProfile.skinProfile);
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
