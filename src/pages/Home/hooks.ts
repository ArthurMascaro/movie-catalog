import { useState } from "react";

import { useEffect } from "react";
import type { Movie } from "../../types/Movie";
import api from "../../services/api";

export function useMovies() {
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

  return {
    movies,
    loading,
    error
  }
}