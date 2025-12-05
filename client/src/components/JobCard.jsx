import React from 'react'
import './JobCard.css'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  const handleApply = () => {
    navigate(`/apply-job/${job._id}`)
  }

  return (
    <div className='job-card' onClick={handleApply}>
      <div className='job-card-header'>
        <img 
          src={job.companyId.image || assets.company_icon} 
          alt={job.companyId.name} 
          className='company-logo'
        />
        <div className='company-info'>
          <h3 className='job-title'>{job.title}</h3>
          <p className='company-name'>{job.companyId.name}</p>
        </div>
      </div>

      <div className='job-details'>
        <div className='detail-item'>
          <img src={assets.location_icon} alt="location" />
          <span>{job.location}</span>
        </div>
        <div className='detail-item'>
          <img src={assets.suitcase_icon} alt="level" />
          <span>{job.level}</span>
        </div>
        <div className='detail-item'>
          <img src={assets.money_icon} alt="salary" />
          <span>${job.salary.toLocaleString()}/year</span>
        </div>
      </div>

      <div className='job-footer'>
        <span className='job-category'>{job.category}</span>
        <button className='apply-btn'>Apply Now</button>
      </div>
    </div>
  )
}

export default JobCard
