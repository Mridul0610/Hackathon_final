import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      {/* ======= Footer ======= */}
  <footer id="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 footer-info" style={{marginLeft:'100px'}}>
            <img src="/assets/img/logo.png" alt="TheEvenet" />
            <p>
            O7 Solutions is an ISO 9001:2015 certified organization blessed with talented IT Professionals including Programmers, Designers, SEO/ SMM Executives, Server Administrators and Content Writers with prior experience in renowned companies like HCL, IBM, TCS and Jetking.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right" /> <Link to={"https://www.o7solutions.in/"}>Home</Link>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <Link to={"/about"}>About us</Link>
              </li>

            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
            2nd Floor, Badwal Complex, Emmjay Hotel Street Near Narinder Cinema back side wimpy building, <br/>
            Jalandhar, Punjab 144001 <br />
              <br />
            </p>
            <div className="social-links">
              <a href="#" className="twitter">
                <i className="bi bi-twitter" />
              </a>
              <a href="#" className="facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" className="instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" className="google-plus">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" className="linkedin">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright <strong></strong>. All Rights Reserved
      </div>
      <div className="credits">
        {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> */}
      </div>
    </div>
  </footer>
  {/* End  Footer */}
  <a
    href="#"
    className="back-to-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
    </>
  )
}

export default Footer