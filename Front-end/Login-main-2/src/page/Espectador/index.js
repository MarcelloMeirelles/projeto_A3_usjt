import './styles.css';
import Cantor from '../../assets/cantor.png'
import { Link } from 'react-router-dom';

export default function Espectador() {
    return (
        <main className="container-espectador">
            <div className='container-cantor'>
                <div className='cantos'>
                    <Link to='/cadastro'>←</Link>
                    <img src={Cantor} />
                </div>
                <div className='cadastro'>
                    <h1>CADASTRO</h1>
                    <form>
                        <p>Nome Completo:</p><br />
                        <input type='text' />
                        <div className='form-flex'>
                            <div className='form-grid'>
                                <p>Idade:</p>
                                <input type='text' />
                            </div>
                            <div className='form-grid'>
                                <p>CPF:</p>
                                <input type='text' />
                            </div>
                        </div>
                        <p>E-mail:</p><br />
                        <input type='text' />
                        <div className='form-flex'>
                            <div className='form-grid'>
                                <p>Telefone:</p>
                                <input type='text' />
                            </div>
                            <div className='form-grid'>
                                <p>Senha:</p>
                                <input type='password' />
                            </div>
                        </div>
                        <div className='cadastrar'>
                            <button>CADASTRAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}