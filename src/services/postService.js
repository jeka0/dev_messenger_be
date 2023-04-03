const postAccess = require("../repositories/postAccess");
const { getUserByID } = require("./userService");
const { deleteFile } = require("../helpers/fs");
async function createPost(userId, data){
    data.datetime = new Date();
    data.user = await getUserByID(userId);

    const post = await postAccess.createPost(data)

    if(!post){
        throw new Error("Error creating post");
    }

    return post;
}

async function getPost(id){
    const post = await postAccess.getPost(id);

    if(!post){
        throw new Error("Post not found");
    }

    deleteInfo(post);

    return post;
}

async function getAllPosts()
{
    const posts = await postAccess.getAllPosts()

    posts.forEach(deleteInfo);

    return posts;
}

async function getUserPosts(id){
    const posts = await postAccess.getUserPosts(id)

    posts.forEach(deleteInfo);

    return posts;
}

async function updatePost(id, userId, data){
    const post = await postAccess.getPost(id);

    if(post.user.id !== userId){
        throw new Error("Access denied");
    }

    if(data.image) deleteFile(post.image);
    const updatedPost = await postAccess.updatePost(id, data);

    if(!updatedPost){
        throw new Error("Error updating post");
    }

    return updatedPost;
}

async function deletePost(id, userId){
    const post = await postAccess.getPost(id);

    if(post.user.id !== userId){
        throw new Error("Access denied");
    }

    deleteFile(post.image);
    const deletedPost = await postAccess.deletePost(id);

    if(!deletedPost){
        throw new Error("Error deleting post");
    }

    return deletedPost;
}

async function pagination(page, limit){
    const skip= (page-1) * limit;
    const result = await postAccess.getRange(skip, limit);

    result.data.forEach(deleteInfo);

    return result;
}

async function paginationUser(userId, page, limit){
    const skip= (page-1) * limit;
    const result = await postAccess.getUserRange(userId, skip, limit);

    result.data.forEach(deleteInfo);

    return result;
}

async function addUserLike(id, userId){
    const user = await getUserByID(userId);
    const post = await postAccess.getPost(id);

    if(!post){
        throw new Error("Post not found");
    }

    if(!user){
        throw new Error("User not found");
    }

    post.likes.push(user);
    const updatedPost = await postAccess.createPost(post);
    deleteInfo(updatedPost);
    return updatedPost;
}

async function deleteUserLike(id, userId){
    const post = await postAccess.getPost(id);

    if(!post){
        throw new Error("Post not found");
    }

    const index = post.likes.findIndex(user=>user.id===userId);
    if (index > -1) {
        post.likes.splice(index, 1);
    }
    const updatedPost = await postAccess.createPost(post);
    deleteInfo(updatedPost);
    return updatedPost;
}

function deleteInfo(post){
    delete post.user.password;
    post.likes.forEach((user, index)=>{post.likes[index] = {id:user.id}})
}

module.exports = {
    createPost, 
    getPost, 
    getAllPosts, 
    getUserPosts, 
    updatePost, 
    deletePost,
    pagination,
    paginationUser,
    addUserLike,
    deleteUserLike
};