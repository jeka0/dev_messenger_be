const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        institution_name: Joi.string().required(),
        Speciality: Joi.string().required(),
        start_year: Joi.number().required(),
        end_year: Joi.number().required()
    })
}
module.exports = { id, create }