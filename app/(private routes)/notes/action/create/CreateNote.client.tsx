"use client";

import css from "./Create.Note.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function ClientCreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm></NoteForm>
      </div>
    </main>
  );
}
