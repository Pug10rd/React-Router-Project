import { styled } from 'styled-components';
import Form from 'components/Form/Form';
import { setUser } from 'store/slices/userSlice';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const LoginBlock = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate('/profile');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <LoginBlock>
      <Form title="Login" handleClick={handleLogin} />
      {error && <p>{error}</p>}
    </LoginBlock>
  );
};

export default Login;
