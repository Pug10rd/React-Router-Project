import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MoviesBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 91vh;
`;

const Searchbar = styled.input`
  width: 400px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 2em;
  background-color: rgba(92, 150, 237, 0.5);
`;

const Movies = () => {
  const previousList = localStorage.getItem('memory');
  const previousSearch = localStorage.getItem('input');

  const [search, setSearch] = useState(JSON.parse(previousSearch) ?? '');
  const [results, setResults] = useState(JSON.parse(previousList) ?? []);

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

  return (
    <MoviesBlock>
      <Searchbar
        className="searchbar"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
        defaultValue={search}
      />
      <ul className="film-list">
        {results.map((result, index) => {
          return (
            <li key={result.id} style={{ animationDelay: `${index * 20}ms` }}>
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
      </ul>
    </MoviesBlock>
  );
};
export default Movies;
