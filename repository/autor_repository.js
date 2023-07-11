const { Client } = require('pg')
const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'crud_biblioteca',
};

async function listarAutores() {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM autores')
    const listaAutor = res.rows;
    await client.end();
    return listaAutor;
}

async function inserirAutor(autor) {
    const sql = 'INSERT INTO autores(nome, paisOrigem) VALUES ($1,$2) RETURNING *'
    const values = [autor.nome, autor.paisOrigem];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const autorInserido = res.rows[0];
    await client.end();
    return autorInserido;    
}

async function atualizarAutor(id, autor) {
    const sql = 'UPDATE autores set nome=$1, paisOrigem=$2  WHERE id=$3 RETURNING *'
    const values = [autor.nome, autor.paisOrigem, id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const autorAtualizado = res.rows[0];
    await client.end();
    return autorAtualizado;    
}

async function deletarAutor(id) {
    const sql = 'DELETE FROM autores WHERE id=$1 RETURNING *'
    const values = [id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const autorDeletado = res.rows[0];
    await client.end();
    return autorDeletado;    
}

async function buscarAutorPorId(id) {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM autores WHERE id=$1',[id]);
    const autor = res.rows[0];
    await client.end();
    return autor;
}

module.exports = { 
    listarAutores,
    inserirAutor,
    atualizarAutor,
    deletarAutor,
    buscarAutorPorId
}