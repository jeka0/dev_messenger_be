const { Joi, Segments } = require('celebrate');

const id = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const create = {
    [Segments.BODY]: Joi.object().keys({
        message: Joi.string(),
        image: Joi.string().required()
    }).required().min(1)
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        message: Joi.string(),
        image: Joi.string()
    }).required().min(1)
}

const pagination = {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

module.exports = { 
    id,
    update,
    create,
    pagination
}