/** Small state label for a project: "Live", "In development", "Concept"... */
export function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const concept = status === "Concept";
  return (
    <span className="label inline-flex items-center gap-2 rounded-full border border-line bg-paper-raise/80 px-2.5 py-0.5 text-ink">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${concept ? "border border-ink/60" : "bg-accent"}`}
      />
      {status}
    </span>
  );
}
