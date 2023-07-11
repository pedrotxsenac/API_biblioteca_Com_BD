let listaAutores = [];
let idAutoIncrement = 1;

function listarAutor() {
    return listaAutores;
}

function inserirAutor(autor) {
    if (autor && autor.nome && autor.paisOrigem) {
        autor.id = idAutoIncrement++;
        listaAutores.push(autor);
        return autor;
    } else {
        throw {
            numero: 400,
            msg: "Erro: Os parâmetros do autor estão inválidos."
        };
    }
}

function buscarPorIdAutor(id) {
    for(let autor of listaAutores){ 
        if(autor.id == id){
            return autor;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    });
}

function atualizarAutor(id, autorAlterar) {
    if(!autorAlterar || !autorAlterar.nome || !autorAlterar.paisOrigem){
        throw ({
            numero: 400,
            msg: "Erro: Os parâmetros do autor estão inválidos"
        });       
    }
    for(let indice in listaAutores){
        if(listaAutores[indice].id == id) {
            autorAlterar.id = parseInt(id);
            listaAutores[indice] = autorAlterar;
            return listaAutores[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: autor nao encontrado."
    });
}

function deletarAutor(id) {
    for(let indice in listaAutores){
        if(listaAutores[indice].id == id) {
            const autorDeletado = listaAutores.splice(indice,1);
            return autorDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Autor não encontrado."
    });

}



module.exports = {
    listarAutor,
    inserirAutor,
    buscarPorIdAutor,
    atualizarAutor,
    deletarAutor
};
