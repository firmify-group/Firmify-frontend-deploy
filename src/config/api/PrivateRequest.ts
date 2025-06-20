import { useState } from "react"
import { FETCH_STATUS, FETCH_EXCEPTIONS, HTTP_METHOD } from "src/utils/constant/API"
import { useBaseUrl } from "./BaseUrl.API"
import type { RequestBody } from "src/utils/types/components.public"

export function usePrivateAPI() {
    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const [message, setMessage] = useState<string>("")

    const API_BASE_URL = useBaseUrl();

    const request = async <T = unknown>(
        url: string | (() => string),
        method: HTTP_METHOD,
        body: RequestBody = {},
        headers: Record<string, string> = {}
    ): Promise<T> => {
        const resolvedUrl = typeof url === "function" ? url() : url
        const fullUrl = resolvedUrl.startsWith("http") ? resolvedUrl : `${API_BASE_URL}${resolvedUrl}`
        const token = localStorage.getItem('token');

        setStatus(FETCH_STATUS.LOADING)
        setMessage("Iniciando sesión...")

        const fetchOptions: RequestInit = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };

        if (method !== HTTP_METHOD.GET && method !== 'HEAD') {
            fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
        }

        return new Promise<T>((resolve, reject) => {
            fetch(fullUrl, fetchOptions)
                .then(async (response) => {
                    setStatus(FETCH_STATUS.LOADING)
                    if (!response.ok) {
                        const errorStatus = response.status;
                        const errorMessage = FETCH_EXCEPTIONS[errorStatus] || `Error ${errorStatus}`;
                        throw new Error(errorMessage)
                    }
                    const data: T = await response.json()
                    setStatus(FETCH_STATUS.SUCCESS)
                    setMessage("Ingreso exitoso")
                    resolve(data)
                })
                .catch((error) => {
                    setStatus(FETCH_STATUS.ERROR)
                    setMessage("Credenciales incorrectas")

                    setTimeout(() => {
                        setStatus(FETCH_STATUS.IDLE)
                        setMessage("")
                    }, 1000)

                    reject(error instanceof Error ? error : new Error(String(error)))
                })
                .finally(() => {
                    setTimeout(() => {
                        setStatus(FETCH_STATUS.IDLE)
                        setMessage("")
                    }, 1000)
                })
        })
    }

    const post = <T = unknown>(
        url: string | (() => string),
        body: RequestBody = {},
        headers: Record<string, string> = {}
    ): Promise<T> => {
        return request<T>(url, HTTP_METHOD.POST, body, headers)
    }

    const get = <T = unknown>(
        url: string | (() => string),
        headers: Record<string, string> = {}
    ): Promise<T> => {
        return request<T>(url, HTTP_METHOD.GET, {}, headers)
    }

    return {
        status,
        message,
        post,
        get,
    }
}