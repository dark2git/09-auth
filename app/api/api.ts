import axios, { AxiosError } from "axios";

const isSSR = typeof window === "undefined";
const baseURL = isSSR ? "https://notehub-api.goit.study" : "/api";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
