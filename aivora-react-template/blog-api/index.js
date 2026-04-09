/**
 * Minex API — SQLite + Express (blogs + contact submissions).
 * Run: npm install && cp .env.example .env && npm start
 * React .env.local: REACT_APP_BLOG_API_URL + REACT_APP_BLOG_ADMIN_SECRET (= ADMIN_SECRET here).
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const PORT = Number(process.env.PORT) || 4000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, "blog.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    pageTitle TEXT NOT NULL DEFAULT '',
    pageSub TEXT NOT NULL DEFAULT '',
    metaDescription TEXT NOT NULL DEFAULT '',
    heroImageUrl TEXT NOT NULL DEFAULT '',
    metaTag TEXT NOT NULL DEFAULT '',
    lastUpdate TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL DEFAULT '',
    intro TEXT NOT NULL DEFAULT '',
    bodyHtml TEXT NOT NULL DEFAULT '',
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`);

function rowToPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    pageTitle: row.pageTitle,
    pageSub: row.pageSub,
    metaDescription: row.metaDescription,
    heroImageUrl: row.heroImageUrl,
    metaTag: row.metaTag,
    lastUpdate: row.lastUpdate,
    title: row.title,
    intro: row.intro,
    bodyHtml: row.bodyHtml,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function normalizeSlug(raw) {
  return String(raw || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function requireAdmin(req, res, next) {
  if (!ADMIN_SECRET) {
    return res.status(503).json({
      error: "ADMIN_SECRET is not set on the server. Add it to blog-api/.env",
    });
  }
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "12mb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "blog-api" });
});

app.get("/api/blogs", (req, res) => {
  const rows = db.prepare("SELECT * FROM blogs ORDER BY updatedAt DESC").all();
  res.json(rows.map(rowToPost));
});

app.get("/api/blogs/slug/:slug", (req, res) => {
  const slug = normalizeSlug(req.params.slug);
  const row = db.prepare("SELECT * FROM blogs WHERE slug = ?").get(slug);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(rowToPost(row));
});

app.post("/api/blogs", requireAdmin, (req, res) => {
  const body = req.body || {};
  const slug = normalizeSlug(body.slug);
  if (!slug) return res.status(400).json({ error: "Invalid slug" });

  const existing = db.prepare("SELECT id FROM blogs WHERE slug = ?").get(slug);
  if (existing) return res.status(409).json({ error: "Slug already exists" });

  const now = new Date().toISOString();
  const id = `cms_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const post = {
    id,
    slug,
    pageTitle: String(body.pageTitle || "").trim(),
    pageSub: String(body.pageSub || "").trim(),
    metaDescription: String(body.metaDescription || "").trim(),
    heroImageUrl: String(body.heroImageUrl || "").trim(),
    metaTag: String(body.metaTag || "").trim(),
    lastUpdate: String(body.lastUpdate || "").trim(),
    title: String(body.title || "").trim(),
    intro: String(body.intro || "").trim(),
    bodyHtml: String(body.bodyHtml || ""),
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `INSERT INTO blogs (id, slug, pageTitle, pageSub, metaDescription, heroImageUrl, metaTag, lastUpdate, title, intro, bodyHtml, createdAt, updatedAt)
     VALUES (@id, @slug, @pageTitle, @pageSub, @metaDescription, @heroImageUrl, @metaTag, @lastUpdate, @title, @intro, @bodyHtml, @createdAt, @updatedAt)`
  ).run(post);

  res.status(201).json(post);
});

app.put("/api/blogs/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  const row = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ error: "Not found" });

  const slug = normalizeSlug(body.slug !== undefined ? body.slug : row.slug);
  if (!slug) return res.status(400).json({ error: "Invalid slug" });

  const clash = db.prepare("SELECT id FROM blogs WHERE slug = ? AND id != ?").get(slug, id);
  if (clash) return res.status(409).json({ error: "Another post uses this slug" });

  const now = new Date().toISOString();
  const post = {
    id,
    slug,
    pageTitle: String(body.pageTitle !== undefined ? body.pageTitle : row.pageTitle).trim(),
    pageSub: String(body.pageSub !== undefined ? body.pageSub : row.pageSub).trim(),
    metaDescription: String(
      body.metaDescription !== undefined ? body.metaDescription : row.metaDescription
    ).trim(),
    heroImageUrl: String(
      body.heroImageUrl !== undefined ? body.heroImageUrl : row.heroImageUrl
    ).trim(),
    metaTag: String(body.metaTag !== undefined ? body.metaTag : row.metaTag).trim(),
    lastUpdate: String(body.lastUpdate !== undefined ? body.lastUpdate : row.lastUpdate).trim(),
    title: String(body.title !== undefined ? body.title : row.title).trim(),
    intro: String(body.intro !== undefined ? body.intro : row.intro).trim(),
    bodyHtml: String(body.bodyHtml !== undefined ? body.bodyHtml : row.bodyHtml),
    createdAt: row.createdAt,
    updatedAt: now,
  };

  db.prepare(
    `UPDATE blogs SET slug=@slug, pageTitle=@pageTitle, pageSub=@pageSub, metaDescription=@metaDescription,
     heroImageUrl=@heroImageUrl, metaTag=@metaTag, lastUpdate=@lastUpdate, title=@title, intro=@intro, bodyHtml=@bodyHtml, updatedAt=@updatedAt
     WHERE id=@id`
  ).run(post);

  res.json(rowToPost(db.prepare("SELECT * FROM blogs WHERE id = ?").get(id)));
});

app.delete("/api/blogs/:id", requireAdmin, (req, res) => {
  const info = db.prepare("DELETE FROM blogs WHERE id = ?").run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

/* ---------- Contact form submissions (append-only; all rows kept until admin deletes) ---------- */

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    fileName TEXT,
    fileDataBase64 TEXT,
    submittedAt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new'
  );
`);

function rowToSubmission(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    message: row.message,
    fileName: row.fileName || undefined,
    fileDataBase64: row.fileDataBase64 || undefined,
    submittedAt: row.submittedAt,
    status: row.status,
  };
}

/** Public — each submit adds a new row; previous rows are never removed automatically. */
app.post("/api/contact-submissions", (req, res) => {
  const b = req.body || {};
  const name = String(b.name || "").trim();
  const email = String(b.email || "").trim();
  const phone = String(b.phone || "").trim();
  const service = String(b.service || "").trim();
  const message = String(b.message || "").trim();
  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let fileDataBase64 = b.fileBase64 != null ? String(b.fileBase64) : null;
  const fileName = b.fileName != null ? String(b.fileName).trim() : null;
  if (fileDataBase64 && fileDataBase64.length > 2_500_000) {
    fileDataBase64 = null;
  }

  const id = `submission_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  const submittedAt = new Date().toISOString();
  const row = {
    id,
    name,
    email,
    phone,
    service,
    message,
    fileName: fileName || null,
    fileDataBase64,
    submittedAt,
    status: "new",
  };

  db.prepare(
    `INSERT INTO contact_submissions (id, name, email, phone, service, message, fileName, fileDataBase64, submittedAt, status)
     VALUES (@id, @name, @email, @phone, @service, @message, @fileName, @fileDataBase64, @submittedAt, @status)`
  ).run(row);

  res.status(201).json(rowToSubmission(db.prepare("SELECT * FROM contact_submissions WHERE id = ?").get(id)));
});

app.get("/api/contact-submissions", requireAdmin, (req, res) => {
  const rows = db
    .prepare("SELECT * FROM contact_submissions ORDER BY submittedAt DESC")
    .all();
  res.json(rows.map(rowToSubmission));
});

app.patch("/api/contact-submissions/:id", requireAdmin, (req, res) => {
  const status = req.body && req.body.status;
  if (!["new", "read", "contacted"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const info = db
    .prepare("UPDATE contact_submissions SET status = ? WHERE id = ?")
    .run(status, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: "Not found" });
  const row = db.prepare("SELECT * FROM contact_submissions WHERE id = ?").get(req.params.id);
  res.json(rowToSubmission(row));
});

app.delete("/api/contact-submissions/:id", requireAdmin, (req, res) => {
  const info = db.prepare("DELETE FROM contact_submissions WHERE id = ?").run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Blog API listening on http://localhost:${PORT}`);
  if (!ADMIN_SECRET) {
    console.warn("Warning: ADMIN_SECRET is empty — POST/PUT/DELETE will return 503 until you set .env");
  }
});
