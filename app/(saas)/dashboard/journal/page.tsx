import { getJournalEntries } from "../../actions";
import { SkinJournalClient } from "./JournalClient";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
 const entries = await getJournalEntries();

 return <SkinJournalClient initialEntries={entries || []} isPro={false} />;
}
