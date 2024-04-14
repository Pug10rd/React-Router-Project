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
      {window.innerWidth > 430 ? (
        <h1 className="filler">Find top movies here!</h1>
      ) : null}
    </div>
  );
};

export default Header;
