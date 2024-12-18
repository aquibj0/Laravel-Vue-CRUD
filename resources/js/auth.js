import { ref } from "vue";

export const isAuthenticated = ref(!!sessionStorage.getItem("auth_token"));

export function login(token) {
    sessionStorage.setItem("auth_token", token);
    isAuthenticated.value = true;
}

export function logout() {
    sessionStorage.removeItem("auth_token");
    isAuthenticated.value = false; 
}``