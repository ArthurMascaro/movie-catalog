import type { FormEvent } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/Movie";
import api from "../../services/api";

export function useUpdateMovie() {
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

  return {
    movieId,
    movieData,
    loading,
    error,
    handleUpdate,
    handleSearch,
    setMovieId,
    navigate
  }
}