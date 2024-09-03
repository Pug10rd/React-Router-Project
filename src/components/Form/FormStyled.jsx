import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field } from 'formik';

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 100%;
  max-width: 400px;
  padding: 2%;
  background-color: rgb(118, 144, 195);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
`;

export const Input = styled(Field)`
  padding: 0.75rem;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #333;
  width: 94%;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem;
  font-size: 1em;
  background-color: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #e55a50;
  }
`;

export const StyledLink = styled(Link)`
  color: #ff6f61;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;
