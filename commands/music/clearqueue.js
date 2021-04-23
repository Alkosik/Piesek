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
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Nie jesteś na kanale głosowym`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Nie jesteś na tym samym kanale głosowym`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Ale kurwa debilu nic nie leci to jaką kolejke ja ci mam niby wyczyścić`);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} - W kolejce jest tylko jedna piosenka`);

        client.player.clearQueue(message);

        message.channel.send(`${client.emotes.success} - Kolejka została **wyczyszczona** !`);
    }
};