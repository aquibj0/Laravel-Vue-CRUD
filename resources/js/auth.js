export function isAuthenticated() {
    return !!sessionStorage.getItem("auth_token"); // Returns true if token exists
}
