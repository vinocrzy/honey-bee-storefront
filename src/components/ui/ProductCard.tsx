import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  fragrance?: string;
  badge?: string;
  tags?: string[];
  currency?: string;
}

export function ProductCard({ id, slug, name, price, imageUrl, fragrance, badge, tags = [], currency = 'INR' }: ProductCardProps) {
  const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(price);
  return (
    <Link href={`/products/${slug}`} className="group block bg-surface-container-lowest rounded-xl sunlight-shadow overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        {badge && (
          <span className="honey-glow text-white label-caps rounded-full px-3 py-1 mb-3 inline-block">
            {badge}
          </span>
        )}
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-headline text-xl text-[#1c1c19]">{name}</h3>
          <span className="font-semibold text-primary">{formatted}</span>
        </div>
        {fragrance && (
          <p className="label-caps text-on-surface-variant mb-3">{fragrance}</p>
        )}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-surface-container label-caps px-3 py-1 text-on-surface-variant">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
