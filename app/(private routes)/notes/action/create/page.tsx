import { Metadata } from "next";
import ClientCreateNote from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create a New Note | NoteHub",
  description:
    "Quickly add and organize your thoughts with a new note. Fill out the form and keep your ideas in one place.",
  openGraph: {
    title: "Create a New Note | NoteHub",
    description:
      "Easily create and save a new note to stay organized. Add your thoughts and manage them with NoteHub.",
    url: "https://08-zustand-mu-seven.vercel.app/notes/action/create",
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

export default function CreateNote() {
  return <ClientCreateNote></ClientCreateNote>;
}
