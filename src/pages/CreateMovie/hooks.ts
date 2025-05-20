import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Movie } from "../../types/Movie";

export function useCreateMovie() {
    const navigate = useNavigate();

    const handleCreate = async (data: Omit<Movie, 'id'>) => {
      try {
        await api.post('movie/', data);
        navigate('/');
      } catch (err: unknown) {
        console.error('Erro ao criar filme:', err);
        alert(err instanceof Error ? err.message : 'Erro ao criar filme');
      }
    };

    return {
        handleCreate
    }
}