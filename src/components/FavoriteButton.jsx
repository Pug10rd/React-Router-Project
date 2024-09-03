import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isFav }) => (isFav ? '#ff6f61' : '#ccc')};
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: color 0.1s ease;
  &:hover {
    color: ${({ isFav }) => (isFav ? '#e55a50' : '#999')};
  }
`;

const FavoriteButton = ({ userId, movieId, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async () => {
    try {
      const userDocRef = doc(db, 'Users', userId);

      if (favorite) {
        // Remove movieId from favorites array
        await updateDoc(userDocRef, {
          favorites: arrayRemove(movieId),
        });
      } else {
        // Add movieId to favorites array
        await updateDoc(userDocRef, {
          favorites: arrayUnion(movieId),
        });
      }

      // Update local state
      setFavorite(!favorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <FavButton onClick={toggleFavorite} isFav={favorite ? true : false}>
      <FontAwesomeIcon icon={faHeart} />
    </FavButton>
  );
};

export default FavoriteButton;
