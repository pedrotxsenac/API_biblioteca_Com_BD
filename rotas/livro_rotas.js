const express = require('express');
const livroController = require('../controller/livro_controller');

const router = express.Router();

router.get('/', livroController.listarLivros);
router.post('/', livroController.inserirLivro);
router.put('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.deletarLivro);

router.get('/:id', livroController.buscarLivroPorId);
router.get('/autor/:autor', livroController.buscarLivrosPorAutor);
router.get('/disponiveis/disponiveis', livroController.buscarLivrosDisponiveis);

router.get('/nome/:nome', livroController.buscarLivrosPorNome);

router.put('/:idLivro/retirar/:clienteId', livroController.realizarRetiradaLivro);
router.put('/:id/devolver/:clienteId', livroController.realizarDevolucaoLivro);

module.exports = router;
