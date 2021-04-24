const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'skip',
    description: 'Skip',
    aliases: ['s'],
    slash: false,
    testOnly: false,
    callback: ({
        client,
        message,
        args
    }) => {
        if (!message.member.roles.cache.some(r => r.name === "DJ")) response = `${client.emotes.error} - **Nie masz permisji do opierdalania gały - [DJ]**`;

        let response;
        if (!message.member.voice.channel) response = `${client.emotes.error} - **Nie jesteś na kanale głosowym**`;

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) response = `${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`;

        if (!client.player.getQueue(message)) response = `${client.emotes.error} - Ale kurwa debilu nic nie leci to co mam ci skipnąć`;

        if(!response){
            //
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        const success = client.player.skip(message);

        let sresponse;
        if (success) sresponse = `${client.emotes.success} - Aktualna piosenka została **pominięta**`;

        var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(sresponse)
            return message.channel.send(sembed);
    }
};