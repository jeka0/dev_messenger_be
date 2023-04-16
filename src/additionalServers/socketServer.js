const server = require('http').createServer();
const { checkSocketAuth } = require('../middlewares/checkAuth');
const { createMessage, deleteMessage, updateMessage } = require('../services/messageService');
const { checkMessage } = require('../middlewares/messageValidation');
const io = require("socket.io")(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"]
    }
});
io.use(checkSocketAuth);

io.on('connection', client => {
  client.on("message", ({ message }) =>{
    createMessage(client.userId, { message }).then((savedMessage)=>{
        io.emit("message", savedMessage);
    })
  });

  client.on("update", ({ message, id }) =>{
    updateMessage(id, client.userId, { message }).then((updatedMessage)=>{
      io.emit("update", updatedMessage);
    }).catch(err=>{
      client.emit("error", err);
    });
  });

  client.on("delete", (id) =>{
    deleteMessage(id, client.userId).then(()=>{
        io.emit("delete", id);
    }).catch(err=>{
      client.emit("error", err);
    })
  });

  client.use(checkMessage);

  client.on('error', err=>{
    client.emit("error", err);
  })
});

module.exports = server;