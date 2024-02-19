
import { createSlice } from "@reduxjs/toolkit";


const initialState={

     userlistings : []
      
}

export const listingsSlice = createSlice({

       name : 'listing',
       initialState,
       reducers:{

           getUserListings : (state ,action)=>{

               state.userlistings = action.payload;
               
                
           },

          deleteListing:(state , action)=>{
                   state.userlistings = state.userlistings.filter((listing)=> listing._id !== action.payload)
           }
         
             
           
       }



      
})



export const {getUserListings , deleteListing }  = listingsSlice.actions;
         
        
