import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  authStart,
  authSuccess,
  authFailure,
  restartStateSuccess,
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
  const [userListings, setUserListings] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(authFailure(data.message));
      }
      dispatch(restartStateSuccess());
      navigate('/sign-in');
    } else {
      return;
    }
  };

  const handleSignout = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      const res = await fetch(`/api/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(authFailure(data.message));
      }
      dispatch(restartStateSuccess());
      navigate('/sign-in');
    } else {
      return;
    }
  };

  const handleShowListings = async () => {
    setShowListingError(false);

    const res = await fetch('/api/user/listings');
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setShowListingError(true);
      return;
    }
    setUserListings(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(authStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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
          className='w-24 h-24 rounded-full mx-auto object-cover my-3 cursor-pointer hover:opacity-50 transition-all'
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
        <Link
          to='/create-listing'
          className='bg-green-700 rounded-lg p-3 text-white hover:opacity-95 disabled:opacity-80'
        >
          CREATE LISTING
        </Link>
        {error && (
          <p className='text-sm text-red-700'>{error || 'validation failed'}</p>
        )}
      </form>

      <div className='flex justify-between items-center mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDelete}>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignout}>
          Sign out
        </span>
      </div>

      <button
        type='button'
        className='text-green-700 mt-5 mb-2'
        onClick={handleShowListings}
      >
        Show listings
      </button>
      {showListingError && (
        <p className='text-red-700 mt-3'>Error Showing listings</p>
      )}

      {userListings &&
        userListings.length > 0 &&
        userListings.map((listing) => {
          return (
            <div
              key={listing._id}
              className='flex items-center border rounded-lg py-3 gap-3'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                  className='w-20 h-16 object-contain'
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className='flex-1 text-slate-700 font-semibold hover:underline truncate'
              >
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col'>
                <button className='text-red-700'>Delete</button>
                <button className='text-green-700'>Edit</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Profile;
