const listingSchema = require('../models/listingSchema.js');
const errorHandler = require('../utlis/error.js');


const createListing =async (req, res, next)=>{
try{

  const listing = await listingSchema.create(req.body);
  return res.status(201).json(listing)
     
}catch(err){

      next(err)
}
     
}





const getUserListings = async(req , res , next)=>{

         if(req.user.id === req.params.id){

          try{
    
            const listings = await listingSchema.find({userRef : req.params.id });
            return res.status(200).json(listings)
             
          }catch{
      
            next(err)
      
          }
            
         }else{

               return next(errorHandler('401' , 'you can only view your own listings'))
         }
   
    
    
}








const deleteListing = async(req,res, next)=>{

     const listing = await listingSchema.findById(req.params.id);
   
        if(!listing){
               return next(errorHandler(404 , 'Listing not found'))
        }

         //check if the user is the owner of the listing
        if(req.user.id !==  listing.userRef){
          return next(errorHandler(401 , 'you can only delete your own listings! '))   
                
        }

   try{

  await listingSchema.findByIdAndDelete(req.params.id);
      res.status(200).json('listing has been deleted');
    
   }catch(err){

        next(err)
   }
   
}


const updateListing = async(req,res, next)=>{

  const listing = await listingSchema.findById(req.params.id);
  if(!listing){
    return next(errorHandler(404 , 'Listing not found'))
}

//check if the user is the owner of the listing
if(req.user.id !==  listing.userRef){
  return next(errorHandler(401 , 'you can only update your own listings! '))   
        
}

  try{
   
   const updatedListing =  await listingSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
  
  );
    res.status(200).json(updatedListing);


  }catch(err){
        next(err);
  }

}




const getListing = async(req,res, next)=>{

    try{

      const listing = await listingSchema.findById(req.params.id);
     if(!listing){
      return next(errorHandler(401 , 'listing not found '));   
       
     }
     res.status(200).json(listing)

    }catch(err){

         next(err);
    }
 
   
  

}


const getSearchListings =async  (req, res, next)=>{



  try{

    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

// if user doesnt choose (offer) , so user can see the listings with (offer) and without (offer)   (not undefined)
   let offer = req.query.offer;
   if(offer === undefined || offer === 'false'){

          offer = { $in : [true , false]   };   
   }



   // if user doesnt choose (furnished), so user can see the listings with (furnished) and without (furnished)  (not undefined)
   let furnished = req.query.furnished;
   if(furnished === undefined || furnished === 'false'){

    furnished = { $in : [true , false]   };   
   }



   // if user doesnt choose (parking), so user can see the listings with (parking) and without (parking) (not undefined)
   let parking = req.query.parking;
   if(parking === undefined || parking === 'false'){

    parking = { $in : [true , false]   };   
   }


   // if user doesnt choose (type) that is (rent and sale) , so user can see the listings with  (rent and sale ) and  without parking(rent and sale) (not undefined)
   let type= req.query.type
   if(type === undefined || type === 'all'){

    type = { $in : ['sale' , 'rent']   };   
   }


//if there are a search item or empty
   const searchTerm = req.query.searchTerm || '' 


   //sort by createdAt
   const sort  = req.query.sort || 'createdAt';

   //order by desc
   const order = req.query.order || 'desc';


   const listings = await listingSchema.find({

          //$regex is a built in search functionality in mongo db used to search by title (words or chars) for example 
          //$options  dont care about lower case and upper case , so when user for example need to search about this title (Modern) and he search by make (M) lower case like that (modern) so its will work
         name : {$regex : searchTerm , $options : 'i' },
         offer,
         furnished,
         parking,
         type

       
   }).sort(
          {[sort] : order}
   ).limit(limit).skip(startIndex);

   return  res.status(200).json(listings);





     
  }catch(err){

       next(err);
  }

   
}



//get all listings
const getListings =async  (req, res, next)=>{



  try{

const listings = await listingSchema.find({})

if(!listings){

  return next(errorHandler(401 , 'There are no listings.'));   

}
  
  return  res.status(200).json(listings);

     
  }catch(err){

       next(err);
  }

   
}











module.exports={

  createListing,
  getUserListings,
  deleteListing,
  updateListing,
  getListing,
  getSearchListings,
  getListings

}





