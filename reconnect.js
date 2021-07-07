registerPlugin({
    name: 'Reconnect',
    version: '1.0.3',
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

    engine.log("Loaded Reconnect");

    event.on('discord:VOICE_STATE_UPDATE', function (ev) {
        var cid = ev.channel_id;
        if (typeof cid === undefined || cid == null) {
            if (ev.user_id.split("/").pop() != backend.getBotClientID().split("/").pop()) {
                return;
            }
            engine.log("Reconnecting");
            
            if(backend.connect()) {
                engine.log("Successfully");
            } else {
                engine.log("Error");
            }
        }
    });

    event.on('connectionFailed', function (reason) {
        engine.log("Connection failed: " + reason);
        if (config.ignconfail) {
            engine.log("Reconnecting");
            backend.connect();
        }
    });
});
