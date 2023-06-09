const { Joi, Segments } = require('celebrate');

const userId = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}

const update = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        image: Joi.string(),
    }).required().min(1),
}

module.exports = { userId, update }