import React from "react";
import { getCmsBlogBySlug, getCmsBlogs } from "../../services/blogCmsService";
import {
  apiFetchCmsBlogBySlug,
  isBlogApiConfigured,
} from "../../services/blogApiClient";
import { blogPosts, getStaticBlogPost, type BlogPost } from "./blogPosts";
import type { CmsBlogPost } from "../../services/blogCmsService";
import CmsBlogBody from "./CmsBlogBody";
import defaultHero from "../../images/blog/img01.jpg";

export function cmsToBlogPost(p: CmsBlogPost): BlogPost {
  return {
    slug: p.slug,
    pageTitle: p.pageTitle,
    pageSub: p.pageSub,
    metaDescription: p.metaDescription,
    heroImage: p.heroImageUrl || defaultHero,
    itemDetails: {
      metaTag: p.metaTag,
      lastUpdate: p.lastUpdate,
      title: p.title,
      intro: p.intro,
    },
    body: React.createElement(CmsBlogBody, { html: p.bodyHtml }),
  };
}

/**
 * localStorage CMS, then built-in static posts (sync). Use when API is not configured.
 */
export function getBlogPostSync(slug: string | undefined): BlogPost | null {
  if (!slug) return null;
  const cms = getCmsBlogBySlug(slug);
  if (cms) return cmsToBlogPost(cms);
  return getStaticBlogPost(slug);
}

/**
 * Resolves a post: remote API first (if configured), then localStorage CMS, then static template posts.
 */
export async function fetchBlogPost(
  slug: string | undefined
): Promise<BlogPost | null> {
  if (!slug) return null;

  if (isBlogApiConfigured()) {
    try {
      const remote = await apiFetchCmsBlogBySlug(slug);
      if (remote) return cmsToBlogPost(remote);
    } catch (e) {
      console.warn("[blog] API unavailable, using local/static fallback", e);
    }
  }

  return getBlogPostSync(slug);
}

/** @deprecated use fetchBlogPost or getBlogPostSync */
export function getBlogPost(slug: string | undefined): BlogPost | null {
  return getBlogPostSync(slug);
}

export function getAllBlogSlugs(): string[] {
  const staticSlugs = Object.keys(blogPosts);
  const cmsSlugs = getCmsBlogs().map((b) => b.slug);
  return [...new Set([...staticSlugs, ...cmsSlugs])];
}
