import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import logo from '../../assets/logo.svg'

function NewIncident() {
  const history = useHistory()
  const ongId = localStorage.getItem('ongId')
  const [values, setValues] = useState({
    title: '',
    description: '',
    value: '',
  })

  const handleChange = (e, name) => {
    return setValues({
      ...values,
      [name]: e.target.value,
    })
  }

  const handleNewIncident = async e => {
    e.preventDefault()

    try {
      await api.post('/incidents', values, {
        headers: {
          Authorization: ongId,
        },
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro no cadastro do caso, tente novamente')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the Hero" />
          <h1> Cadastrar novo caso </h1>
          <p>
            Descreva o caso detalhadamente para encontar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            onChange={e => handleChange(e, 'title')}
            placeholder="Título do caso"
            value={values.title}
          />
          <textarea
            onChange={e => handleChange(e, 'description')}
            placeholder="Descrição"
            value={values.description}
          />
          <input
            onChange={e => handleChange(e, 'value')}
            placeholder="Valor em reais"
            value={values.value}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident
