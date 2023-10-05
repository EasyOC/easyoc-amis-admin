let isVite = true;
let runtime: ImportMetaEnv = null;
if (typeof process != 'undefined') {
    isVite = process?.env?.npm_lifecycle_script?.includes('vite') || false;
    //@ts-ignore
    runtime = process?.env
} else {
    runtime = import.meta.env
}
export default runtime