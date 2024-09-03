import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/use-auth';

const HeaderBlock = styled.div`
  background-color: rgb(118, 144, 195);
  color: black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 1vw;

  position: relative;
  height: 3vh;
  top: 0;
`;

const ProfileButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  const [profile, setProfile] = useState(false);
  const user = useAuth();
  useEffect(() => {
    console.log(user);

    if (user.isAuth) {
      setProfile(true);
    } else {
      return undefined;
    }
  }, [user]);

  return (
    <HeaderBlock>
      <NavigationButtons>
        <Link to="/" className="nav-btn">
          HOME
        </Link>
        <Link to="/movies" className="nav-btn">
          MOVIES
        </Link>
      </NavigationButtons>
      <ProfileButtons>
        {profile ? (
          <Link className="nav-btn" to="profile">
            Profile
          </Link>
        ) : (
          <Link to="login" className="nav-btn">
            Sign in
          </Link>
        )}
        {/* <Link className="nav-btn">Profile</Link> */}
      </ProfileButtons>
    </HeaderBlock>
  );
};

export default Header;
