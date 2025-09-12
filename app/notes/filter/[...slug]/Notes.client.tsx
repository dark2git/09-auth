"use client";
import css from "./notes.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  initialSearch: string;
  initialPage: number;
  tag: string | undefined;
}

export default function NotesClient({
  initialSearch,
  initialPage,
  tag,
}: NotesClientProps) {
  const [inputValue, setInputValue] = useState(initialSearch);
  const [searchQuery] = useDebounce(inputValue, 800);
  const [currentPage, setCurrentPage] = useState(initialPage);

  function handleSearchChange(value: string) {
    setInputValue(value);
    setCurrentPage(1); // скиданян сторінки при новому пошуку
  }

  const { data } = useQuery({
    queryKey: ["notes", searchQuery, tag, currentPage],
    queryFn: () => fetchNotes(searchQuery, tag, currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox handleChange={handleSearchChange} value={inputValue} />}
        {data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
        {
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        }
      </header>
      {data && data?.notes.length > 0 ? (
        <NoteList
          notes={data.notes}
          queryKey={["notes", searchQuery, tag, currentPage]}
        />
      ) : (
        <p>No notes, try again later</p>
      )}
    </div>
  );
}
