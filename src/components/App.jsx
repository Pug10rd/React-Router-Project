import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import Layout from './Layout';
import Cast from './Cast';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetail />}>
            <Route path="cast" element={<Cast />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
