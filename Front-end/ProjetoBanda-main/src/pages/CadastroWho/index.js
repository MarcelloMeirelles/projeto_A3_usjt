import { Link } from 'react-router-dom'
import styles from './CadastroWho.module.css'

export default function CadastroWho() {
    return (
        <>
            <main>
            <Link className={styles.voltar} to={'/'}>←</Link>
                <div className={styles.container}>
                    <div className={styles.background}>
                        <h1> Você é o que? ...</h1>
                        <div className={styles.escolha}>
                            <button>
                                <Link to={'/CadastroEspectador'}>Espectador</Link>
                            </button><br />
                            <button>
                                <Link to={'/CadastroBanda'}>Banda</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}