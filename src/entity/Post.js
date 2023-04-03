const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Post",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        message: {
            type: "text",
            nullable: true
        },
        datetime: {
            type: "date"
        },
        image: {
            type: "text"
        }
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
        likes: {
            target: "User",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        },
    },
})