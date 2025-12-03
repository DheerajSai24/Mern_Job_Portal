import React from 'react'
import { assets } from '../assets/assets'
import './DownloadSection.css'

const DownloadSection = () => {
  return (
    <section className="download-section">
      <div className="download-content">
        <h2>Download Our App</h2>
        <p>Get the best job opportunities right at your fingertips</p>
        <div className="download-buttons">
          <a href="#" className="download-btn">
            <img src={assets.play_store} alt="Google Play Store" />
          </a>
          <a href="#" className="download-btn">
            <img src={assets.app_store} alt="Apple App Store" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection

