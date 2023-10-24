import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../store/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(authStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(authFailure(data.message));
      return;
    }
    dispatch(authSuccess(data));
    navigate('/');
  };

  return (
    <div className='py-3 max-w-xs sm:max-w-sm md:max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='email'
          id='email'
          className={`border rounded-lg p-3`}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          className={`border rounded-lg p-3`}
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'SIGN IN'}
        </button>
        <OAuth />
        {error && (
          <p className='text-sm text-red-700'>{error || 'validation failed'}</p>
        )}
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Don&apos;t have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
