const AutorRepository = require('../repository/autor_repository');

async function listarAutores(req, res) {
  try {
    const listaAutores = await AutorRepository.listarAutores();
    res.json(listaAutores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os autores.' });
  }
}

async function buscarAutorPorId(req, res) {
  const id = req.params.id;

  try {
    const autor = await AutorRepository.buscarAutorPorId(id);
    if (autor) {
      res.json(autor);
    } else {
      res.status(404).json({ error: 'Autor não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o autor.' });
  }
}

async function inserirAutor(req, res) {
  const autor = req.body;

  try {
    const autorInserido = await AutorRepository.inserirAutor(autor);
    res.status(201).json(autorInserido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao inserir o autor.' });
  }
}

async function atualizarAutor(req, res) {
  const id = req.params.id;
  const autor = req.body;

  try {
    const autorAtualizado = await AutorRepository.atualizarAutor(id, autor);
    if (autorAtualizado) {
      res.json(autorAtualizado);
    } else {
      res.status(404).json({ error: 'Autor não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o autor.' });
  }
}

async function deletarAutor(req, res) {
  const id = req.params.id;

  try {
    const autorDeletado = await AutorRepository.deletarAutor(id);
    if (autorDeletado) {
      res.json(autorDeletado);
    } else {
      res.status(404).json({ error: 'Autor não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar o autor.' });
  }
}

module.exports = {
  listarAutores,
  buscarAutorPorId,
  inserirAutor,
  atualizarAutor,
  deletarAutor
};
