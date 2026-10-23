import { useState } from 'react'
import './App.css'
import { UserRound, Wrench } from "lucide-react";

const complaints = [
  { id: '#1001', date: '15 Oct 2026', location: 'Room A101', asset: 'Flush', priority: 'High', status: 'In Progress' },
  { id: '#1002', date: '16 Oct 2026', location: 'Room B201', asset: 'Fan', priority: 'Medium', status: 'Pending' },
  { id: '#1003', date: '18 Oct 2026', location: 'Washroom C1', asset: 'Light', priority: 'Low', status: 'Resolved' },
  { id: '#1004', date: '20 Oct 2026', location: 'Corridor A2', asset: 'Fan', priority: 'Medium', status: 'Assigned' },
]

const stats = [
  { label: 'Total Complaints', value: 3, icon: 'ⓘ', type: 'total' },
  { label: 'In Progress', value: 1, icon: '◷', type: 'progress' },
  { label: 'Resolved', value: 1, icon: '✓', type: 'resolved' },
  { label: 'Pending', value: 1, icon: '▤', type: 'pending' },
]


function MyComplaintsPage({ complaints, onSelectComplaint }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesFilter =
      filter === 'All' ||
      complaint.status.toLowerCase() === filter.toLowerCase()

    const matchesSearch = [
      complaint.id,
      complaint.date,
      complaint.location,
      complaint.asset,
      complaint.priority,
      complaint.status,
    ].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )

    return matchesFilter && matchesSearch
  })

  return (
    <section className="my-complaints-page">
      <h1>My Complaints</h1>

      <div className="complaints-toolbar">
        <div className="complaint-filters">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((item) => (
            <button
              key={item}
              className={`filter-button ${filter === item ? 'selected' : ''}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <input
          className="complaint-search"
          type="search"
          placeholder="⌕  Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="my-complaints-table-wrap">
        <table className="my-complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Location</th>
              <th>Asset</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr
  key={complaint.id}
  onClick={() => onSelectComplaint(complaint)}
  className="clickable-complaint-row"
>
                <td>{complaint.id}</td>
                <td>{complaint.date}</td>
                <td>{complaint.location}</td>
                <td>{complaint.asset}</td>
                <td>
                  <span className={`my-priority priority-${complaint.priority.toLowerCase()}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td>
                  <span className={`my-status status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                    {complaint.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredComplaints.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-complaints">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}


function ComplaintDetailsPage({ complaint, onBack }) {
  if (!complaint) {
    return (
      <section className="complaints-panel">
        <button onClick={onBack}>← Back to My Complaints</button>
        <p>Complaint not found.</p>
      </section>
    )
  }

  const timeline = [
    { status: 'Pending', time: '09:00 AM', actor: 'System' },
    { status: 'Assigned', time: '10:00 AM', actor: 'Warden' },
    { status: 'In Progress', time: '11:00 AM', actor: 'Technician' },
    ...(complaint.status === 'Resolved'
      ? [{ status: 'Resolved', time: '12:00 PM', actor: 'Technician' }]
      : []),
  ]

  return (
    <section className="complaint-details-page">
      <button className="back-to-complaints" onClick={onBack}>
        ← Back to My Complaints
      </button>

      <div className="complaint-details-layout">
        <div className="complaint-details-main">
          <span className="detail-id">{complaint.id}</span>
          <h2>{complaint.asset} not working</h2>

          <span className={`my-priority priority-${complaint.priority.toLowerCase()}`}>
            {complaint.priority}
          </span>

          <div className="complaint-metadata">
            <span>◷ &nbsp; {complaint.date}</span>
            <span>⌖ &nbsp; {complaint.location}</span>
            <span>⚒ &nbsp; {complaint.asset} System</span>
          </div>

          <h3>Description</h3>
          <p className="detail-description">
            {complaint.description || `The ${complaint.asset.toLowerCase()} is not working properly. Please inspect and fix it as soon as possible.`}
          </p>

          <div className="technician-card">
            <strong>Technician Details</strong>
            <p>👤 &nbsp; Suresh Kumar</p>
            <span>Electrical · +91 9200000001</span>
          </div>
        </div>

        <aside className="complaint-timeline">
          <h3>Status Timeline</h3>

          {timeline.map((item, index) => (
            <div className="timeline-item" key={item.status}>
              <span className="timeline-dot" />
              <div>
                <strong>{item.status}</strong>
                <p>{complaint.date}, {item.time}</p>
                <small>(by {item.actor})</small>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}


function LandingPage({ onLogin }) {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <a className="landing-brand" href="#home">
          <span className="landing-brand-icon">
            <Wrench size={25} strokeWidth={2.4} />
          </span>
          <span>HostelFix</span>
        </a>

        <nav className="landing-links">
          <a className="landing-active" href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="landing-login" onClick={onLogin}>
          Login
        </button>
      </header>

      <main className="landing-hero" id="home">
        <div className="landing-corner-top" />
        <div className="landing-corner-bottom" />
        <div className="landing-cloud" />

        <section className="landing-copy">
          <h1>Your hostel.<br />Better maintained.</h1>

          <p>
            Report maintenance issues, track<br className="desktop-break" />
            progress and keep your hostel<br className="desktop-break" />
            comfortable, safe and clean — all in<br className="desktop-break" />
            one place.
          </p>

          <button className="landing-report" onClick={onLogin}>
            Report an Issue →
          </button>
        </section>

        <img
          src="/hostel-illustration.png"
          alt="Illustration of a hostel building"
          className="landing-hostel"
        />
      </main>
    </div>
  )
}

function StudentLoginPage({ onLogin }) {
  const [rememberMe, setRememberMe] = useState(true)

  return (
    <div className="login-page">
      <div className="login-corner login-corner-left" />
      <div className="login-corner login-corner-right" />
      <div className="login-corner login-corner-bottom" />

      <form
        className="login-card"
        onSubmit={(e) => {
          e.preventDefault()
          onLogin()
        }}
      >
        <button
          type="button"
          className="login-back"
          onClick={() => onLogin()}
          aria-label="Back"
        >
          ←
        </button>

        <div className="login-brand">
          <span className="login-brand-icon">
            <Wrench size={27} strokeWidth={2.5} />
          </span>
          <span>HostelFix</span>
        </div>

        <h2>Student Login</h2>

        <label className="login-input">
          <UserRound size={15} />
          <input required placeholder="Student ID / Registration Number" />
        </label>

        <label className="login-input">
          <span>✉</span>
          <input required type="email" placeholder="Email" />
        </label>

        <label className="login-input">
          <span>♙</span>
          <input required type="password" placeholder="Password" />
        </label>

        <div className="login-options">
          <label className="remember-option">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button type="button" className="forgot-password">
            Forgot password?
          </button>
        </div>

        <button type="submit" className="login-submit">
          Login
        </button>

        <p className="login-footer">
          Don't have an account? <a href="#contact-warden">Contact your warden</a>
        </p>
      </form>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLanding, setShowLanding] = useState(true)
  return (
  <>
    
{showLanding ? (
  <LandingPage onLogin={() => setShowLanding(false)} />
) : !isLoggedIn ? (
  <StudentLoginPage onLogin={() => setIsLoggedIn(true)} />
) : (

      <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">
<Wrench size={24} strokeWidth={2.2} />
</span>
          <span>HostelFix</span>
        </div>

        
<nav className="navigation">
  {['Dashboard', 'New Complaint', 'My Complaints'].map((page) => (
    <button
      key={page}
      className={`nav-item ${currentPage === page ? 'active' : ''}`}
      onClick={() => setCurrentPage(page)}
    >
      <span>
        {page === 'Dashboard' ? '▦' : page === 'New Complaint' ? '⊕' : '▤'}
      </span>
      {page}
    </button>
  ))}

  <button className="nav-item">
    <span><UserRound size={22} strokeWidth={1.8} /></span>
    Profile
  </button>

  <button className="nav-item">
    <span>⇥</span>
    Logout
  </button>
</nav>
      </aside>

      <main className="dashboard">
        
{currentPage === 'Complaint Details' ? (
  <ComplaintDetailsPage
    complaint={selectedComplaint}
    onBack={() => setCurrentPage('My Complaints')}
  />
) : currentPage === 'New Complaint' ? (
  <div className="complaints-panel">
    <div className="panel-header">
      <h2>Submit a New Complaint</h2>
    </div>


<form className="complaint-form" onSubmit={(e) => {
  e.preventDefault()
  alert('Complaint submitted! Database connection will be added later.')
}}>
  <div className="complaint-fields-row">
    <label>
      Hostel *
      <select required defaultValue="">
        <option value="" disabled>Select Hostel</option>
        <option>Block A</option>
        <option>Block B</option>
        <option>Block C</option>
      </select>
    </label>

    <label>
      Location *
      <select required defaultValue="">
        <option value="" disabled>Select Location</option>
        <option>Room A101</option>
        <option>Room A102</option>
        <option>Washroom A</option>
        <option>Corridor A</option>
      </select>
    </label>

    <label>
      Asset *
      <select required defaultValue="">
        <option value="" disabled>Select Asset</option>
        <option>Fan</option>
        <option>Light</option>
        <option>Flush</option>
        <option>Tap</option>
        <option>Other</option>
      </select>
    </label>
  </div>

  <label>
    Description
    <textarea required rows="7" placeholder="Describe the issue in detail..." />
  </label>

  <div className="priority-guide">
    <strong>ⓘ &nbsp; Priority Guide</strong>
    <p>High – Affects health, safety or essential facilities</p>
    <p>Medium – Causes inconvenience</p>
    <p>Low – Minor issue / cosmetic</p>
  </div>

  <div className="complaint-submit-row">
    <button type="submit" className="complaint-submit">
      Submit
    </button>
  </div>
</form>
  </div>

) : currentPage === 'My Complaints' ? (
  <MyComplaintsPage
  complaints={complaints}
  onSelectComplaint={(complaint) => {
    setSelectedComplaint(complaint)
    setCurrentPage('Complaint Details')
  }}
/>
) : (
  <>
        <header className="page-header">
          <div>
            <h1>Welcome, Niveditha!</h1>
            <p>Hostel Block A · Reg No: 25BCB0025</p>
          </div>
          <button className="profile-button" aria-label="Profile">
<UserRound size={22} strokeWidth={1.8} />
</button>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article className={`stat-card ${stat.type}`} key={stat.type}>
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="complaints-panel">
          <div className="panel-header">
            <h2>Recent Complaints</h2>
            <button className="view-all">View All →</button>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Asset</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
  key={complaint.id}
  onClick={() => {
    setSelectedComplaint(complaint)
    setCurrentPage('Complaint Details')
  }}
  className="clickable-complaint-row"
>
                    <td>{complaint.id}</td>
                    <td>{complaint.date}</td>
                    <td>{complaint.location}</td>
                    <td>{complaint.asset}</td>
                    <td>
                      <span className={`pill priority-${complaint.priority.toLowerCase()}`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`pill status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                        {complaint.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
          </>
)}
      </main>
          </div>
    )}
  </>
  )
}

export default App
