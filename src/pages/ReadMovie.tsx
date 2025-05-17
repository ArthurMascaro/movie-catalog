// src/pages/ReadMovie.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Movie } from '../types/Movie';

export default function ReadMovie() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await api.get<Movie>(`movie/${id}`);
        setMovie(res.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar filme');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <p className="p-4">Carregando...</p>;
  if (error)   return <p className="p-4 text-red-500">Erro: {error}</p>;
  if (!movie) return <p className="p-4">Filme não encontrado.</p>;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow">
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
