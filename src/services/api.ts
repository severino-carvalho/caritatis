import { env } from "@/config/env";
import { getToken } from "./auth";

const BASE_URL = env.apiBaseUrl;

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Wrapper de fetch autenticado para respostas JSON.
 * Para requisições multipart (FormData), use `apiFetchMultipart`, que não
 * define `Content-Type` — o browser cuida do boundary.
 */
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Erro ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Variante para envio de `multipart/form-data`. Omite `Content-Type`
 * propositalmente para que o browser defina o boundary correto.
 */
async function apiFetchMultipart<T>(
  path: string,
  body: FormData,
  options?: Omit<RequestInit, "body">,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    ...options,
    body,
    headers: {
      ...authHeaders(),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Erro ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export { apiFetch, apiFetchMultipart, authHeaders, BASE_URL };
