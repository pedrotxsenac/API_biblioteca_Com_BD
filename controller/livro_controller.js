const cadastroLivros = require('../livro');
const LivroRepository = require('../repository/livro_repository');

async function listarLivros(req, res) {
  try {
    const listaLivros = await LivroRepository.listar();
    res.json(listaLivros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os livros.' });
  }
}

async function buscarLivroPorId(req, res) {
  const id = req.params.id;

  try {
    const livro = await LivroRepository.buscarLivroPorId(id);
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({ error: 'Livro não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o livro.' });
  }
}

async function inserirLivro(req, res) {
  const livro = req.body;

  try {
    const livroInserido = await LivroRepository.inserir(livro);
    res.status(201).json(livroInserido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao inserir o livro.' });
  }
}

async function atualizarLivro(req, res) {
  const id = req.params.id;
  const livro = req.body;

  try {
    const livroAtualizado = await LivroRepository.atualizar(id, livro);
    if (livroAtualizado) {
      res.json(livroAtualizado);
    } else {
      res.status(404).json({ error: 'Livro não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o livro.' });
  }
}

async function deletarLivro(req, res) {
  const id = req.params.id;

  try {
    const livroDeletado = await LivroRepository.deletar(id);
    if (livroDeletado) {
      res.json(livroDeletado);
    } else {
      res.status(404).json({ error: 'Livro não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar o livro.' });
  }
}

async function buscarLivrosPorAutor(req, res) {
  const autor = req.params.autor;

  try {
    const livrosPorAutor = await LivroRepository.buscarLivrosPorAutor(autor);
    res.json(livrosPorAutor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os livros por autor.' });
  }
}

async function buscarLivrosPorNome(req, res) {
  const nome = req.params.nome;

  try {
    const livrosPorNome = await LivroRepository.buscarLivroPorNome(nome);
    res.json(livrosPorNome);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os livros por nome.' });
  }
}

async function buscarLivrosDisponiveis(req, res) {
  try {
    const livrosDisponiveis = await LivroRepository.buscarLivrosDisponiveis();
    res.json(livrosDisponiveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os livros disponíveis.' });
  }
}


async function realizarRetiradaLivro(req, res) {
  const idLivro = req.params.idLivro;
  const clienteId = req.params.clienteId;
  try {
    const livroRetirado = await LivroRepository.realizarRetiradaLivro(idLivro, clienteId);
    res.json(livroRetirado);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao realizar a retirada do livro.' });
  }
}

async function realizarDevolucaoLivro(req, res) {
  const idLivro = req.params.idLivro;
  const clienteId = req.params.clienteId;

  try {
    const livroDevolvido = await LivroRepository.realizarDevolucaoLivro(idLivro, clienteId);
    res.json(livroDevolvido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao realizar a devolução do livro.' });
  }
}


module.exports = {
  listarLivros,
  buscarLivroPorId,
  inserirLivro,
  atualizarLivro,
  deletarLivro,
  buscarLivrosPorAutor,
  buscarLivrosPorNome,
  buscarLivrosDisponiveis,
  realizarRetiradaLivro,
  realizarDevolucaoLivro
};
