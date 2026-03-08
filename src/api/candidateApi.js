import { apiFetch } from "./api"

// ── AUTH ─────────────────────────────────────────────────────────────────────

export const register = async (data) => {
  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
  // L'API retourne access_token (même convention que /auth/login)
  const token = res?.access_token || res?.token;
  if (token) localStorage.setItem("token", token);
  return res;
};

export const login = async (data) => {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
  const token = res?.access_token || res?.token;
  if (token) localStorage.setItem("token", token);
  return res;
};

// ── PROFIL ───────────────────────────────────────────────────────────────────

export const getProfile = () =>
  apiFetch("/candidates/profile");

export const updateProfile = (data) =>
  apiFetch("/candidates/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

// ── ÉDUCATION ────────────────────────────────────────────────────────────────

export const getEducation = () =>
  apiFetch("/candidates/education");

export const updateEducation = (data) =>
  apiFetch("/candidates/education", {
    method: "PUT",
    body: JSON.stringify(data)
  });

// ── EXPÉRIENCE ───────────────────────────────────────────────────────────────

export const getExperiences = () =>
  apiFetch("/candidates/experiences");

export const updateExperience = (data) =>
  apiFetch("/candidates/experiences", {
    method: "PUT",
    body: JSON.stringify(data)
  });

// ── PRÉFÉRENCES ──────────────────────────────────────────────────────────────

export const getPreferences = () =>
  apiFetch("/candidates/preferences");

export const updatePreferences = (data) =>
  apiFetch("/candidates/preferences", {
    method: "PUT",
    body: JSON.stringify(data)
  });

// ── CV ───────────────────────────────────────────────────────────────────────

export const getCV = () =>
  apiFetch("/candidates/cv");

// ── TEST DE PERSONNALITÉ ─────────────────────────────────────────────────────

export const getTestStatus = () =>
  apiFetch("/test/status");

export const startTest = () =>
  apiFetch("/test/start");

export const submitTest = (answers) =>
  apiFetch("/test/submit", {
    method: "POST",
    body: JSON.stringify({ answers })
  });
