'use strict';

const Hapi          = require('hapi');
const plugins       = require('./manifest/plugins');
const routes        = require('./manifest/routes');
const models        = require('./manifest/models');
const serverConfig  = require('./manifest/server');

module.exports.init = () => {
    const server = new Hapi.Server();

    return Promise.resolve().then(() => serverConfig.init(server))
      .then(() => (
          // configuration des plugins
          plugins.init(server)
      ))
      .then(() => (
          // configuration des models
          models.init(server)
      ))
      .then(() => (
          // configuration des routes
          routes.init(server)
      ))
      .then(() => server);
};
