import appSettings from "@/services/appsettings";
import { buildUrl, mustNotEndsWith, mustStartsWith } from "./util";

export const apiUrl = (path: string) => {
    if (path.startsWith("http") || path.startsWith("//")) {
        return path;
    }
    return buildUrl(appSettings.apiBaseUrl, path)
}



export const routerPathName = () => {

    let pathname = window.location.pathname
    if (appSettings.routeBase != '/' && pathname.toLowerCase().startsWith(appSettings.routeBase)) {
        return pathname.slice(appSettings.routeBase.length - 1)
    } else {
        return pathname;
    }
}


export const localPath = (pathname: string) => {

    if (pathname.startsWith("http")) {
        return pathname;
    }
    return mustNotEndsWith(appSettings.routeBase, '/') + mustStartsWith(pathname, '/')
}
