import React, { useState } from 'react';
import Banda from '../../assets/banda.png';
import loginAcess from '../../utils/loginAcess';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    if (data.email === loginAcess.email && data.password === loginAcess.password) {
      alert(`Access Released ` + data.email);
    } else {
      alert("Access Denied, Sign Up")
    }
  }
  return (
    <div className="logon-container" >
      <div className='banda'>
        <img src={Banda} />
      </div>
      <section className="form">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail: "
            className="inputLogin"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="inputLogin"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
          <div className='footer'>
<<<<<<< HEAD
            <Link className="button" type="submit" to="/home">Entrar</Link>
=======
            <Link className="button" type="submit" to="/cadastro">Entrar</Link>
>>>>>>> 91ebc067f9da09038192060da1a229c17135d9ee
          </div>
            <a href="/" className="ultimo">Não tem cadastro? Cadastrar</a>
        </form>

      </section>
    </div >
  );
}