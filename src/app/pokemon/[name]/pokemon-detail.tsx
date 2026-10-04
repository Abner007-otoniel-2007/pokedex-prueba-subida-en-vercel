"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getImageUrl, pokemonDetailOptions } from "@/lib/api";

export function PokemonDetail({ name }: { name: string }) {
  const { data, isPending, isError, error } = useQuery(
    pokemonDetailOptions(name)
  );

  if (isPending) return <p className="p-8 text-center">Cargando...</p>;

  if (isError)
    return (
      <p className="p-8 text-center text-red-600">
        Error: {error.message}
      </p>
    );

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <Link href="/" className="text-red-600 underline">
        ← Volver
      </Link>


      <div className="flex flex-col items-center">
        <Image
          src={getImageUrl(data.id)}
          alt={data.name}
          width={220}
          height={220}
        />
        <h1 className="text-3xl font-bold capitalize">
          #{data.id} {data.name}
        </h1>
        <p className="text-gray-500">
          Altura: {data.height / 10} m · Peso: {data.weight / 10} kg
        </p>
      </div>


      <section>
        <h2 className="font-semibold mb-2">Tipos</h2>
        <div className="flex gap-2">
          {data.types.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-red-100 capitalize"
            >
              {t}
            </span>
          ))}
        </div>
      </section>


      <section>
        <h2 className="font-semibold mb-2">Habilidades</h2>
        <ul className="list-disc list-inside capitalize">
          {data.abilities.map((a) => (
            <li key={a}>{a.replace("-", " ")}</li>
          ))}
        </ul>
      </section>


      <section>
        <h2 className="font-semibold mb-2">Estadísticas</h2>
        {data.stats.map((s) => (
          <div key={s.name} className="flex items-center gap-2 mb-1">
            <span className="w-36 capitalize text-sm">{s.name}</span>
            <div className="flex-1 bg-gray-200 rounded h-3">
              <div
                className="bg-red-500 h-3 rounded"
                style={{ width: `${Math.min(s.value, 150) / 1.5}%` }}
              />
            </div>
            <span className="w-8 text-sm">{s.value}</span>
          </div>
        ))}
      </section>


      <section>
        <h2 className="font-semibold mb-2">Cadena evolutiva</h2>
        <div className="flex flex-wrap gap-4">
          {data.evolutions.map((evo) => (
            <Link
              key={evo.id}
              href={`/pokemon/${evo.name}`}
              className="flex flex-col items-center"
            >
              <Image
                src={getImageUrl(evo.id)}
                alt={evo.name}
                width={80}
                height={80}
              />
              <span className="capitalize text-sm">{evo.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Sprites</h2>
        <div className="flex flex-wrap gap-4">
          {data.sprites.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <Image src={s.url} alt={s.label} width={96} height={96} />
              <span className="text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}