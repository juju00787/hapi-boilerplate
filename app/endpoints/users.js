'use strict';

const Joi = require('joi');
const handler = require('../handlers/users');
const user = require('../schemas/users');

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'GET',
            path   : '/users',
            config : {
                description : 'Récupération de tous les utilisateurs',
                notes       : 'Find users',
                tags        : ['api'],
                handler     : handler.findAll
            },
        },
        {
            method : 'GET',
            path   : '/users/{id}',
            config : {
                description : 'Récupération d un utilisateur',
                notes       : 'Find one user',
                tags        : ['api'],
                validate: {
                    params: {
                        id: Joi.string()
                    }
                },
                handler     : handler.findOneById
            },
        },
        {
            method : 'POST',
            path   : '/users',
            config: {
                plugins:{
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                description : 'Ajouter un utilisateur',
                notes       : 'Save a user',
                tags        : ['api'],
                validate: {
                    payload: user
                },
                handler: handler.save
            },
        },
        {
            method : 'PUT',
            path   : '/users/{id}',
            config : {
                plugins:{
                    'hapi-swagger':{
                        payloadType:'form',
                    },
                },
                description : 'Modifie un utilisateur existant',
                notes       : 'Update user',
                tags        : ['api'],
                handler     : handler.findOneByIdAndUpdate
            },
        },
        {
            method : 'DELETE',
            path   : '/users/{id}',
            config : {
                description : 'Supprime un utilisateur existant',
                notes       : 'Delete user',
                tags        : ['api'],
                handler     : handler.findOneByIdAndRemove
            },
        },
    ]);
    next();
};

exports.register.attributes = {
    name : 'users-routes',
};
