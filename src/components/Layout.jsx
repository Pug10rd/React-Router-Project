import { Outlet } from 'react-router-dom';
import Header from './Header';

const Component = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Component;
