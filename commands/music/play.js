module.exports = {
    category: 'Music',
    name: 'play',
    description: 'Play',
    aliases: ['p'],
    slash: false,
    testOnly: false,
    callback: ({
        client,
        message,
        args
    }) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - **Nie jesteś na kanale głosowym**`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - **Nie jesteś na tym samym kanale głosowym**`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - **Podaj nazwę piosenki**`);

        client.player.play(message, args.join(" "), { firstResult: true });
    }
};