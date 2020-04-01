import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions/ong', { id, password });
            localStorage.setItem('ong', response.data.ong);
            localStorage.setItem('token', response.data.token)
            history.push('/profile');
        } catch (error) {
            alert(`Ops... Algo deu errado: ${error.message}`);
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}