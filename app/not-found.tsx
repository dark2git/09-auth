import { Metadata } from "next";
import css from "./home.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "there is no page on this url",
  openGraph: {
    title: "Not found",
    description: "there is no page on this url",
    url: "?",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes picture",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
