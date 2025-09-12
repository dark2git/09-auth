"use client";
import { useState } from "react";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NoteInputValues } from "../../types/note";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "title is too short")
    .max(50, "title is too long")
    .required("title is required"),
  content: Yup.string().max(500, "content is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Shopping", "Meeting", "Personal"], "you invalid")
    .required("tag is required"),
});

export default function NoteForm() {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<
    Partial<Record<keyof NoteInputValues, string>>
  >({});
  const mutation = useMutation({
    mutationFn: async (values: NoteInputValues) => {
      await createNote(values);
    },
  });

  const router = useRouter();
  const onClose = () => router.push("/notes/filter/All");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(draft, { abortEarly: false });
      mutation.mutate(draft, {
        onSuccess: () => {
          clearDraft();
          queryClient.invalidateQueries({ queryKey: ["notes"] });
          onClose();
        },
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<keyof NoteInputValues, string> = {} as Record<
          keyof NoteInputValues,
          string
        >;
        error.inner.forEach((err) => {
          if (err.path)
            newErrors[err.path as keyof NoteInputValues] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={draft?.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
