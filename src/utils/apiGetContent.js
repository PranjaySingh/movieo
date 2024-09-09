const TMDB_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

export async function getTrending() {
  const res = await fetch(`${TMDB_URL}/trending/all/week`, options);
  if (!res.ok) throw new Error("Could not fetch trending movies and tv shows");

  const data = await res.json();
  return data;
}

export async function getTopRated() {
  const res = await fetch(`${TMDB_URL}/movie/top_rated`, options);
  if (!res.ok) throw new Error("Could not fetch Top rated movies");

  const data = await res.json();
  return data;
}

export async function getConfiguration() {
  const res = await fetch(`${TMDB_URL}/configuration`, options);
  if (!res.ok) throw new Error("Could not fetch configuration");

  const data = await res.json();
  return data;
}

export async function getNowPlaying() {
  const res = await fetch(`${TMDB_URL}/movie/now_playing`, options);
  if (!res.ok) throw new Error("Could not fetch now playing movies");

  const data = await res.json();
  return data;
}

export async function getPupularTv() {
  const res = await fetch(`${TMDB_URL}/tv/popular`, options);
  if (!res.ok) throw new Error("Could not fetch popular tv shows");

  const data = await res.json();
  return data;
}
export async function getOnAir() {
  const res = await fetch(`${TMDB_URL}/tv/on_the_air`, options);
  if (!res.ok) throw new Error("Could not fetch On-Air tv shows");

  const data = await res.json();
  return data;
}
export async function discoverContent(explore, page) {
  const res = await fetch(
    `${TMDB_URL}/discover/${explore}?page=${page}`,
    options
  );
  if (!res.ok)
    throw new Error(
      `Could not fetch ${explore === "tv" ? "TV shows" : "movies"}`
    );

  const data = await res.json();
  return data;
}

export async function getSearchContent(query, page) {
  const res = await fetch(
    `${TMDB_URL}/search/multi?query=${query}&page=${page}`,
    options
  );
  if (!res.ok) throw new Error("Could not fetch search results");

  const data = await res.json();
  return data;
}

export async function getContentDetails(type, id) {
  const res = await fetch(`${TMDB_URL}/${type}/${id}`, options);
  if (!res.ok) throw new Error("Cound not fetch Content details");

  const data = await res.json();
  return data;
}

export async function getCast(type, id) {
  const res = await fetch(`${TMDB_URL}/${type}/${id}/credits`, options);
  if (!res.ok) throw new Error("Cound not fetch cast");

  const data = await res.json();
  return data;
}

export async function getSimilarContent(type, id) {
  const res = await fetch(`${TMDB_URL}/${type}/${id}/similar`, options);
  if (!res.ok) throw new Error("Cound not fetch cast");

  const data = await res.json();
  return data;
}

export async function getRecommendedContent(type, id) {
  const res = await fetch(`${TMDB_URL}/${type}/${id}/recommendations`, options);
  if (!res.ok) throw new Error("Cound not fetch cast");

  const data = await res.json();
  return data;
}

export async function getContentVideo(type, id) {
  const res = await fetch(`${TMDB_URL}/${type}/${id}/videos`, options);
  if (!res.ok) throw new Error("Cound not fetch cast");

  const data = await res.json();
  return data;
}
