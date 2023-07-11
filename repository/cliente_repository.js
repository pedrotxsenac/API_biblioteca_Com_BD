const { Client } = require('pg')
const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'crud_biblioteca',
};

async function listarClientes() {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM clientes')
    const listaCliente = res.rows;
    await client.end();
    return listaCliente;
}

async function inserirCliente(cliente) {
    const sql = 'INSERT INTO clientes(matricula, nome, telefone) VALUES ($1,$2,$3) RETURNING *'
    const values = [cliente.matricula, cliente.nome, cliente.telefone];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteInserido = res.rows[0];
    await client.end();
    return clienteInserido;    
}

async function atualizarCliente(id, cliente) {
    const sql = 'UPDATE clientes set matricula=$1, nome=$2, telefone=$3 WHERE id=$4 RETURNING *'
    const values = [cliente.matricula, cliente.nome, cliente.telefone, id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteAtualizado = res.rows[0];
    await client.end();
    return clienteAtualizado;    
}

async function deletarCliente(id) {
    const sql = 'DELETE FROM clientes WHERE id=$1 RETURNING *'
    const values = [id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteDeletado = res.rows[0];
    await client.end();
    return clienteDeletado;    
}

async function buscarClientePorId(id) {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM clientes WHERE id=$1',[id]);
    const cliente = res.rows[0];
    await client.end();
    return cliente;
}

module.exports = { 
    listarClientes,
    inserirCliente,
    atualizarCliente,
    deletarCliente,
    buscarClientePorId
}