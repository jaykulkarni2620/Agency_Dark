import type { CmsBlogPost, SaveCmsBlogInput, SaveCmsBlogResult } from "./blogCmsService";

function apiBase(): string {
  return (process.env.REACT_APP_BLOG_API_URL || "").replace(/\/$/, "");
}

/** Same env as blogs — contact + submissions use this API base. */
export function getApiBaseUrl(): string {
  return apiBase();
}

export function isBlogApiConfigured(): boolean {
  return apiBase().length > 0;
}

export function getAdminHeaders(): HeadersInit {
  return adminHeaders();
}

function adminHeaders(): HeadersInit {
  const secret = process.env.REACT_APP_BLOG_ADMIN_SECRET;
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (secret) h.Authorization = `Bearer ${secret}`;
  return h;
}

export async function apiFetchCmsBlogs(): Promise<CmsBlogPost[]> {
  const r = await fetch(`${apiBase()}/api/blogs`);
  if (!r.ok) throw new Error(`Blogs list failed: ${r.status}`);
  return r.json();
}

export async function apiFetchCmsBlogBySlug(
  slug: string
): Promise<CmsBlogPost | null> {
  const r = await fetch(
    `${apiBase()}/api/blogs/slug/${encodeURIComponent(slug)}`
  );
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Blog fetch failed: ${r.status}`);
  return r.json();
}

export async function apiSaveCmsBlog(
  input: SaveCmsBlogInput
): Promise<SaveCmsBlogResult> {
  if (!process.env.REACT_APP_BLOG_ADMIN_SECRET) {
    return {
      ok: false,
      message:
        "Set REACT_APP_BLOG_ADMIN_SECRET in .env.local (same value as ADMIN_SECRET in blog-api/.env).",
    };
  }

  const isUpdate = Boolean(input.id);
  const url = isUpdate
    ? `${apiBase()}/api/blogs/${encodeURIComponent(input.id!)}`
    : `${apiBase()}/api/blogs`;
  const method = isUpdate ? "PUT" : "POST";

  const r = await fetch(url, {
    method,
    headers: adminHeaders(),
    body: JSON.stringify(input),
  });

  const data = await r.json().catch(() => ({}));

  if (r.status === 401) {
    return { ok: false, message: "Unauthorized — check REACT_APP_BLOG_ADMIN_SECRET matches server ADMIN_SECRET." };
  }
  if (r.status === 409) {
    return { ok: false, message: (data && data.error) || "Slug conflict." };
  }
  if (r.status === 503) {
    return { ok: false, message: (data && data.error) || "Server misconfigured." };
  }
  if (!r.ok) {
    return { ok: false, message: (data && data.error) || `Save failed (${r.status})` };
  }

  return { ok: true, post: data as CmsBlogPost };
}

export async function apiDeleteCmsBlog(id: string): Promise<boolean> {
  if (!process.env.REACT_APP_BLOG_ADMIN_SECRET) return false;
  const r = await fetch(`${apiBase()}/api/blogs/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  return r.ok;
}
