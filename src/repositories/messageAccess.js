const dbAccess = require("./dbAccess.js")
const messageRep = dbAccess.AppDataSource.getRepository("Message");

async function createMessage(message){
   return await messageRep.save(message)
}

async function getAllMessages(){
    return await messageRep.find({
         relations:['user', 'chat'],
         order: {datetime: 'DESC'}
    });
}

async function getMessage(id){
    return await messageRep.findOne({
        where:{
            id 
        }, 
        relations:['user', 'chat'] 
    });
}

async function deleteMessage(id){
    return await messageRep.delete({
        id
    });
}

async function updateMessage(prevData, data){
    return await messageRep.save({
        ...prevData,
        ...data
    })
}

async function getRange(skip, take){
    const [result, total] = await messageRep.findAndCount({ 
        skip,
        take,
        relations:['user', 'chat'],
        order: {datetime: 'DESC'}
    });

    return {
        data: result,
        total
    }
}

module.exports = {
    createMessage, 
    getMessage, 
    getAllMessages, 
    updateMessage, 
    deleteMessage,
    getRange
};