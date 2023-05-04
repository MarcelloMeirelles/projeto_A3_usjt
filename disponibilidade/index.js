const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.json())

const disponibilidade = {};

app.get('/disponibilidade', async(req,res)=>{
    res.send('disponibilidade')
})

app.post('/disponibilidade', (req, res) => {
    const data = req.body.data
    const alocacao = base[req.body.codigoLocal]["alocacoes"].find((a) => a.data === data)
    const qtdeBandas = alocacao["bandas"].length
    if (qtdeBandas < 5){
        //cadastrar
        res.status(200).json({msg: "cadastrado"})
    }
    else
        res.status(200).json({msg: "Local lotado, tente outra data"})
})


const base = {
    1: {
        nome: 'bar do ze',
        alocacoes: [
            {
                data: "04/05",
                bandas: [{codigo: 1, nome: 'banda1'}]
            },
            {
                data: "05/05",
                bandas: [{codigo: 1, nome: 'banda1'}, {codigo: 2, nome: 'banda2'},{codigo: 3, nome:'banda3'}, {codigo:4, nome:'banda4'},{codigo:5, nome:"banda5"}]
            }
        ]   
    }
}