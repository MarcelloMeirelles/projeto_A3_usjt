import Banner from '../../components/Banner'
import Titulo from '../../components/Titulo'
import Rodape from '../../components/Rodape'
import Card from '../../components/Card'
import styles from './Inicio.module.css';
import { useEffect, useState } from "react";

export default function Home() {
    const [videos, setVideos] = useState([])
    
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/juliamxl/cinetag-api/videos')
            .then(resposta => resposta.json())
            .then(dados => {
                setVideos(dados)
            })
    
    },[])
    return(
        <>
            <Banner imagem="home" />
            <Titulo>
                <h1>Um lugar para guardar seus vídeos e filmes!</h1>
            </Titulo>
            <section className={styles.container}>
                {videos.map((video) => {
                    return <Card {...video} key={video.id} />
                })}
            </section>
            <Rodape />
        </>
    )
}