let isVite = true;
let runtime: any = null;
if (typeof process != 'undefined') {
    isVite = process?.env?.npm_lifecycle_script?.includes('vite');
    runtime = process?.env
} else {
    runtime = import.meta.env
}

const AppSettings = {
    API_BASE_URL: runtime.VITE_apiRoot + runtime.VITE_serverApiPrefix as string,
    CLIENT_ROOT: runtime.VITE_clientRoot as string,
    CLIENT_ID: runtime.VITE_clientId as string,
    PUBLIC_PATH: runtime.VITE_publicPathPrefix as string,
    LOGIN_URL: "/auth/login" as string
}
export default AppSettings