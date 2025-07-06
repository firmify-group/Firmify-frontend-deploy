import { useState, useCallback } from "react";
import { FETCH_STATUS, FETCH_EXCEPTIONS, HTTP_METHOD } from "src/utils/constant/API";
import { useBaseUrl } from "./BaseUrl.API";
import type { RequestBody } from "src/utils/types/components.public";

export function usePrivateAPI() {
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);
  const [message, setMessage] = useState<string>("");

  const API_BASE_URL = useBaseUrl();

  const request = useCallback(
    async <T = unknown>(
      url: string | (() => string),
      method: HTTP_METHOD,
      body: RequestBody = {},
      headers: Record<string, string> = {}
    ): Promise<T> => {
      const resolvedUrl = typeof url === "function" ? url() : url;

      if (!resolvedUrl || typeof resolvedUrl !== "string") {
        throw new Error(`URL inválida: ${resolvedUrl}`);
      }

      const fullUrl = resolvedUrl.startsWith("http") ? resolvedUrl : `${API_BASE_URL}${resolvedUrl}`;
      const token = localStorage.getItem("token");

      setStatus(FETCH_STATUS.LOADING);
      setMessage("Iniciando solicitud...");

      const fetchOptions: RequestInit = {
        method,
        headers: {
          ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
          ...headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      if (method !== HTTP_METHOD.GET && method !== "HEAD") {
        fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
      }

      return new Promise<T>((resolve, reject) => {
        fetch(fullUrl, fetchOptions)
          .then(async (response) => {
            if (!response.ok) {
              const errorStatus = response.status;
              const errorMessage = FETCH_EXCEPTIONS[errorStatus] || `Error ${errorStatus}`;
              throw new Error(errorMessage);
            }

            // Para DELETE, algunos backend no devuelven JSON, evitamos error intentando parsear
            if (method === HTTP_METHOD.DELETE) {
              setStatus(FETCH_STATUS.SUCCESS);
              setMessage("Solicitud exitosa");
              resolve(undefined as unknown as T); // Resolvemos sin datos
              return;
            }

            const data: T = await response.json();
            setStatus(FETCH_STATUS.SUCCESS);
            setMessage("Solicitud exitosa");
            resolve(data);
          })
          .catch((error) => {
            setStatus(FETCH_STATUS.ERROR);
            setMessage("Error en la solicitud");

            setTimeout(() => {
              setStatus(FETCH_STATUS.IDLE);
              setMessage("");
            }, 1000);

            reject(error instanceof Error ? error : new Error(String(error)));
          })
          .finally(() => {
            setTimeout(() => {
              setStatus(FETCH_STATUS.IDLE);
              setMessage("");
            }, 1000);
          });
      });
    },
    [API_BASE_URL]
  );

  const get = useCallback(
    <T = unknown>(url: string | (() => string), headers: Record<string, string> = {}) =>
      request<T>(url, HTTP_METHOD.GET, {}, headers),
    [request]
  );

  const post = useCallback(
    <T = unknown>(url: string | (() => string), body: RequestBody = {}, headers: Record<string, string> = {}) =>
      request<T>(url, HTTP_METHOD.POST, body, headers),
    [request]
  );

  const patch = useCallback(
    <T = unknown>(url: string | (() => string), body: RequestBody = {}, headers: Record<string, string> = {}) =>
      request<T>(url, HTTP_METHOD.PATCH, body, headers),
    [request]
  );

  const del = useCallback(
    <T = unknown>(url: string | (() => string), headers: Record<string, string> = {}) =>
      request<T>(url, HTTP_METHOD.DELETE, {}, headers),
    [request]
  );

  return {
    status,
    message,
    get,
    post,
    patch,
    del
  };
}
