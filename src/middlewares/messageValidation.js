const checkMessage = (socket, next) => {
        if(socket[0] === 'message' && socket[1].message!==undefined){
            return next();
        }
        if(socket[0] === 'delete' && socket[1]!==undefined && Number.isInteger(socket[1])){
            return next();
        }
        if(socket[0] === 'update' && socket[1].message!==undefined && socket[1].id!==undefined && Number.isInteger(socket[1].id)){
            return next();
        }
        let err = new Error("Message is not valid");
        err.data = { message : 'Message is not valid' };
        next(err);
}

module.exports = {
    checkMessage
};