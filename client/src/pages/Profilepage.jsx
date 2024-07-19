import { Link, useNavigate } from 'react-router-dom'
import IMG from  '../image/pexels-fotios-photos-1090638.jpg'

import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Profilepage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/login'); 
          return;
        }

        const response = await axios.get('http://localhost:4000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (error) {
       console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }}
    };

    fetchUserProfile();
  }, [navigate]);

  return ( 
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col ">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className='text-4xl text-white font-bold my-4'>Turn Your Ideas reality</h1>
          <p className='text-xl text-white font-normal'> Nothing is posible Be the hard work and be the success</p>
        </div>
       <img src={IMG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 h-full  bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold"> Its a assingment</h1>

        <div className="w-full flex flex-col max-w-[500px] mt-6">
        
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2" >Profile Page</h3>
            <p className='text-base mb-5'>Hello taterao , Your  details Here. </p>
          </div>

          {user ? (
          <div className="w-full flex flex-col my-3 mt-10" >
           <h3>User Name   : <span className='n text-[#a45430] font-bold text-xl'>{user.name}</span></h3>
           <h3>Email       :<span className='n text-[#a45430] font-bold text-xl'>{user.email}</span></h3>
           <h3>Company Name: <span className='n text-[#a45430] font-bold text-xl'>{user.company}</span> </h3>

          </div>
           ) : (
            <p>Loading...</p>
          )}

          <div className="w-full flex flex-col my-4">
           <Link to='/userprofile'> <button className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
              Change details
            </button></Link>
          
          </div> 
        </div>
        <div className="w-full flex items-center justify-center"> 
         <Link to='/Login'> <p className="text-sm font-normal text-[#060606] "> <span className='font-semibold underline underline-offset-2 cursor-pointer'>Back to Login</span></p></Link>
        </div>


      </div>
    </div>
  
  )
}

export default Profilepage