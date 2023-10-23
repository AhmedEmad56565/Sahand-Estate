import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <p>{currentUser._id}</p>
      <p>{currentUser.username}</p>
      <p>{currentUser.email}</p>
    </div>
  );
};

export default Home;
