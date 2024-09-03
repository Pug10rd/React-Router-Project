import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import FavoriteButton from 'components/FavoriteButton';
import { useSelector } from 'react-redux';

// Styled components
const FilmsList = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(150px, 1fr)
  ); /* Responsive grid with minmax */
  gap: 15px; /* Space between cards */
  list-style-type: none; /* Remove default list styling */
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
`;

const FilmCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative; /* Allows absolute positioning of the favorite button */
  transition: transform 0.3s ease; /* Smooth transform transition */
  overflow: hidden; /* Ensures no overflow */
  &:hover {
    transform: scale(1.03); /* Slightly scale up on hover */
  }
`;

const HomeBlock = styled.div`
  margin: 20px auto; /* Center horizontally and add margin */
  min-height: calc(
    100vh - 40px
  ); /* Ensure content takes full viewport height minus padding */
  padding: 0 20px; /* Padding on sides */
  max-width: 1200px; /* Limit width for larger screens */
`;

const Home = () => {
  const [films, setFilms] = useState([]);
  const [sorting, setSort] = useState('day');

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/all/${sorting}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3y5LPiD5o4iA1k2X5yCEkyqG7cW3QxDYX5JfmTs7Ytw',
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setFilms(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line
  }, [sorting]);

  const handleSortChange = event => {
    setSort(event.target.value);
  };

  const location = useLocation();

  const renderLimit = films?.slice(0, 14);

  const userData = useSelector(state => state.user);

  const favoriteMovies = useSelector(state => state.movie.favoriteMovies);

  return (
    <HomeBlock>
      <h1>Trending</h1>
      <div>
        <select value={sorting} onChange={handleSortChange}>
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
        </select>
      </div>
      <FilmsList>
        {renderLimit.map(film => (
          <FilmCard key={film.id}>
            <Link
              to={`movies/${film.id}`}
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
              // isFavorite={favoriteMovies.some(
              //   favoriteMovie => favoriteMovie.id === film.id
              // )}
            />
            <span>{film.vote_average.toFixed(1)}</span>
          </FilmCard>
        ))}
      </FilmsList>
    </HomeBlock>
  );
};

export default Home;
