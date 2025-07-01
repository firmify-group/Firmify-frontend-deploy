let baseUrl: string | null = null;

// TODO: Ante cualqueir cambio en la URL de la API, actualizar __API_URL__ en el archivo de configuración
export function useBaseUrl(): string {
	if (!baseUrl) {
		baseUrl = 'http://localhost:8000';
	}
	return baseUrl;
}