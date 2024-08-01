import { Wow } from "./types";
import { fetcher } from "./fetcher";

export async function getMovies() {
  const res = await fetcher("/movies");
  return res as string[];
}

export async function getDirectors() {
  const res = await fetcher("/directors");
  return res as string[];
}

export async function getAllWows() {
  const allMovies = await getMovies();
  const wowsPromises = allMovies.map(async (movie) => {
    const res = await fetcher(`/random?movie=${movie}`);
    return res as Wow[];
  });
  const wows = await Promise.all(wowsPromises);
  return wows.flat();
}
