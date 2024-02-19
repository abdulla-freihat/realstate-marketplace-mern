import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from "react-icons/md";
import {
    FaBath,
    FaBed,
    
  } from 'react-icons/fa';

const ListingItem = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[250px]  '>
        <Link to ={`/listing/${listing._id}`} >
               <div className='bg-gray-200 font-semibold w-12 text-center absolute'>
                  {listing.type}
               </div>
              <img src={listing.imageUrls[0]} className='h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-all duration-300' />

               <div className='p-3 flex flex-col justify-between gap-2 w-full '>
                  <p className='truncate font-semibold text-lg text-slate-700'>{listing.name}</p>
                  <div  className='flex gap-1 items-center '>
                     <MdLocationOn className='text-green-700 w-4 h-4'  />
                     <p className='text-gray-600 truncate'>{listing.address}</p>
                  </div>
                  
                  <p className='line-clamp-2 text-gray-600 text-sm'>
                    {listing.description}
                  </p>

            <p className='font-semibold text-md text-gray-500  '>
                 ${listing.offer ? listing.discountPrice : listing.regularPrice} 
                 {listing.type === 'rent' && '/month'}
          </p>


          <div className='flex gap-5 '>
            
            <div className='flex items-center gap-1 text-sm'>
            <FaBed  className='text-green-700 w-4 h-4'/>
            {listing.bedrooms >1 ?<p className='font-semibold text-slate-700'>{listing.bedrooms} beds</p> :<p className='font-semibold text-slate-700'>{listing.bedrooms} bed</p> }
            </div>

            <div className='flex items-center gap-1 text-sm'>
            <FaBath className='text-green-700 w-4 h-4' />
            {listing.bathrooms >1 ?<p className='font-semibold text-slate-700'>{listing.bathrooms} baths</p> : <p className='font-semibold text-slate-700'>{listing.bathrooms} bath</p> }
           </div>
           </div>
          </div>
           


             
        </Link>
    </div>
  )
}

export default ListingItem