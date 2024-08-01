import { ElementsList } from "@/components/ElementsList";
import { getDirectors } from "@/lib/queries";

export default async function DirectorsPage() {
  const directors = await getDirectors();

  return <ElementsList elements={directors} title="Directors" />;
}
