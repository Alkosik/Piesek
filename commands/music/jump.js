const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'jump',
    description: 'Jump to position is q',
    aliases: ['j'],
    slash: false,
    testOnly: false,
    callback: async ({
        client,
        message,
        args
    }) => {

        let response;
        let track;
        if (!message.member.voice.channel) response = `${client.emotes.error} - **Nie jesteś na kanale głosowym**`;

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) response = `${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`;

        if (!args[0]) response = `${client.emotes.error} - **Podaj numer piosenki**`;

        if(!response){
            track = args[0];
            client.player.jump(message, track)
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }
    }
};