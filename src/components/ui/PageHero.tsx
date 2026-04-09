interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description?: string;
}

export function PageHero({ eyebrow, title, titleItalic, description }: PageHeroProps) {
  return (
    <div className="flex flex-col space-y-4 mb-16">
      {eyebrow && (
        <nav className="flex text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/60 font-label">
          <span>{eyebrow}</span>
        </nav>
      )}
      <h1 className="text-6xl md:text-7xl font-headline font-bold text-primary tracking-tighter leading-tight">
        {title}
        {titleItalic && (
          <>
            <br />
            <span className="italic font-normal">{titleItalic}</span>
          </>
        )}
      </h1>
      {description && (
        <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
