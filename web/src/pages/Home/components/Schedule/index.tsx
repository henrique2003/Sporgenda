import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import ScheduleItem from '../../../../components/ScheduleItem'
import './style.css'

interface Schedules {
  _id: string
  users: string[]
  month: string
  day: number
  time: string
  title: string
}

const Schedule: React.FC = () => {
  const [Schedules, setSchedules] = useState<Schedules[]>([])
  const [Error, setError] = useState<boolean>(false)
  const [Loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function loadSchedules (): Promise<void> {
      try {
        setError(false)
        setLoading(true)
        const res = await api.get('/agenda')

        setLoading(false)
        setSchedules(res.data)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }

    loadSchedules()
  }, [])

  return (
    <div className="wrapper_schedules">
      <div className="wrapper_title">
        <h3>Agenda</h3>
      </div>
      {Error ? <p className="alert">Não há nenhum horário no momento!</p> : ''}
      {Loading ? <p className="alert">Carregando...</p> : ''}
      <div className="row">
        {Schedules.map(schedule => (
          <ScheduleItem key={schedule._id} schedule={schedule} link={true} />
        ))}
      </div>
    </div>
  )
}

export default Schedule
