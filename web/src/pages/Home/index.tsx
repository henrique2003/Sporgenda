import React from 'react'
import Introduction from './components/introduction'
import Schedule from './components/Schedule'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import './style.css'

const Home: React.FC = () => {
  return (
    <div className="wrapper_home">
      <div className="container">
        <div className="arrow_login">
          <Link to="login">
            <BsArrowLeftShort />
          </Link>
        </div>
        <Introduction />
        <Schedule />
      </div>
    </div>
  )
}

export default Home
