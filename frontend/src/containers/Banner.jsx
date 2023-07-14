import React from 'react'
import {Link} from 'react-router-dom'

const Banner = () => {
  return (
    <>
    <section>
      <div className='banner'>
          <div className="banner__box">
              <div className="banner__text">
                <h5>Join the best education platform and develop your skils</h5>
                <p>Learning that gets you skills for your present and your future</p>
                <div className="tide" style={{
                  marginTop:"10px"
                }}>
                    <Link to='/login' type="submit" className="new">
                      Get Started
                    </Link>
                  </div>
              </div>
              <div className="banner__image">
                  <img src={`${process.env.STATIC_MEDIAL}img5.7573fdfccdce115b27fc.jpg`} alt="banner" className='banner__img'/>
              </div>
          </div>
      </div>
    </section>
    <div className="banner_small">
      <div className="overlay">
      <div className="banner__text_sec">
              <h5>Join the best education platform and develop your skils</h5>
              <p>Learning that gets you skills for your present and your future</p>
              <div className="tide" style={{
                marginTop:"10px",display: 'flex',
              }}>
                  <Link to='/login' className="new">
                    Get Started
                  </Link>
                </div>
            </div>
      </div>
    </div>
    </>
  )
}

export default Banner