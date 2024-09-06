import { Link } from 'react-router-dom';
import FavoriteButton from 'components/FavoriteButton';
import Card from './FilmCardStyled';

const FilmCard = ({
  film,
  location,
  to,
  userData,
  favoriteMovies,
  uniqeId,
}) => {
  return (
    <Card key={uniqeId}>
      <Link
        to={to}
        state={{ from: location }}
        style={{
          textDecoration: 'none',
          color: 'black',
          textAlign: 'center',
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w300/${film.poster_path}`}
          alt="Movie poster"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
          }}
        />
        <h4 style={{ margin: '10px 0' }}>{film.title ?? film.name}</h4>
      </Link>
      <FavoriteButton
        userId={userData.id}
        movieId={film.id}
        isFavorite={favoriteMovies.includes(film.id)}
      />
      <span>{film.vote_average.toFixed(1)}⭐</span>
    </Card>
  );
};

export default FilmCard;
