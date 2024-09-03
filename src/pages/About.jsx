import BackButton from 'components/BackButton';
import { styled } from 'styled-components';

const TextBlock = styled.div`
  background: linear-gradient(
    145deg,
    rgba(34, 34, 34, 0.9),
    rgba(24, 24, 24, 0.9)
  );
  margin: 20px auto;
  padding: 30px;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  line-height: 1.8;
  color: #e0e0e0;
  font-size: 1.1em;
  letter-spacing: 0.5px;

  h1,
  h2 {
    color: #ffffff;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 25px;
    color: #b0b0b0;
  }

  h2 {
    margin-top: 40px;
    font-size: 1.75em;
    border-bottom: 2px solid #555;
    padding-bottom: 10px;
  }

  a {
    color: #4a90e2;
    text-decoration: none;
    transition: color 0.3s;
  }

  a:hover {
    color: #1c6dd0;
  }

  button {
    background: #4a90e2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background: #1c6dd0;
  }
`;

const About = () => {
  return (
    <>
      <BackButton />
      <TextBlock>
        <h1>About Movilla</h1>
        <p>
          Welcome to Movilla! Movilla is your go-to platform for the latest
          movie reviews and top lists of popular films. Inspired by the grandeur
          of movies and the might of Godzilla, Movilla merges the best of both
          worlds to bring you a unique cinematic experience.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to provide a comprehensive and engaging platform where
          movie enthusiasts can discover and explore top-rated movies and
          insightful reviews. Leveraging the power of the TMDB API, we strive to
          deliver up-to-date information and foster a vibrant community of movie
          lovers.
        </p>

        <h2>Core Values</h2>
        <p>
          <strong>Innovation:</strong> Continuously exploring and implementing
          the latest web technologies to enhance user experience.
        </p>
        <p>
          <strong>Quality:</strong> Committed to providing high-quality and
          accurate movie information.
        </p>
        <p>
          <strong>Learning:</strong> As a pet project, Movilla is dedicated to
          the continuous learning and application of React and its ecosystem
          libraries.
        </p>

        <h2>Our Journey</h2>
        <p>
          Movilla started as a passion project to practice and implement modern
          web technologies. With the power of React and the robust data provided
          by the TMDB API, Movilla has grown into a comprehensive platform for
          movie enthusiasts.
        </p>

        <h2>Meet the Creator</h2>
        <p>
          Movilla is crafted with dedication and enthusiasm by Ivan Zarichnyi.
          With a strong passion for both movies and technology, I strive to
          create a seamless and enjoyable user experience for all visitors.
        </p>
      </TextBlock>
    </>
  );
};

export default About;
