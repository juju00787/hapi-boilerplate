'use strict';

const Promise = require('bluebird');
const user = require('../models/users');
// contient toutes les méthodes privées de votre plugin

const internals = {};

const externals = {
    findAll() {
      return user.find()
    },
    save(payload){
        const user = new internals.server.database.users( payload );
        return user.save();
    },
    findOneByIdAndRemove(request){
        const user = user.findOne( {_id: request});
        return user.remove();
    },
    register(server, options, next) {
        internals.server   = server.root;
        internals.settings = options;

        // à répéter autant de fois
        // que vous avez de méthodes publiques
        server.expose('findAll', externals.findAll);
        server.expose('save', externals.save);
        server.expose('findOneByIdAndRemove', externals.findOneByIdAndRemove);

        next();
    },
};

externals.register.attributes = {
  name : 'users',
};

module.exports.register = externals.register;
