import React from 'react'
import './style.css'

interface Props {
  text: string
}

const LineInformation: React.FC<Props> = ({ text }) => {
  return (
    <div className="wrapper_line_information">
      <div></div><p>{text}</p>
    </div>
  )
}

export default LineInformation
