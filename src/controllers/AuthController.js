const authService = require("../services/authService")

async function login(req, res){
    const { email, password } = req.body;

    authService.login({ email, password })
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function register(req, res){
    const { email, password, firstName, lastName } = req.body;

    authService.register({ email, password, firstName, lastName })
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function refresh(req, res){
    const { refreshToken } = req.body;

    authService.refresh({ refreshToken })
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}


module.exports = {
    login,
    refresh,
    register
};