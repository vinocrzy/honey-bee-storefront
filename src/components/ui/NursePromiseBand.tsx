interface NursePromiseBandProps {
  quote: string;
  attribution: string;
  eyebrow?: string;
}

export function NursePromiseBand({ quote, attribution, eyebrow = "THE NURSE'S PROMISE" }: NursePromiseBandProps) {
  return (
    <section className="bg-primary py-20 px-6 md:px-20 text-center">
      <p className="label-caps text-white/60 mb-6">{eyebrow}</p>
      <blockquote className="font-headline text-2xl md:text-3xl italic text-white max-w-3xl mx-auto leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <cite className="label-caps text-white/70 mt-6 block not-italic">{attribution}</cite>
    </section>
  );
}
