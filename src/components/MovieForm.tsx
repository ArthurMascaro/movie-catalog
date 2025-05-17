import { useState, type FormEvent } from 'react';
import type { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';

interface MovieFormProps {
  initialData?: Omit<Movie,'id'>;
  submitLabel: string;
  onSubmit(data: Omit<Movie,'id'>): void;
}

export const MovieForm = ({
  initialData = { nome: '', genero: '', ano: new Date().getFullYear().toString() },
  submitLabel,
  onSubmit
}: MovieFormProps) => {
  const navigate = useNavigate();

  console.log('movieForm', initialData);
    
  const [nome, setNome] = useState(initialData.nome);
  const [genero, setGenero] = useState(initialData.genero);
  const [ano, setAno] = useState(initialData.ano);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, genero, ano });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <div>
        <label className="block mb-1">Nome</label>
        <input
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Gênero</label>
        <input
          value={genero}
          onChange={e => setGenero(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Ano</label>
        <input
          value={ano}
          onChange={e => setAno(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
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
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
