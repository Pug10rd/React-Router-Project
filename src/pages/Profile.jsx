import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from 'store/slices/userSlice';
import {
  setFavoriteMovies,
  removeFavoriteMovies,
} from 'store/slices/movieSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [films, setFilms] = useState([]);
  const [filmData, setFilmData] = useState({}); // To store movie data
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user data
  const fetchUserData = async () => {
    const user = auth.currentUser; // Use currentUser directly
    if (user) {
      try {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          setFilms(docSnap.data().favorites || []); // Update films after userDetails
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      navigate('/login');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    console.log('trying to log out');

    try {
      await auth.signOut();
      dispatch(removeFavoriteMovies());
      dispatch(removeUser());
      console.log('Logged out');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Fetch movie data for all films
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [navigate]);

  useEffect(() => {
    if (films) {
      dispatch(setFavoriteMovies(films)); // Вызываем dispatch только после обновления films
    }
  }, [films, dispatch]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const moviePromises = films.map(async id => {
        const data = await movieFetch(id);
        return { id, data };
      });

      const results = await Promise.all(moviePromises);
      const filmDataMap = results.reduce((acc, { id, data }) => {
        acc[id] = data;
        return acc;
      }, {});
      setFilmData(filmDataMap);
    };

    if (films.length > 0) {
      fetchAllMovies();
    }
  }, [films]);

  // Fetch movie data function
  const movieFetch = async id => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: { language: 'en-US' },
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjEyY2UyZjY2MjRkYTlhZWJlOWI1MWRmMmI3MTZhMCIsInN1YiI6IjY0MmVjNmEzMGQyZjUzMDA5NzM3ZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3y5LPiD5o4iA1k2X5yCEkyqG7cW3QxDYX5JfmTs7Ytw',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  };

  return (
    <>
      <p>
        Hello: {userDetails?.firstName} {userDetails?.lastName}
      </p>
      {films.map(item => {
        const data = filmData[item] || {}; // Fallback to empty object
        return (
          <div key={item}>
            <p>{data.title || data.name || 'Loading...'}</p>
            <p>1</p>
          </div>
        );
      })}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Profile;
