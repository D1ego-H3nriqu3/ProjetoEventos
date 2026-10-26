import express from "express"

const router = express()
const port = 1331

let eventos = []

router.use(express.json())

router.get("/eventos", (req, res) => {
    if(eventos.length === 0){
        res.status(404).send("Não há nenhum evento para se mostrar!")
    }else{
        res.send(eventos)
    }
})

router.get("/eventos/:id", (req, res) => {
    let id = Number(req.params.id)
    const indice = eventos.findIndex((evento) => evento.id === id)

    if(indice === -1){
        return res.status(404).send({erro: "Não foi possível encontrar o evento;"})
    }

    res.send(eventos[indice])

})

router.listen(port, () => {
    console.log("Rodando na porta:",port)
})