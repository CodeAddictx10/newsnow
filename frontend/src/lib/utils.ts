import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCsrfToken(): string | null {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find((cookie) =>
        cookie.startsWith("XSRF-TOKEN="),
    );
    return csrfCookie ? decodeURIComponent(csrfCookie.split("=")[1]) : null;
};
