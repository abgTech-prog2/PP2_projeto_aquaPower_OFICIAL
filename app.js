const express = require("express")
const exphbs = require("express-handlebars")
const Sequelize = require("./config/bd")
const app = express()
const port = 3000

//Handlebars e mais
app.use(express.urlencoded({ extended: true })); //formulário POST
app.use(express.static("public")); //public
//handlebars
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", "./views");
//////////////////////////////////////////////////////////////////////////////


app.get("/", (req,res) =>{
    res.render("home")
})


//////////////////////////////////////////////////////////////////////////////
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