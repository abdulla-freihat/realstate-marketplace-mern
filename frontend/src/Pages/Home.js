import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';


import {MdLocationOn} from "react-icons/md";


import realstate from '../images/realstate.jpg';
import realstate1 from '../images/realstate1.jpg';
import realstate2 from '../images/realstate2.jpg';

import {
  FaBath,
  FaBed,
  
} from 'react-icons/fa';


const Home = () => {
  SwiperCore.use([Navigation]);

  const [listingsList , setLisitngsList] = useState([]);
  

  const rentListings = listingsList.filter((listing) => listing.type === 'rent')
console.log(rentListings)

const saleListings = listingsList.filter((listing) => listing.type === 'sale')
console.log(saleListings)


const offerListings = listingsList.filter((listing) => listing.offer )
console.log(offerListings)

  useEffect(()=>{

      const fetchListings = async()=>{

             const res = await fetch ('http://localhost:8000/listing/listings')
             const data = await res.json();
             setLisitngsList(data)
           
      }

      fetchListings()

  } , [])


  return (
    <>
     {/*top*/ }

             <div className='flex flex-col gap-5 p-28 px-3 max-w-6xl mx-auto'>
               <h1 className='text-slate-700 font-bold text-2xl lg:text-4xl'>
                 Find Your Next
                  <span className='text-slate-500'> Perfect </span>
                  <br />
                  Place With  Ease    
               </h1>

                <div className='text-gray-400  text-xs sm:text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>

                    <Link className='text-blue-800 hover:underline  hover:text-blue-900 font-semibold' to='/search'>Lets's start now...</Link>
             </div>
      {/*swiper*/ }

      <Swiper navigation>
  <SwiperSlide>
    <div className="h-[200px] sm:h-[500px]" style={{ background: `url(${realstate}) center no-repeat`, backgroundSize: 'cover' }}>
      
    </div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="h-[200px] sm:h-[500px]" style={{ background: `url(${realstate1}) center no-repeat`, backgroundSize: 'cover' }}>
     
    </div>
  </SwiperSlide>


  <SwiperSlide>
    <div className="h-[200px] sm:h-[500px]" style={{ background: `url(${realstate2}) center no-repeat`, backgroundSize: 'cover' }}>
     
    </div>
  </SwiperSlide>
</Swiper>


       {/*listing results for offer , rent & sale*/ }

           {/*listing results for rent */ }
              <div className='flex flex-col gap-5 my-12 px-3 max-w-6xl mx-auto'>
              <div className=''>
                  <h1 className='text-slate-700 font-bold text-2xl'>Recent places for rent</h1>
                  <Link className='text-blue-800 hover:underline  hover:text-blue-900 font-semibold' to='/search?type=rent'>Show more places for rent</Link>

              </div>
       <div className="flex flex-wrap gap-4">
        {rentListings.map((listing) => (
          <div key={listing._id} className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[250px]">
            <Link to={`/listing/${listing._id}`}>
              <div className="bg-gray-200 font-semibold w-12 text-center absolute">{listing.type}</div>
              <img
                src={listing.imageUrls[0]}
                className="h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-all duration-300"
                alt={`Listing ${listing.name}`}
              />

              <div className="p-3 flex flex-col justify-between gap-2 w-full">
                <p className="truncate font-semibold text-lg text-slate-700">{listing.name}</p>
                <div className="flex gap-1 items-center">
                  <MdLocationOn className="text-green-700 w-4 h-4" />
                  <p className="text-gray-600 truncate">{listing.address}</p>
                </div>

                <p className="line-clamp-2 text-gray-600 text-sm">{listing.description}</p>

                <p className="font-semibold text-md text-gray-500">
                  ${listing.offer ? listing.discountPrice : listing.regularPrice}
                  {listing.type === 'rent' && '/month'}
                </p>

                <div className="flex gap-5">
                  <div className="flex items-center gap-1 text-sm">
                    <FaBed className="text-green-700 w-4 h-4" />
                    {listing.bedrooms > 1 ? (
                      <p className="font-semibold text-slate-700">{listing.bedrooms} beds</p>
                    ) : (
                      <p className="font-semibold text-slate-700">{listing.bedrooms} bed</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <FaBath className="text-green-700 w-4 h-4" />
                    {listing.bathrooms > 1 ? (
                      <p className="font-semibold text-slate-700">{listing.bathrooms} baths</p>
                    ) : (
                      <p className="font-semibold text-slate-700">{listing.bathrooms} bath</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>


{/*listing results for sale */ }


<div className='flex flex-col gap-5 my-12  px-3 max-w-6xl mx-auto'>
              <div className=''>
                  <h1 className='text-slate-700 font-bold text-2xl'>Recent places for sale</h1>
                  <Link className='text-blue-800 hover:underline  hover:text-blue-900 font-semibold' to='/search?type=sale'>Show more places for sale</Link>

              </div>
       <div className="flex flex-wrap gap-4">
        {saleListings.map((listing) => (
          <div key={listing._id} className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[250px]">
            <Link to={`/listing/${listing._id}`}>
              <div className="bg-gray-200 font-semibold w-12 text-center absolute">{listing.type}</div>
              <img
                src={listing.imageUrls[0]}
                className="h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-all duration-300"
                alt={`Listing ${listing.name}`}
              />

              <div className="p-3 flex flex-col justify-between gap-2 w-full">
                <p className="truncate font-semibold text-lg text-slate-700">{listing.name}</p>
                <div className="flex gap-1 items-center">
                  <MdLocationOn className="text-green-700 w-4 h-4" />
                  <p className="text-gray-600 truncate">{listing.address}</p>
                </div>

                <p className="line-clamp-2 text-gray-600 text-sm">{listing.description}</p>

                <p className="font-semibold text-md text-gray-500">
                  ${listing.offer ? listing.discountPrice : listing.regularPrice}
                  {listing.type === 'rent' && '/month'}
                </p>

                <div className="flex gap-5">
                  <div className="flex items-center gap-1 text-sm">
                    <FaBed className="text-green-700 w-4 h-4" />
                    {listing.bedrooms > 1 ? (
                      <p className="font-semibold text-slate-700">{listing.bedrooms} beds</p>
                    ) : (
                      <p className="font-semibold text-slate-700">{listing.bedrooms} bed</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <FaBath className="text-green-700 w-4 h-4" />
                    {listing.bathrooms > 1 ? (
                      <p className="font-semibold text-slate-700">{listing.bathrooms} baths</p>
                    ) : (
                      <p className="font-semibold text-slate-700">{listing.bathrooms} bath</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>



{/*listing results for offer */ }


<div className='flex flex-col gap-5 my-12  px-3 max-w-6xl mx-auto'>
              <div className=''>
                  <h1 className='text-slate-700 font-bold text-2xl'>Recent offers</h1>
                  <Link className='text-blue-800 hover:underline  hover:text-blue-900 font-semibold' to='/search?offer=true'>Show more offers</Link>

              </div>
       <div className="flex flex-wrap gap-4">
        {offerListings.map((listing) => (
          <div key={listing._id} className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[250px]">
            <Link to={`/listing/${listing._id}`}>
              <div className="bg-gray-200 font-semibold w-24 text-center absolute">{listing.type} offer</div>
              <img
                src={listing.imageUrls[0]}
                className="h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-all duration-300"
                alt={`Listing ${listing.name}`}
              />

              <div className="p-3 flex flex-col justify-between gap-2 w-full">
                <p className="truncate font-semibold text-lg text-slate-700">{listing.name}</p>
                <div className="flex gap-1 items-center">
                  <MdLocationOn className="text-green-700 w-4 h-4" />
                  <p className="text-gray-600 truncate">{listing.address}</p>
                </div>

                <p className="line-clamp-2 text-gray-600 text-sm">{listing.description}</p>

                <p className="font-semibold text-md text-gray-500">
                  ${listing.offer ? listing.discountPrice : listing.regularPrice}
                  {listing.type === 'rent' && '/month'}
                </p>

                <div className="flex gap-5">
                  <div className="flex items-center gap-1 text-sm">
                    <FaBed className="text-green-700 w-4 h-4" />
                    {listing.bedrooms > 1 ? (
                      <p className="font-semibold text-slate-700">{listing.bedrooms} beds</p>
                    ) : (
                      <p className="font-semibold text-slate-700">{listing.bedrooms} bed</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <FaBath className="text-green-700 w-4 h-4" />
                    {listing.bathrooms > 1 ? (
                      <p className="font-semibold text-slate-700">{listing.bathrooms} baths</p>
                    ) : (
                      <p className="font-semibold text-slate-700">{listing.bathrooms} bath</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>


    </>
  )
}

export default Home