const express = require('express');
const livroRota = require('./rotas/livro_rotas');
const autorRota = require('./rotas/autor_rotas');
const clienteRota = require('./rotas/cliente_rotas');
const loginRota = require('./rotas/login_rotas')

const app = express();
const PORTA = 3000;

app.use(express.json());

app.use('/login', loginRota);
app.use('/livros', livroRota);
app.use('/autores', autorRota);
app.use('/clientes', clienteRota);

app.listen(PORTA, () => {
  console.log('Servidor iniciado com sucesso...');
});
