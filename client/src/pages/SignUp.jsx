import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
  };

  return (
    <div className='py-3 max-w-xs sm:max-w-sm md:max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          id='username'
          className={`border rounded-lg p-3`}
          value={formData.username}
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'SIGN UP'}
        </button>
        <OAuth />
        {error && (
          <p className='text-sm text-red-700'>{error || 'validation failed'}</p>
        )}
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
