import React from 'react'
import About from '../About'
import Header from '../Layouts/Header'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const isAdminLoggedIn = sessionStorage.getItem('_id') !== null;
  if (!isAdminLoggedIn) {
    toast.error('user not authenticated')
    return <Navigate to='login-admin'/>
  }
  return (
    <>
    {/* <Header/> */}
      <section id="hero">
    <div className="hero-container" data-aos="zoom-in" data-aos-delay={100}>
      <h1 className="mb-4 pb-0">
        The Annual
        <br />
        Coding Competition
      </h1>
      {/* <p className="mb-4 pb-0">
        10-12 December, Downtown Conference Center, New York
      </p> */}
      {/* <a
        href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
        className="glightbox play-btn mb-4"
      /> */}

    </div>
  </section>
  {/* End Hero Section */}
  <main id="main"></main>
  <About/>
    </>
  )
}

export default Home