const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'loop',
    description: 'Loop',
    slash: false,
    testOnly: false,
    callback: ({
        client,
        message,
        args
    }) => {
        let response;
        if (!message.member.voice.channel) response = `${client.emotes.error} - **Nie jesteś na kanale głosowym**`;

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) response = `${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`;

        if (!client.player.getQueue(message)) response = `${client.emotes.error} - Ale kurwa nic aktualnie nie leci debilu to co mam ci zloopować`;

        if(!response){
            console.log('Loop command went through w/o errors')
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`${client.emotes.success} - Loop **wyłączony**`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`${client.emotes.success} - Loop **włączony** cała kolejka będzie powtarzana`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`${client.emotes.success} - Loop **wyłączony** !`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`${client.emotes.success} - Loop **włączony** aktualna piosenka będzie powtarzana`);
            };
        };
    }
};