import AppSettings from "@/services/appSettings";
import { buildUrl, mustNotEndsWith, mustStartsWith } from "./util";

export const apiUrl = (path: string) => {
    if (path.startsWith("http") || path.startsWith("//")) {
        return path;
    }
    return buildUrl(AppSettings.API_BASE_URL, path)
}



export const routerPathName = () => {

    let pathname = window.location.pathname
    if (AppSettings.publicPath != '/' && pathname.toLowerCase().startsWith(AppSettings.publicPath)) {
        return pathname.slice(AppSettings.publicPath.length - 1)
    } else {
        return pathname;
    }
}


export const localPath = (pathname: string) => {

    if (pathname.startsWith("http")) {
        return pathname;
    }
    return mustNotEndsWith(AppSettings.publicPath, '/') + mustStartsWith(pathname, '/')
}
