import { Link,  useNavigate } from 'react-router-dom'
import IMG from '../image/pexels-fotios-photos-1090638.jpg'
import { useState } from 'react';
import axios from 'axios';




function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();


  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        email,
        password,
        name,
        
      });
      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col ">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className='text-4xl text-white font-bold my-4'>Turn Your Ideas reality</h1>
          <p className='text-xl text-white font-normal'> Start for free and get Attractive</p>
        </div>
       <img src={IMG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold"> Intaractive Brand</h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2" >Register</h3>
            <p className='text-base mb-2'>For account regitration! Please enter your details. </p>
          </div>


          <div className="w-full flex flex-col " >
            <input 
              type="username" value={name}
              placeholder='Username' required onChange={(e) => setName(e.target.value)}
              className='w-full text-black py-2 bg-transparent my-2 bg-none border-b border-black outline-none focus:outline-none'/>
            <input 
              type="email" value={email}
              placeholder='Email' required onChange={(e) => setEmail(e.target.value)}
              className='w-full text-black py-2 bg-transparent my-2 bg-none border-b border-black outline-none focus:outline-none'/>
            <input 
              type="password"  value={password}
              placeholder='Password' required onChange={(e) => setPassword(e.target.value)}
              className='w-full text-black py-2 bg-transparent my-2 bg-none border-b border-black outline-none focus:outline-none'/>
            <input 
              type="password"  value={password}
              placeholder='Password' required onChange={(e) => setPassword(e.target.value)}
              className='w-full text-black py-2 bg-transparent my-2 bg-none border-b border-black outline-none focus:outline-none'/>

          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex  items-center">
              <input type="checkbox" className="w-4  h-2 mr-2" />
               <p className="text-sm">Remember Me</p>
            </div>
            <p className="text-sm  font-medium whitespace-nowrap cursor-pointer underline-offset-2 underline">Fill with care</p>

          </div>

          <div className="w-full flex flex-col my-4">
            
            <button onClick={handleRegister} className='w-full bg-white my-2  font-semibold text-[#060606] border-2 border-black rounded-md p-4 text-center flex items-center justify-center'>
              Register
            </button>
          </div> 

        
        </div>
        <div className="w-full flex items-center justify-center"> 
         <Link to='/login'> <p className="text-sm font-normal text-[#060606] ">If you have an account? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Login</span></p></Link>
        </div>


      </div>
    </div>
  )
}

export default Register