import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { setFavoriteMovies } from 'store/slices/movieSlice';
import { useDispatch } from 'react-redux';

const FavButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isFavorite',
})`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isFavorite }) => (isFavorite ? '#ff6f61' : '#ccc')};
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: color 0.1s ease;
  &:hover {
    color: ${({ isFavorite }) => (isFavorite ? '#e55a50' : '#999')};
  }
`;

const FavoriteButton = ({ userId, movieId, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [films, setFilms] = useState([]);
  const dispatch = useDispatch();

  const toggleFavorite = async () => {
    const updatedFavorites = favorite
      ? films.filter(id => id !== movieId)
      : [...films, movieId];

    // Optimistically update local state and Redux
    setFavorite(!favorite);
    setFilms(updatedFavorites);
    dispatch(setFavoriteMovies(updatedFavorites));

    try {
      const userDocRef = doc(db, 'Users', userId);
      if (favorite) {
        await toast.promise(
          updateDoc(userDocRef, {
            favorites: arrayRemove(movieId),
          }),
          {
            pending: 'Loading...',
            success: 'Removed from favorite',
            error: 'error',
          }
        );
      } else {
        await toast.promise(
          updateDoc(userDocRef, {
            favorites: arrayUnion(movieId),
          }),
          {
            pending: 'Loading...',
            success: 'Added to favorite',
            error: 'error',
          }
        );
      }
    } catch (error) {
      // Rollback the optimistic update if the Firebase call fails
      setFavorite(favorite); // Revert state
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <FavButton onClick={toggleFavorite} isFavorite={favorite}>
      <FontAwesomeIcon icon={faHeart} />
    </FavButton>
  );
};

export default FavoriteButton;
