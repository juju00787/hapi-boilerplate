'use strict';

const faker = require('faker');
const Promise = require('bluebird');

module.exports.insert = (request, response) => {
    request.server.plugins.users.insert(request.payload)
        .then((user) => {
            response(user).code(201);
        })
        .catch(err => response(err));
};

module.exports.findAll = (request, response) => {
    request.server.plugins.users.findAll()
        .then(users => response(users).code(201))
        .catch(err => response(err));
};

module.exports.findOneById = (request, response) => {
    request.server.plugins.users.findOneById(request.params._id)
        .then((user) => {
            response(user).code(201);
        })
        .catch(err => response(err));
};

module.exports.findOneByIdAndRemove = (request, response) => {
    request.server.plugins.users.findOneByIdAndRemove(request.params._id)
        .then(user => response(user).code(201))
        .catch(err => response(err));
};

module.exports.findOneByIdAndUpdate = (request, response) => {
    request.server.plugins.users.findOneByIdAndUpdate(request.params._id, request.payload)
        .then((user) => {
            reply(user).code(201);
        })
        .catch(err => response(err));
};

module.exports.createUsers = (request, response) => {
    let users = [];
    for (let i = 0; i < 100; i++) {
        users.push({
            login : faker.name.firstName(),
            password : faker.internet.password(),
            email : faker.internet.email(),
            firstname : faker.name.firstName(),
            lastname : faker.name.lastName(),
        });
    }
    return Promise.map(users, user => request.server.plugins.users.createUsers(user));
};

module.exports.login = (request, response) => {
    request.server.plugins.users.login(request.payload)
        .then(user => response(user).code(201))
        .catch(err => response(err));
};

module.exports.changePassword = (request, response) => {
    request.server.plugins.users.changePassword(request.params._id, request.payload.password)
        .then((user) => {
            response('Password modified !').code(201);
        })
        .catch(err => reply(err));
};