
import React from 'react'
import {GoogleAuthProvider ,getAuth, signInWithPopup} from 'firebase/auth';
import {app} from "../firebase"
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const OAuth = () => {

    const dispatch= useDispatch();
    const navigate = useNavigate();


    const handleGoogleClick = async ()=>{

            try{

                 const provider = new GoogleAuthProvider();
                 const auth = getAuth(app);

                 const result = await signInWithPopup(auth , provider);
                
                  const res = await fetch ('http://localhost:8000/auth/google' , {

                          method:'POST',
                          body:JSON.stringify({name : result.user.displayName , email: result.user.email , photo : result.user.photoURL}) ,
                          headers:{

                            'Content-Type' : 'application/json'
               
                          },

                          credentials: 'include'
               

                  })

                  const data = await res.json();
                  dispatch(signInSuccess(data))
                  toast.success('Sign In Successfully')
                  setTimeout(()=>{
             
                   
                     navigate('/')
                       
                  } , 2000)




            }catch(err){

                 console.log("could not sign in by google" , err)
            }
    }
  return (
    <button onClick={handleGoogleClick} type="button" className='bg-red-700 hover:bg-red-800 uppercase text-white  p-3 rounded-lg'>Sign By Google</button>

  )
}

export default OAuth