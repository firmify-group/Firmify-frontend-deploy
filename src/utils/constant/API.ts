export enum EXCEPTION_TYPE {
    UNAUTHORIZED = 'No Autorizado',
    FORBIDDEN = 'Prohibido',
    TOKEN_EXPIRED = 'Token Expirado',
    INVALID_CREDENTIALS = 'Credenciales Inválidas',
    ACCOUNT_LOCKED = 'Cuenta Bloqueada',
    ACCOUNT_SUSPENDED = 'Cuenta Suspendida',

    DOCUMENT_NOT_FOUND = 'Documento No Encontrado',
    DOCUMENT_CORRUPTED = 'Documento Corrupto',
    INVALID_DOCUMENT_TYPE = 'Tipo de Documento Inválido',
    DOCUMENT_TOO_LARGE = 'Documento Muy Grande',
    DOCUMENT_UPLOAD_FAILED = 'Fallo en Subida de Documento',

    NETWORK_ERROR = 'Error de Red',
    SERVER_ERROR = 'Error del Servidor',
    SERVICE_UNAVAILABLE = 'Servicio No Disponible',
    TIMEOUT = 'Tiempo Agotado',
    DATABASE_ERROR = 'Error de Base de Datos',
}

export enum CONTENT_TYPE {
    JSON = 'application/json',
    FORM_DATA = 'multipart/form-data',
    FORM_URL_ENCODED = 'application/x-www-form-urlencoded',
    PDF = 'application/pdf',
    XML = 'application/xml',
    TEXT = 'text/plain'
}

export enum SIGNATURE_STATUS {
    PENDING = 'Pendiente',
    IN_PROCESS = 'En Proceso',
    COMPLETED = 'Completada',
    REJECTED = 'Rechazada',
    EXPIRED = 'Expirada',
    CANCELLED = 'Cancelada',
    INVALIDATED = 'Invalidada'
}

export enum API_ENDPOINTS {
    LOGIN = '/login',
    ADMIN_SUMMARY_PROCESS = '/api/manager/process/summary',
    ADMIN_ALL_REQUESTS = '/api/manager/process',
    ADMIN_AUDIT_FILE = '/api/manager/process/audit/summary',
    ADMIN_ALL_USERS = '/api/manager/officer/all',
    ADMIN_ADD_FUNCTIONARY = '/api/manager/officer/add',
    ADMIN_ADD_EVALUATION = '/api/manager/request/valuate',
    ADMIN_DEL_FUNCTIONARY = '/api/manager/officer/delete',
    USER_ALL_REQUESTS = '/api/office/request/all',
    USER_OBJECT_PROCESS = '/api/office/request/object',
    CATEGORIES="/api/categories",
    ADMIN_ALL_PROCESSES_WS = "ADMIN_ALL_PROCESSES_WS",
    USER_CREATE_REQUEST = "/api/office/request/create",
}

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

export enum FETCH_STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
};


export const FETCH_EXCEPTIONS: Record<number, string> = {
    400: 'Solicitud incorrecta',
    401: 'Error de autenticación',
    403: 'Acceso denegado',
    404: 'Recurso no encontrado',
    500: 'Error interno del servidor',
    502: 'Puerta de enlace incorrecta',
    503: 'Servicio no disponible',
};

