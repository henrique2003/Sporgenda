import React, { useEffect, useState, FormEvent } from 'react'
import BackArrow from '../../components/BackArrow'
import LineInformation from './components/LineInformation/index'
import './style.css'
import api from '../../services/api'

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

interface Schedule {
  _id: string
  title: string
  location: string
  month: string
  day: number
  time: string
  users: string[]
}

const More: React.FC<Props> = ({ match }) => {
  const [Input, setInput] = useState<string>('')
  const [Alert, setAlert] = useState<string>('')
  const [Schedule, setSchedule] = useState<Schedule>({
    _id: '123m23jmj123',
    title: 'Lotem ipsum',
    location: 'Parque são judas',
    month: 'Janero',
    day: 1,
    time: '16:30',
    users: []
  })
  const { _id, title, time, users, month, day, location } = Schedule

  useEffect(() => {
    async function loadSchedule (): Promise<void> {
      try {
        const res = await api.get(`agenda/${match.params.id}`)
        setSchedule(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    loadSchedule()
  }, [match.params.id])

  const onSubmit = async (e: FormEvent): Promise<void | boolean> => {
    try {
      e.preventDefault()

      if (Input.length === 0) {
        return false
      }

      const names = Input.split(' ')

      if (names.length < 2) {
        return false
      }

      const res = await api.put(`/agenda/${_id}`, { name: Input })

      setSchedule(res.data)
      setAlert('Entrou com sucesso!')
      setInput('')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="wrapper_more">
      <BackArrow to="/" text="Voltar para o início" />
      <div className="wrapper_more_card">
        <div className="wrapper_more_header">
          <h3>{title}</h3>
        </div>
        <div className="wrapper_more_body">
          <div className="wraper_information">
            <LineInformation text={`Mês: ${month}`} />
            <LineInformation text={`Dia: ${day <= 10 ? `0${day}` : day}`} />
            <LineInformation text={`Local: ${location}`} />
            <LineInformation text={`Horário: ${time}`} />
            <LineInformation text={`Pessoas confirmadas: ${users.length}`} />
          </div>
        </div>
        <form onSubmit={async (e) => await onSubmit(e)}>
          <div className="wrapper_more_form_header">
            <div></div><p>Nome completo:</p>
          </div>
          {<p className="alert_success">{Alert}</p>}
          <div className="wrapper_more_form_input">
            <input
              type="text"
              placeholder="Ex: Henrique de melo Cristioglu"
              value={Input}
              onChange={e => setInput(e.target.value)}
            /> <button type="submit">Participar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default More
