import { Link } from "react-router-dom";
import logo from './logo.png';
import styles from './Cabecalho.module.css';
import CabecalhoLink from "components/CabecalhoLink";

function Cabecalho() {
    return (
        <header className={styles.cabecalho}>
            <Link to="./Inicio">
                <img src={logo} alt="Logo do cinetag"></img>
            </Link>
            <nav>
                <CabecalhoLink url="./Inicio">
                    Home
                </CabecalhoLink>
                <CabecalhoLink url="./Favoritos">
                    Favoritos
                </CabecalhoLink>
                <CabecalhoLink url="/">
                    Perfil
                </CabecalhoLink>
                <CabecalhoLink url="/">
                    Sair
                </CabecalhoLink>
            </nav>
        </header>
    )
}

export default Cabecalho;