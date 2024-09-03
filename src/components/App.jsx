import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MovieDetail from '../pages/MovieDetail';
import Layout from './Layout';
import Cast from './Cast';
import About from 'pages/About';
import Registration from 'pages/Registration';
import Login from 'pages/Login';
import Profile from 'pages/Profile';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetail />}>
          <Route path="cast" element={<Cast />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
