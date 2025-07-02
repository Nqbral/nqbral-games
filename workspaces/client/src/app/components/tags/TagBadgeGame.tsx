export default function TagBadgeGame({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-cyan-900/30 px-3 py-1 text-xs text-cyan-300">
      {label}
    </span>
  );
}
