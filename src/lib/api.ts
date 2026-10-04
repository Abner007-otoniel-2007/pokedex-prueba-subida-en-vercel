import { queryOptions } from "@tanstack/react-query";
import type {
  ChainLink,
  EvolutionChainApi,
  PokemonApi,
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
  SpeciesApi,
} from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";
export const PAGE_SIZE = 60;
export const MAX_POKEMON_ID = 240;

// Función genérica para hacer fetch con manejo de errores
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error ${res.status} al llamar ${url}`);
  return res.json() as Promise<T>;
}

// Saca el id desde una url: ".../pokemon/25/" -> 25
export function getIdFromUrl(url: string): number {
  return Number(url.split("/").filter(Boolean).pop());
}

export function getImageUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// ---------- LISTA ----------
export async function getPokemonList(page: number) {
  const totalPages = Math.ceil(MAX_POKEMON_ID / PAGE_SIZE); // 4
  const offset = (page - 1) * PAGE_SIZE;

  // Si piden una página que no existe (ej. ?page=99), no llamamos a la API
  if (offset >= MAX_POKEMON_ID) {
    return { items: [] as PokemonListItem[], totalPages };
  }

  // Evita pasarnos de 240 en la última página
  const limit = Math.min(PAGE_SIZE, MAX_POKEMON_ID - offset);

  const data = await fetchJson<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  const items: PokemonListItem[] = data.results.map((p) => {
    const id = getIdFromUrl(p.url);
    return { id, name: p.name, image: getImageUrl(id) };
  });

  return { items, totalPages };
}

export const pokemonListOptions = (page: number) =>
  queryOptions({
    queryKey: ["pokemon-list", page],
    queryFn: () => getPokemonList(page),
  });

// ---------- DETALLE ----------
// Convierte el árbol de evoluciones en una lista simple
function flattenChain(node: ChainLink): { id: number; name: string }[] {
  return [
    { id: getIdFromUrl(node.species.url), name: node.species.name },
    ...node.evolves_to.flatMap(flattenChain),
  ];
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  // 1) Datos básicos
  const pokemon = await fetchJson<PokemonApi>(`${BASE_URL}/pokemon/${name}`);
  // 2) Especie (de aquí sale el link a la cadena evolutiva)
  const species = await fetchJson<SpeciesApi>(pokemon.species.url);
  // 3) Cadena evolutiva
  const evo = await fetchJson<EvolutionChainApi>(species.evolution_chain.url);

  const s = pokemon.sprites;
  const sprites = [
    { label: "Frente", url: s.front_default },
    { label: "Espalda", url: s.back_default },
    { label: "Shiny frente", url: s.front_shiny },
    { label: "Shiny espalda", url: s.back_shiny },
  ].filter((x): x is { label: string; url: string } => x.url !== null);

  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((t) => t.type.name),
    abilities: pokemon.abilities.map((a) => a.ability.name),
    stats: pokemon.stats.map((st) => ({
      name: st.stat.name,
      value: st.base_stat,
    })),
    sprites,
    evolutions: flattenChain(evo.chain),
  };
}

export const pokemonDetailOptions = (name: string) =>
  queryOptions({
    queryKey: ["pokemon-detail", name],
    queryFn: () => getPokemonDetail(name),
  });