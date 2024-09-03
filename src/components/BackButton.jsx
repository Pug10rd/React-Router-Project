import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
//import { useRef } from 'react';
const BackButton = () => {
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
  const location = useLocation();
  //const backLink = useRef(location.state?.from ?? '/');

  return (
    <>
      <StyledLink to={location.state.from ?? '/'}>GO BACK</StyledLink>
    </>
  );
};

export default BackButton;
