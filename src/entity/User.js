const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "User", // Will use table name `User` as default behaviour.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        firstName: {
            type: "text",
            nullable: true
        },
        lastName: {
            type: "text",
            nullable: true
        },
        email: {
            type: "text",
            unique: true
        },
        password: {
            type: "text",
        },
        image:{
            type: "text",
            nullable: true
        }
    },
})