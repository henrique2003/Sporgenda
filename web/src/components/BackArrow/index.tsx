import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import './style.css'

interface Props {
  to: string
  text: string
}

const BackArrow: React.FC<Props> = ({ to, text }) => {
  return (
    <Link to={to}>
      <BsArrowLeft /><span>{text}</span>
    </Link>
  )
}

export default BackArrow
