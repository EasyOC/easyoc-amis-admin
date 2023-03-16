import authService from "./auth/authService"

const ignorePaths = ["/login", "/login-redirect"]
export const checkLogin = async (path: string) => {
    if (ignorePaths.includes(path.toLocaleLowerCase())) {
        return true
    } else {
        if (await authService.isLoggedIn()) {
            return true
        } else {
            return true
        }
    }
}