import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Component = () => {
  return (
    <>
      <div id="page-container">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Component;
