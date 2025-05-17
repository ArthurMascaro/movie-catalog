// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import type { Movie } from '../types/Movie';

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api.get<Movie[]>('/movie');
        setMovies(response.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar filmes');
      } finally {
        setLoading(false);  
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="p-4">Carregando filmes...</p>;
  if (error) return <p className="p-4 text-red-500">Erro: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Filmes</h1>

      <ul className="space-y-2">
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className="text-blue-600 hover:underline"
            >
              {movie.id} – {movie.nome}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          to="/create"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Criar Novo Filme
        </Link>
      </div>
    </div>
  );
};

export default Home;
