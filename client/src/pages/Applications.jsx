import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { AppContext } from '../context/appContext'
import './Applications.css'

const Applications = () => {
  const { appliedJobs } = useContext(AppContext)

  return (
    <div className="applications-wrapper">
      <Navbar />
      <div className="applications-page">
        <header className="applications-header">
          <h1>Your applications</h1>
          <span>{appliedJobs.length} applications</span>
        </header>

        <div className="applications-list">
          {appliedJobs.map((app, index) => (
            <div key={index} className="application-card">
              <div className="application-main">
                <img src={app.logo} alt={app.company} />
                <div>
                  <h3>{app.title}</h3>
                  <p className="company">{app.company}</p>
                  <div className="meta">
                    <span>{app.location}</span>
                    <span>Applied on {app.date}</span>
                  </div>
                </div>
              </div>

              <div className="application-status">
                <span className={`status-badge status-${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Applications
