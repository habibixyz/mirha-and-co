import { getJournalEntries, getUserProfile } from "../../actions";
import { JournalClient } from "./JournalClient";
import { redirect } from "next/navigation";

export default async function JournalPage() {
  const user = await getUserProfile();
  
  if (!user) {
    redirect("/login");
  }

  const entries = await getJournalEntries();
  const isPro = user.subscription?.tier === "pro";

  return <JournalClient initialEntries={entries} isPro={isPro} />;
}
