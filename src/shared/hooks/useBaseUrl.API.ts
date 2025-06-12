let baseUrl: string | null = null;

export function useBaseUrl(): string {
	if (!baseUrl) {
		const envBaseUrl = import.meta?.env?.VITE_API_BASE_URL;
		baseUrl = envBaseUrl ?? 'http://localhost:8080/';
	}
	return baseUrl ?? 'http://localhost:8080/';
}
