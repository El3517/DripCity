import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Login from './Pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Routes>
        <Route path='/' element = {<Home></Home>}></Route>
        <Route path='/about' element = {<About></About>}></Route>
        <Route path='/collection' element= {<Collection></Collection>}></Route>
        <Route path='/contact' element = {<Contact></Contact>}></Route>
        <Route path='/cart' element = {<Cart></Cart>}></Route>
        <Route path='/place-order' element = {<PlaceOrder></PlaceOrder>}></Route>
        <Route path='/orders' element = {<Orders></Orders>}></Route>
        <Route path='/login' element = {<Login></Login>}></Route>
        <Route path='/product/:productId' element = {<Product></Product>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App