import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../store/user/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { displayName: name, email, photoURL: photo } = result.user;

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, photo }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not connect to Google', error);
    }
  }

  return (
    <button
      type='button'
      className='bg-red-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80'
      onClick={handleGoogleClick}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
