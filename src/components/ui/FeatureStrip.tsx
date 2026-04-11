interface Feature {
  icon: string;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: 'local_shipping', title: 'Free Shipping', description: 'On orders over ₹999 across India' },
  { icon: 'eco', title: 'Cold Process', description: 'Six-week cure for a richer, longer-lasting bar' },
  { icon: 'spa', title: 'Skin-Safe Formula', description: 'pH-balanced, dermatologist reviewed' },
  { icon: 'volunteer_activism', title: 'Cruelty-Free', description: 'Never tested on animals, ever' },
];

interface FeatureStripProps {
  features?: Feature[];
}

export function FeatureStrip({ features = DEFAULT_FEATURES }: FeatureStripProps) {
  return (
    <section className="bg-surface-container px-6 md:px-20 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {features.map((f) => (
          <div key={f.title} className="text-center space-y-3">
            <span
              className="material-symbols-outlined text-primary mx-auto block"
              style={{ fontVariationSettings: "'wght' 200", fontSize: '32px' }}
            >
              {f.icon}
            </span>
            <h3 className="font-headline text-base text-[#1c1c19]">{f.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
