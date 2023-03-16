import { buildUrl, mustNotEndsWith, mustStartsWith } from "./util";

export const apiUrl = (path) => {
    if (path.startsWith("http") || path.startsWith("//")) {
        return path;
    }
    return buildUrl(API_BASE_URL, path)
}



export const routerPathName = () => {

    let pathname = window.location.pathname
    if (PUBLIC_PATH != '/' && pathname.toLowerCase().startsWith(PUBLIC_PATH)) {
        return pathname.slice(PUBLIC_PATH.length - 1)
    } else {
        return pathname;
    }
}


export const localPath = (pathname: string) => {

    if (pathname.startsWith("http")) {
        return pathname;
    }
    return mustNotEndsWith(PUBLIC_PATH, '/') + mustStartsWith(pathname, '/')
}
