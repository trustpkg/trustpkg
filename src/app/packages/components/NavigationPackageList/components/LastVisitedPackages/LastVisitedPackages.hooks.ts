'use client'

import React from "react";
import { CHANGE_EVENT, MAX_RECENT_PAGES, STORAGE_KEY } from "./LastVisitedPackages.constants";
import { getServerSnapshot, getSnapshot, parseRecentPages, subscribe } from "./LastVisitedPackages.utils";
import { LastVisitedPackage } from "./LastVisitedPackages.types";

export function useRecentPackages(params: LastVisitedPackage) {
    const { name, ecosystem, url } = params

      const snapshot = React.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    React.useEffect(() => {
        if (!name || !ecosystem) {
            return;
        }

        const currentPage: LastVisitedPackage = {
            name,
            ecosystem,
            url,
            date: new Date().toISOString()
        };

        const recentPages = parseRecentPages(getSnapshot());

        const updatedPages = [
            currentPage,
            ...recentPages.filter((page) => page.url !== url),
        ].slice(0, MAX_RECENT_PAGES);

        const serializedPages = JSON.stringify(updatedPages);

        if (serializedPages !== getSnapshot()) {
            localStorage.setItem(STORAGE_KEY, serializedPages);
            window.dispatchEvent(new Event(CHANGE_EVENT));
        }
    }, [name, ecosystem, url]);

    const recentPages = parseRecentPages(snapshot);

    return {recentPages}
}