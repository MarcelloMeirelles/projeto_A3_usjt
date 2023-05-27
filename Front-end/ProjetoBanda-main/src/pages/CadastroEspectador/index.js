import { Link } from 'react-router-dom'
import styles from './Cadastro.module.css'
import Banda from './banda.png'

export default function CadastroEspectador(){
    return(
        <>
            <main>
                <Link className={styles.voltar} to={'/CadastroWho'}>←</Link>
                <div className={styles.container}>
                    <div className={styles.flexCadastro}>
                        <div className={styles.imgBanda}>
                            <img src={Banda} />
                        </div>
                    <form className={styles.formCadastro}>
                        <h1>Cadastro Espectador</h1>
                        <input type='email' placeholder='Digite seu e-mail:'/><br />
                        <input type='password' placeholder='Digite sua senha:'/><br />
                        <input type='text' placeholder='Idade:'/><br />
                        <input type='text' placeholder='CPF:'/><br />
                        <input type='password' placeholder='Senha:'/><br />
                        <input type='text' placeholder='Telefone:'/><br />
                        <button>Cadastrar</button>
                    </form>
                    </div>
                </div>
            </main>
        </>
    )
}