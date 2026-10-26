import express from "express"

const router = express()
const port = 1331

router.use(express.json())

router.listen(port, () => {
    console.log("Rodando na porta:",port)
})