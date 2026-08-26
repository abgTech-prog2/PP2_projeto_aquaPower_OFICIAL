const express = require("express")
const exphbs = require("express-handlebars")
const Sequelize = require("./config/bd")
const app = express()
const port = 3000

app.get("/", (req,res) =>{
    res.send("pagina inicial")
})

app.listen(port, ()=>{
    console.log("Servidor ok")
})

async function conectarBD(){
    try{
        await Sequelize.authenticate()
        await Sequelize.sync()
        console.log("Conexão com bando de dados ok")
    }catch(erro){
        console.log("Erro no servidor", erro)
    }
}
conectarBD()