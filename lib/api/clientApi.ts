import { RegisterRequest, User } from "@/types/user";
import { nextServer } from "./api";
import { Note, NoteInputValues } from "@/types/note";

export interface FetchHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchParams {
  search?: string;
  tag: string | undefined;
  page: number;
  perPage: number;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const changeName = async (username: string, email?: string) => {
  const res = await nextServer.patch<CheckSessionRequest>("/users/me", {
    email,
    username,
  });
  return res.data;
};

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

  const res = await nextServer.get<FetchHttpResponse>("/notes", {
    params,
  });
  return res.data;
}

export async function createNote(note: NoteInputValues): Promise<Note> {
  const res = await nextServer.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get(`/notes/${id}`);
  return res.data;
}

export async function fetchNotesByTag(
  tag?: string
): Promise<FetchHttpResponse> {
  const res = await nextServer.get(`/notes`, {
    params: {
      tag,
      perPage: 12,
    },
  });
  return res.data;
}
