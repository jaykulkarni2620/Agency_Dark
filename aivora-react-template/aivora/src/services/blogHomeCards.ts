import { blogPosts, type BlogSlug } from "../components/BlogDetails/blogPosts";
import { getCmsBlogs, type CmsBlogPost } from "./blogCmsService";
import { apiFetchCmsBlogs, isBlogApiConfigured } from "./blogApiClient";
import defaultHero from "../images/blog/img01.jpg";

export type HomeBlogCard = {
  slug: string;
  title: string;
  image: string;
  metaLabel: string;
  dateLabel: string;
  sortKey: string;
};

/** Display order on the home blog strip (newest first). */
const STATIC_HOME_META: Record<BlogSlug, { metaLabel: string; dateLabel: string; sortKey: string }> = {
  "seo-service-virar": {
    metaLabel: "seo tips",
    dateLabel: "March 24, 2025",
    sortKey: "2025-03-24T12:00:00.000Z",
  },
  "socialmedia-service-virar": {
    metaLabel: "social media",
    dateLabel: "April 27, 2025",
    sortKey: "2025-04-27T12:00:00.000Z",
  },
  "ecommerce-service-virar": {
    metaLabel: "ecommerce",
    dateLabel: "March 17, 2025",
    sortKey: "2025-03-17T12:00:00.000Z",
  },
};

function formatDateLabel(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function cmsToCard(c: CmsBlogPost): HomeBlogCard {
  const metaLabel =
    (c.metaTag || "#blog").replace(/^#/, "").trim() || "blog";
  return {
    slug: c.slug,
    title: c.title,
    image: (c.heroImageUrl && c.heroImageUrl.trim()) || defaultHero,
    metaLabel,
    dateLabel: formatDateLabel(c.updatedAt) || c.lastUpdate || "",
    sortKey: c.updatedAt || c.createdAt,
  };
}

function buildHomeBlogCards(cmsList: CmsBlogPost[]): HomeBlogCard[] {
  const bySlug = new Map<string, HomeBlogCard>();

  (Object.keys(blogPosts) as BlogSlug[]).forEach((slug) => {
    const p = blogPosts[slug];
    const m = STATIC_HOME_META[slug];
    if (!m) return; // skip slugs not listed in STATIC_HOME_META
    bySlug.set(slug, {
      slug,
      title: p.itemDetails.title,
      image: typeof p.heroImage === "string" ? p.heroImage : String(p.heroImage),
      metaLabel: m.metaLabel,
      dateLabel: m.dateLabel,
      sortKey: m.sortKey,
    });
  });

  cmsList.forEach((c) => {
    bySlug.set(c.slug, cmsToCard(c));
  });

  const sorted = [...bySlug.values()].sort((a, b) =>
    a.sortKey < b.sortKey ? 1 : a.sortKey > b.sortKey ? -1 : 0
  );

  return sorted.slice(0, 3);
}

/** Initial paint: built-in posts + localStorage CMS (no network). */
export function getHomeBlogCardsSync(): HomeBlogCard[] {
  return buildHomeBlogCards(getCmsBlogs());
}

/**
 * Built-in template posts + CMS (API when configured, else localStorage).
 * CMS overrides same slug. Newest first; top 3 for the home section.
 */
export async function fetchHomeBlogCards(): Promise<HomeBlogCard[]> {
  let cmsList: CmsBlogPost[] = [];
  if (isBlogApiConfigured()) {
    try {
      cmsList = await apiFetchCmsBlogs();
    } catch {
      cmsList = [];
    }
  }
  if (cmsList.length === 0) {
    cmsList = getCmsBlogs();
  }
  return buildHomeBlogCards(cmsList);
}
