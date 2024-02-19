import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch , useSelector  } from 'react-redux';
import {signInStart , signInSuccess , signInFailure } from '../redux/userSlice';

import OAuth from '../components/OAuth';



const Signin = () => {


const {loading  , error} = useSelector(state => state.user);

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async(e)=>{

    e.preventDefault();
   
      dispatch(signInStart());
   
     const res = await fetch('http://localhost:8000/auth/signin', {
    
           method:'POST',
           body: JSON.stringify({ email , password}),
           headers:{

             'Content-Type' : 'application/json'

           },
           credentials: 'include'

          
     })


     const data = await res.json();
     if(data.success === false){

       dispatch(signInFailure(data.message));
          return;
     }

       dispatch(signInSuccess(data))
     setEmail('');
     setPassword('');
     toast.success('Sign In Successfully')
     setTimeout(()=>{

      
        navigate('/')
          
     } , 2000)
    

   

}


  return (
<div  className='p-3 max-w-lg mx-auto'>
        <h1 className=' text-xl sm:text-3xl text-center font-bold my-7'>Sign In </h1>
        <form onSubmit={submitHandler} className='flex  flex-col gap-4'>
            <input type="email"  placeholder='Email ' className='outline-none border p-3 rounded-lg' id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <input type="password"  placeholder='Password' className='outline-none border p-3 rounded-lg' id="password" value={password}  onChange={(e)=>setPassword(e.target.value)}  />
 
            <button disabled={loading} className='bg-slate-700 hover:bg-slate-800 uppercase text-white  p-3 rounded-lg'>{loading ? 'Loading...' : 'sign in'}</button>
            <OAuth />

        </form>

        <div className='flex mt-3 gap-1 '>
          <p>Don't have an account?</p>
          <Link  className='underline text-slate-700 hover:text-slate-800 '  to="/signup">Sign Up</Link>
        </div>

        {error &&  <p className='text-red-600 mt-5'>{error}</p>}


    </div>
  )
}

export default Signin