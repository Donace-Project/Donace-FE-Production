export const authHelper = {
    getToken,
    saveToken
}

export function getToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token") as string;
    }
    return null;
}

export function saveToken(token: string | undefined): void {
    if (token == null) return

    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
}
