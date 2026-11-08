import PageLayout from "@/components/PageLayout";
import styles from "./page.module.scss";
import Image from "next/image";

export const metadata = {
  title: "Cookie Policy | trustpkg.dev",
  description:
    "Learn how trustpkg.dev uses essential cookies and browser storage.",
};

export default function CookiePolicyPage() {
  return (
    <PageLayout>
      <div className={styles.cookiePolicy}>
        <Image
          src="/cookies-page.png"
          alt=""
          className={styles.cookiePolicy_image}
          width={1536}
          height={1024}
        />
        <header className={styles.cookiePolicy_header}>
          <h1>Cookie Policy</h1>
          <p>Last updated: November 8, 2026</p>
        </header>

        <section>
          <h2>How we use cookies and browser storage</h2>
          <p>
            trustpkg.dev uses a small amount of first-party browser storage to
            provide core features. We do not use advertising or analytics
            cookies, and we do not use this storage to track you across other
            websites.
          </p>
        </section>

        <section>
          <h2>Storage used by this site</h2>
          <ul>
            <li>
              <strong>Theme cookie:</strong> remembers your selected light or
              dark theme for up to one year.
            </li>
            <li>
              <strong>Recently viewed packages:</strong> browser local storage
              keeps up to eight package pages on your device so you can find
              them again.
            </li>
            <li>
              <strong>Cookie notice preference:</strong> browser local storage
              remembers that you have acknowledged this notice. It remains
              until you clear your browser storage or this notice is updated.
            </li>
          </ul>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            These items support features you request and are not used for
            advertising. You can clear cookies and local storage in your
            browser settings; doing so may reset your theme, recently viewed
            packages, and this notice preference.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
