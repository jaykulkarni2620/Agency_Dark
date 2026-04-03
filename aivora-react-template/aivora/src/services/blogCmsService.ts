/**
 * CMS blog storage in localStorage when `REACT_APP_BLOG_API_URL` is not set.
 * With the Blog API running, Admin + public pages use `blogApiClient.ts` instead.
 */
const STORAGE_KEY = "minex_cms_blogs";

export interface CmsBlogPost {
  id: string;
  slug: string;
  pageTitle: string;
  pageSub: string;
  metaDescription: string;
  /** Data URL (upload) or https URL */
  heroImageUrl: string;
  metaTag: string;
  lastUpdate: string;
  title: string;
  intro: string;
  bodyHtml: string;
  createdAt: string;
  updatedAt: string;
}

export function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCmsBlogs(): CmsBlogPost[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored) as CmsBlogPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCmsBlogBySlug(slug: string): CmsBlogPost | undefined {
  return getCmsBlogs().find((b) => b.slug === slug);
}

export function getCmsBlogById(id: string): CmsBlogPost | undefined {
  return getCmsBlogs().find((b) => b.id === id);
}

export type SaveCmsBlogInput = Omit<
  CmsBlogPost,
  "id" | "createdAt" | "updatedAt"
> & { id?: string };

export type SaveCmsBlogResult =
  | { ok: true; post: CmsBlogPost }
  | { ok: false; message: string };

export function saveCmsBlog(input: SaveCmsBlogInput): SaveCmsBlogResult {
  const slug = normalizeSlug(input.slug);
  if (!slug) {
    return { ok: false, message: "Slug is required (letters, numbers, hyphens only)." };
  }

  const blogs = getCmsBlogs();
  const now = new Date().toISOString();

  if (input.id) {
    const idx = blogs.findIndex((b) => b.id === input.id);
    if (idx === -1) {
      return { ok: false, message: "Post not found." };
    }
    const duplicate = blogs.find((b) => b.slug === slug && b.id !== input.id);
    if (duplicate) {
      return { ok: false, message: "Another post already uses this slug." };
    }
    const prev = blogs[idx];
    const post: CmsBlogPost = {
      ...input,
      id: input.id,
      slug,
      pageTitle: input.pageTitle.trim(),
      pageSub: input.pageSub.trim(),
      metaDescription: input.metaDescription.trim(),
      heroImageUrl: input.heroImageUrl.trim(),
      metaTag: input.metaTag.trim(),
      lastUpdate: input.lastUpdate.trim(),
      title: input.title.trim(),
      intro: input.intro.trim(),
      bodyHtml: input.bodyHtml,
      createdAt: prev.createdAt,
      updatedAt: now,
    };
    blogs[idx] = post;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return { ok: true, post };
  }

  if (blogs.some((b) => b.slug === slug)) {
    return { ok: false, message: "A post with this slug already exists." };
  }

  const post: CmsBlogPost = {
    id: `cms_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    slug,
    pageTitle: input.pageTitle.trim(),
    pageSub: input.pageSub.trim(),
    metaDescription: input.metaDescription.trim(),
    heroImageUrl: input.heroImageUrl.trim(),
    metaTag: input.metaTag.trim(),
    lastUpdate: input.lastUpdate.trim(),
    title: input.title.trim(),
    intro: input.intro.trim(),
    bodyHtml: input.bodyHtml,
    createdAt: now,
    updatedAt: now,
  };
  blogs.unshift(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return { ok: true, post };
}

export function deleteCmsBlog(id: string): boolean {
  const blogs = getCmsBlogs().filter((b) => b.id !== id);
  if (blogs.length === getCmsBlogs().length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return true;
}
