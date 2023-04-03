const { Joi, Segments } = require('celebrate');

const login = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
      password: Joi.string().required()
    })
}

const refresh = {
    [Segments.BODY]: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const register = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
}

module.exports = {login, register, refresh}