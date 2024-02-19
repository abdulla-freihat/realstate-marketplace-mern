import React from 'react'
import {Link} from "react-router-dom"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import OAuth from '../components/OAuth';



const Signup = () => {


  const [username , setUserName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const[error , setError] = useState(null);
  const [loading , setLoading] = useState(false)

  const navigate = useNavigate();


  const submitHandler = async(e)=>{

      e.preventDefault();
      setLoading(true)
     
       const res = await fetch('http://localhost:8000/auth/signup', {

             method:'POST',
             body: JSON.stringify({username, email , password}),
             headers:{

               'Content-Type' : 'application/json'

             },

            
       })


       const data = await res.json();
       if(data.success === false){
        

            setError(data.message);
            setLoading(false);
            return;
       }

       setLoading(false);
       setError(null);
       setUserName('');
       setEmail('');
       setPassword('');
       toast.success('Sign Up Successfully')
       setTimeout(()=>{

        
          navigate('/signin')
            
       } , 2000)
      


  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-xl sm:text-3xl text-center font-bold my-7'>Sign Up </h1>
        <form onSubmit={submitHandler} className='flex  flex-col gap-4'>
            <input type="text"  placeholder='Username ' className='outline-none border p-3 rounded-lg' id="username" value={username} onChange={(e)=>setUserName(e.target.value)} />
            <input type="email"  placeholder='Email ' className='outline-none border p-3 rounded-lg' id="email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>

            <input type="password"  placeholder='Password' className='outline-none border p-3 rounded-lg' id="password" value={password}  onChange={(e)=>setPassword(e.target.value)}  />
 
            <button disabled={loading} className='bg-slate-700 hover:bg-slate-800 uppercase text-white  p-3 rounded-lg'>{loading ? 'Loading...' : 'sign up'}</button>
       <OAuth />
        </form>

        <div className='flex mt-3 gap-1 '>
          <p>Have an account?</p>
          <Link  className='underline text-slate-700 hover:text-slate-800 '  to="/signin">Sign In</Link>
        </div>

        {error &&  <p className='text-red-600 mt-5'>{error}</p>}

    </div>
  )
}

export default Signup