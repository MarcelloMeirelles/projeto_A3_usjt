import { Link } from 'react-router-dom'
import styles from './Cadastro.module.css'
import Banda from './banda.png'
export default function CadastroBanda() {
    return (
        <>
            <main>
            <Link className={styles.voltar} to={'/CadastroWho'}>←</Link>
                <div className={styles.container}>
                    <div className={styles.flexCadastro}>
                        <div className={styles.imgBanda}>
                            <img src={Banda} />
                        </div>
                        <form className={styles.formCadastro}>
                            <h1>Cadastro Banda</h1>
                            <input type='email' placeholder='E-mail:' /><br />
                            <input type='password' placeholder='Senha:' /><br />
                            <input type='text' placeholder='Nome da banda: ' /><br />
                            <input type='text' placeholder='Genero: ' /><br />
                            <input type='text' placeholder='Quantos membros?' /><br />
                            <button>Cadastrar</button>
                        </form>
                    </div>

                </div>
            </main>
        </>
    )
}