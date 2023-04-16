const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Chat",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        name: {
            type: "text",
            unique: true
        },
        image: {
            type: "text",
            nullable: true
        }
    },
    relations: {
        users: {
            target: "User",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        }
    },
})