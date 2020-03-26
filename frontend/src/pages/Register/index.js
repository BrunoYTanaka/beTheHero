import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import logo from '../../assets/logo.svg'

function Register() {
  const history = useHistory()
  const [values, setValues] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    uf: '',
  })

  const handleRegister = async e => {
    e.preventDefault()

    try {
      const response = await api.post('/ongs', values)
      alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/')
    } catch (error) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  const handleChange = (e, name) => {
    setValues({
      ...values,
      [name]: e.target.value,
    })
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the Hero" />
          <h1> Cadastro </h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={values.name}
            onChange={e => handleChange(e, 'name')}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={values.email}
            onChange={e => handleChange(e, 'email')}
          />
          <input
            placeholder="Whatsapp"
            value={values.whatsapp}
            onChange={e => handleChange(e, 'whatsapp')}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={values.city}
              onChange={e => handleChange(e, 'city')}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={values.uf}
              onChange={e => handleChange(e, 'uf')}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
