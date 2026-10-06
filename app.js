const express = require("express")
const exphbs = require("express-handlebars")
const Sequelize = require("./config/bd")
const Consumo = require("./models/Consumo")

const app = express()
const port = 3000


// ==========================================
// HANDLEBARS E MAIS
// ==========================================

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


// ==========================================
// HANDLEBARS
// ==========================================

app.engine("handlebars", exphbs.engine({

    defaultLayout: "main",

    helpers: {

        eq: function (a, b) {

            return a === b;

        },

        formatDate: function (data) {

            if (!data) {

                return "";

            }

            const partes = data.split("-");

            return `${partes[2]}/${partes[1]}/${partes[0]}`;

        }

    }

}));

app.set("view engine", "handlebars")
app.set("views", "./views")


// ==========================================
// HOME
// ==========================================

app.get("/", async (req, res) => {

    try {

        const consumos = await Consumo.findAll({

            raw: true,

            order: [
                ["data", "DESC"]
            ]

        })


        let totalAgua = 0
        let totalEnergia = 0


        consumos.forEach(consumo => {

            if (consumo.tipo === "Água") {

                totalAgua += Number(consumo.valor)

            }

            if (consumo.tipo === "Energia") {

                totalEnergia += Number(consumo.valor)

            }

        })


        res.render("home", {
            consumos: consumos,
            totalAgua: totalAgua,
            totalEnergia: totalEnergia,
            mensagem: req.query.mensagem
        })


    } catch (erro) {

        console.log("Erro ao buscar consumos:", erro)

        res.send("Erro ao carregar a página")

    }

})


// ==========================================
// FORMULÁRIO DE CADASTRO
// ==========================================

app.get("/consumos/cadastrar", (req, res) => {

    res.render("consumo/cadastrar")

})


// ==========================================
// CADASTRAR CONSUMO
// ==========================================

app.post("/consumos/add", async (req, res) => {

    try {

        const { tipo, data, valor } = req.body


        await Consumo.create({

            tipo: tipo,

            data: data,

            valor: valor

        })


        res.redirect("/?mensagem=cadastrado")


    } catch (erro) {

        console.log("Erro ao cadastrar consumo:", erro)

        res.send("Erro ao cadastrar consumo")

    }

})


// ==========================================
// FORMULÁRIO DE EDIÇÃO
// ==========================================

app.get("/consumos/editar/:id", async (req, res) => {

    try {

        const id = req.params.id


        const consumo = await Consumo.findByPk(id, {

            raw: true

        })


        if (!consumo) {

            return res.send("Consumo não encontrado")

        }


        res.render("consumo/editar", {

            consumo: consumo

        })


    } catch (erro) {

        console.log("Erro ao buscar consumo:", erro)

        res.send("Erro ao buscar consumo")

    }

})


// ==========================================
// EDITAR CONSUMO
// ==========================================

app.post("/consumos/editar/:id", async (req, res) => {

    try {

        const id = req.params.id

        const { tipo, data, valor } = req.body

        const consumo = await Consumo.findByPk(id)

        if (!consumo) {

            return res.send("Consumo não encontrado")

        }

        consumo.tipo = tipo

        consumo.data = data

        consumo.valor = valor

        await consumo.save()

        res.redirect("/?mensagem=editado")

    } catch (erro) {

        console.log("Erro ao editar consumo:", erro)

        res.send("Erro ao editar consumo")

    }

})


// ==========================================
// EXCLUIR CONSUMO
// ==========================================

app.post("/consumos/excluir/:id", async (req, res) => {

    try {

        const id = req.params.id


        const consumo = await Consumo.findByPk(id)


        if (!consumo) {

            return res.send("Consumo não encontrado")

        }


        await consumo.destroy()


        res.redirect("/?mensagem=excluido")


    } catch (erro) {

        console.log("Erro ao excluir consumo:", erro)

        res.send("Erro ao excluir consumo")

    }

})


// ==========================================
// SERVIDOR
// ==========================================

app.listen(port, () => {

    console.log("Servidor ok")

})


// ==========================================
// CONEXÃO COM BANCO
// ==========================================

async function conectarBD() {

    try {

        await Sequelize.authenticate()

        await Sequelize.sync()

        console.log("Conexão com bando de dados ok")

    } catch (erro) {

        console.log("Erro no servidor", erro)

    }

}

conectarBD()