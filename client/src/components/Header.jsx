import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='search'
            placeholder='Search...'
            className='bg-transparent outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form>

        <ul className='flex gap-4 items-center'>
          <li>
            <Link
              to='/'
              className='hidden sm:inline text-slate-700 hover:underline underline-offset-4'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='hidden sm:inline text-slate-700 hover:underline underline-offset-4'
            >
              About
            </Link>
          </li>
          <li>
            {currentUser ? (
              <Link to='/profile'>
                <img
                  src={currentUser.avatar}
                  alt='profile'
                  className='w-7 h-7 rounded-full object-cover border-slate-800 hover:border'
                />
              </Link>
            ) : (
              <Link
                to='/sign-in'
                className='text-slate-700 hover:underline underline-offset-4'
              >
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
