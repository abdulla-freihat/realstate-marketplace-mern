import React, { useState ,useRef , useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import {getDownloadURL, getStorage , ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase"
import { updateUserStart , updateUserSuccess , updateUserFailure , signoutUserStart , signoutUserSuccess , signoutUserFailure } from '../redux/userSlice';
import { getUserListings , deleteListing } from '../redux/listingsSlice';
import toast from 'react-hot-toast';
import {Link} from "react-router-dom"

const Profile = () => {

  const {currentUser} = useSelector(state => state.user);
  const {userlistings} = useSelector(state=>state.listings);

  const fileRef = useRef(null);
  const [file , setFile] = useState(undefined);
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(null);
 const [formData , setFormData] = useState({});
const [showListings , setShowListings] = useState(false);
const dispatch = useDispatch();

  //firebase storage
 // allow read;
  //allow write : if
  //request.resource.size < 2 * 1024 * 1024 &&
 // request.resource.contentType.matches('image/.*')


 useEffect(()=>{

        if(file){

                handleFileUpload(file);

        }
 }, [file])


 const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapShot) => {
      const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
      });
    }
  );
};

const handleChange=(e)=>{

    setFormData({...formData , [e.target.id] : e.target.value})   
}


const submitHandler = async(e)=>{

  e.preventDefault();
 
   dispatch(updateUserStart());
 
   const res = await fetch(`http://localhost:8000/auth/update/${currentUser._id}`, {

         method:'POST',
         body: JSON.stringify(formData),
         headers:{

           'Content-Type' : 'application/json'

         },

         credentials: 'include'
   })


   const data = await res.json();
   if(data.success === false){

     dispatch(updateUserFailure(data.message));
        return;
   }

     dispatch(updateUserSuccess(data))
   
      toast.success('data updated Successfully')
   

    

}


const signoutHandler = async()=>{
 
 
   dispatch(signoutUserStart());
 
   const res = await fetch('http://localhost:8000/auth/signout' ,{

   credentials: 'include'
   });

   const data = await res.json();
   if(data.success === false){

     dispatch(signoutUserFailure(data.message));
        return;
   }

     dispatch(signoutUserSuccess(data))
   
      toast.success('Logout Successfully')

     
}



useEffect(()=>{

     const fetchListings =async()=>{
          
      const res = await fetch(`http://localhost:8000/listing/listings/${currentUser._id}` ,{
             method:'GET',
             credentials: 'include'

       
      })

      const data = await res.json();
      console.log(data);
      dispatch(getUserListings(data))

        
     }

     fetchListings();

} , [])



const handleShowListings = ()=>{

    setShowListings(!showListings);
}



const handleDeleteListingClick = async (listingId) => {
 
  const res = await fetch(`http://localhost:8000/listing/delete/${listingId}` ,{
    method:'Delete',
    credentials: 'include'


})
   const data = await res.json();
   
   if(data.success === false){

       console.log(data.message);
       return;
  }

   dispatch(deleteListing(listingId));
   toast.success('listing deleted successfully');


};




  return (
    <div  className='p-3 max-w-lg mx-auto'>
        <h1 className=' text-xl sm:text-3xl text-center font-bold my-7'>Profile</h1>
        <form onSubmit={submitHandler}  className='flex  flex-col gap-4'>
        <div className='flex justify-between items-center'>

<input onChange={(e)=>setFile(e.target.files[0])} type="file" className='hidden' accept="image/*" ref={fileRef}/>
 <div className='m-auto'>
<img   onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='cursor-pointer m-auto w-16 h-16 sm:w-24 sm:h-24 object-cover hover:opacity-75 rounded-full'  alt="profile image" />
{fileUploadError ? (<span className='text-red-600'>Error Image Upload</span>) :
filePerc > 0 && filePerc < 100 ?(
   <span className='text-slate-600'>
    {`Uploading ${filePerc}%`}
   </span>
   )
   :
   filePerc  === 100 ? (
    <span className='text-green-600'> Image Successfully Uploaded!</span> 
    ) 

     : (

     ""


)}
</div>
<p onClick={signoutHandler} className='text-red-600 underline  cursor-pointer'>Sign Out</p>


        </div>

        <input type="text" defaultValue={currentUser.username}  placeholder='Username ' className='outline-none border p-3 rounded-lg' id="username" onChange={handleChange} />

            <input type="email" defaultValue={currentUser.email}  placeholder='Email ' className='outline-none border p-3 rounded-lg' id="email"  onChange={handleChange}  />

            <input type="password"  placeholder='Password' className='outline-none border p-3 rounded-lg' id="password"    onChange={handleChange} />

            <button  className='bg-slate-700 hover:bg-slate-800 uppercase text-white  p-3 rounded-lg'>update profile</button>
            
            <button  className='bg-green-700 hover:bg-green-800 uppercase text-white  p-3 rounded-lg'>
             <Link to='/create-listing'>
            create listings
            </Link>
            
            </button>


 
          

        </form>

       
        
       <p onClick={handleShowListings}  className='text-green-700 hover:text-green-800 mt-5 cursor-pointer text-center '>show listings</p>
       {showListings && 
       <div>
        <h2 className='text-center font-bold mt-5 text-xl'>Your Listings</h2>
      {userlistings.map((listing)=>(

              
              <div  key={listing._id} className='flex justify-between items-center gap-4 my-5 border p-2 flex-1 flex-wrap'>
              <div className='flex items-center gap-2'>
              <img src={listing.imageUrls[0]} className='w-20 h-16'   />

            <Link to={`/listing/${listing._id}`} className='font-semibold underline text-slate-700 hover:text-slate-800'>{listing.name}</Link>
                </div>
                  <div className='flex flex-col border p-1'>
                     <button onClick={()=>handleDeleteListingClick(listing._id) } className='text-red-600 hover:text-red-700'>Delete</button>

                     <Link to={`/update-listing/${listing._id}`}  >
                     <button className='text-green-600 hover:text-green-700'>Edit</button>
                     </Link>

                  </div>


            </div>



           
      ))}

      </div>
       }
      

    </div>
  )
}

export default Profile