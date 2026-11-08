"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import styles from "./CookieBanner.module.scss";

const CONSENT_STORAGE_KEY = "trustpkg-cookie-notice-v1";
const CONSENT_CHANGE_EVENT = "trustpkg-cookie-notice-change";

let canUseLocalStorage: boolean | undefined;
let acknowledgedInMemory = false;

function getSnapshot() {
  if (acknowledgedInMemory || canUseLocalStorage === false) {
    return !acknowledgedInMemory;
  }

  try {
    canUseLocalStorage = true;
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "accepted";
  } catch (error) {
    canUseLocalStorage = false;
    console.error("Unable to read the cookie notice preference.", error);
    return true;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot() {
  return false;
}

export function CookieBanner() {
  const isVisible = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const handleAccept = () => {
    acknowledgedInMemory = true;

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
      canUseLocalStorage = true;
    } catch (error) {
      canUseLocalStorage = false;
      console.error("Unable to save the cookie notice preference.", error);
    }

    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className={styles.cookieBanner} aria-label="Cookie notice">
      <Image
        src="/cookie-dream.png"
        alt=""
        className={styles.cookieBanner_image}
        width={1536}
        height={1024}
      />

      <div className={styles.cookieBanner_content}>
        <p>
          TrustPkg uses essential browser storage to remember your theme and
          recently viewed packages. We do not use advertising or analytics
          cookies.{" "}
          <Link href="/cookies" className={styles.cookieBanner_link}>
            Read our Cookie Policy
          </Link>
          .
        </p>
        <Button.AsButton
          size="small"
          onClick={handleAccept}
          className={styles.cookieBanner_button}
        >
          Accept cookies
        </Button.AsButton>
      </div>
    </aside>
  );
}
