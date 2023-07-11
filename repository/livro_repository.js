

const { Client } = require('pg')
const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'crud_biblioteca',
};

const repositoryClientes = require('./cliente_repository');

const repositoryLivros = require('./livro_repository');

async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros')
    const listaLivros = res.rows;
    await cliente.end();
    return listaLivros;
}


async function inserir(livro) {
    const sql = 'INSERT INTO livros(isbn, nome, autor, editora, anoPublicacao) VALUES ($1,$2,$3,$4,$5) RETURNING *'
    const values = [livro.isbn, livro.nome, livro.autor, livro.editora, livro.anoPublicacao];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const livroInserido = res.rows[0];
    await cliente.end();
    return livroInserido;    
}

async function atualizar(id, livro) {
    const sql = 'UPDATE livros set isbn=$1, nome=$2, autor=$3, editora=$4, anoPublicacao=$5 WHERE id=$6 RETURNING *'
    const values = [livro.isbn, livro.nome, livro.autor, livro.editora, livro.anoPublicacao, id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const livroAtualizado = res.rows[0];
    await cliente.end();
    return livroAtualizado;    
}


async function deletar(id) {
    const sql = 'DELETE FROM livros WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const livroDeletado = res.rows[0];
    await cliente.end();
    return livroDeletado;    
}


async function buscarLivroPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE id=$1',[id]);
    const livro = res.rows[0];
    await cliente.end();
    return livro;
}


async function buscarLivrosPorAutor(autor) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE autor=$1', [autor]);
    const livros = res.rows;
    await cliente.end();
    return livros;
}

async function buscarLivroPorNome(nome) {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM livros WHERE nome = $1', [nome]);
    const livro = res.rows[0];
    await client.end();
    return livro;
}
  
  
async function buscarLivrosDisponiveis() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE retirado = false');
    const livrosDisponiveis = res.rows;
    await cliente.end();
    return livrosDisponiveis;
}  
  







async function realizarRetiradaLivro(idLivro, clienteId) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const clienteReal = await repositoryClientes.buscarClientePorId(clienteId);
    const livro = await buscarLivroPorId(idLivro);   
    
    if (!livro.retirado) {
        if (verificarLimiteRetiradas(clienteId)) {    
            const dataRetirada = new Date();
            const dataEntrega = calcularDataEntrega();
            let livros_retirados = clienteReal.livrosRetirados + 1;
            
            const sql = 'UPDATE livros SET retirado=$1, idCliente=$2, dataRetirada=now(), dataEntrega=now() WHERE id=$3 RETURNING *';
            const values = [true, clienteReal.id, idLivro];
            
            const sql2 = 'UPDATE clientes SET livrosRetirados=$1 WHERE id=$2 RETURNING *';
            await cliente.query(sql2, values2);
            const values2 = [livros_retirados, clienteId];
            const res = await cliente.query(sql, values);
            
            const livroAtualizado = res.rows[0];
            await cliente.end();
            return livroAtualizado  
        } else {
            throw {
                numero: 400,
                msg: "Erro: Limite de livros retirados atingido."
            };
        }
    } else {
        throw {
            numero: 400,
            msg: "Erro: Livro indisponível para retirada."
        };
    }
}





async function realizarDevolucaoLivro(idLivro, idCliente) {
    const livro = await repositoryLivros.buscarLivroPorId(idLivro);
    const clienteDoLivro = await repositoryClientes.buscarClientePorId(idCliente);
  
    if (livro.retirado) {
        const livroAtualizado = {
            ...livro,
            retirado: false,
            idCliente: null,
            dataRetirada: null,
            dataEntrega: null
        };
  
        const diasAtraso = calcularDiasAtraso(livro.dataEntrega);
        livroAtualizado.diasAtraso = diasAtraso > 0 ? diasAtraso : 0;
  
        const clienteAtualizado = {
            ...clienteDoLivro,
            livrosRetirados: clienteDoLivro.livrosRetirados - 1
        };
  
        await repositoryLivros.atualizar(livroAtualizado);
        await repositoryClientes.atualizarCliente(clienteAtualizado);
  
        return livroAtualizado;
    } else {
        throw {
            numero: 400,
            msg: "Erro: O livro já está disponível na biblioteca."
        };
    }
};
  
async function verificarLimiteRetiradas(clienteId) {
    const cliente = await repositoryClientes.buscarClientePorId(clienteId);
    const verificaCliente = cliente.livrosRetirados < 3;
    return verificaCliente;
};

function calcularDataEntrega() {
    const dataEntrega = new Date();
    dataEntrega.setDate(dataEntrega.getDate() + 7); // O PRAZO DE ENTREGA É SETE DIAS
    return dataEntrega;
};


function calcularDiasAtraso(dataEntrega) {
    const hoje = new Date();
    const dataEntregaObj = new Date(dataEntrega);
    if (hoje < dataEntregaObj) {
        const diffTempo = hoje.getTime() - dataEntregaObj.getTime();
        const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
        return diffDias;
    } else {
        return '0' 
    }
};
  




module.exports = { 
    listar,
    inserir,
    atualizar,
    deletar,
    buscarLivroPorId, 
    buscarLivrosPorAutor,
    buscarLivrosDisponiveis,
    realizarRetiradaLivro,
    realizarDevolucaoLivro,
    verificarLimiteRetiradas,
    buscarLivroPorNome
};

