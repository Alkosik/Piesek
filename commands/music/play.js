const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'play',
    description: 'Play',
    aliases: ['p'],
    slash: false,
    testOnly: false,
    callback: async ({
        client,
        message,
        args
    }) => {

        let response;
        if (!message.member.voice.channel) response = `${client.emotes.error} - **Nie jesteś na kanale głosowym**`;

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) response = `${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`;

        if (!args[0]) response = `${client.emotes.error} - **Podaj nazwę piosenki**`;

        if(!response){
            client.player.play(message, args.join(" "), { firstResult: true });
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }
    }
};