import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../store/user/userSlice';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const fileRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error.message);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevState) => {
            return { ...prevState, avatar: downloadURL };
          })
        );
      }
    );
  };

  useEffect(() => {
    if (currentUser && !file) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
    if (file) {
      handleFileUpload(file);
    }
  }, [file, currentUser]);

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
  };

  return (
    <div className='text-center max-w-xs sm:max-w-sm md:max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='w-24 h-24 rounded-full mx-auto object-cover my-3 cursor-pointer'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : null}
        </p>
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
          onChange={handleChange}
        />
        <button
          type='submit'
          className='bg-slate-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'UPDATE'}
        </button>
        {error && (
          <p className='text-sm text-red-700'>{error || 'validation failed'}</p>
        )}
      </form>

      <div className='flex justify-between items-center mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
