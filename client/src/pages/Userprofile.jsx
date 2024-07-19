import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IMG from '../image/pexels-fotios-photos-1090638.jpg';

function UserProfile() {
 const [user, setUser] = useState({ name: '', email: '', password: '', company: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedFields = {};
      if (user.name) updatedFields.name = user.name;
      if (user.email) updatedFields.email = user.email;
      if (user.password) updatedFields.password = user.password;
      if (user.company) updatedFields.company = user.company;

      await axios.put(
        'http://localhost:4000/api/auth/profile',
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Profile updated successfully');
      navigate('/profilepage');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">Turn Your Ideas Into Reality</h1>
          <p className="text-xl text-white font-normal">Start for free and get attractive</p>
        </div>
        <img src={IMG} alt="Background" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">Interactive Brand</h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">User Profile</h3>
            <p className="text-base mb-2">Update your details</p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="text"
              value={user.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Username"
              className="w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none"
            />
            <input
              type="email"
              value={user.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              value={user.password || ''}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              className="w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none"
            />
            <input
              type="text"
              value={user.company || ''}
              onChange={(e) => setUser({ ...user, company: e.target.value })}
              placeholder="Company Name"
              className="w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex flex-col my-4">
            <button onClick={handleUpdate} className="w-full bg-white my-2 font-semibold text-[#060606] border-2 border-black rounded-md p-4 text-center flex items-center justify-center">
              Submit
            </button>
          </div>
          <div className="w-full flex items-center justify-center"> 
         <Link to='/profilepage'> <p className="text-sm font-normal text-[#060606] ">Back to  <span className='font-semibold underline underline-offset-2 cursor-pointer'>Profile</span></p></Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
