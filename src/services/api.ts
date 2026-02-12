/** API service for communicating with the backend */

import type { GenerateRequest, GenerateResponse } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function generateUI(
  request: GenerateRequest
): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Server error: ${res.status}`);
  }

  return res.json();
}
