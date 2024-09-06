import styled from 'styled-components';

export const Card = styled.div`
  min-height: 18vh;
  min-width: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative; /* Allows absolute positioning of the favorite button */
  transition: transform 0.3s ease; /* Smooth transform transition */
  overflow: hidden; /* Ensures no overflow */
  &:hover {
    transform: scale(1.03); /* Slightly scale up on hover */
  }
`;

export default Card;
