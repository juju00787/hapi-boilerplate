'use strict';

const Promise = require('bluebird');
const user = require('../models/users');
const encrypt = require('../encrypt');

const internals = {};

const externals = {
    findAll() {
        return internals.server.database.users.find();
    },
    findOneById(id) {
        return internals.server.database.users.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return user;
            });
    },
    insert(payload) {
        let user = internals.server.database.users();
        user.set(payload);
        return user.save();
    },
    findOneByIdAndUpdate(id, payload) {
        return internals.server.database.users.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                user.set(payload);
                user.save();
                return user;
            });
    },
    findOneByIdAndRemove(id) {
        return internals.server.database.users.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return internals.server.database.users.remove({ _id : id })
                    .then(value => 'Utilisateur supprimé');
            });
    },
    createUsers(user) {
        let newUser = internals.server.database.users();
        newUser.set(user);
        newUser.save();
        return internals.server.database.users.find();
    },
    login(payload) {
        payload.password = encrypt(payload.password);
        return internals.server.database.users.findOne({ login : payload.login, password : payload.password })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return 'Connected !';
            });
    },
    changePassword(id, password) {
        password = encrypt(password);
        return internals.server.database.users.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found.'));
                }
                return internals.server.database.users.update({ _id : id }, { password })
                    .then(status => user);
            });
    },
    register(server, options, next) {
        internals.server   = server.root;
        internals.settings = options;

        // à répéter autant de fois
        // que vous avez de méthodes publiques
        server.expose('findAll', externals.findAll);
        server.expose('findOneById', externals.findOneById)
        server.expose('insert', externals.insert);
        server.expose('findOneByIdAndUpdate', externals.findOneByIdAndUpdate);
        server.expose('findOneByIdAndRemove', externals.findOneByIdAndRemove);
        server.expose('createUsers', externals.createUsers);
        server.expose('login', externals.login);
        server.expose('changePassword', externals.changePassword);
        next();
    },
};

externals.register.attributes = {
    name : 'users',
};

module.exports.register = externals.register;
