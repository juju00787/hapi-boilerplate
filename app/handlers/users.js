'use strict';

module.exports.save = ( request, response ) => {
    request.server.plugins.users.save(request.payload)
        .then(user => response(user).code(201))
        .catch(err => response('error'));
};

module.exports.findAll = ( request, response ) => {
    request.server.plugins.users.findAll()
      .then(user => response(user).code(201))
      .catch(err => response('error'));
};

module.exports.findOneById = ( request, response ) => {
    request.server.database.users.find({ _id: request.params.id}, function( err, users ) {
        var userMap = {};

        users.forEach( function( user ) {
            userMap[user._id] = user;
        });
        response( null,  {
            result : userMap
        } );
    } );
};

module.exports.findOneByIdAndRemove = ( request, response ) => {
    request.server.plugins.users.findOneByIdAndRemove(request)
        .then(user => response(user).code(201))
        .catch(err => response('error'));
};

module.exports.findOneByIdAndUpdate = ( request, response ) => {
    let data = JSON.parse( request.payload )

    request.server.database.update(
        { login: data.login },
        { password: data.password },
        { email: data.email },
        { firstname: data.firstname },
        function ( err, raw ) {
            if( err ) return handleError( err );
        }
    )
};
