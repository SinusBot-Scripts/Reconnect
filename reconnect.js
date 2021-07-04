registerPlugin({
    name: 'Reconnect',
    version: '1.0.2',
    description: 'Reconnects the bot',
    author: 'Lala Sabathil <aiko@aitsys.dev>',
    engine: '>= 1.0.0',
    backends: ['discord', 'ts3'],
    requiredModules: [],
    autorun: true,
    vars: [
        {
            name: 'ignconfail',
            title: 'Ignore connection failed (Infinity reconnect)',
            type: 'checkbox'
        }
    ]
}, function(_, config, meta) {
    var engine = require('engine');
    var event = require('event');
    var backend = require('backend');

    event.on('disconnect', function () {
        engine.log("Reconnecting");
        backend.connect();
    });

    event.on('connectionFailed', function (reason) {
        engine.log("Connection failed: " + reason);
        if (config.ignconfail) {
            engine.log("Reconnecting");
            backend.connect();
        }
    });
});