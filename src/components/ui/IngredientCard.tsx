interface IngredientCardProps {
  name: string;
  description: string;
  icon?: string;
}

export function IngredientCard({ name, description, icon = 'eco' }: IngredientCardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl sunlight-shadow space-y-3">
      <span
        className="material-symbols-outlined text-primary"
        style={{ fontVariationSettings: "'wght' 200", fontSize: '24px' }}
      >
        {icon}
      </span>
      <h4 className="font-headline text-lg text-[#1c1c19]">{name}</h4>
      <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
    </div>
  );
}
