import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';

import Header from './components/Header';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='max-w-6xl mx-auto p-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
