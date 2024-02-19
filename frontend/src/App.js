import  {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./Pages/Home"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Navbar from "./components/Navbar";
import CreateListing from "./Pages/CreateListing";
import { Toaster } from 'react-hot-toast';
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./Pages/UpdateListing";
import SingleListing from "./Pages/SingleListing";
import Search from "./Pages/Search";

import About from "./Pages/About"
function App() {
  return (
    <>
        <BrowserRouter>

<Toaster />
<Navbar />
  <Routes>

     
    <Route path='/'   element={<Home />} />
    <Route path='/about'   element={<About />} />
    <Route path='/listing/:id'   element={<SingleListing />} />
    <Route path='/signin'   element={<Signin />} />
    <Route path='/signup'   element={<Signup />} />
    <Route path='/search'   element={<Search />} />


    <Route    element={<PrivateRoute/>} >
    <Route path='/profile'   element={<Profile/>} />
    <Route path='/create-listing'   element={<CreateListing />} />
    <Route path='/update-listing/:id'   element={<UpdateListing />} />


    </Route>



  </Routes>
</BrowserRouter>
    </>
  
  );
}

export default App;
