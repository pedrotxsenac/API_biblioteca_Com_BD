const ClienteRepository = require('../repository/cliente_repository');

async function listarClientes(req, res) {
  try {
    const listaClientes = await ClienteRepository.listarClientes();
    res.json(listaClientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os clientes.' });
  }
}

async function buscarClientePorId(req, res) {
  const id = req.params.id;

  try {
    const cliente = await ClienteRepository.buscarClientePorId(id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o cliente.' });
  }
}

async function inserirCliente(req, res) {
  const cliente = req.body;

  try {
    const clienteInserido = await ClienteRepository.inserirCliente(cliente);
    res.status(201).json(clienteInserido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao inserir o cliente.' });
  }
}

async function atualizarCliente(req, res) {
  const id = req.params.id;
  const cliente = req.body;

  try {
    const clienteAtualizado = await ClienteRepository.atualizarCliente(id, cliente);
    if (clienteAtualizado) {
      res.json(clienteAtualizado);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o cliente.' });
  }
}

async function deletarCliente(req, res) {
  const id = req.params.id;

  try {
    const clienteDeletado = await ClienteRepository.deletarCliente(id);
    if (clienteDeletado) {
      res.json(clienteDeletado);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar o cliente.' });
  }
}

module.exports = {
  listarClientes,
  buscarClientePorId,
  inserirCliente,
  atualizarCliente,
  deletarCliente
};
