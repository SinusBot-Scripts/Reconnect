registerPlugin({
    name: 'Reconnect',
    version: '1.0.0',
    description: 'Reconnects the bot',
    author: 'Lala Sabathil <aiko@aitsys.dev>',
    engine: '>= 1.0.0',
    backends: ['discord', 'ts3'],
    requiredModules: [],
    autorun: true,
    vars: []
}, function(_, config, meta) {
    var engine = require('engine');
    var event = require('event');
    var backend = require('backend');

    event.on('disconnect', function () {
        engine.log("Reconnecting");
        backend.connect();
    });
});