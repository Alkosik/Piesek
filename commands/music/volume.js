module.exports = {
    category: 'Music',
    name: 'volume',
    aliases: ['vol'],
    description: 'Volume',
    slash: false,
    testOnly: false,
    callback: ({
        client,
        message,
        args
    }) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Nie jesteś na kanale głosowym`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Nie jesteś na tym samym kanale głosowym`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Ale ty kurwa debilu przecież nic nie leci to co mam ci podgłośnić`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.error} - Podaj prawidłowy numer`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} - Podaj prawdiłowy numer (między 1, a 100)`);

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`${client.emotes.success} - Głośność ustawiona na **${parseInt(args[0])}%**`);
    }
};