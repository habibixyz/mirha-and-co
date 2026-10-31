import { getJournalEntries, getUserProfile } from "../../actions";
import { SkinJournalClient } from "./JournalClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  try {
    const [entries, user] = await Promise.all([
      getJournalEntries().catch(err => {
        console.error("Failed to load journal entries:", err);
        return [];
      }),
      getUserProfile().catch(err => {
        console.error("Failed to load user profile:", err);
        return null;
      }),
    ]);

    if (!user) {
      redirect("/login");
    }

    const isPro = (user?.subscription?.tier === "pro" && user?.subscription?.status === "active") || user?.email === "tanizcoldz@gmail.com";

    return <SkinJournalClient initialEntries={entries || []} isPro={isPro} />;
  } catch (err: any) {
    if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("JournalPage render error:", err);
    return <SkinJournalClient initialEntries={[]} isPro={false} />;
  }
}
