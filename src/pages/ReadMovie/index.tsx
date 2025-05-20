// src/pages/ReadMovie.tsx
import { useReadMovie } from './hooks';

export default function ReadMovie() {
  const { movie, loading, error, navigate} = useReadMovie();

  if (loading) return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="spinner !w-16 !h-16 border-4 border-t-4" />
    </div>
  );
  
  if (error)   return <p className="p-4 text-red-500">Erro: {error}</p>;
  if (!movie) return <p className="p-4">Filme não encontrado.</p>;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 rounded shadow">
      <h2 className="text-xl font-bold">Detalhes do Filme</h2>
      
      <div>
        <span className="font-semibold">ID:</span> {movie.id}
      </div>
      <div>
        <span className="font-semibold">Nome:</span> {movie.nome}
      </div>
      <div>
        <span className="font-semibold">Gênero:</span> {movie.genero}
      </div>
      <div>
        <span className="font-semibold">Ano:</span> {movie.ano}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
