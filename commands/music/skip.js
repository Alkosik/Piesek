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
        if (!message.member.roles.cache.some(r => r.name === "DJ")) return message.channel.send('**Nie masz permisji do opierdalania gały - [DJ]**');
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Nie jesteś na kanle głosowym`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Nie jesteś na tym samym kanale głosowym`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Ale kurwa debilu nic nie leci to co mam ci skipnąć`);

        const success = client.player.skip(message);

        if (success) message.channel.send(`${client.emotes.success} - Aktualna piosenka została **pominięta**`);
    }
};