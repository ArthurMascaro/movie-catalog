import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Movie } from "../../types/Movie";

export function useReadMovie() {
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

    return {
        movie,
        loading,
        error,
        navigate
    }
}