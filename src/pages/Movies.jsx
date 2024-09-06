import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FilmCard from 'components/FilmCard/FilmCard';
import { useSelector } from 'react-redux';

const MoviesBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const InputBlock = styled.div`
  display: inline-block;
  position: relative;
`;

const Searchbar = styled.input`
  outline: none;
  width: 400px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 2em;
  background-color: rgba(148, 191, 255);
  &:focus {
    border-radius: 5px 5px 0 0;
    border: none;
  }
`;

const MovieList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  position: absolute;
  margin: 0;
  z-index: 1;
  border-radius: 0 0 5px 5px;
  background-color: rgba(148, 191, 255);
`;

const MovieBlock = styled.div`
  background-color: red;
  min-height: 33vh;
  width: 80%;
  margin-bottom: 5vh;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Movies = () => {
  const previousList = localStorage.getItem('memory');
  const previousSearch = localStorage.getItem('input');

  const [search, setSearch] = useState(JSON.parse(previousSearch) ?? '');
  const [results, setResults] = useState(JSON.parse(previousList) ?? []);
  const [films, setFilms] = useState([]);
  const [upcomingFilms, setUpcomingFilm] = useState([]);
  const [topFilms, setTopFilms] = useState([]);

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/all/week`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3y5LPiD5o4iA1k2X5yCEkyqG7cW3QxDYX5JfmTs7Ytw',
    },
  };

  const optionsUpcoming = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/upcoming',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsIm5iZiI6MTcyNTI5NzQ2Mi4wMjc5NjgsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7rkBkQC4b8njikP3gJ-m5s1E3GtvsNSTRwTpXzMS79M',
    },
  };

  const optionsTop = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/top_rated',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsIm5iZiI6MTcyNTI5NzQ2Mi4wMjc5NjgsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7rkBkQC4b8njikP3gJ-m5s1E3GtvsNSTRwTpXzMS79M',
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
  }, []);

  useEffect(() => {
    axios
      .request(optionsUpcoming)
      .then(function (response) {
        setUpcomingFilm(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .request(optionsTop)
      .then(function (response) {
        setTopFilms(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3y5LPiD5o4iA1k2X5yCEkyqG7cW3QxDYX5JfmTs7Ytw',
      },
    };

    function getData() {
      if (previousList === null) {
        setTimeout(() => {
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
            options
          )
            .then(response => response.json())
            .then(response => setResults(response.results))
            .catch(err => console.error(err));
        }, 300);
      }
    }
    getData();
    return () => clearTimeout(getData);
  }, [search, previousList]);

  useEffect(() => {
    localStorage.removeItem('memory');
    localStorage.removeItem('input');
  }, [search]);

  const location = useLocation();

  const memory = () => {
    localStorage.setItem('memory', JSON.stringify(results));
    localStorage.setItem('input', JSON.stringify(search));
  };

  const filmsRenderLimit = films?.slice(0, 20);
  const upcomingRenderLimit = upcomingFilms?.slice(0, 20);
  const topRenderLimit = topFilms?.slice(0, 20);

  const userData = useSelector(state => state.user);
  const favoriteMovies = useSelector(state => state.movie.favoriteMovies);

  return (
    <MoviesBody>
      <InputBlock>
        <Searchbar
          className="searchbar"
          placeholder="Search..."
          onChange={e => setSearch(e.target.value)}
          defaultValue={search}
        />
        <MovieList>
          {results.map((result, index) => {
            return (
              <li
                key={result.id || index}
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <Link
                  to={`${result.id}`}
                  state={{ from: location }}
                  onClick={memory}
                >
                  {result.title ?? result.name}
                </Link>
              </li>
            );
          })}
        </MovieList>
      </InputBlock>
      <h1>Trending</h1>

      <MovieBlock>
        {filmsRenderLimit.map(film => (
          <FilmCard
            film={film}
            location={location}
            to={`${film.id}`}
            userData={userData}
            favoriteMovies={favoriteMovies}
            uniqeId={film.id}
          />
        ))}
      </MovieBlock>

      <h1>Upcoming</h1>
      <MovieBlock>
        {upcomingRenderLimit.map(film => (
          <FilmCard
            film={film}
            location={location}
            to={`${film.id}`}
            userData={userData}
            favoriteMovies={favoriteMovies}
            uniqeId={film.id}
          />
        ))}
      </MovieBlock>

      <h1>Top Rated</h1>
      <MovieBlock>
        {topRenderLimit.map(film => (
          <FilmCard
            film={film}
            location={location}
            to={`${film.id}`}
            userData={userData}
            favoriteMovies={favoriteMovies}
            uniqeId={film.id}
          />
        ))}
      </MovieBlock>
    </MoviesBody>
  );
};
export default Movies;
