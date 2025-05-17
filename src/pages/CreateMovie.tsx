// src/pages/CreateMovie.tsx
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MovieForm } from '../components/MovieForm';
import type { Movie } from '../types/Movie';

export default function CreateMovie() {
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

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Filme</h1>
      <MovieForm
        submitLabel="Criar"
        onSubmit={handleCreate}
      />
    </div>
  );
}
