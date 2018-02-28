'use strict';

const Joi = require('joi');
const handler = require('../handlers/users');
const user = require('../schemas/users');
const login = require('../schemas/login');
Joi.objectId = require('joi-objectid')(Joi);

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'GET',
            path   : '/users',
            config : {
                description : 'Récupération de tous les utilisateurs',
                notes       : 'Find users',
                tags        : ['api'],
                handler     : handler.findAll,
            },
        },
        {
            method : 'GET',
            path   : '/users/{_id}',
            config : {
                description : 'Récupération d un utilisateur',
                notes       : 'Find one user',
                tags        : ['api'],
                handler     : handler.findOneById,
                validate    : {
                    params : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'POST',
            path   : '/users',
            config : {
                description : 'Ajouter un utilisateur',
                notes       : 'Save a user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : user,
                },
                handler     : handler.insert,
            },
        },
        {
            method : 'PUT',
            path   : '/users/{_id}',
            config : {
                description : 'Modifie un utilisateur existant',
                notes       : 'Update user',
                tags        : ['api'],
                handler     : handler.findOneByIdAndUpdate,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : user,
                    params  : {
                        _id : Joi.string().required(),
                    },
                },
            },
        },
        {
            method : 'DELETE',
            path   : '/users/{_id}',
            config : {
                description : 'Supprime un utilisateur existant',
                notes       : 'Delete user',
                tags        : ['api'],
                handler     : handler.findOneByIdAndRemove,
                validate    : {
                    params : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'PUT',
            path   : '/users/generate',
            config : {
                description : 'Génèrer 100 utilisateurs',
                notes       : 'Generate users',
                tags        : ['api'],
                handler     : handler.createUsers,
            },
        },
        {
            method : 'POST',
            path   : '/login',
            config : {
                description : 'Se connecter',
                notes       : 'Log in',
                tags        : ['api'],
                handler     : handler.login,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : login,
                },
            },
        },
        {
            method : 'POST',
            path   : '/password/reset/{_id}',
            config : {
                description : 'Changer mot de passe utilisateur',
                notes       : 'Reset user password',
                tags        : ['api'],
                handler     : handler.changePassword,
                plugins     : {
                    'hapi-swagger' : {
                        payloadType : 'form',
                    },
                },
                validate : {
                    payload : {
                        password : Joi.string().alphanum().min(8).required(),
                    },
                    params : {
                        _id : Joi.string().alphanum().min(8).required(),
                    },
                },
            },
        },
    ]);
    next();
};

exports.register.attributes = {
    name : 'users-routes',
};
