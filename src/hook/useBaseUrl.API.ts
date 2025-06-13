let baseUrl: string | null = null;

export function useBaseUrl(): string {
	if (!baseUrl) {
		// Verifica que import.meta.env exista y tenga la variable
		const envBaseUrl =
			typeof import.meta !== 'undefined' &&
			import.meta.env &&
			import.meta.env.VITE_API_BASE_URL;
		baseUrl = envBaseUrl ?? 'http://localhost:8080/';
	}
	return baseUrl ?? 'http://localhost:8080/';
}
