import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserAuth } from './types/types';
import MainLayout from './layouts/MainLayout';
import '@fontsource/roboto/400.css';

const Signin = lazy(() => import('./views/Signin'));
const Products = lazy(() => import('./views/Products'));
const NotFound = lazy(() => import('./views/NotFound'));

function App() {
  const auth = useSelector((state: UserAuth) => state.user.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={auth ? <Products /> : <Navigate to='/signin' />} />
          <Route path='/signin' element={auth ? <Navigate to='/' /> : <Signin />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App