import { Route, Routes } from 'react-router-dom';

import './App.scss';

import Layout from './components/Layout/Layout';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' index element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} /> 
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
