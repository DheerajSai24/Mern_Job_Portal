# Job Portal - Full Stack Application

A modern, responsive job portal application built with React and Vite. This application allows job seekers to browse, search, filter, and apply for jobs while providing a seamless user experience.

## 🚀 Features

### Job Seeker Features
- **Job Search & Filtering**: Search jobs by role, company, or location
- **Category Filtering**: Filter jobs by categories (Programming, Data Science, Designing, Networking, Management, Marketing, Cybersecurity)
- **Location Filtering**: Filter jobs by multiple locations
- **Pagination**: Browse jobs with pagination (9 jobs per page)
- **Job Details**: View detailed job descriptions with company information
- **Application Management**: Track all applied jobs with status (Pending, Accepted, Rejected)
- **User Authentication**: Secure login/logout using Clerk authentication
- **Responsive Design**: Fully responsive design for all devices

### UI Components
- **Hero Section**: Eye-catching hero section with search functionality
- **Trusted By Section**: Display trusted company logos
- **Sidebar Filters**: Easy-to-use sidebar with category and location filters
- **Download Section**: App download links for Play Store and App Store
- **Footer**: Social media links and copyright information

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.9.1
- **Authentication**: Clerk (@clerk/clerk-react 4.30.0)
- **Styling**: CSS3 with modern design patterns
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DheerajSai24/Full-Stack-Job-Portal.git
   cd Full-Stack-Job-Portal/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `client` directory and add your Clerk publishable key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── assets.js          # All asset imports and sample data
│   │   ├── *.png, *.svg       # Images and icons
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar component
│   │   ├── Navbar.css
│   │   ├── DownloadSection.jsx # Download section component
│   │   ├── DownloadSection.css
│   │   ├── Footer.jsx         # Footer component
│   │   └── Footer.css
│   ├── context/
│   │   └── AppContext.jsx     # Global state management
│   ├── pages/
│   │   ├── Home.jsx           # Home page with job listings
│   │   ├── Home.css
│   │   ├── ApplyJobs.jsx      # Job application page
│   │   ├── ApplyJobs.css
│   │   ├── Applications.jsx   # User applications page
│   │   └── Applications.css
│   ├── App.jsx                # Main app component with routes
│   ├── App.css
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Features Explained

### 1. Job Search & Filtering
- Real-time search across job titles, company names, and locations
- Multi-select category filtering
- Multi-select location filtering
- Combined filter results

### 2. Pagination
- Displays 9 jobs per page
- Numbered pagination buttons
- Automatic reset to page 1 when filters change

### 3. Job Application Flow
- View detailed job information
- Apply with personal details and resume
- Track application status
- View all applications in one place

### 4. Authentication
- Secure user authentication using Clerk
- Login/logout functionality
- User profile information display

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔐 Environment Variables

Make sure to set up your `.env` file with:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Get your Clerk publishable key from [Clerk Dashboard](https://dashboard.clerk.com/)

## 📄 Sample Data

The application uses sample data from `src/assets/assets.js` including:
- 23+ sample jobs across various categories
- Job categories and locations
- Sample applications data
- Company logos and assets

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth transitions and hover effects
- Clean and intuitive UI
- Professional color scheme
- Accessible design patterns

## 👨‍💻 Author

**Dheeraj**

- GitHub: [@DheerajSai24](https://github.com/DheerajSai24)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🙏 Acknowledgments

- Clerk for authentication services
- React team for the amazing framework
- Vite for the fast build tool
- All the open-source contributors

---

Made with ❤️ by Dheeraj
