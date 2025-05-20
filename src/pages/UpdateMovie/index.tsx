// src/pages/UpdateMovie.tsx
import { useUpdateMovie } from './hooks';
import { MovieForm } from '../../components/MovieForm';

export default function UpdateMovie() {
  const { movieId, movieData, loading, error, handleUpdate, handleSearch, setMovieId, navigate } = useUpdateMovie();

  if (movieData) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Alterar Filme {movieId}</h1>
        <MovieForm
          initialData={movieData}
          submitLabel="Alterar"
          onSubmit={handleUpdate}
        />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4 rounded shadow">
      <h1 className="text-2xl font-bold text-center">Atualizar Filme</h1>

      <form onSubmit={handleSearch} className="space-y-2">
        <div>
          <label className="block mb-1">ID do Filme</label>
          <input
            value={movieId}
            onChange={e => setMovieId(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Pesquisando...' : 'Pesquisar'}
          </button>
        </div>
      </form>
    </div>
  );
}
