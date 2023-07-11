let listaLivros = [];
let idAutoIncrement = 1;

function listarLivros() {
    return listaLivros;
}

const Cliente = require('./cliente');
//function verifica_autor(livro) {
//    for autor in Autor.listarAutor()
//        if (livro.autor != autor)
//}

function inserirLivro(livro) {
    
    
    if(livro && livro.isbn && livro.nome && livro.autor && livro.editora && livro.anoPublicacao) {
        livro.id = idAutoIncrement++;
        listaLivros.push(livro);
        return livro;
    } else {
        throw {
            numero: 400,
            msg: "Erro: Os parâmetros do livro estão inválidos."
        };
    }
}

function atualizarLivro(id, livroAlterar) {
    if(!livroAlterar || !livroAlterar.isbn || !livroAlterar.nome || !livroAlterar.autor || !livroAlterar.editora || !livroAlterar.anoPublicacao){
        throw ({
            numero: 400,
            msg: "Erro: Os parametros do livro estão inválidos"
        });       
    }
    for(let indice in listaLivros){
        if(listaLivros[indice].id == id) {
            livroAlterar.id = parseInt(id);
            listaLivros[indice] = livroAlterar;
            return listaLivros[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: Livro nao encontrado."
    });
}

function deletarLivro(id) {
    for(let indice in listaLivros){
        if(listaLivros[indice].id == id) {
            const livroDeletado = listaLivros.splice(indice,1);
            return livroDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Livro não encontrado."
    });

}


function buscarLivroPorId(id) {
    for (let livro of listaLivros) {
        if (livro.id == id) {
            return livro;
        }
    }
    throw {
        numero: 404,
        msg: "Erro: Livro não encontrado."
    };
}

function buscarLivrosPorAutor(autor) {
    const livrosPorAutor = listaLivros.filter(livro => livro.autor.includes(autor));
    return livrosPorAutor;
}

function buscarLivrosPorNome(nome) {
    const livrosPorNome = listaLivros.filter(livro => livro.nome.includes(nome));
    return livrosPorNome;
}

function buscarLivrosDisponiveis() {
    const livrosDisponiveis = listaLivros.filter(livro => !livro.retirado);
    return livrosDisponiveis;
}

function realizarRetiradaLivro(idLivro, clienteId) {
    const livro = buscarLivroPorId(idLivro);
    const cliente = Cliente.buscarPorIdCliente(clienteId)
    if (!livro.retirado) {
        if (verificarLimiteRetiradas(clienteId)) {
            livro.retirado = true;
            livro.IdCliente = cliente.id;
            livro.dataRetirada = new Date();
            livro.dataEntrega = calcularDataEntrega();
            cliente.livrosRetirados+=1;
            return livro;
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

function realizarDevolucaoLivro(idLivro,idCLiente) {
    const livro = buscarLivroPorId(idLivro);  
    clienteDoLivro = Cliente.buscarPorIdCliente(idCLiente)
    if (livro.retirado) {
        livro.retirado = false;
        livro.idCliente = null;
        livro.dataRetirada = null;
        livro.dataEntrega = null;
        const diasAtraso = calcularDiasAtraso(livro.dataEntrega);
        livro.diasAtraso = diasAtraso > 0 ? diasAtraso : 0;
        clienteDoLivro.livrosRetirados -= 1;
        return livro;
    } else {
        throw {
            numero: 400,
            msg: "Erro: O livro já está disponível na biblioteca."
        };
    }
}

function verificarLimiteRetiradas(clienteId) {
    const cliente = Cliente.buscarPorIdCliente(clienteId);
    const verificaCliente = cliente.livrosRetirados < 3;
    return verificaCliente;
}

function calcularDataEntrega() {
    const dataEntrega = new Date();
    dataEntrega.setDate(dataEntrega.getDate() + 7); // O PRAZO DE ENTREGA É SETEE DIAS
    return dataEntrega;
}

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
}

module.exports = {
    listarLivros,
    inserirLivro,
    atualizarLivro,
    deletarLivro,


    buscarLivroPorId,
    buscarLivrosPorAutor,
    buscarLivrosPorNome,
    buscarLivrosDisponiveis,


    realizarRetiradaLivro,
    realizarDevolucaoLivro
};
