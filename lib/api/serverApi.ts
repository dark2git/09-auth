import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { FetchHttpResponse, FetchParams } from "./clientApi";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const res = await nextServer.get(`/notes/${id}`, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function fetchNotes(
  searchText: string,
  tag: string | undefined,
  page: number
): Promise<FetchHttpResponse> {
  const params: FetchParams = {
    page,
    tag,
    perPage: 12,
  };

  if (searchText.trim() !== "") {
    params.search = searchText.trim();
  }
  const cookieStore = await cookies();
  const res = await nextServer.get<FetchHttpResponse>("/notes", {
    params,
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
