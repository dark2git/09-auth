import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Vadym Samardak</p>
          <p>
            Contact us:
            <a href="mailto:vadym.samardak@dark2care.com">
              vadym.samardak@dark2care.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
