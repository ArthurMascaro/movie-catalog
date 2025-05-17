// src/pages/UpdateMovie.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MovieForm } from '../components/MovieForm';
import type { Movie } from '../types/Movie';

export default function UpdateMovie() {
  const navigate = useNavigate();

  const [movieId, setMovieId] = useState('');
  const [movieData, setMovieData] = useState<Omit<Movie,'id'> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!movieId) return;

    try {
      setLoading(true);
      setError(null);
      const res = await api.get<Movie>(`movie/${movieId}`);
      setMovieData({
        nome: res.data.nome,
        genero: res.data.genero,
        ano: res.data.ano
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Filme não encontrado');
      setMovieData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: Omit<Movie,'id'>) => {
    if (!movieId) return;
    try {
      await api.put(`movie/${movieId}`, data);
      navigate('/');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao atualizar filme');
    }
  };

  if (movieData) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Alterar Filme #{movieId}</h1>
        <MovieForm
          initialData={movieData}
          submitLabel="Alterar"
          onSubmit={handleUpdate}
        />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Atualizar Filme</h1>

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
