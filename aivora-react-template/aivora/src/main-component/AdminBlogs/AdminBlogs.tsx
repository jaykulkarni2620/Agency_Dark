import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getCmsBlogs,
  saveCmsBlog,
  deleteCmsBlog,
  type CmsBlogPost,
} from "../../services/blogCmsService";
import {
  apiDeleteCmsBlog,
  apiFetchCmsBlogs,
  apiSaveCmsBlog,
  isBlogApiConfigured,
} from "../../services/blogApiClient";
import "./AdminBlogs.css";

const BUILTIN_SLUGS = ["seo-guide", "chatbot-vs-human", "ai-ecommerce"];

const emptyForm = (): Omit<CmsBlogPost, "id" | "createdAt" | "updatedAt"> => ({
  slug: "",
  pageTitle: "",
  pageSub: "",
  metaDescription: "",
  heroImageUrl: "",
  metaTag: "#blog",
  lastUpdate: `Last Update: ${new Date().toLocaleDateString("en-US")}`,
  title: "",
  intro: "",
  bodyHtml:
    '<p>Write your article using HTML. Match site styles with classes like <code>item_details_info_heading</code>, <code>iconlist_block</code>, <code>single-item-image</code> on images.</p>',
});

const AdminBlogs: React.FC = () => {
  const { logout } = useAuth();
  const [posts, setPosts] = useState<CmsBlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (isBlogApiConfigured()) {
      try {
        const list = await apiFetchCmsBlogs();
        setPosts(list);
        return;
      } catch {
        setMessage({
          type: "err",
          text: "Could not reach the blog API — showing local drafts only.",
        });
      }
    }
    setPosts(getCmsBlogs());
  };

  useEffect(() => {
    void load();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setMessage(null);
  };

  const editPost = (p: CmsBlogPost) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      pageTitle: p.pageTitle,
      pageSub: p.pageSub,
      metaDescription: p.metaDescription,
      heroImageUrl: p.heroImageUrl,
      metaTag: p.metaTag,
      lastUpdate: p.lastUpdate,
      title: p.title,
      intro: p.intro,
      bodyHtml: p.bodyHtml,
    });
    setMessage(null);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "err", text: "Image must be under 2MB (use a URL for larger files)." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, heroImageUrl: String(reader.result || "") }));
      setMessage({ type: "ok", text: "Image loaded. Save to apply." });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const payload = {
      ...form,
      id: editingId || undefined,
    };
    const result = isBlogApiConfigured()
      ? await apiSaveCmsBlog(payload)
      : saveCmsBlog(payload);
    setSaving(false);
    if (result.ok) {
      setMessage({ type: "ok", text: editingId ? "Blog updated." : "Blog published." });
      void load();
      if (!editingId) resetForm();
    } else {
      setMessage({ type: "err", text: result.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this blog from CMS? (Built-in template blogs are unchanged.)")) {
      return;
    }
    if (isBlogApiConfigured()) {
      const ok = await apiDeleteCmsBlog(id);
      if (!ok) {
        setMessage({ type: "err", text: "Delete failed — check admin secret and API." });
        return;
      }
    } else {
      deleteCmsBlog(id);
    }
    void load();
    if (editingId === id) resetForm();
    setMessage({ type: "ok", text: "Deleted." });
  };

  const publicUrl = (slug: string) => `${window.location.origin}/blog/${slug}`;

  return (
    <div className="admin-submissions-wrapper admin-blogs-page">
      <div className="admin-submissions-header">
        <div className="admin-header-content">
          <h2>Blog CMS</h2>
          <div className="admin-header-actions">
            <Link to="/admin/dashboard" className="admin-nav-link">
              Dashboard
            </Link>
            <Link to="/admin/submissions" className="admin-nav-link">
              Submissions
            </Link>
            <button type="button" onClick={logout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-submissions-container">
        <p className="admin-blogs-intro">
          {isBlogApiConfigured() ? (
            <>
              Posts are saved to the <strong>Blog API</strong> (SQLite on the server). Everyone sees the same
              articles. Set <code>REACT_APP_BLOG_API_URL</code> and matching <code>REACT_APP_BLOG_ADMIN_SECRET</code>{" "}
              in <code>.env.local</code>.
            </>
          ) : (
            <>
              Posts are stored in <strong>this browser only</strong> (localStorage) until you run the blog API and
              set <code>REACT_APP_BLOG_API_URL</code>. If a post uses the same <strong>slug</strong> as a built-in
              article ({BUILTIN_SLUGS.join(", ")}), your CMS version wins on the site.
            </>
          )}
        </p>

        <div className="admin-blogs-layout">
          <div className="admin-blogs-list-panel">
            <div className="list-header admin-blogs-list-header">
              <h3>CMS posts ({posts.length})</h3>
              <button type="button" className="admin-blogs-new-btn" onClick={resetForm}>
                + New post
              </button>
            </div>
            {posts.length === 0 ? (
              <div className="empty-state">
                <p>No CMS posts yet. Create one with the form →</p>
              </div>
            ) : (
              <ul className="admin-blogs-card-list">
                {posts.map((p) => (
                  <li key={p.id} className={editingId === p.id ? "is-active" : ""}>
                    <button
                      type="button"
                      className="admin-blogs-card-select"
                      onClick={() => editPost(p)}
                    >
                      <span className="admin-blogs-card-title">{p.title || p.slug}</span>
                      <span className="admin-blogs-card-slug">/blog/{p.slug}</span>
                    </button>
                    <div className="admin-blogs-card-actions">
                      <a
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-blogs-link"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        className="delete-btn"
                        title="Delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form className="admin-blogs-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Edit post" : "New post"}</h3>

            {message && (
              <div
                className={
                  message.type === "ok" ? "admin-blogs-flash ok" : "admin-blogs-flash err"
                }
              >
                {message.text}
              </div>
            )}

            <label className="admin-blogs-label">
              URL slug *
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="my-new-post"
                required
                disabled={!!editingId}
                title="Cannot change slug after create (delete and recreate if needed)"
              />
              {editingId && (
                <span className="admin-blogs-hint">Slug is locked after publish.</span>
              )}
            </label>

            <label className="admin-blogs-label">
              Article title (H2) *
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </label>

            <label className="admin-blogs-label">
              Intro paragraph *
              <textarea
                rows={3}
                value={form.intro}
                onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))}
                required
              />
            </label>

            <div className="admin-blogs-row">
              <label className="admin-blogs-label">
                Breadcrumb title
                <input
                  value={form.pageTitle}
                  onChange={(e) => setForm((f) => ({ ...f, pageTitle: e.target.value }))}
                  placeholder="Short page title"
                />
              </label>
              <label className="admin-blogs-label">
                Breadcrumb subtitle
                <input
                  value={form.pageSub}
                  onChange={(e) => setForm((f) => ({ ...f, pageSub: e.target.value }))}
                  placeholder="Category"
                />
              </label>
            </div>

            <label className="admin-blogs-label">
              Meta description (SEO)
              <textarea
                rows={2}
                value={form.metaDescription}
                onChange={(e) =>
                  setForm((f) => ({ ...f, metaDescription: e.target.value }))
                }
              />
            </label>

            <div className="admin-blogs-row">
              <label className="admin-blogs-label">
                Tag (e.g. #seo)
                <input
                  value={form.metaTag}
                  onChange={(e) => setForm((f) => ({ ...f, metaTag: e.target.value }))}
                />
              </label>
              <label className="admin-blogs-label">
                Last update line
                <input
                  value={form.lastUpdate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastUpdate: e.target.value }))
                  }
                />
              </label>
            </div>

            <label className="admin-blogs-label">
              Hero image — URL or upload
              <input
                type="url"
                value={form.heroImageUrl.startsWith("data:") ? "" : form.heroImageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heroImageUrl: e.target.value }))
                }
                placeholder="https://… or upload below"
              />
              <input type="file" accept="image/*" onChange={handleImageFile} />
              {form.heroImageUrl.startsWith("data:") && (
                <span className="admin-blogs-hint">Using uploaded image (data URL).</span>
              )}
            </label>

            <label className="admin-blogs-label">
              Article body (HTML) *
              <textarea
                className="admin-blogs-html"
                rows={16}
                value={form.bodyHtml}
                onChange={(e) => setForm((f) => ({ ...f, bodyHtml: e.target.value }))}
                required
                spellCheck={false}
              />
            </label>

            {form.slug && (
              <p className="admin-blogs-preview-url">
                Public URL:{" "}
                <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer">
                  {publicUrl(form.slug)}
                </a>
              </p>
            )}

            <div className="admin-blogs-form-actions">
              <button type="submit" className="admin-login-button" disabled={saving}>
                {saving ? "Saving…" : editingId ? "Update post" : "Publish post"}
              </button>
              {editingId && (
                <button type="button" className="admin-blogs-cancel" onClick={resetForm}>
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
