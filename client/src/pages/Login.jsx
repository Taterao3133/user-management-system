import { Link, useNavigate,  } from 'react-router-dom'
import IMG from  '../image/pexels-fotios-photos-1090638.jpg'
import axios from 'axios';
import { useState } from 'react';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/profilepage');
    } 
    }catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password. Please try again.');
      } else {
        alert('Login failed. Please try again.');
      }
    
  };
}

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col ">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className='text-4xl text-white font-bold my-4'>Turn Your Ideas reality</h1>
          <p className='text-xl text-white font-normal'> start for free and get attractive</p>
        </div>
       <img src={IMG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold"> Intaractive Brand</h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2" >Login</h3>
            <p className='text-base mb-2'>Welcome Back! Please enter your details. </p>
          </div>


          <div className="w-full flex flex-col " >
            <input 
              type="email"
              placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)}
              className='w-full text-black py-2 bg-transparent my-2 bg-none border-b border-black outline-none focus:outline-none'/>
            <input 
              type="password"
              placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}
              className='w-full text-black py-2 bg-transparent my-2 bg-none border-b border-black outline-none focus:outline-none'/>

          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex  items-center">
              <input type="checkbox" className="w-4  h-2 mr-2" />
               <p className="text-sm">Remember Me</p>
            </div>
            <p className="text-sm  font-medium whitespace-nowrap cursor-pointer underline-offset-2 underline">Forgot Password</p>

          </div>

          <div className="w-full flex flex-col my-4">
           <button onClick={handleLogin} className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
              Log In
            </button>
          </div> 

        
        </div>
        <div className="w-full flex items-center justify-center"> 
         <Link to='/register'> <p className="text-sm font-normal text-[#060606] ">Don't have a account? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Register</span></p></Link>
        </div>


      </div>
    </div>
  )
}

export default Login