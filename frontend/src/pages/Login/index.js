import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import heroes from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import api from '../../services/api'

function Login() {
  const history = useHistory()
  const [id, setId] = useState('')
  const handleChange = e => setId(e.target.value)
  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await api.post('/sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.ong.name)
      history.push('/profile')
    } catch (error) {
      alert('Erro ao logar')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input placeholder="Sua ID" value={id} onChange={handleChange} />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroes} alt="heroes" />
    </div>
  )
}

export default Login
