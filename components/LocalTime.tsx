"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date()).toUpperCase();
// Nothing on the server: the time only exists in the visitor's browser.
const getServerSnapshot = () => "";

/** Live local time in Mumbai. Renders empty on the server, so no hydration mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {time ? `${time} IST` : " "}
    </span>
  );
}
