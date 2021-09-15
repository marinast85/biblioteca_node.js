var express = require("express");
const router = express.Router();

const livrosController = require ("../controllers/livros-controller.js")

router.get("/", livrosController.listar_livros)

router.get("/cadastrarLivros", livrosController.cadastrar_livros_get);

router.post("/cadastrarLivros", livrosController.cadastrar_livros_post);

router.get("/deletarLivro/:id", livrosController.deletar_livro);

router.get("/editarLivro/:id", livrosController.editar_livro_get);

router.post("/editarLivro", livrosController.editar_livro_post);

module.exports = router;
