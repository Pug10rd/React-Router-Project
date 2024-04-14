import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    localStorage.removeItem("input");
  }, [search]);

  const location = useLocation();

  const memory = () => {
    localStorage.setItem('memory', JSON.stringify(results));
    localStorage.setItem('input', JSON.stringify(search));
  };

  return (
    <div className="movies">
      <input
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
    </div>
  );
};
export default Movies;
