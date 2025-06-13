import { useState } from "react"
import { FETCH_STATUS, FETCH_EXCEPTIONS } from "src/utils/constant/API"
import { useBaseUrl } from "./useBaseUrl.API"
import type { RequestBody } from "src/utils/types/components.public"

export function usePublicAPI() {
    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const [message, setMessage] = useState<string>("")

    const API_BASE_URL = useBaseUrl();

    const request = async <T = unknown>(
        url: string | (() => string),
        body: RequestBody = {},
        headers: Record<string, string> = {},
    ): Promise<T> => {
        const resolvedUrl = typeof url === "function" ? url() : url
        const fullUrl = resolvedUrl.startsWith("http") ? resolvedUrl : `${API_BASE_URL}${resolvedUrl}`

        setStatus(FETCH_STATUS.LOADING)
        setMessage("Iniciando sesión...")

        return new Promise<T>((resolve, reject) => {
            fetch(fullUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: body instanceof FormData ? body : JSON.stringify(body),
            })
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
        return request<T>(url, body, headers)
    }

    return {
        status,
        message,
        post,
    }
}