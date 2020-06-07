import React, { useState, SyntheticEvent, FormEvent, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import api from '../../services/api'
import { ScheduleItem, BackArrow } from '../../components'
import Sport from '../../assets/images/sport-2.png'
import FormInput from './components/FormInput'
import './style.css'

interface FormData {
  title: string
  location: string
  time: string
  day: number
  month: string
}
interface Schedules {
  _id: string
  users: string[]
  month: string
  day: number
  time: string
  title: string
}

const Admin: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [Schedules, setSchedules] = useState<Schedules[]>([])
  const [Alert, setAlert] = useState<boolean>(false)
  const [Loading, setLoading] = useState<boolean>(false)
  const [Error, setError] = useState<string>('')
  const [Searching, setSearching] = useState<boolean>(false)
  const [FormData, setFormData] = useState<FormData>({
    title: '',
    location: '',
    time: '',
    day: 0,
    month: ''
  })
  const { day, location, title, month, time } = FormData

  useEffect(() => {
    async function authUser (): Promise<void> {
      try {
        await api.get('/auth', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
      } catch (error) {
        history.push('/')
      }
    }
    authUser()

    async function loadSchedules (): Promise<void> {
      try {
        setLoading(true)
        const res = await api.get('/agenda')

        setLoading(false)
        setSchedules(res.data)
      } catch (error) {
        setLoading(false)
        return console.log(error.message)
      }
    }
    loadSchedules()
  }, [])

  const onChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement
    setFormData({ ...FormData, [target.name]: target.value })
  }

  const onSubmit = async (e: FormEvent): Promise<void> => {
    try {
      e.preventDefault()
      setError('')

      // Valid day
      if (day < 1 && day > 31) {
        return setError('Campo dia inválido')
      }

      if (title.length === 0 || location.length === 0 || time.length === 0 || month.length === 0) {
        return setError('Campo em Branco')
      }
      setSearching(true)

      const res = await api.post('/agenda', FormData, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      setSchedules([...Schedules, res.data])
      setSearching(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="wrapper_admin">
      <BackArrow text="Votar para o início" to="/"/>
      <div className="wrapper_admin_body">
        <article>
          <h3>Marcar uma data</h3>
        </article>
        <div className="row">
          <form onSubmit={async (e: FormEvent) => await onSubmit(e)}>
            <p className="error">{Error}</p>
            <FormInput
              name="title"
              placeholder="Ex: Corrida para jovens"
              title="Titulo:"
              type="text"
              value={title}
              onChange={(e: SyntheticEvent) => onChange(e)}
            />
            <FormInput
              name="location"
              placeholder="Ex: Quadra de corrida"
              title="Local:"
              type="text"
              value={location}
              onChange={(e: SyntheticEvent) => onChange(e)}
            />
            <div className="form_row">
              <FormInput
                name="time"
                placeholder="Ex: 15:20"
                title="Horário:"
                type="text"
                value={time}
                className="input_item"
                onChange={(e: SyntheticEvent) => onChange(e)}
              />
              <FormInput
                name="day"
                placeholder="Ex: 15"
                title="Dia:"
                type="number"
                value={day}
                className="input_item"
                onChange={(e: SyntheticEvent) => onChange(e)}
              />
              <FormInput
                name="month"
                placeholder="Ex: Março"
                title="Mês:"
                type="text"
                value={month}
                className="input_item"
                onChange={(e: SyntheticEvent) => onChange(e)}
              />
              <button type="submit">{Searching ? 'Criando...' : 'Criar'}</button>
            </div>
          </form>
          <section>
            <img src={Sport} alt=""/>
          </section>
        </div>
        <article>
          <h3>Agenda</h3>
        </article>
        {Alert ? <p className="alert">Não há nenhum horário no momento!</p> : ''}
        {Loading ? <p className="alert">Carregando...</p> : ''}
        <div className="schedules_row">
          {Schedules.map(schedule => (
            <ScheduleItem key={schedule._id} schedule={schedule} link={false} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Admin)
