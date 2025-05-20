import { useDeleteMovie } from "./hooks";

export default function DeleteMovie() {
  const { movieId, movieData, loading, error, handleSearch, handleDelete, setMovieId, navigate } = useDeleteMovie();
  
  if (movieData) {
    return (
      <div className="max-w-md mx-auto p-4 rounded shadow space-y-4">
         <h2 className="text-xl font-bold">Deletar Filme {movieId}</h2>
      
          <div>
            <span className="font-semibold">Nome:</span> {movieData.nome}
          </div>
          <div>
            <span className="font-semibold">Gênero:</span> {movieData.genero}
          </div>
          <div>
            <span className="font-semibold">Ano:</span> {movieData.ano}
          </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Apagar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4 rounded shadow space-y-4">
      <h1 className="text-2xl font-bold text-center">Apagar Filme</h1>

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

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded hover:bg-gray-700"
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
