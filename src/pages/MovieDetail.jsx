import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledLink = styled(Link)`
  background-color: rgba(118, 144, 195, 0.4);
  color: black;
  font-size: large;
  text-decoration: none;
  border: 0;
  border-radius: 5px;
  margin: 10px;
  padding: 0px 1vw 0px 1vw;
  align-content: center;

  &:active {
    color: black;
    background-color: rgba(90, 125, 189, 0.55);
    border: 1px solid rgb(90, 125, 189);
  }
`;

const Card = styled.div`
  display: flex;
  height: auto;
  background-color: rgba(92, 150, 237, 0.6);
  margin: 10px;
  border: 2px solid rgba(92, 150, 237, 0.6);
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const CardBox = styled.div`
  display: flex;
  align-items: stretch;
  font-size: 20px;
`;

const CardInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
`;

const ExtraInfo = styled.div`
  margin-left: 10px;
`;

const CastButton = styled(Link)`
  border: 2px solid rgba(92, 150, 237, 0.6);
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  color: black;
  font-size: large;
  padding: 0px 1vw 0px 1vw;
  align-content: center;
`;

const MovieDetail = () => {
  const [movie, setMovie] = useState({});

  const params = useParams();
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
      `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
      options
    )
      .then(response => response.json())
      .then(response => setMovie(response))
      .catch(err => console.error(err));
  }, [params]);

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  return (
    <div style={{ padding: '10px' }}>
      <StyledLink to={backLink.current}>GO BACK</StyledLink>
      <Card>
        <CardBox>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt="Movie poster"
            className="film-picture"
          />
          <CardInfo>
            <span style={{ marginBottom: '10px' }}>Title: {movie.title}</span>
            <p>Rating: {Math.round(movie.vote_average)}</p>
            <p>Descpription: {movie.overview}</p>
            {movie?.genres?.length !== 0 ? (
              <span>
                Genres:
                <ul style={{ padding: '0px' }}>
                  {movie?.genres?.map(genre => (
                    <li key={genre.id} style={{ listStyle: 'none' }}>
                      - {genre.name}
                    </li>
                  ))}
                </ul>
              </span>
            ) : null}
          </CardInfo>
        </CardBox>
      </Card>
      <ExtraInfo>
        <CastButton
          to={
            location.pathname.includes('/cast')
              ? location.pathname.replace('/cast', '')
              : `${location.pathname}/cast`
          }
          state={{ from: location.pathname }}
        >
          Cast
        </CastButton>
        {/* <Link className="nav-btn">Reviews</Link> */}
        <Outlet style={{ height: '100%', marginBottom: '20vh' }} />
      </ExtraInfo>
    </div>
  );
};

export default MovieDetail;
