const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'lyrics',
    description: 'Song lyrics',
    aliases: ['l', 'tekst'],
    slash: false,
    testOnly: false,
    callback: async ({
        client,
        message,
        args
    }) => {

        let response;
        const songName = args.join(" ");
        
        if (!message.member.voice.channel) response = `${client.emotes.error} - **Nie jesteś na kanale głosowym**`;

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) response = `${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`;

        if (!args[0]) response = `${client.emotes.error} - **Podaj nazwę piosenki, do której chcesz tekst**`;

        if(!response){
            query = args[0];
            client.player.lyrics(query)
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        
    }
};