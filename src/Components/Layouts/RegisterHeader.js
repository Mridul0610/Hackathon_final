import React from 'react'
import { Link } from 'react-router-dom'


function RegisterHeader() {

      return (
        <>
         {/* ======= Header ======= */}
      <header id="header" className="d-flex align-items-center " style={{backgroundColor: 'transparent',color:'white'}}>
        <div className="container-fluid container-xxl d-flex align-items-center justify-content-end">
          {/* <div id="logo" className="me-auto">
            <a href="https://www.o7solutions.in/" className="scrollto">
              <img src="/assets/img/logo.png" alt="" title="" />
            </a>
          </div> */}
          <nav id="navbar" className="navbar order-last order-lg-0">
            Don't Have a account?
            
              <div style={{float:'right'}}>
                <Link to={"/login-admin/register"}>
                <a className="nav-link scrollto" style={{border:'2px solid white',color:'white' }}>
                  Register Here
                </a>
                </Link>
              </div>
        
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>
        </div>
      </header>
      {/* End Header */}
        </>
      )
    }
    


export default RegisterHeader