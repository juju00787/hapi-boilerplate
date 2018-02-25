'use strict';

const jsonToMongoose = require('json-mongoose');
const mongoose = require('k7-mongoose').mongoose();

module.exports = jsonToMongoose({
    mongoose: mongoose,
    collection: 'users',
    schema: require('../schemas/users'),

    schemaUpdate: (schema) => {
        schema.login.unique = true;
        schema.email.unique = true;
        return schema;
    },
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
    options: {}
});
