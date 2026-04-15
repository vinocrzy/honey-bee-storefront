/**
 * Honey Bee — Dynamic Sitemap (sitemap.xml)
 * Auto-generated sitemap for SEO with dynamic product and category URLs
 */

import { type MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/services/products';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://honeybee.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/process`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/rituals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/ingredients`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Dynamic product pages
    const productsData = await getProducts({ per_page: 100 });
    const productRoutes: MetadataRoute.Sitemap = productsData.data.map((product) => ({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

    // Dynamic category pages
    const categoriesData = await getCategories();
    const categoryRoutes: MetadataRoute.Sitemap = categoriesData
      .filter((cat) => cat.is_active)
      .map((category) => ({
        url: `${BASE_URL}/collections/${category.slug}`,
        lastModified: new Date(category.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    return [...staticRoutes, ...productRoutes, ...categoryRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return static routes if API fails
    return staticRoutes;
  }
}
