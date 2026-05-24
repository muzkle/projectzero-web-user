interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = "?", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="text-5xl">{icon}</span>
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      {description && <p className="max-w-xs text-sm text-white/60">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
