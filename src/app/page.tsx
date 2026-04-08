// ============================================================
// Home Page — Server Component that renders the Calendar
// The Calendar itself is a Client Component; this page is static
// ============================================================

import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className="flex-1">
      <Calendar />
    </main>
  );
}
