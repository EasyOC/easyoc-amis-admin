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
    if (AppSettings.PUBLIC_PATH != '/' && pathname.toLowerCase().startsWith(AppSettings.PUBLIC_PATH)) {
        return pathname.slice(AppSettings.PUBLIC_PATH.length - 1)
    } else {
        return pathname;
    }
}


export const localPath = (pathname: string) => {

    if (pathname.startsWith("http")) {
        return pathname;
    }
    return mustNotEndsWith(AppSettings.PUBLIC_PATH, '/') + mustStartsWith(pathname, '/')
}
