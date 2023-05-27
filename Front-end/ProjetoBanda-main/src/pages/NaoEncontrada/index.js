import styles from './NaoEncontrada.module.css'

function NaoEncontrada(){
    return(
        <section className={styles.container}>
            <h2>OPS!</h2>
            <p>O conteúdo que você procura não existe</p>
        </section>
    )
}
export default NaoEncontrada;