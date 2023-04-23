let isLoggedIn = !!localStorage.getItem("isLoggedIn");

export function loginImpl() {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
}

export function logoutImpl() {
    isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
}

export { isLoggedIn };
