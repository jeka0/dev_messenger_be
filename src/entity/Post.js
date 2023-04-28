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
        community: {
            target: "Community",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            onDelete: "cascade"
        },
        likes: {
            target: "User",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        },
        chat: {
            target: "Chat",
            type: "one-to-one",
            joinTable: true,
            mappedBy: 'post',
            joinColumn: {
                name: 'chat_id',
                referencedColumnName: 'id',
            }
        }
    },
})