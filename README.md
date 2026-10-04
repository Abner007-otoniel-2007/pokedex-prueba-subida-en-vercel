# Pokédex — Next.js 16 + TanStack Query v5

Aplicación web que muestra una lista de Pokémon obtenida desde PokéAPI https://pokeapi.co/, con prefetching al pasar el mouse, hidratación de datos del servidor al cliente y una página de detalle con información completa.


## Tecnologías

- Next.js 16 con App Router
- React Server Components (RSC)
- TanStack Query v5 (React Query)
- TypeScript con tipado completo de las respuestas de la API
- Tailwind CSS
- PokéAPI como fuente de datos

## Funcionalidades

- Lista en el servidor: la página principal es un Server Component que obtiene y renderiza 60 Pokémon por página (nombre e imagen en tarjetas).

- Paginación: 4 páginas de 60 Pokémon (240 en total), controladas con `?page=N` en la URL.

- Prefetch en hover: al pasar el mouse sobre una tarjeta (onMouseEnter) se ejecuta prefetchQuery con los datos de detalle.

- Hydration Boundary: el servidor precarga datos con dehydrate y los entrega al cliente con <HydrationBoundary>.

- Página de detalle /pokemon/[name]: estadísticas, tipos, habilidades, cadena evolutiva y sprites.
- Estados de carga y error: loading.tsx, error.tsx y manejo de errores en el cliente.

## Ejecución local

Instalar dependencias: 
pnpm install

Correr el servidor: 
pnpm dev


Abre [http://localhost:3000].


No se necesitan variables de entorno, pues PokéAPI es pública y no requiere clave.
