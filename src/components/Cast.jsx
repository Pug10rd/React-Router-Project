import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [credits, setCredits] = useState({});

  const movieId = useParams();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3y5LPiD5o4iA1k2X5yCEkyqG7cW3QxDYX5JfmTs7Ytw',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId.id}/credits?language=en-US`,
      options
    )
      .then(response => response.json())
      .then(response => setCredits(response))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <ul style={{ listStyle: 'none', padding: '0px' }}>
        {credits?.cast?.map(credit => {
          return <li key={credit.id}> - {credit.character}</li>;
        })}
      </ul>
    </>
  );
};

export default Cast;
