import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { MODL } from "@modl-gg/shared-web";

function resolveApiBaseUrl(): string {
  if (import.meta.env.DEV) {
    return '';
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (!hostname.endsWith('.pages.dev') && !hostname.includes('localhost')) {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const baseDomain = parts.slice(-2).join('.');
        return `https://api.${baseDomain}`;
      }
    }
  }

  return MODL.Domain.HTTPS_API;
}

const API_BASE_URL = resolveApiBaseUrl();

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export function getCurrentDomain(): string {
  return window.location.hostname;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const fullUrl = url.startsWith('http') ? url : getApiUrl(url);
  const res = await fetch(fullUrl, {
    method,
    headers: {
      ...(data ? { "Content-Type": "application/json" } : {})
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    const fullUrl = url.startsWith('http') ? url : getApiUrl(url);
    const res = await fetch(fullUrl, {
      credentials: "include"
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
