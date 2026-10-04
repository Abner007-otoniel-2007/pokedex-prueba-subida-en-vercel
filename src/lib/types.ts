export interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

export interface PokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
  };
  species: { url: string };
}

export interface SpeciesApi {
  evolution_chain: { url: string };
}

export interface ChainLink {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
}

export interface EvolutionChainApi {
  chain: ChainLink;
}

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
  sprites: { label: string; url: string }[];
  evolutions: { id: number; name: string }[];
}