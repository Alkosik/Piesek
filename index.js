const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;

client.once('ready', () => {
    console.log('READY');
});

client.login(token);

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channelID === '790343982877900820') {
        const channel = client.channels.cache.get("790343982877900820");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            const dispatcher = connection.play('./bark.mp3');
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        });
    } else {
        const channel = client.channels.cache.get("790343982877900820");
        channel.leave();
    }
});