import { useState, type FormEvent } from "react";
import type { Movie } from "../../types/Movie";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export function useDeleteMovie() {
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

  return {
    movieId,
    movieData,
    loading,
    error,
    handleSearch,
    handleDelete,
    setMovieId,
    navigate
  }
}