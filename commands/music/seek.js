const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'seek',
    description: 'Seek',
    aliases: ['sk'],
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

        if (!args[0]) response = `${client.emotes.error} - **Podaj pozycję, do której mam przewinąć**`;

        if(!response){
            time = args[0] * 1000;
            client.player.seek(message, time)
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }
    }
};