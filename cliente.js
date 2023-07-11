let listaClientes = [];
let idAutoIncrement = 1;

function listarClientes() {
    return listaClientes;
}

function inserirCliente(cliente) {
    if (cliente && cliente.matricula && cliente.nome && cliente.telefone) {
        cliente.id = idAutoIncrement++;
        cliente.livrosRetirados = 0
        listaClientes.push(cliente);
        return cliente;
    } else {
        throw {
            numero: 400,
            msg: "Erro: Os parâmetros do cliente estão inválidos."
        };
    }
}

function buscarPorIdCliente(id) {
    for(let cliente of listaClientes){ 
        if(cliente.id == id){
            return cliente;
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: cliente não encontrado."
    });
}

function atualizarCliente(id, clienteAlterar) {
    if(!clienteAlterar || !clienteAlterar.matricula || !clienteAlterar.nome || !clienteAlterar.telefone) {
        throw ({
            numero: 400,
            msg: "Erro: Os parâmetros do cliente estão inválidos"
        });       
    }
    for(let indice in listaClientes){
        if(listaClientes[indice].id == id) {
            clienteAlterar.id = parseInt(id);
            listaClientes[indice] = clienteAlterar;
            return listaClientes[indice];
        }
    }    
    throw ({
        numero: 404,
        msg: "Erro: cliente nao encontrado."
    });
}

function deletarCliente(id) {
    for(let indice in listaClientes){
        if(listaClientes[indice].id == id) {
            const clienteDeletado = listaClientes.splice(indice,1);
            return clienteDeletado[0];
        }
    }
    throw ({
        numero: 404,
        msg: "Erro: Cliente não encontrado."
    });

}

module.exports = {
    listarClientes,
    inserirCliente,
    buscarPorIdCliente,
    atualizarCliente,
    deletarCliente
};
