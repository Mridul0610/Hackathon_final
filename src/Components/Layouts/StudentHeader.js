import React from 'react'
import { Link } from 'react-router-dom'

function StudentHeader() {
  const handleLogout=()=>{
    sessionStorage.clear()
  }
  return (
    <>
     {/* ======= Header ======= */}
  <header id="header" className="d-flex align-items-center " style={{backgroundColor:"rgb(237,237,237)",background:"linear-gradient(90deg, rgba(237,237,237,1) 0%, rgba(184,189,209,0.98) 61%)"}}>
    <div className="container-fluid container-xxl d-flex align-items-center">
      <div id="logo" className="me-auto">
        {/* Uncomment below if you prefer to use a text logo */}
        {/* <h1><a href="index.html">The<span>Event</span></a></h1>*/}
        <a href="https://www.o7solutions.in/" className="scrollto">
          <img src="/assets/img/logo.png" alt="" title="" />
        </a>
      </div>
      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <li>
            <Link to={"/student/"}>
            <a className="nav-link scrollto active">
              Home
            </a></Link>
          </li>
          <li class="dropdown"><a><span>Events</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
            <li><a href="/student/event">Apply to Event</a></li>
            <li><a href="/student/EveHistory">Assigned Events</a></li>
            {/* <li><a href="/Result">Result</a></li> */}
            </ul>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>
      {/* .navbar */}

      <Link to={"/login-admin"}>
      <a onClick={handleLogout} className="buy-tickets scrollto">
        Logout
      </a>
      </Link>
    </div>
  </header>
  {/* End Header */}
    </>
  )
}

export default StudentHeader