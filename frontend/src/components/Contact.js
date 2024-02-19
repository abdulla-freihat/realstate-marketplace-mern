import React from 'react';
import { useState , useEffect } from 'react';
import {Link} from 'react-router-dom'



const Contact = ({listing}) => {

    const [landlord , setLandlord] = useState(null);
    const [message , setMessage]  = useState('')

const onChange =(e)=>{


        setMessage(e.target.value)  
}

       useEffect(()=>{

        const fetchLandlord = async ()=>{

            const res = await fetch(`http://localhost:8000/auth/${listing.userRef}` ,{

                credentials : 'include'
            })
              
            const data = await res.json();
            setLandlord(data)
          }


          fetchLandlord();
         


       }, [listing.userRef])



       
  return (
    <>
      {landlord && (
          
           <div className=''>

                <p>Contact -  <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>

                <textarea className='border rounded-lg outline-none resize-none w-full mt-3 p-3' id='message' name='message' rows='5' placeholder='Enter your message here...'  value={message} onChange={onChange}>

                </textarea>

                <Link  to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                <button className='bg-slate-700 mt-5 hover:bg-slate-800 uppercase text-white  p-2 rounded-lg'>Send Message</button>
                </Link>

           </div>

      )}

    </>
  )
}

export default Contact