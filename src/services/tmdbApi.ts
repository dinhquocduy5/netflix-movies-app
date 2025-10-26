// Service for The Movie Database API
import { isNil } from "lodash";
import type { MovieListResponse } from "./tmdbTypes";
import type { MovieDetail } from "./tmdbDetailTypes";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(
  type: string = "now_playing",
  page: number = 1
): Promise<MovieListResponse> {
  if (isNil(API_TOKEN)) throw new Error("API token is missing");
  const res = await fetch(
    `${BASE_URL}/movie/${type}?language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  return await res.json();
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieListResponse> {
  if (isNil(API_TOKEN)) throw new Error("API token is missing");
  if (isNil(query) || query.trim() === "") throw new Error("Query is required");
  const url = `${BASE_URL}/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to search movies");
  return await res.json();
}

export async function fetchMovieDetail(
  id: string | number
): Promise<MovieDetail> {
  if (isNil(API_TOKEN)) throw new Error("API token is missing");
  if (isNil(id)) throw new Error("Movie id is required");
  const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movie detail");
  return await res.json();
}
