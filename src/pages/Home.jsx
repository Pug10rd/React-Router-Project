import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import FilmCard from 'components/FilmCard/FilmCard';

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
  const location = useLocation();
  const renderLimit = films?.slice(0, 14);
  const userData = useSelector(state => state.user);
  const favoriteMovies = useSelector(state => state.movie.favoriteMovies);

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

  return (
    <HomeBlock>
      <h1>Trending</h1>
      <div style={{ marginBottom: '10px', size: '100px' }}>
        <select value={sorting} onChange={handleSortChange}>
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
        </select>
      </div>
      <FilmsList>
        {renderLimit.map(film => (
          <FilmCard
            film={film}
            location={location}
            to={`movies/${film.id}`}
            userData={userData}
            favoriteMovies={favoriteMovies}
          />
        ))}
      </FilmsList>
    </HomeBlock>
  );
};

export default Home;
