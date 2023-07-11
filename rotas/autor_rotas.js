const express = require('express');
const cadastroAutores = require('../autor')
const autorController = require('../controller/autor_controller')

const router = express.Router();

//Recurso: Livros - rota: /livros
router.get('/', autorController.listarAutores);
router.get('/:id', autorController.buscarAutorPorId)
router.post('/', autorController.inserirAutor);
router.put('/:id', autorController.atualizarAutor);
router.delete('/:id', autorController.deletarAutor);

module.exports = router;