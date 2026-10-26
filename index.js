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

router.post("/eventos", (req, res) => {
    let nome = req.body.nome
    let local = req.body.local
    let vagas = req.body.vagas

    if(!nome || !local || !vagas){
        return res.status(400).send({erro: "As informações cadastrais precisam ser preenchidas corretamente!"})
    }

    if(nome === "" || local === "" || isNaN(vagas) || vagas <= 0){
        return res.status(400).send({erro: "As informações cadastrais precisam ser preenchidas corretamente!"})
    }

    let id = 1
    if(eventos.length > 0){
        id = eventos[eventos.length-1].id + 1
    }

    let evento = {id: id, nome: nome, local: local, vagas: vagas}
    if(eventos.push(evento)){
        res.status(201).send(`Evento cadastrado com sucesso!`)
    }
})

router.put("/eventos/:id", (req, res) => {
    let id = Number(req.params.id)
    const indice = eventos.findIndex((evento) => evento.id === id)

    if(indice === -1){
        return res.status(404).send({erro: "Não foi possível encontrar o evento;"})
    }

    let local = req.body.local

    if(!local || local === ""){
        return res.status(400).send({erro: "As informações de mudança devem ser preenchidas corretamente!"})
    }

    eventos[indice].local = local
    res.send("Evento atualizado com sucesso!")
})

router.delete("/eventos/:id", (req, res) => {
    let id = Number(req.params.id)
    const indice = eventos.findIndex((evento) => evento.id === id)

    if(indice === -1){
        return res.status(404).send({erro: "Não foi possível encontrar o evento;"})
    }

    eventos.splice(indice, 1)
    res.send("Evento cancelado com sucesso!")
})

router.listen(port, () => {
    console.log("Rodando na porta:",port)
})