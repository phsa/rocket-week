import React, { useState } from 'react';

import './Login.css';

import logo from '../vectors/tindev_logo.svg';

import API from '../services/API';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await API.post('/developers', { username });

        const { _id } = response.data;

        history.push(`/developer/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input 
                    placeholder="Digite o seu usuário no Github"
                    value={username}
                    onChange={event => setUsername(event.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}