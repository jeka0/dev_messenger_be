const dbAccess = require("./dbAccess.js")
const postRep = dbAccess.AppDataSource.getRepository("Post");

async function createPost(post){
   return await postRep.save(post)
}

async function getAllPosts(){
    return await postRep.find({
         relations:['community', 'likes', 'chat'],
         order: {id: 'DESC'}
    });
}

async function getPost(id){
    return await postRep.findOne({
        where:{
            id 
        }, 
        relations:['community', 'likes', 'chat'] 
    });
}

async function getCommunityPosts(communityId){
    return await postRep.find({
        where:{
            community:{
                id:communityId
            }
        },
        relations:['community', 'likes', 'chat'],
        order: {id: 'DESC'}
    });
}

async function deletePost(id){
    return await postRep.delete({
        id
    });
}

async function updatePost(id, data){
    return await postRep.update({
        id
    }, data)
}

async function getRange(skip, take){
    const [result, total] = await postRep.findAndCount({ 
        skip,
        take,
        relations:['community', 'likes', 'chat'],
        order: {id: 'DESC'}
    });

    return {
        data: result,
        total
    }
}

async function getCommunityRange(communityId, skip, take){
    const [result, total] = await postRep.findAndCount({ 
        skip,
        take,
        where:{
            community:{
                id:communityId
            }
        },
        relations:['community', 'likes', 'chat'],
        order: {id: 'DESC'}
    });

    return {
        data: result,
        total
    }
}

module.exports = {
    createPost, 
    getPost, 
    getAllPosts, 
    getCommunityPosts, 
    updatePost, 
    deletePost,
    getRange,
    getCommunityRange
};