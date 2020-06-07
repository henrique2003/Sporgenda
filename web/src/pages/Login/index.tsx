import React, { useState, FormEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import BackArrow from '../../components/BackArrow'
import api from '../../services/api'
import './style.css'

const Login: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const [Name, setName] = useState<string>('')
  const [Password, setPassword] = useState<string>('')
  const [Error, setError] = useState<string>('')
  const [Loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (e: FormEvent): Promise<void | boolean> => {
    try {
      e.preventDefault()

      if (Name.length === 0 || Password.length === 0) {
        setError('Campo em branco!')
        return false
      }

      setLoading(true)
      const res = await api.post('/login', { name: Name, password: Password })

      localStorage.setItem('token', res.data.token)
      setLoading(false)
      history.push('/admin')
    } catch (error) {
      setLoading(false)
      setError('Usuário não encontrado')
      console.log(error.message)
    }
  }

  return (
    <div className="wrapper_login">
      <BackArrow text="Voltar para Home" to="/" />
      <form onSubmit={async e => await onSubmit(e)}>
        <header>
          <h5>Entrar</h5>
        </header>
        <section>
          <p className="error">{Error}</p>
          <input
            type="text"
            name="name"
            value={Name}
            placeholder="Nome"
            onChange={e => setName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={Password}
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">{Loading ? 'Procurando...' : 'Entrar'}</button>
        </section>
      </form>
    </div>
  )
}

export default withRouter(Login)
