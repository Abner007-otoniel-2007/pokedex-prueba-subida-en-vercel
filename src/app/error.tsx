"use client"; 

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <p className="text-red-600 mb-4">Algo salió mal: {error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Reintentar
      </button>
    </div>
  );
}