import { CHANGE_EVENT, STORAGE_KEY } from "./LastVisitedPackages.constants";
import { LastVisitedPackage } from "./LastVisitedPackages.types";

export function getSnapshot(): string {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
}

export function getServerSnapshot(): string {
    return "[]";
}

export function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener(CHANGE_EVENT, callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(CHANGE_EVENT, callback);
    };
}

export function parseRecentPages(value: string): LastVisitedPackage[] {
    try {
        const parsed: unknown = JSON.parse(value);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(
            (item): item is LastVisitedPackage =>
                typeof item?.name === "string" &&
                typeof item?.ecosystem === "string" &&
                typeof item?.url === "string" &&
                typeof item?.date === "string"
        );
    } catch {
        return [];
    }
}

export function formatTimeAgo(date?: Date): string {
    if (!date) {
        return "";
    }

    const timestamp = date.getTime();
    const now = Date.now();

    if (Number.isNaN(timestamp)) {
        throw new Error("Invalid date");
    }

    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
        return "now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 30) {
        return `${diffInDays}day ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths < 12) {
        return `${diffInMonths}month ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);

    return `${diffInYears}year ago`;
}