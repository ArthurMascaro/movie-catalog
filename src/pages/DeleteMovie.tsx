// src/pages/DeleteMovie.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Movie } from '../types/Movie';

export default function DeleteMovie() {
  const navigate = useNavigate();

  const [movieId, setMovieId]     = useState('');
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // Buscar o filme pelo ID
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!movieId) return;

    try {
      setLoading(true);
      setError(null);
      const res = await api.get<Movie>(`movie/${movieId}`);
      setMovieData(res.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Filme não encontrado');
      setMovieData(null);
    } finally {
      setLoading(false);
    }
  };

  // Confirmar exclusão
  const handleDelete = async () => {
    if (!movieId) return;

    if (!confirm(`Tem certeza que deseja apagar o filme #${movieId}?`)) {
      return;
    }

    try {
      await api.delete(`movie/${movieId}`);
      navigate('/');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao excluir filme');
    }
  };

  // Se o filme foi carregado, exibe os detalhes + botão de delete
  if (movieData) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
        <h1 className="text-2xl font-bold">Apagar Filme #{movieId}</h1>

        <div>
          <p><span className="font-semibold">Nome:</span> {movieData.nome}</p>
          <p><span className="font-semibold">Gênero:</span> {movieData.genero}</p>
          <p><span className="font-semibold">Ano:</span> {movieData.ano}</p>
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

  // Tela de busca por ID
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Apagar Filme</h1>

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
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Pesquisando...' : 'Pesquisar'}
          </button>
        </div>
      </form>
    </div>
  );
}
