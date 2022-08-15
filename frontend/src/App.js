import './App.css';
import {useState} from "react";
import {BrowserRouter,Routes ,Route } from 'react-router-dom';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";
import Login from './components/Login';
import SignUpReg from './components/SignUpReg';
import ForgetPassword from './components/ForgetPassword';



const App = ()  =>{ 
  
  const [sideToggle, setSideToggle] = useState("");

  return (
    <BrowserRouter>     
     <main>

     <Navbar onClick={()=> setSideToggle(true)} />
       <SideDrawer show={sideToggle} />
       <Backdrop  show={sideToggle} onClick ={()=> setSideToggle(false)}/> 

       <Routes>
        
         <Route exact path= "/" element = {<HomeScreen/>} />
         <Route exact path ="/product/:id" element={<ProductScreen />}/>
         <Route exact path ="/cart" element={<CartScreen />}/>
          <Route path="/login"  element={<Login />} />
          <Route path="/SignUpReg"  element={<SignUpReg />} />
          <Route path="/ForgetPassword"  element={<ForgetPassword />} />
       </Routes>
     </main>
    </BrowserRouter>
  )
};

export default App;

