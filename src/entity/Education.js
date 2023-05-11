const EntitySchema = require('typeorm').EntitySchema
module.exports = new EntitySchema({
    name: "Education",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true 
        },
        institution_name:{
            type: "text"
        },
        Speciality:{
            type: "text"
        },
        start_year:{
            type: "int"
        },
        end_year:{
            type: "int"
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
    },
})