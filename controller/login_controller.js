const jwt = require('jsonwebtoken')

const senhaSecreta = '1234567890';
function realizarLogin(req,res){
    const usuario = req.body;
    //usuario -> {nome: "admin", senha:"12345"}

    if(usuario && usuario.nome && usuario.senha
        && usuario.nome=="admin" 
        && usuario.senha=="12345")
    {

        const tokenGerado = jwt.sign({nome:"admin"},senhaSecreta, {expiresIn: '1h'})
        res.json({token: tokenGerado});
    }
    else {
        res.status(401).json(
            {erro:"Usuario ou senha invalidos"}
        );
    }
}

module.exports = {
    realizarLogin
}