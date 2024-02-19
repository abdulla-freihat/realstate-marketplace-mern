import React from 'react'

import { FaSearch } from "react-icons/fa";
import { Link  , useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import { useState , useEffect } from 'react';


const Navbar = () => {

  const {currentUser} = useSelector(state=>state.user)
  const [searchTerm  , setSearchTerm] = useState('');
  const navigate = useNavigate();
 const submitHandler = (e)=>{
e.preventDefault();
const urlParams = new URLSearchParams(window.location.search);
 
urlParams.set('searchTerm' , searchTerm);

const searchQuery = urlParams.toString();
navigate(`/search?${searchQuery}`);

    
 }


 useEffect(()=>{
  const urlParams = new URLSearchParams(window.location.search);
const searchTermFromUrl= urlParams.get('searchTerm');
if(searchTermFromUrl){

   setSearchTerm(searchTermFromUrl)
}


 }, [window.location.search])
  return (
    <nav className='  bg-slate-200 w-100 shadow-md '>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>

     <Link to="/" className='font-bold text-md  sm:text-xl  flex flex-wrap'>
        <span className='text-slate-500'>Real</span>
        <span className='text-slate-700'>State</span>
     </Link>
     
           <form onSubmit={submitHandler} className='bg-slate-100 p-1 sm:p-2 flex items-center rounded-lg '>
             <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text"  placeholder='Search...' className=' bg-transparent outline-none  rounded  w-24 sm:w-64'  />
            
             <button type='submit'>
             <FaSearch className='text-slate-500' />
             </button>
           </form>

           <div className='flex gap-4 items-center '>
             <Link to="/"       className=' hidden sm:inline text-slate-700 hover:underline text-sm' >Home</Link>
             <Link to="/about"  className=' hidden sm:inline text-slate-700 hover:underline text-sm' >About</Link>

                <Link  to='/profile'>
             {currentUser ?  <img src={currentUser.avatar} alt='profile image' className='rounded-full h-7 w-7 object-cover hover:opacity-75 cursor-pointer' /> :              <Link to="/signin" className=' text-slate-700 hover:underline text-sm' >Signin</Link>}
             </Link>
           </div>
                
</div>
    </nav>
  )
}

export default Navbar