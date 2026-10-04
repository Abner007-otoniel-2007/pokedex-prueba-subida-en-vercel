import Link from "next/link";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { pokemonListOptions } from "@/lib/api";
import { PokemonCard } from "@/components/pokemon-card";


export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const queryClient = getQueryClient();


  const { items, totalPages } = await queryClient.fetchQuery(
    pokemonListOptions(page)
  );

  return (

    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      
      <nav className="flex justify-center items-center gap-4 mt-8">
        {page > 1 && (
          <Link
            href={`/?page=${page - 1}`}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            ← Anterior
          </Link>
        )}
        <span>
          Página {page} de {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/?page=${page + 1}`}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Siguiente →
          </Link>
        )}
      </nav>
    </HydrationBoundary>
  );
}