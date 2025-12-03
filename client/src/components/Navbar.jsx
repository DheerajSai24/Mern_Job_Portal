import React from 'react'
import {assets} from '../assets/assets'
import './Navbar.css'
import { useClerk, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const clerk = useClerk()
  const { isSignedIn, user } = useUser()

  const handleLogin = () => {
    clerk.openSignIn()
  }

  const handleLogout = () => {
    clerk.signOut()
  }

  return (
    <div className='navbar-container'>
      <div className='logo'>
        <img src={assets.logo} alt="logo" />
      </div>
      <div className='btns'>
        <button className="recruiter-btn">Recruiter Login</button>
        
        {!isSignedIn ? (
          <button className="login-btn" onClick={handleLogin}>Login</button>
        ) : (
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>Welcome, {user?.firstName || 'User'}!</span>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
