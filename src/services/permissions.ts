import { History } from "history"
import AppSettings from "./appSettings";
import authService from "./auth/authService"
import queryString from "qs";
const loginPage = AppSettings.LOGIN_URL || '/user/login';

export const WITHELIST = [
    loginPage,
    '/auth/login',
    '/auth/redirect',
    '/auth/logout_redirect'
];

export const checkLogin = async (history: History) => {
    if (await authService.isLoggedIn()) {
        return true;
    }
    const { search, pathname } = history.location;
    if (!WITHELIST.includes(pathname)) {
        let query = queryString.parse(search) as any;
        console.log('search: ', search);
        let redirect = pathname + (search || '').toLowerCase();
        if (query.redirect) {
            redirect = query.redirect;
        }
        history.push(loginPage + '?redirect=' + redirect);
    } else {
        history.push(loginPage);
    }
    return false;
};

export const needLogin = (history: History) => {
    const { pathname } = history.location;
    return WITHELIST.includes(pathname)
}