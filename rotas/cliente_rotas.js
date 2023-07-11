const express = require('express');
const cadastroClientes = require('../cliente')
const clienteController = require('../controller/cliente_controller')

const router = express.Router();

//Recurso: Livros - rota: /livros
router.get('/', clienteController.listarClientes);
router.get('/:id', clienteController.buscarClientePorId)
router.post('/', clienteController.inserirCliente);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;