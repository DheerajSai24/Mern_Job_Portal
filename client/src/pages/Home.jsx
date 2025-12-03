import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import DownloadSection from '../components/DownloadSection'
import Footer from '../components/Footer'
import { AppContext } from '../context/appContext'
import { JobCategories, JobLocations, assets } from '../assets/assets'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const {
    filteredJobs,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    selectedLocations,
    toggleCategory,
    toggleLocation,
  } = useContext(AppContext)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedLocations])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const currentJobs = filteredJobs.slice(startIndex, startIndex + pageSize)

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find your dream job today</h1>
          <p>
            Discover thousands of opportunities tailored to your skills and
            aspirations. Apply in minutes and take the next step in your career.
          </p>

          <div className="search-bar">
            <img src={assets.search_icon} alt="search" />
            <input
              type="text"
              placeholder="Search by role, company or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <div className="hero-image">
          <img src={assets.app_main_img} alt="jobs" />
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="jobs-section">
        {/* Trusted by section */}
        <div className="trusted-by">
          <span>Trusted by</span>
          <div className="trusted-logos">
            <img src={assets.microsoft_logo} alt="Microsoft" />
            <img src={assets.walmart_logo} alt="Walmart" />
            <img src={assets.accenture_logo} alt="Accenture" />
            <img src={assets.samsung_logo} alt="Samsung" />
            <img src={assets.amazon_logo} alt="Amazon" />
            <img src={assets.adobe_logo} alt="Adobe" />
          </div>
        </div>

        <div className="jobs-content-wrapper">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3>Search by Categories</h3>
              <div className="checkbox-group">
                {JobCategories.map((category) => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Search by Location</h3>
              <div className="checkbox-group">
                {JobLocations.map((location) => (
                  <label key={location} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(location)}
                      onChange={() => toggleLocation(location)}
                    />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Jobs Grid */}
          <div className="jobs-main">
            <div className="jobs-header">
              <h2>Latest opportunities</h2>
              <span>{filteredJobs.length} jobs found</span>
            </div>

            <div className="jobs-grid">
          {currentJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <img
                  src={job.companyId?.image || assets.company_icon}
                  alt={job.companyId?.name}
                  className="company-logo"
                />
                <div>
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.companyId?.name}</p>
                </div>
              </div>

              <div className="job-meta">
                <span>{job.location}</span>
                <span>{job.level}</span>
                <span className="job-category">{job.category}</span>
              </div>

              <div className="job-footer">
                <div className="salary">
                  <img src={assets.money_icon} alt="salary" />
                  <span>${job.salary.toLocaleString()}</span>
                </div>
                <Link to={`/apply-job/${job._id}`} className="apply-link">
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  className={`page-btn ${
                    page === currentPage ? 'page-btn-active' : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            })}
          </div>
        )}
          </div>
        </div>
      </section>

      <DownloadSection />
      <Footer />
    </div>
  )
}

export default Home
