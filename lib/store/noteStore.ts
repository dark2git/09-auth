import { create } from "zustand";
import { NoteInputValues } from "@/types/note";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: NoteInputValues;
  setDraft: (note: NoteInputValues) => void;
  clearDraft: () => void;
};

const initialData: NoteInputValues = {
  title: "",
  content: "",
  tag: "Todo",
};
export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialData,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialData })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
