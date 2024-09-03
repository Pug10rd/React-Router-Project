import { styled } from 'styled-components';
import Form from 'components/Form/Form';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice.js';

const LoginBlock = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Registration = () => {
  const dispatch = useDispatch();

  const handleRegister = async (email, password, firstName, lastName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, 'Users', user.uid), {
        email: user.email,
        firstName,
        lastName,
        password: password,
      });

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        })
      );

      console.log('User registered and data saved:', user);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <LoginBlock>
      <Form title="Sign up" handleClick={handleRegister} />
    </LoginBlock>
  );
};

export default Registration;
