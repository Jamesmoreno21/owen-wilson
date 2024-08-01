import { ElementsList } from "@/components/ElementsList";
import { getMovies } from "@/lib/queries";

export const runtime = 'edge';

export default async function MoviesPage() {
  const movies = await getMovies();

  return <ElementsList elements={movies} title="Movies" />;
}
