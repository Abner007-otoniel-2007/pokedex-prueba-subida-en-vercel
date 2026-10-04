import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { pokemonDetailOptions } from "@/lib/api";
import { PokemonDetail } from "./pokemon-detail";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(pokemonDetailOptions(name));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail name={name} />
    </HydrationBoundary>
  );
}