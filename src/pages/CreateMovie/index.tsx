// src/pages/CreateMovie.tsx
import { useCreateMovie } from './hooks';
import { MovieForm } from '../../components/MovieForm';

export default function CreateMovie() {
  const { handleCreate } = useCreateMovie();

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar Novo Filme</h1>
      <MovieForm
        submitLabel="Criar"
        onSubmit={handleCreate}
      />
    </div>
  );
}
