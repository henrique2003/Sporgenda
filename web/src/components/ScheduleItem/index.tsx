import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

interface Props {
  schedule: {
    _id: string
    month: string
    day: number
    time: string
    title: string
  }
  link: boolean
}

const ScheduleItem: React.FC<Props> = ({ schedule, link }) => {
  const { month, _id, day, time, title } = schedule

  return (
    <div className="schedule">
      <div className="content">
        <div className="card_header">
          <div className="green_point"></div><h4>{month}</h4>
        </div>
        <p>{title}</p>
        <section>
          <span>Dia: {day <= 10 ? `0${day}` : day}</span>
          <span>Horário: {time}</span>
        </section>
        {link ? <Link to={`/mais/${_id}`}>Saiba mais...</Link> : ''}
      </div>
    </div>
  )
}

export default ScheduleItem
