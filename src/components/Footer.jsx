import { styled } from 'styled-components';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const FooterBlock = styled.div`
  position: relative;

  height: 10vh;
  margin-bottom: 1vh;
  background-color: rgb(118, 144, 195);
`;

const FooterContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto;
  display: inline-block;
`;

const InfoLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: large;
  margin: 10px;
  padding: 10px;
`;

const Footer = () => {
  const location = useLocation();

  return (
    <FooterBlock>
      <FooterContent>
        <InfoList>
          <li>
            <InfoLink href="https://github.com/Pug10rd">
              {' '}
              <FontAwesomeIcon icon={faGithub} /> git
            </InfoLink>
          </li>
          <li>
            <InfoLink href="https://www.linkedin.com/in/ivan-zarichnyi/">
              <FontAwesomeIcon icon={faLinkedin} /> link
            </InfoLink>
          </li>
          <li>
            <InfoLink href="https://www.instagram.com/prost_mops/">
              <FontAwesomeIcon icon={faInstagram} /> inst
            </InfoLink>
          </li>
        </InfoList>
        <InfoList>
          {/* pages to be added */}
          <li>
            <Link to="/about" state={{ from: location.pathname }}>
              About the project
            </Link>{' '}
          </li>
          <li>
            <InfoLink
              href="https://developer.themoviedb.org/docs/getting-started"
              target="_blank"
            >
              API docs
            </InfoLink>
          </li>
          <li>
            {' '}
            <InfoLink href="mailto:vandal12313@gmail.com">
              Support
            </InfoLink>{' '}
          </li>
        </InfoList>
      </FooterContent>
    </FooterBlock>
  );
};
export default Footer;
