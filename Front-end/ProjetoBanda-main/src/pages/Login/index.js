import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import loginAcess from '../../utils/loginAcess';
import fundoLogin from './fundo-login.png'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    if (data.email === loginAcess.email && data.password === loginAcess.password) {
      navigate('./Inicio');
    } else {
      alert('E-mail ou senha incorreta')
    }
  }
  return (
    <>
      <main>
        <div className={styles.container}>
          <form className={styles.formLogin} onSubmit={handleSubmit}>
            <div className={styles.gridLogin}><img src={fundoLogin}/></div>
            <div className={styles.infoLogin}>
              <h1>Login</h1>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
              /><br />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={event => setPassword(event.target.value)}
              /><br />
              <button ><Link type="submit" onClick={handleSubmit}>Entrar</Link></button>
              <p>Não tem cadastro? <Link to={'/cadastroWho'}>Clique aqui</Link></p>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
