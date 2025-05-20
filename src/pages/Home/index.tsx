import { Link } from 'react-router-dom';
import { useMovies } from './hooks';
import noImage from '../../assets/no-image.png';
import Grid from '../../components/Grid';
import GridItem from '../../components/Grid/components/GridItem';
import Card from '../../components/Card';
import { Typography } from '../../components/Typography';
import './home.css';

const Home = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="spinner !w-16 !h-16 border-4 border-t-4" />
    </div>
  );
  
  if (error) return <p className="p-4 text-red-500">Erro: {error}</p>;

  return (
    <div className="w-full">
      <Typography variant='h1' className='text-2xl font-bold mb-6 text-center'>Catálogo de Filmes</Typography>
      <Grid>
        {movies.map(movie => (
          <GridItem key={movie.id}>
            <Card className="flex flex-col items-center gap-2">
              <img src={noImage} alt="Sem imagem" className="w-32 h-40 object-cover rounded mb-2" />
              <div className="text-center">
                <h2 className="font-semibold text-lg text-black">{movie.id} - {movie.nome}</h2>
                <Link to={`/movie/${movie.id}`} className="text-purple-700 hover:underline text-sm mt-2 inline-block">Ver detalhes</Link>
              </div>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
