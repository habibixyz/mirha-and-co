import { getJournalEntries } from "../../actions";
import { SkinJournalClient } from "./JournalClient";

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return <SkinJournalClient initialEntries={entries || []} isPro={false} />;
}