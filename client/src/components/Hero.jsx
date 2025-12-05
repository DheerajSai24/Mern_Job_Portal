import React, { useState } from 'react'
import './Hero.css'
import { assets } from '../assets/assets'

const Hero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch({ query: searchQuery, location })
  }

  return (
    <div className='hero-section'>
      <div className='hero-content'>
        <h1 className='hero-title'>
          Find Your <span className='highlight'>Dream Job</span> Today
        </h1>
        <p className='hero-subtitle'>
          Thousands of jobs in computer, engineering, and technology sectors are waiting for you
        </p>
        
        <form className='search-container' onSubmit={handleSearch}>
          <div className='search-box'>
            <img src={assets.search_icon} alt="search" className='search-icon' />
            <input 
              type="text" 
              placeholder='Job title, keywords, or company'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
          </div>
          
          <div className='location-box'>
            <img src={assets.location_icon} alt="location" className='location-icon' />
            <input 
              type="text" 
              placeholder='City or location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='location-input'
            />
          </div>
          
          <button type='submit' className='search-btn'>
            Search Jobs
          </button>
        </form>

        <div className='stats-container'>
          <div className='stat-item'>
            <h3>10,000+</h3>
            <p>Jobs Available</p>
          </div>
          <div className='stat-item'>
            <h3>5,000+</h3>
            <p>Companies</p>
          </div>
          <div className='stat-item'>
            <h3>50,000+</h3>
            <p>Active Users</p>
          </div>
        </div>
      </div>
      
      <div className='hero-image'>
        <img src={assets.app_main_img} alt="Job Search" />
      </div>
    </div>
  )
}

export default Hero
