import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import castPicture from '../img/cast-picture-placeholder.jpg';

const CastList = styled.div`
  /* Styles for CastList */
  width: 100%;
  max-width: 90vw; /* Adjust max-width as needed */
  height: auto;
  list-style: none;
  padding: 0;
  margin: 0 auto; /* Center the grid horizontally */
  margin-top: 1.5vw;
  margin-bottom: 10vh;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(20vw, 1fr)
  ); /* Responsive grid columns */
  gap: 2vw;
`;

const CastPicture = styled.img`
  height: 100%;
  width: 6vw;
  margin-right: 20px;
`;

const CastCard = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
`;

const CardInfo = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 300px;
`;

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
  }, [movieId]);

  const renderLimit = credits?.cast?.slice(0, 12);

  return (
    <CastList id="cast-list">
      {renderLimit?.map(credit => {
        return credit.known_for_department === 'Acting' ? (
          <CastCard key={credit.id}>
            <CastPicture
              src={
                credit.profile_path
                  ? `https://image.tmdb.org/t/p/w300/${credit.profile_path}`
                  : castPicture
              }
              alt="Cast pic"
            />
            <CardInfo>
              <p>{credit.name}</p>
              <p>Role: {credit.character}</p>
            </CardInfo>
          </CastCard>
        ) : null;
      })}
    </CastList>
  );
};

export default Cast;
