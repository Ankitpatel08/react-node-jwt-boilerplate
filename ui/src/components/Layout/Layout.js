import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <div className='container is-fluid'>
      <MainNavigation />
      <main className='container'>{props.children}</main>
    </div>
  );
};

export default Layout;
