export function VerifiedBadge({ label = "Verificada" }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-secondary-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary"
      aria-label={label}
      title={label}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l2.39 2.39 3.32-.34.34 3.32L20.44 10 18.05 12l2.39 2-2.39 2.39-.34 3.32-3.32-.34L12 22l-2.39-2.39-3.32.34-.34-3.32L3.56 14 5.95 12 3.56 10l2.39-2.39.34-3.32 3.32.34L12 2z" />
      </svg>
      {label}
    </span>
  );
}
