// Función para construir parámetros de consulta a partir de un objeto
export function buildQueryParams(params: Record<string, any>): string {
    const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return queryParams ? `?${queryParams}` : '';
}