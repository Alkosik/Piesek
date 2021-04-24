const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    category: 'Music',
    name: 'queue',
    description: 'Queue',
    aliases: ['kolejka'],
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

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) response = `${client.emotes.error} - Ale kurwa debilu nic aktualnie nie leci to co ty niby chcesz zobaczyć w tej kolejce`;

        if(!response){
            //
        } else {
            var errembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(response)
            return message.channel.send(errembed);
        }

        message.channel.send(`**Kolejka serwera - ${message.guild.name} ${client.player.getQueue(message).loopMode ? `(${client.emotes.loop})` : ''}**\nAktualnie: ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (dodane przez: ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `I **${queue.tracks.length - 5}** innych piosenek...` : `W playliście **${queue.tracks.length}**...`}`));
    }
};