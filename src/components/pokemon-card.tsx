"use client";

import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { pokemonDetailOptions } from "@/lib/api";
import type { PokemonListItem } from "@/lib/types";

export function PokemonCard({ pokemon }: { pokemon: PokemonListItem }) {
  const queryClient = useQueryClient();


  const handleMouseEnter = () => {
    queryClient.prefetchQuery(pokemonDetailOptions(pokemon.name));
  };

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      onMouseEnter={handleMouseEnter}
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
    >
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={120}
        height={120}
      />
      <span className="text-xs text-gray-400">#{pokemon.id}</span>
      <h2 className="capitalize font-semibold">{pokemon.name}</h2>
    </Link>
  );
}