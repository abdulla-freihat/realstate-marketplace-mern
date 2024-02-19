import React from 'react';
import { useState } from 'react';
import {getDownloadURL, getStorage , ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const CreateListing = () => {
   const {currentUser} = useSelector(state => state.user);
   const navigate = useNavigate();
     const [files , setFiles] = useState([]);
     const [formData , setFormData] = useState({
          imageUrls:[],
           name:'',
           description:'',
           address:'',
           type:'rent',
           bedrooms:1,
           bathrooms:1,
           regularPrice:50,
           discountPrice:0,
           offer:false,
           parking:false,
           furnished: false

     });
     console.log(formData)

       const [imageUploadError , setImageUploadError] = useState(false);

         const [imageUploading , setImageUploading] = useState(false);
         const [error , setError] = useState(false);
         
    

     const handleImageSubmit= ()=>{
          setImageUploading(true);
                     setImageUploadError(false)
                if(files.length > 0  && files.length + formData.imageUrls.length < 7){

                    const promises = [];

                     for(let i = 0 ; i<files.length ; i++){

                          promises.push(storeImage(files[i]));

                     }

                     Promise.all(promises).then((urls)=>{
                           setFormData({...formData , imageUrls : formData.imageUrls.concat(urls)})

                            setImageUploadError(false);
                            setImageUploading(false);
                     }).catch(err=>{

                         setImageUploadError('Image Upload Failed (2 mb max per image )');
                         setImageUploading(false);
                     })

                     
                }else{
                    setImageUploadError('You can only upload 6 images per listing  ');
                    setImageUploading(false);
                    
                } 
     }

      const storeImage = async (file)=>{

            return  new Promise ((resolve , reject)=>{

                const storage = getStorage(app);
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage , fileName);
                const uploadTask = uploadBytesResumable(storageRef , file);
                uploadTask.on(
                     "state_changes",
                     (snapShot) => {
                         const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
                         console.log(`Upload is ${progress}% done`)
                       },
                     (error)=>{

                          reject(error);
                     },
                     ()=>{
                         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

                                   resolve(downloadURL)
                         })
                     }
                )
            })  
             
      }



      const handleDeleteImage = (index)=>{
              setFormData({

                    ...formData,
                    imageUrls : formData.imageUrls.filter((_ , i) =>{
                           return   i !== index
                    })
              })
             
              toast.success('Image deleted successfully')
      }



      const handleChange = (e)=>{
                 if(e.target.id === 'sale' || e.target.id === 'rent'){

                    setFormData({...formData , type:e.target.id})

                 }


                 if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id==='offer'){

                    setFormData({...formData , [e.target.id]:e.target.checked})

                 }

                if(e.target.type ==='number' || e.target.type ==='text' || e.target.type ==='textarea'){
                    setFormData({...formData , [e.target.id]:e.target.value})

                }

      }



      const submitHandler = async(e)=>{

          e.preventDefault();

           if(formData.imageUrls.length < 1 ) return setError('You must upload at least 1 image')
           if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price')
          setError(false);
         
           const res = await fetch('http://localhost:8000/listing/create', {
          
                 method:'POST',
                 body: JSON.stringify({...formData , userRef:currentUser._id}),
                 headers:{
      
                   'Content-Type' : 'application/json'
      
                 },
                 credentials: 'include'
      
                
           })
      
      
           const data = await res.json();
           if(data.success === false){
                     
               setError(data.message);
             
                return;
           }
      
            
           toast.success('Listing created Successfully')
         
          navigate(`/listing/${data._id}`)
            
           
         
      
      }
      
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-2xl text-center my-7 font-bold'>Create a Listing</h1>

           <form onSubmit={submitHandler}  className='flex flex-col gap-8  sm:flex-row'>
           <div className='flex flex-col gap-4 flex-1'>
             <input type="text"  placeholder='Name'  className='border p-3 outline-none rounded-lg' id='name' maxLength='62' minLength='8' required  onChange={handleChange} value={formData.name}/>
             <textarea type="text"  placeholder='Description' rows='3'  className='resize-none border p-3 outline-none rounded-lg' id='description'  required  onChange={handleChange} value={formData.description} />
             <input type="text"  placeholder='Address'  className='border p-3 outline-none rounded-lg' id='address'  required  onChange={handleChange} value={formData.address} />

 
                  <div className='flex  gap-5 flex-wrap'>
                  <div className='flex gap-2'>
                       <input type='checkbox' id='sale' className='w-4' onChange={handleChange} checked={formData.type ==="sale"}/>
                       <span className='font-bold'>Sell</span>
                  </div>

                  <div className='flex gap-2'>
                       <input type='checkbox' id='rent' className='w-4'  onChange={handleChange} checked={formData.type ==="rent"}/>
                       <span className='font-bold'>Rent</span>
                  </div>


                  <div className='flex gap-2'>
                       <input type='checkbox' id='parking' className='w-4' onChange={handleChange} checked={formData.parking} />
                       <span className='font-bold'>Parking</span>
                  </div>

                  <div className='flex gap-2'>
                       <input type='checkbox' id='furnished' className='w-4' onChange={handleChange} checked={formData.furnished} />
                       <span className='font-bold'>Furnished</span>
                  </div>


                  <div className='flex gap-2'>
                       <input type='checkbox' id='offer' className='w-4'  onChange={handleChange} checked={formData.offer}/>
                       <span className='font-bold'>Offer</span>
                  </div>
                
                  </div>


                        <div className=' flex gap-5 flex-wrap'>
                            <div className='flex items-center gap-2'>
                                 <input type='number'  id='bedrooms' min='1' max='10' required className='bg-white shadow rounded-lg  outline-none p-1 border' onChange={handleChange} value={formData.bedrooms} />
                                 <span className='font-bold'>Beds</span>
                            </div>

                            <div className='flex items-center gap-2'>
                                 <input type='number'  id='bathrooms' min='1' max='10' required className='bg-white shadow rounded-lg  outline-none p-1 border'  onChange={handleChange}  value={formData.bathrooms}/>
                                 <span className='font-bold'>Baths</span>
                            </div>


                            <div className='flex items-center gap-2'>
                                 <input type='number'  id='regularPrice' min='50' max='1000000' required className='bg-white shadow rounded-lg  outline-none p-1 border'  onChange={handleChange} value={formData.regularPrice}/>
                                 <div className='flex flex-col'>
                                 <span className='font-bold'>Regular Price </span>
                                 <span className='text-xs font-semibold  text-center'>($ / Month)</span>
                                 </div>                          
                              </div>

                               {formData.offer &&
                               
                                   <div className='flex items-center gap-2'>
                                 <input type='number' id='discountPrice' min='0' max='1000000' required className='bg-white shadow rounded-lg  outline-none p-1 border' onChange={handleChange} value={formData.discountPrice} />
                                 <div className='flex flex-col'>
                                 <span className='font-bold'>Discount Price </span>
                                 <span className='text-xs font-semibold text-center'>($ / Month)</span>
                                 </div>
                            </div>
                                }
                           
                        </div>

           </div>

               <div className='flex flex-col gap-4 flex-1'>
                   <p className='font-semibold text-sm'>Images : <span className='text-gray-600'>The first image will be cover (max 6)</span></p>

                     <div className='flex gap-1 flex-wrap'>
                         <div className='border p-2 rounded-lg'>
                            <input onChange={(e)=>setFiles(e.target.files)} type ='file' id='images' accept='image/*'  multiple />
                         </div>
                         <button type='button' onClick={handleImageSubmit} className='text-green-600 border border-green-600 bg-transparent p-2 rounded-lg'>{imageUploading ? 'Uploading...' : 'Upload' }</button>

                     </div>
                     <p className='text-red-600'>{imageUploadError && imageUploadError}</p>
                           {
                              formData.imageUrls.length > 0 &&  formData.imageUrls.map((url , index)=>(
                                   <div key={url} className='flex justify-between p-2 border items-center'>
                                      <img src={url}   className='rounded-lg w-20 h-20 object-contain ' />
                                      <button type='button' onClick={()=>handleDeleteImage(index)} className='text-red-600 hover:text-red-700'>DELETE</button>
                                   </div>
                              ))
                           }

                     <button type='submit'  className=' bg-slate-700 hover:bg-slate-800 uppercase text-white  p-3 rounded-lg'>Create Listing</button>
                     {error && <p className='text-red-600'>{error}</p>}


               </div>
              
           </form>
    </main>
  )
}

export default CreateListing