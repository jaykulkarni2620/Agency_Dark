/**
 * Contact submissions: SQLite via blog-api when REACT_APP_BLOG_API_URL is set, else localStorage.
 * New submissions are always appended; nothing is removed unless an admin deletes a row.
 */
import {
  getApiBaseUrl,
  getAdminHeaders,
  isBlogApiConfigured,
} from "./blogApiClient";

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  fileName?: string;
  /** Present when stored from API or local save with upload */
  fileDataBase64?: string;
  submittedAt: string;
  status: "new" | "read" | "contacted";
}

const STORAGE_KEY = "minex_form_submissions";
const LOCAL_MAX = 500;

function saveFormSubmissionLocal(
  formData: Omit<FormSubmission, "id" | "submittedAt" | "status"> & {
    fileDataBase64?: string;
  }
): FormSubmission {
  const submissions = getFormSubmissionsLocal();

  const newSubmission: FormSubmission = {
    id: `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...formData,
    submittedAt: new Date().toISOString(),
    status: "new",
  };

  submissions.unshift(newSubmission);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(submissions.slice(0, LOCAL_MAX))
  );

  return newSubmission;
}

export function getFormSubmissionsLocal(): FormSubmission[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function updateSubmissionStatusLocal(
  id: string,
  status: FormSubmission["status"]
): void {
  const submissions = getFormSubmissionsLocal();
  const index = submissions.findIndex((sub) => sub.id === id);

  if (index !== -1) {
    submissions[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

function deleteSubmissionLocal(id: string): void {
  const submissions = getFormSubmissionsLocal().filter((sub) => sub.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

function mirrorSubmissionToLocal(saved: FormSubmission): void {
  try {
    const list = getFormSubmissionsLocal();
    if (list.some((s) => s.id === saved.id)) return;
    const next = [saved, ...list].slice(0, LOCAL_MAX);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/** Fields from the contact form before save. */
export type SaveContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  fileName?: string;
  /** Data URL from FileReader (optional). */
  fileBase64?: string;
};

/** Saves a new submission (append-only). Tries API first, then localStorage. */
export async function saveFormSubmission(
  formData: SaveContactPayload
): Promise<FormSubmission> {
  const body = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    service: formData.service.trim(),
    message: formData.message.trim(),
    fileName: formData.fileName,
    fileBase64: formData.fileBase64,
  };

  if (isBlogApiConfigured()) {
    try {
      const r = await fetch(`${getApiBaseUrl()}/api/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        throw new Error((data && data.error) || `HTTP ${r.status}`);
      }
      const saved = data as FormSubmission;
      mirrorSubmissionToLocal(saved);
      return saved;
    } catch (e) {
      console.warn("[contact] API save failed, using localStorage", e);
    }
  }

  const { fileBase64, ...rest } = body;
  return saveFormSubmissionLocal({
    ...rest,
    fileDataBase64: fileBase64,
  });
}

/** All submissions for the admin dashboard (newest first when using API). */
export async function getFormSubmissions(): Promise<FormSubmission[]> {
  if (isBlogApiConfigured()) {
    try {
      const r = await fetch(`${getApiBaseUrl()}/api/contact-submissions`, {
        headers: getAdminHeaders(),
      });
      if (r.status === 401) {
        console.warn("[contact] Unauthorized — check REACT_APP_BLOG_ADMIN_SECRET");
        throw new Error("unauthorized");
      }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    } catch (e) {
      console.warn("[contact] API list failed, using localStorage", e);
    }
  }
  return getFormSubmissionsLocal();
}

export async function updateSubmissionStatus(
  id: string,
  status: FormSubmission["status"]
): Promise<void> {
  if (isBlogApiConfigured()) {
    try {
      const r = await fetch(
        `${getApiBaseUrl()}/api/contact-submissions/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: getAdminHeaders(),
          body: JSON.stringify({ status }),
        }
      );
      if (r.ok) {
        updateSubmissionStatusLocal(id, status);
        return;
      }
    } catch {
      /* fallback local */
    }
  }
  updateSubmissionStatusLocal(id, status);
}

export async function deleteSubmission(id: string): Promise<void> {
  if (isBlogApiConfigured()) {
    try {
      const r = await fetch(
        `${getApiBaseUrl()}/api/contact-submissions/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: getAdminHeaders(),
        }
      );
      if (r.ok) {
        deleteSubmissionLocal(id);
        return;
      }
    } catch {
      /* fallback */
    }
  }
  deleteSubmissionLocal(id);
}

export function getSubmissionStatsFromList(submissions: FormSubmission[]) {
  return {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    read: submissions.filter((s) => s.status === "read").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
  };
}

/** Sync stats from localStorage only (e.g. legacy callers). */
export function getSubmissionStats() {
  return getSubmissionStatsFromList(getFormSubmissionsLocal());
}
