import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AppContext } from '../context/appContext'
import { assets } from '../assets/assets'
import './ApplyJobs.css'

const ApplyJobs = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getJobById, applyToJob } = useContext(AppContext)

  const job = getJobById(id)

  const handleApply = (e) => {
    e.preventDefault()
    applyToJob(id)
    navigate('/applications')
  }

  if (!job) {
    return (
      <div>
        <Navbar />
        <div className="apply-page">
          <p>Job not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="apply-wrapper">
      <Navbar />
      <div className="apply-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={assets.back_arrow_icon} alt="back" />
          Back
        </button>

        <div className="apply-layout">
          {/* Job Detail */}
          <section className="job-detail">
            <div className="job-detail-header">
              <img
                src={job.companyId?.image || assets.company_icon}
                alt={job.companyId?.name}
              />
              <div>
                <h1>{job.title}</h1>
                <p>{job.companyId?.name}</p>
                <div className="job-tags">
                  <span>{job.location}</span>
                  <span>{job.level}</span>
                  <span>{job.category}</span>
                </div>
              </div>
            </div>

            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </section>

          {/* Application form */}
          <section className="apply-form-card">
            <h2>Apply for this job</h2>
            <form onSubmit={handleApply} className="apply-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" required />
              </div>

              <div className="form-group">
                <label>Resume (link)</label>
                <input
                  type="url"
                  placeholder="Paste resume or portfolio link"
                  required
                />
              </div>

              <div className="form-group">
                <label>Short note</label>
                <textarea
                  rows="4"
                  placeholder="Tell us why you are a great fit"
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit application
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ApplyJobs
