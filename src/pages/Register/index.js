import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      whatsapp,
      city,
      uf
    }
    try {
      const response = await api.post('ongs', data)
      alert(`Seu ID é ${response.data.id}`);
      history.push('/');
    } catch (error) {
      alert(`Ops.. Algo deu errado: ${error}`)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoa a encontrar casos da sua ONG.</p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
              Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="email" placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input type="password" placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWatsapp(e.target.value)}
          />
          <div className="input-group">
            <input placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <select value={uf} onChange={e => setUf(e.target.value)} style={{ width: 100 }}>
              <option value="">-</option>
              <option value="RJ">RJ</option>
              <option value="SP">SP</option>
              <option value="MG">MG</option>
              <option value="ES">ES</option>
            </select>
          </div>
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
