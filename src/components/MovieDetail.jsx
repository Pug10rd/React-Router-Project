import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';

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

  console.log(movie.genres);
  return (
    <div style={{ padding: '10px' }}>
      <Link to={backLink.current} className="move-back nav-btn">
        GO BACK
      </Link>
      <div className="details-card">
        <div className="details-box">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt="Movie poster"
            style={{ height: '70%' }}
          />
          <div className="details-info">
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
          </div>
        </div>

        <div className="info">
          <Link
            to={
              location.pathname.includes('/cast')
                ? location.pathname.replace('/cast', '')
                : `${location.pathname}/cast`
            }
            state={{ from: location.pathname }}
            className="nav-btn"
          >
            Cast
          </Link>
          {/* <Link className="nav-btn">Reviews</Link> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetail;
