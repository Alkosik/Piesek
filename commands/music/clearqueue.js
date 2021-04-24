const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'clearqueue',
    description: 'Clear queue',
    aliases: ['cq'],
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

        if (!client.player.getQueue(message)) response = `${client.emotes.error} - Ale kurwa debilu nic nie leci to jaką kolejke ja ci mam niby wyczyścić`;

        if (client.player.getQueue(message).tracks.length <= 1) response = `${client.emotes.error} - W kolejce jest tylko jedna piosenka`;

        if(!response){
            client.player.clearQueue(message);
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        message.channel.send(`${client.emotes.success} - Kolejka została **wyczyszczona** !`);
    }
};