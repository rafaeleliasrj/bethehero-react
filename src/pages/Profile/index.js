import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const ong = JSON.parse(localStorage.getItem('ong'));
    const token = localStorage.getItem('token');

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }
    function handleRemove(id) {
        try {
            api.delete(`incidents/${id}`, {
                headers: {
                    ong_id: ong.id
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert(`Ops...Algo deu errado: ${error}`)
        }
    }
    useEffect(() => {
        api.get('incidents', {
            headers: {
                ong_id: ong.id
            }
        }).then(
            response => {
                setIncidents(response.data)
            }
        )
    }, [token, ong.id])
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ong.name}</span>
                <Link to="/incident/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleRemove(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}