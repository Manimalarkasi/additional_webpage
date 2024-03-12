import React , { useState }from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'
import { Avatar } from '@mui/material';
import { pink } from '@mui/material/colors'
import {FiMenu,FiX} from 'react-icons/fi'



function Navbar() {
    const [open,setOpen] = useState(false)
  const handleclick = ()=>setOpen(!open);
  const closemenu = () =>setOpen(false)
  return (
    <>
    <nav className='navbar'>
    <Link to='/login' onClick={closemenu}>
         <Avatar alt='Groot' src='image/g1.jpg' sx={{ height:'70px',width:'70px',margin:'20px'}}/>
         I'm Groot
         </Link>
         
         <div className='logo'>
         welcome to my world!
         </div>
          <div className='nav-icon' onClick={handleclick}>
            {open ? <FiX /> :  <FiMenu /> }
          </div>
         <ul className={open ? 'links active' : 'links'}>
          {/* <li><Link to='/' style={{border:"1px solid white"}} onClick={closemenu}>Main</Link></li> */}
          <li><Link to='/home' style={{border:"1px solid white"}} onClick={closemenu} >Home</Link> </li>
          <li><Link to="/aboutweb" style={{border:"1px solid white"}} onClick={closemenu}>About</Link></li>
          <li><Link to="/corttoon" style={{border:"1px solid white"}} onClick={closemenu}>Corttoon</Link></li>
          <li><Link to="/contactweb" style={{border:"1px solid white"}} onClick={closemenu}>Contact</Link></li>
         </ul>
    </nav>
    <nav className='nav-add'>
      <Link to='/login'>SIGNUP</Link>
      <Link to='/register'>REGISTER</Link>
    </nav>

    <div className='nav-content'><i>if you are happy at  time pls click <b>i'm groot</b> at top right to login our page </i>
    <Link to="/corttoon" style={{border:"1px solid white"}} onClick={closemenu}>Corttoon</Link>
    </div>

</>
  )
}

export default Navbar