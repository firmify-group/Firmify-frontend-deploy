export enum ROLE {
    ADMIN = 'SUPERVISOR',
    USER = 'EMPLEADO'
}
export enum LOGIN_STATUS {
    LOADING = 'Cargando...',
    IDLE = 'Iniciar sesión',
    ERROR = 'Error al iniciar sesión',
}

export enum FETCH_EXCEPTIONS {
    TIMEOUT = 'Tiempo de espera agotado',
    NETWORK_ERROR = 'Error de red',
    SERVER_ERROR = 'Error del servidor',
    LOGIN_ERROR = 'Error en el login',
}

export enum PATH_ROUTES {
    HOME = '/',
    LOGIN = '/login',
    MANAGER_HOME = '/manager/home',
    USER_HOME = '/user/home',
    MANAGER_DOCUMENTS = '/manager/documents',
    USER_DOCUMENTS = '/user/documents',
    MANAGER_USERS = '/manager/users',
    USER_PROFILE = '/user/profile',
}