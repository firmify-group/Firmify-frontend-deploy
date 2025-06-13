let baseUrl: string | null = null;

export function useBaseUrl(): string {
	if (!baseUrl) {
		baseUrl = __API_URL__ || 'http://localhost:8080/';
	}
	return baseUrl;
}