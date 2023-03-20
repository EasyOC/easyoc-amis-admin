let isVite = true;
let runtime: any = null;
if (typeof process != 'undefined') {
    isVite = process?.env?.npm_lifecycle_script?.includes('vite');
    runtime = process?.env
} else {
    runtime = import.meta.env
}

const AppSettings = {
    CLIENT_ROOT: runtime.VITE_clientRoot as string,
    CLIENT_ID: runtime.VITE_clientId as string,
    API_BASE_URL: runtime.VITE_apiRoot as string,
    PUBLIC_PATH: runtime.VITE_publicPathPrefix as string
}


export default AppSettings