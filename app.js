var express = require("express");
var mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://marina_toledo:marina_toledo@cluster0.ae6hs.mongodb.net/biblioteca?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

const Livros = mongoose.model("livros", {
    nome: String,
    categoria: String,
    autor: String,
});

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");

app.use(express.static("public"));

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/livros", (req, res) => {
    let livro = Livros.find({}, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao consultar o Livro");
        res.render("livros", { livros_book: livro });
    });
});

//rota do cadastro
app.get("/cadastrarLivros", (req, res) => {
    res.render("formLivros");
});

app.post("/cadastrarLivros", (req, res) => {
    let livro = new Livros();
    livro.nome = req.body.nome;
    livro.categoria = req.body.categoria;
    livro.autor = req.body.autor;

    livro.save((err) => {
        if (err)
            return res.status(500).send("Erro ao cadastrar o livro")

        return res.redirect("/livros");
    });
});

app.get("/deletarLivro/:id", (req, res) => {
    var id = req.params.id

    Livros.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            return res.status(500).send("Erro ao excluir livro")
        }
        res.redirect("/livros")
    });
});

app.get("/editarLivro/:id", (req, res) => {
    var id = req.params.id;
    // console.log("id=" + id);
    Livros.findById(id, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao consultar produto");
        res.render("formEditarLivros", {livros_book: livro});

    });
});


app.post("/editarLivro", (req, res) => {
    var id = req.body.id;
    Livros.findById(id, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao consultar o livro");
        livro.nome = req.body.nome;
        livro.categoria = req.body.categoria;
        livro.autor = req.body.autor;

        livro.save(err => {
            if (err)
                return res.status(500).send("Erro ao editar livro");
            return res.redirect("/livros");

        });
    });
});

app.post("/pesquisa", (req, res) => {
    var livroPesquisa = req.body.query;
    
  Livros.find(
        {$or: [
        {nome: {$regex: new RegExp('.' + livroPesquisa + '.', 'i')}},
        {categoria: {$regex: new RegExp('.' + livroPesquisa + '.', 'i')}},
        {autor: {$regex: new RegExp('.' + livroPesquisa + '.', 'i')}},
      
    ]}
        , (err, livro) => {
        if (err) {
            return resposta.status(500).send("Erro ao fazer a busca");
        }
        res.render("livros", {livros_book: livro});

    });
});



app.listen(port, () => {
    console.log("Servidor está rodando na porta " + port)
})


