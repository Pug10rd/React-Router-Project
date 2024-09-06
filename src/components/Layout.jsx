import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Component = () => {
  return (
    <>
      <div id="page-container">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Component;
