let isVite = true;
let runtime: any = null;
if (typeof process != 'undefined') {
    isVite = process?.env?.npm_lifecycle_script?.includes('vite') || false;
    runtime = process?.env
} else {
    runtime = import.meta.env
}
export default runtime