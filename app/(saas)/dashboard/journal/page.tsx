import { getJournalEntries, getUserProfile } from "../../actions";
import { SkinJournalClient } from "./JournalClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const [entries, user] = await Promise.all([
    getJournalEntries(),
    getUserProfile(),
  ]);

  if (!user) {
    redirect("/login");
  }

  const isPro = (user?.subscription?.tier === "pro" && user?.subscription?.status === "active") || user?.email === "tanizcoldz@gmail.com";

  return <SkinJournalClient initialEntries={entries || []} isPro={isPro} />;
}
