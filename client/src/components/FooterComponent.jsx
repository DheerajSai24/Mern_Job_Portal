import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <img src={assets.logo} alt="logo" className='footer-logo' />
          <p className='footer-desc'>
            Find your dream job with the best job portal platform. 
            Connecting talent with opportunity.
          </p>
          <div className='social-icons'>
            <a href='#'><img src={assets.facebook_icon} alt="facebook" /></a>
            <a href='#'><img src={assets.instagram_icon} alt="instagram" /></a>
            <a href='#'><img src={assets.twitter_icon} alt="twitter" /></a>
          </div>
        </div>

        <div className='footer-section'>
          <h4>For Job Seekers</h4>
          <ul>
            <li><a href='/'>Browse Jobs</a></li>
            <li><a href='/'>Browse Categories</a></li>
            <li><a href='/applications'>My Applications</a></li>
            <li><a href='/'>Saved Jobs</a></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h4>For Employers</h4>
          <ul>
            <li><a href='/'>Post a Job</a></li>
            <li><a href='/'>Browse Candidates</a></li>
            <li><a href='/'>Employer Dashboard</a></li>
            <li><a href='/'>Pricing</a></li>
          </ul>
        </div>

        <div className='footer-section'>
          <h4>Company</h4>
          <ul>
            <li><a href='/'>About Us</a></li>
            <li><a href='/'>Contact</a></li>
            <li><a href='/'>Privacy Policy</a></li>
            <li><a href='/'>Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; 2025 Job Portal. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
