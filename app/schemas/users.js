'use strict';

const Joi = require('joi');

const schema = {
    login     : Joi.string().alphanum().required(),
    password  : Joi.string().alphanum().min(8).required(),
    email     : Joi.string().email().required(),
    firstname : Joi.string().required(),
    lastname  : Joi.string().required(),
    company   : Joi.string(),
    function  : Joi.string()
}

module.exports = Joi.object(schema);

module.exports.omit = (...keys) => (
    Joi.object().keys(omit(schema, keys))
);
module.exports.pick = (...keys) => (
    Joi.object().keys(pick(schema, keys))
);
