interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`label-caps text-on-surface-variant mb-4 ${className}`}>
      {children}
    </p>
  );
}
