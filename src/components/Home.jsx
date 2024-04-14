import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [films, setFilms] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/all/day',
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
        return setFilms(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  const location = useLocation();

  return (
    <>
      <div className="home">
        <h1>Trending today</h1>
        <ul className="film-list">
          {films.map((film, index) => (
            <li key={film.id} style={{ animationDelay: `${index * 30}ms` }}>
              <Link to={`movies/${film.id}`} state={{ from: location }}>
                {film.title ?? film.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
