/**
 * HTTP client preparado para integração futura com a API REST.
 * Quando o backend estiver disponível, basta apontar NEXT_PUBLIC_API_URL e
 * trocar os mocks dos services pelos endpoints reais.
 */

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export interface ApiOptions extends RequestInit {
  token?: string;
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    const error = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${error}`);
  }
  return res.json() as Promise<T>;
}
