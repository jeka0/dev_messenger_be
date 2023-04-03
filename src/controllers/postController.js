const postSevice = require("../services/postService");

async function createPost(req, res){
    const { message, image } = req.body;
    const userId = req.userId;

    postSevice.createPost( userId, { message, image })
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getPost(req, res){
    const { id } = req.params;

    postSevice.getPost(id)
    .then((post)=>res.send(post))
    .catch((err)=>res.status(400).send(err.message));
}

async function getAllPosts(req, res){
    postSevice.getAllPosts()
    .then((posts)=>res.send(posts))
    .catch((err)=>res.status(400).send(err.message));
}

async function getCurrentUserPosts(req, res){
    const userId = req.userId;

    postSevice.getUserPosts(userId)
    .then((posts)=>res.send(posts))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserPosts(req, res){
    const { id } = req.params;

    postSevice.getUserPosts(id)
    .then((posts)=>res.send(posts))
    .catch((err)=>res.status(400).send(err.message));
}

async function updatePost(req, res){
    const { id } = req.params;
    const { message, image } = req.body;
    const userId = req.userId;

    postSevice.updatePost(id, userId, { message, image })
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function deletePost(req, res){
    const { id } = req.params;
    const userId = req.userId;

    postSevice.deletePost(id, userId)
    .then(()=>res.send("OK"))
    .catch((err)=>res.status(400).send(err.message));
}

async function getRange(req, res){
    const { page, limit } = req.query;

    postSevice.pagination(page, limit)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function getUserRange(req, res){
    const { page, limit } = req.query;
    const { id } = req.params;

    postSevice.paginationUser(id, page, limit)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function addUserLike(req, res){
    const { id } = req.params;
    const userId = req.userId;

    postSevice.addUserLike(id, userId)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

async function deleteUserLike(req, res){
    const { id } = req.params;
    const userId = req.userId;

    postSevice.deleteUserLike(id, userId)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(400).send(err.message));
}

module.exports = { 
    createPost, 
    getPost, 
    getAllPosts, 
    getCurrentUserPosts, 
    getUserPosts, 
    updatePost, 
    deletePost,
    getRange,
    getUserRange,
    addUserLike,
    deleteUserLike
};