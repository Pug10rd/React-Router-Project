import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="header-nav-btn">
        <Link to="/" className="nav-btn">
          HOME
        </Link>
        <Link to="/movies" className="nav-btn">
          MOVIES
        </Link>
      </div>
      <h1 className="filler">Find top movies here!</h1>
    </div>
  );
};

export default Header;
